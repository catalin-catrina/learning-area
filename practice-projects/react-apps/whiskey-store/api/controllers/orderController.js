const orderSchema = require("../validators/orderValidator");
const CustomError = require("../utils/customError");
const { prisma } = require("../lib/prisma");
const logger = require("../utils/logger");
const { canTransition } = require("../utils/orderStatus");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders =
      req.user.role === "admin"
        ? await prisma.order.findMany({ include: { items: true } })
        : await prisma.order.findMany({
            where: { userId: req.user.id },
            include: { items: true },
          });

    res.json(orders);
  } catch (err) {
    logger.error("Get orders failed", { errorMessage: err.message });
    return next(new CustomError("Get orders failed", 500));
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { items: true },
    });

    if (!order) {
      return next(new CustomError("Order not found", 404));
    }

    if (req.user.role !== "admin" && order.userId !== req.user.id) {
      return next(new CustomError("Operation not permitted", 403));
    }

    res.json(order);
  } catch (err) {
    logger.error("Get order failed", { errorMessage: err.message });
    return next(new CustomError("Get order failed", 500));
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const { error, value } = orderSchema.validate(req.body);
    if (error) {
      return next(new CustomError("Invalid fields", 400));
    }

    const order = await prisma.$transaction(async (tx) => {
      // everything in here uses `tx`, never `prisma`
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      if (!cart || !cart.items) {
        throw new CustomError("No cart or no items", 400);
      }

      for (let i = 0; i < cart.items.length; i++) {
        if (!cart.items.product.inStock) {
                  throw new CustomError("No cart or no items", 400);

        }
      }

      const total = cart.items.reduce(
        (sum, curr) => sum + curr.quantity * curr.product.price,
        0,
      );
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    logger.error("Create order failed", { errorMessage: err.message });
    return next(new CustomError("Create order failed", 500));
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id);
    if (!Number.isSafeInteger(orderId) || orderId <= 0) {
      return next(new CustomError("Invalid order id", 400));
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return next(new CustomError("Order not found", 404));
    }

    if (req.user.role !== "admin" && order.userId !== req.user.id) {
      return next(new CustomError("Operation not permitted", 403));
    }

    const isAllowed = canTransition(order.status, "CANCELLED");
    if (!isAllowed) {
      return next(
        new CustomError(
          `Order can't be cancelled because it's ${order.status}`,
          409,
        ),
      );
    }

    const { count } = await prisma.order.updateMany({
      where: { id: orderId, status: order.status },
      data: { status: "CANCELLED" },
    });
    if (!count) {
      return next(
        new CustomError(
          "the order was modified while processing and the user should reload",
          409,
        ),
      );
    }

    const newOrder = await prisma.order.findUnique({ where: { id: orderId } });

    res
      .status(200)
      .json({ message: "Order cancelled successfully", order: newOrder });
  } catch (err) {
    logger.error("Cancel order failed", { errorMessage: err.message });
    return next(new CustomError("Cancel order failed", 500));
  }
};
