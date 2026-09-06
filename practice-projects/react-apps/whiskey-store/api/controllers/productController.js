const productSchema = require("../validators/productValidator");
const CustomError = require("../utils/customError");
const { prisma } = require("../lib/prisma");

exports.getProducts = async (req, res, next) => {
  try {
    const ALLOWED_FILTERS = ["region", "type", "country", "inStock", "rating"];

    const where = ALLOWED_FILTERS.reduce((acc, key) => {
      if (req.query[key]) {
        if (req.query[key] === "true") {
          acc[key] = true;
        } else if (req.query[key] === "false") {
          acc[key] = false;
        } else if (key === "rating") {
          acc[key] = parseFloat(req.query[key]);
        } else {
          acc[key] = req.query[key];
        }
      }
      return acc;
    }, {});

    if (req.query.minPrice) {
      where.price = { ...where.price, gte: parseFloat(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      where.price = { ...where.price, lte: parseFloat(req.query.maxPrice) };
    }

    if (req.query.search) {
      where.OR = [
        { name: { contains: req.query.search, mode: "insensitive" } },
        { distillery: { contains: req.query.search, mode: "insensitive" } },
      ];
    }

    const ALLOWED_SORT_ORDER = ["asc", "desc"];
    const ALLOWED_SORT_BY = ["price", "age"];

    if (req.query.sortBy) {
      if (
        !ALLOWED_SORT_BY.includes(req.query.sortBy) ||
        (req.query.sortOrder &&
          !ALLOWED_SORT_ORDER.includes(req.query.sortOrder))
      ) {
        return next(new CustomError("Invalid sort params", 400));
      }
    }

    const orderBy = req.query.sortBy
      ? [
          {
            [req.query.sortBy]: req.query.sortOrder === "desc" ? "desc" : "asc",
          },
        ]
      : undefined;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const products = prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    const count = prisma.product.count({ where });

    const [productsResult, countResult] = await Promise.all([products, count]);

    const response = {
      data: productsResult,
      total: countResult,
      page,
      limit,
      totalPages: Math.ceil(countResult / limit),
    };

    res.json(response);
  } catch (err) {
    logger.warn("Get products failed", {
      ip: req.ip,
    });
    return next(new CustomError("Get products failed", 500));
  }
};

exports.getFilters = async (req, res, next) => {
  try {
    const regions = prisma.product.findMany({
      distinct: ["region"],
      select: { region: true },
    });

    const types = prisma.product.findMany({
      distinct: ["type"],
      select: { type: true },
    });

    const countries = prisma.product.findMany({
      distinct: ["country"],
      select: { country: true },
    });

    const [regionsResult, typesResult, countriesResult] = await Promise.all([
      regions,
      types,
      countries,
    ]);

    const flatRegions = regionsResult.map((r) => r.region);
    const flatTypes = typesResult.map((r) => r.type);
    const flatCountries = countriesResult.map((r) => r.country);

    const response = { flatRegions, flatTypes, flatCountries };

    res.json(response);
  } catch (err) {
    return next(new CustomError("Get filters failed", 500));
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { reviews: true },
    });
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
    res.json(product);
  } catch (err) {
    return next(new CustomError("Get Product by id failed", 500));
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return next(new CustomError("Invalid fields", 400));
    }

    const product = await prisma.product.create({
      data: value,
    });
    res.status(201).json(product);
  } catch (err) {
    return next(new CustomError("Create product failed", 500));
  }
};

exports.putProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return next(new CustomError("Invalid fields", 400));
    }

    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: value,
    });

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    return next(new CustomError("Update product failed", 500));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return next(new CustomError("Delete product failed", 500));
  }
};
