const { prisma } = require("../lib/prisma");
const {
  addItemSchema,
  updateQuantitySchema,
} = require("../validators/cartValidator");
const CustomError = require("../utils/customError");
const logger = require("../utils/logger");

const fetchFormattedCart = async (userId) => {
  const cart = await prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {},
    include: { items: { include: { product: true } } },
  });

  const total = cart.items.reduce(
    (sum, curr) => sum + curr.quantity * curr.product.price,
    0,
  );

  return { ...cart, total };
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await fetchFormattedCart(req.user.id);
    res.status(200).json(cart);
  } catch (err) {
    logger.error("Get cart failed", err);
    return next(new CustomError("Failed to fetch cart", 500));
  }
};

exports.addItem = async (req, res, next) => {
  try {
    const { error, value } = addItemSchema.validate(req.body);
    if (error) {
      return next(new CustomError("Invalid or missing fields", 400));
    }

    const userId = req.user.id;
    const { productId, quantity } = value;

    const currentCart = await fetchFormattedCart(userId);
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) return next(new CustomError("Product not found", 404));
    if (!product.inStock) return next(new CustomError("Out of stock", 400));

    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: currentCart.id, productId } },
      create: { cartId: currentCart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
    });

    const updatedCart = await fetchFormattedCart(userId);
    res.status(200).json(updatedCart);
  } catch (err) {
    logger.warn("Add to cart failed", {
      ip: req.ip,
      errorMessage: err.message,
    });
    return next(new CustomError("Add to cart failed", 500));
  }
};

exports.updateItemQuantity = async (req, res, next) => {
  try {
    const { error, value } = updateQuantitySchema.validate(req.body);
    if (error) return next(new CustomError("Invalid quantity", 400));

    const productId = parseInt(req.params.productId, 10);
    const { quantity } = value;
    const userId = req.user.id;

    const currentCart = await fetchFormattedCart(userId);
    const item = currentCart.items.find((i) => i.productId === productId);
    if (!item) return next(new CustomError("Item not found in cart", 404));

    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    });

    const updatedCart = await fetchFormattedCart(userId);
    res.status(200).json(updatedCart);
  } catch (err) {
    logger.error("Update quantity failed", err);
    next(new CustomError("Failed to update item", 500));
  }
};

exports.removeItem = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    const userId = req.user.id;

    const currentCart = await fetchFormattedCart(userId);
    const item = currentCart.items.find((i) => i.productId === productId);
    if (!item) return next(new CustomError("Item not found in cart", 404));

    await prisma.cartItem.delete({
      where: { id: item.id },
    });

    const updatedCart = await fetchFormattedCart(userId);
    res.status(200).json(updatedCart);
  } catch (err) {
    logger.error("Remove item failed", err);
    return next(new CustomError("Removing from cart failed", 500));
  }
};
