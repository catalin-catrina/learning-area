const { stripe } = require("../lib/stripe");
const { prisma } = require("../lib/prisma");

const logger = require("../utils/logger");
const CustomError = require("../utils/customError");

exports.handleWebhook = async (req, res, next) => {
  let event;
  try {
    try {
      const signature = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      logger.error("⚠️ Webhook signature verification failed.", {
        errorMessage: err.message,
      });
      return next(
        new CustomError("⚠️ Webhook signature verification failed.", 400),
      );
    }

    const fail = (message, { session, paymentIntentId, currentOrder } = {}) => {
      logger.error(message, {
        eventId: event.id,
        eventType: event.type,
        orderReference: session.client_reference_id,
        sessionId: session.id,
        paymentIntentId,
        receivedAmountCents: session.amount_total,
        receivedCurrency: session.currency,

        orderId: currentOrder?.id,
        orderStatus: currentOrder?.status,
        storedSessionId: currentOrder?.stripeCheckoutSessionId,
        storedPaymentIntentId: currentOrder?.paymentIntentId,
        expectedAmountCents: currentOrder?.totalCents,
        expectedCurrency: "eur",
      });

      return next(new CustomError(message, 500));
    };

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;

        if (session.payment_status !== "paid") {
          return res.json({ received: true });
        }

        if (
          typeof paymentIntentId !== "string" ||
          paymentIntentId.trim().length === 0
        ) {
          return fail("Missing or invalid payment intent ID");
        }

        const orderId = Number(session.client_reference_id);

        if (!Number.isSafeInteger(orderId) || orderId <= 0) {
          return fail("Invalid order id");
        }

        const order = await prisma.order.findUnique({
          where: { id: orderId },
        });
        if (!order) {
          return fail("Order not found", {
            session,
            paymentIntentId,
            currentOrder: order,
          });
        }

        if (
          session.id !== order.stripeCheckoutSessionId ||
          (order.paymentIntentId !== null &&
            order.paymentIntentId !== paymentIntentId) ||
          session.amount_total !== order.totalCents ||
          session.currency !== "eur"
        ) {
          return fail("Payment does not match order", {
            session,
            paymentIntentId,
            currentOrder: order,
          });
        }

        const { count } = await prisma.order.updateMany({
          where: {
            id: orderId,
            stripeCheckoutSessionId: session.id,
            status: "PENDING",
            OR: [{ paymentIntentId: null }, { paymentIntentId }],
          },
          data: { status: "PAID", paymentIntentId },
        });

        if (count === 1) {
          return res.status(200).json({ received: true });
        }

        const newOrder = await prisma.order.findUnique({
          where: { id: orderId },
        });

        if (!newOrder) {
          return fail("Order missing after conditional payment update");
        }

        switch (newOrder.status) {
          case "PAID":
          case "SHIPPED":
          case "DELIVERED": {
            const samePayment =
              newOrder.stripeCheckoutSessionId === session.id &&
              newOrder.paymentIntentId === paymentIntentId;

            if (!samePayment) {
              return fail("Recorded payment identity does not match event", {
                session,
                paymentIntentId,
                currentOrder: newOrder,
              });
            }

            return res.json({ received: true });
          }
          case "CANCELLED":
            return fail("Payment received for cancelled order", {
              session,
              paymentIntentId,
              currentOrder: newOrder,
            });

          case "PENDING":
            return fail("Conditional payment update matched no order", {
              session,
              paymentIntentId,
              currentOrder: newOrder,
            });

          default:
            return fail("Unexpected order status during payment processing", {
              session,
              paymentIntentId,
              currentOrder: newOrder,
            });
        }
      }

      case "checkout.session.async_payment_failed":
        const session = event.data.object;
        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;

        const context = { session, paymentIntentId };

        if (
          typeof paymentIntentId !== "string" ||
          paymentIntentId.trim().length === 0
        ) {
          return fail("Missing or invalid payment intent ID");
        }

        const orderId = Number(session.client_reference_id);

        if (!Number.isSafeInteger(orderId) || orderId <= 0) {
          return fail("Invalid order id", context);
        }

        const order = await prisma.order.findUnique({
          where: { id: orderId },
        });
        if (!order) {
          return fail("Order not found", {
            ...context,
            currentOrder: order,
          });
        }

        switch (order.status) {
          case "PENDING":
          case "CANCELLED":
            logger.warn("Delayed checkout payment failed", {
              eventId: event.id,
              orderId: order.id,
              orderStatus: order.status,
              sessionId: session.id,
              paymentIntentId,
            });

            return res.json({ received: true });

          case "PAID":
          case "SHIPPED":
          case "DELIVERED":
            fail("Tried to pay an already paid order");
            return res.json({ received: true });
        }

        if (order.status === "CANCELLED") {
          fail("Tried to pay a cancelled order");
          return res.json({ received: true });
        }

        break;

      case "checkout.session.expired":
        break;

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (err) {
    logger.error("Webhook processing failed", {
      errorMessage: err.message,
      eventId: event?.id,
      eventType: event?.type,
    });
    return next(new CustomError("Webhook processing failed", 500));
  }
};
