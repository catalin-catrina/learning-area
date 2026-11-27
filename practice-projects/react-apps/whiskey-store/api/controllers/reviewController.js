const { prisma } = require("../lib/prisma");
const { reviewSchema, reviewListSchema } = require("../validators/reviewValidator");
const CustomError = require("../utils/customError");
const logger = require("../utils/logger");

// Public name on a review: "Mihai D." (first name + last initial), so a
// review never exposes someone's full name.
function displayName(name) {
  const [first, ...rest] = (name ?? "").trim().split(/\s+/);
  const last = rest.at(-1);
  return last ? `${first} ${last[0].toUpperCase()}.` : first || "Customer";
}

const toDto = (review) => ({
  id: review.id,
  rating: review.rating,
  comment: review.comment,
  createdAt: review.createdAt,
  updatedAt: review.updatedAt,
  author: displayName(review.user?.name),
});

function productIdFrom(req) {
  const id = Number.parseInt(req.params.id, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Product.rating / reviewCount are stored (the list sorts and filters by them),
// so every write recomputes them in the same transaction as the write itself.
// Rounded to one decimal, same as the seed.
async function refreshProductRating(tx, productId) {
  const { _avg, _count } = await tx.review.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: true,
  });
  const rating = _count ? Math.round((_avg.rating ?? 0) * 10) / 10 : 0;
  return tx.product.update({
    where: { id: productId },
    data: { rating, reviewCount: _count },
    select: { rating: true, reviewCount: true },
  });
}

// GET /products/:id/reviews?page=&limit= — public, newest first
exports.getReviews = async (req, res, next) => {
  try {
    const productId = productIdFrom(req);
    if (!productId) return next(new CustomError("Invalid product id", 400));
    const { value, error } = reviewListSchema.validate(req.query);
    if (error) return next(new CustomError(error.details[0].message, 400));
    const { page, limit } = value;

    const [items, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId },
        include: { user: { select: { name: true } } },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.review.count({ where: { productId } }),
    ]);

    res.json({ data: items.map(toDto), total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) });
  } catch (err) {
    logger.error("Get reviews failed", { errorMessage: err.message });
    return next(new CustomError("Get reviews failed", 500));
  }
};

// GET /products/:id/reviews/me — the signed-in user's review, or null
exports.getMyReview = async (req, res, next) => {
  try {
    const productId = productIdFrom(req);
    if (!productId) return next(new CustomError("Invalid product id", 400));
    const review = await prisma.review.findUnique({
      where: { userId_productId: { userId: req.user.id, productId } },
      include: { user: { select: { name: true } } },
    });
    res.json(review ? toDto(review) : null);
  } catch (err) {
    logger.error("Get my review failed", { errorMessage: err.message });
    return next(new CustomError("Get my review failed", 500));
  }
};

// PUT /products/:id/reviews/me — create or edit (one review per user per product)
exports.upsertMyReview = async (req, res, next) => {
  try {
    const productId = productIdFrom(req);
    if (!productId) return next(new CustomError("Invalid product id", 400));
    const { value, error } = reviewSchema.validate(req.body);
    if (error) return next(new CustomError(error.details[0].message, 400));

    const exists = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
    if (!exists) return next(new CustomError("Product not found", 404));

    const data = { rating: value.rating, comment: value.comment || null };
    const userId = req.user.id;

    const { review, product } = await prisma.$transaction(async (tx) => {
      const review = await tx.review.upsert({
        where: { userId_productId: { userId, productId } },
        create: { ...data, userId, productId },
        update: data,
        include: { user: { select: { name: true } } },
      });
      const product = await refreshProductRating(tx, productId);
      return { review, product };
    });

    res.json({ review: toDto(review), product });
  } catch (err) {
    logger.error("Save review failed", { errorMessage: err.message });
    return next(new CustomError("Save review failed", 500));
  }
};

// DELETE /products/:id/reviews/me
exports.deleteMyReview = async (req, res, next) => {
  try {
    const productId = productIdFrom(req);
    if (!productId) return next(new CustomError("Invalid product id", 400));
    const userId = req.user.id;

    const product = await prisma.$transaction(async (tx) => {
      const { count } = await tx.review.deleteMany({ where: { userId, productId } });
      if (count === 0) return null;
      return refreshProductRating(tx, productId);
    });
    if (!product) return next(new CustomError("Review not found", 404));

    res.json({ product });
  } catch (err) {
    logger.error("Delete review failed", { errorMessage: err.message });
    return next(new CustomError("Delete review failed", 500));
  }
};
