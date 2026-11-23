const { prisma } = require("../lib/prisma");
const {
  createAddressSchema,
  updateAddressSchema,
} = require("../validators/addressValidator");
const CustomError = require("../utils/customError");
const logger = require("../utils/logger");

// Empty optional line → null in the DB
const clean = (fields) => ({ ...fields, line2: fields.line2 || null });

function parseId(raw) {
  const id = Number(raw);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

// Single-resource ownership check: fetch, then compare the FK with req.user.id
async function findOwnedAddress(id, userId) {
  const address = await prisma.address.findUnique({ where: { id } });
  if (!address) throw new CustomError("Address not found", 404);
  if (address.userId !== userId) throw new CustomError("Operation not permitted", 403);
  return address;
}

// GET /api/addresses: default first, then newest
exports.getAddresses = async (req, res, next) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
    res.json(addresses);
  } catch (err) {
    logger.error("Get addresses failed", { errorMessage: err.message });
    return next(new CustomError("Get addresses failed", 500));
  }
};

// POST /api/addresses. The first address a user saves becomes the default automatically.
exports.createAddress = async (req, res, next) => {
  try {
    const { error, value } = createAddressSchema.validate(req.body);
    if (error) return next(new CustomError(error.details[0].message, 400));

    const { isDefault, ...fields } = value;
    const userId = req.user.id;

    const address = await prisma.$transaction(async (tx) => {
      const count = await tx.address.count({ where: { userId } });
      const makeDefault = isDefault || count === 0;

      if (makeDefault) {
        await tx.address.updateMany({
          where: { userId, isDefault: true },
          data: { isDefault: false },
        });
      }

      return tx.address.create({
        data: { ...clean(fields), isDefault: makeDefault, userId },
      });
    });

    res.status(201).json(address);
  } catch (err) {
    logger.error("Create address failed", { errorMessage: err.message });
    return next(new CustomError("Create address failed", 500));
  }
};

// PUT /api/addresses/:id
exports.updateAddress = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return next(new CustomError("Invalid address id", 400));

    const { error, value } = updateAddressSchema.validate(req.body);
    if (error) return next(new CustomError(error.details[0].message, 400));

    await findOwnedAddress(id, req.user.id);

    const address = await prisma.address.update({
      where: { id },
      data: clean(value),
    });
    res.json(address);
  } catch (err) {
    if (err instanceof CustomError) return next(err);
    logger.error("Update address failed", { errorMessage: err.message });
    return next(new CustomError("Update address failed", 500));
  }
};

// PATCH /api/addresses/:id/default
exports.setDefaultAddress = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return next(new CustomError("Invalid address id", 400));

    const userId = req.user.id;
    await findOwnedAddress(id, userId);

    // Unset the old default and set the new one together, so there's never
    // a moment with two defaults (or none).
    const [, address] = await prisma.$transaction([
      prisma.address.updateMany({
        where: { userId, isDefault: true, NOT: { id } },
        data: { isDefault: false },
      }),
      prisma.address.update({ where: { id }, data: { isDefault: true } }),
    ]);

    res.json(address);
  } catch (err) {
    if (err instanceof CustomError) return next(err);
    logger.error("Set default address failed", { errorMessage: err.message });
    return next(new CustomError("Set default address failed", 500));
  }
};

// DELETE /api/addresses/:id. Deleting the default promotes the newest remaining address.
exports.deleteAddress = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return next(new CustomError("Invalid address id", 400));

    const userId = req.user.id;
    const address = await findOwnedAddress(id, userId);

    await prisma.$transaction(async (tx) => {
      await tx.address.delete({ where: { id } });

      if (address.isDefault) {
        const newest = await tx.address.findFirst({
          where: { userId },
          orderBy: { createdAt: "desc" },
        });
        if (newest) {
          await tx.address.update({ where: { id: newest.id }, data: { isDefault: true } });
        }
      }
    });

    res.status(204).end();
  } catch (err) {
    if (err instanceof CustomError) return next(err);
    logger.error("Delete address failed", { errorMessage: err.message });
    return next(new CustomError("Delete address failed", 500));
  }
};
