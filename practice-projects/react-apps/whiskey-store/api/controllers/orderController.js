const { prisma } = require("../lib/prisma");
const { clientUrl } = require("../config/env");
const { stripe } = require("../lib/stripe");
const { v4 } = require("uuid");

const { canTransition } = require("../utils/orderStatus");
const orderSchema = require("../validators/orderValidator");
const CustomError = require("../utils/customError");
const logger = require("../utils/logger");

// Turns the checkout body into the address snapshot stored on the order.
// Runs inside the order transaction: if the order fails (empty cart, out of
// stock), a "save this address" from the same request is rolled back too.
async function resolveShippingAddress(
  tx,
  userId,
  { addressId, shippingAddress, saveAddress, makeDefault },
) {
  const pick = (a) => ({
    name: a.name,
    line1: a.line1,
    line2: a.line2 || "",
    city: a.city,
    postalCode: a.postalCode,
    country: a.country,
  });

  if (addressId) {
    const saved = await tx.address.findUnique({ where: { id: addressId } });
    if (!saved) throw new CustomError("Address not found", 404);
    if (saved.userId !== userId) throw new CustomError("Operation not permitted", 403);
    return pick(saved);
  }

  if (saveAddress) {
    const count = await tx.address.count({ where: { userId } });
    const isDefault = makeDefault || count === 0; // the first saved address becomes the default
    if (isDefault) {
      await tx.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }
    await tx.address.create({
      data: {
        ...pick(shippingAddress),
        line2: shippingAddress.line2 || null,
        label: shippingAddress.label || null,
        isDefault,
        userId,
      },
    });
  }

  return pick(shippingAddress);
}

// Items come with a few product fields so the UI can show thumbnails.
const ORDER_INCLUDE = {
  items: {
    include: {
      product: { select: { imageUrl: true, brand: true, slug: true } },
    },
  },
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders =
      req.user.role === "admin"
        ? await prisma.order.findMany({ include: ORDER_INCLUDE, orderBy: { createdAt: "desc" } })
        : await prisma.order.findMany({
            where: { userId: req.user.id },
            include: ORDER_INCLUDE,
            orderBy: { createdAt: "desc" },
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
      include: ORDER_INCLUDE,
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
      return next(new CustomError(error.details[0].message, 400));
    }

    const userId = req.user.id;

    const order = await prisma.$transaction(async (tx) => {
      // everything in here uses `tx`, never `prisma`
      const shippingAddress = await resolveShippingAddress(tx, userId, value);

      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      if (!cart || cart.items.length === 0) {
        throw new CustomError("No cart or no items", 400);
      }

      for (let i = 0; i < cart.items.length; i++) {
        if (!cart.items[i].product.inStock) {
          throw new CustomError(
            `No stock for ${cart.items[i].product.name}`,
            400,
          );
        }
      }

      const itemIds = cart.items.map((item) => item.id);

      const { count } = await tx.cartItem.deleteMany({
        where: {
          id: { in: itemIds },
        },
      });

      if (count !== cart.items.length) {
        throw new CustomError(
          "Cart changed during checkout. Please retry.",
          409,
        );
      }

      const orderItems = cart.items.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        unitPriceCents: item.product.priceCents,
        quantity: item.quantity,
      }));

      const totalCents = orderItems.reduce(
        (sum, curr) => sum + curr.quantity * curr.unitPriceCents,
        0,
      );

      const order = await tx.order.create({
        data: {
          userId,
          status: "PENDING",
          shippingAddress, // a copy, so later address edits never change past orders
          totalCents,
          checkoutSessionCreationKey: v4(),
          items: {
            create: orderItems,
          },
        },
        include: { items: true },
      });

      return order;
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    if (err instanceof CustomError) {
      return next(err);
    }
    logger.error("Create order failed", { errorMessage: err.message });
    return next(new CustomError("Create order failed", 500));
  }
};

exports.createPaymentSession = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id);
    if (!Number.isSafeInteger(orderId) || orderId <= 0) {
      return next(new CustomError("Invalid order id", 400));
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    if (!order) {
      return next(new CustomError("Order not found", 404));
    }

    if (order.userId !== req.user.id) {
      return next(new CustomError("Operation not permitted", 403));
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { email: true },
    });

    if (order.status !== "PENDING") {
      return next(
        new CustomError(
          `Payment cannot be started because this order is ${order.status}.`,
          409,
        ),
      );
    }

    let session;
    let creationKey = order.checkoutSessionCreationKey;

    if (order.stripeCheckoutSessionId) {
      const retrievedSession = await stripe.checkout.sessions.retrieve(
        order.stripeCheckoutSessionId,
      );

      // Sessions created before the account email was passed to Stripe would
      // still ask for an email the page no longer collects. Expire them so a
      // fresh one (with the email) is created below.
      if (retrievedSession.status === "open" && !retrievedSession.customer_email) {
        await stripe.checkout.sessions.expire(retrievedSession.id);
        retrievedSession.status = "expired";
      }

      switch (retrievedSession.status) {
        case "open":
          session = retrievedSession;
          break;

        case "complete":
          return next(new CustomError("Checkout is already complete.", 409));

        case "expired": {
          creationKey = v4();

          const { count } = await prisma.order.updateMany({
            where: {
              id: order.id,
              status: "PENDING",
              stripeCheckoutSessionId: retrievedSession.id,
              checkoutSessionCreationKey: order.checkoutSessionCreationKey,
            },
            data: {
              checkoutSessionCreationKey: creationKey,
              stripeCheckoutSessionId: null,
            },
          });

          if (count !== 1) {
            return next(
              new CustomError(
                "The order was modified while processing and the user should reload",
                409,
              ),
            );
          }
          break;
        }
      }
    }

    if (!session) {
      session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          ui_mode: "elements",
          line_items: order.items.map((item) => ({
            quantity: item.quantity,
            price_data: {
              currency: "eur",
              unit_amount: item.unitPriceCents,
              product_data: {
                name: item.productName,
              },
            },
          })),
          client_reference_id: String(order.id),
          // The account email: Stripe sends the receipt there, and the payment
          // page doesn't need its own email field.
          customer_email: user.email,
          return_url: `${clientUrl}/payment/return?order_id=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
        },
        {
          idempotencyKey: creationKey,
        },
      );

      const { count } = await prisma.order.updateMany({
        where: {
          id: orderId,
          status: "PENDING",
          checkoutSessionCreationKey: creationKey,
        },
        data: {
          stripeCheckoutSessionId: session.id,
        },
      });

      if (count !== 1) {
        return next(
          new CustomError(
            "The order was modified while processing and the user should reload",
            409,
          ),
        );
      }
    }

    return res.json({ clientSecret: session.client_secret });
  } catch (err) {
    logger.error("Failed to create payment session", {
      errorMessage: err.message,
    });
    return next(new CustomError("Create payment session failed", 500));
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
          "The order was modified while processing and the user should reload",
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
