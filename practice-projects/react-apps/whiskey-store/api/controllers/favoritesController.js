const { prisma } = require("../lib/prisma");
const schema = require("../validators/favoritesValidator");

const CustomError = require("../utils/customError");
const logger = require("../utils/logger");

exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: { product: true },
    });

    res.status(200).json(favorites);
  } catch (err) {
    logger.error("Get favorites failed", { errorMessage: err.message });
    return next(new CustomError("Get favorites failed", 500));
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }
    const { productId } = value;
    if (!productId) {
      return next(new CustomError("Product ID is required", 400));
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: req.user.id,
        productId: parseInt(productId, 10),
      },
      include: { product: true },
    });

    res.status(201).json(favorite);
  } catch (err) {
    if (err.code === "P2002") {
      return next(new CustomError("Favorite already exists", 400));
    } else if (err.code === "P2003") {
      return next(new CustomError("Product not found", 404));
    }
    logger.error("Add favorite failed", { errorMessage: err.message });
    return next(new CustomError("Add favorite failed", 500));
  }
};

exports.isFavorite = async (req, res, next) => {
  try {
    const { value, error } = schema.validate({
      productId: req.params.productId,
    });
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }
    const productId = parseInt(value.productId, 10);

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: productId,
        },
      },
    });

    res.status(200).json({ isFavorite: !!favorite });
  } catch (err) {
    logger.error("Check favorite failed", { errorMessage: err.message });
    return next(new CustomError("Check favorite failed", 500));
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId, 10);

    // Use deleteMany to safely match both the product and the owner
    const deleted = await prisma.favorite.deleteMany({
      where: {
        productId: productId,
        userId: req.user.id,
      },
    });

    if (deleted.count === 0) {
      return next(new CustomError("Favorite not found", 404));
    }

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (err) {
    logger.error("Remove favorite failed", { errorMessage: err.message });
    return next(new CustomError("Remove favorite failed", 500));
  }
};
