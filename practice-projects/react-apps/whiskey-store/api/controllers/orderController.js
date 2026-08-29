const orderSchema = require("../validators/orderValidator");
const CustomError = require("../utils/customError");
const { prisma } = require("../lib/prisma");

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
    return next(new CustomError("Get order failed", 500));
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { error, value } = orderSchema.validate(req.body);
    if (error) {
      return next(new CustomError("Invalid fields", 400));
    }

    const productIds = value.items.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const total = value.items.reduce((sum, item) => {
      const product = dbProducts.find((p) => p.id === item.productId);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        status: "PENDING",
        total,
        items: {
          create: value.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    return next(new CustomError("Create order failed", 500));
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.id);

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return next(new CustomError("Order not found", 404));
    }

    if (req.user.role !== "admin" && order.userId !== req.user.id) {
      return next(new CustomError("Operation not permitted", 403));
    }

    const cancelled = await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });

    res
      .status(200)
      .json({ message: "Order cancelled successfully", order: cancelled });
  } catch (err) {
    return next(new CustomError("Cancel order failed", 500));
  }
};
