import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Container from "../../../shared/layout/Container";
import EmptyState from "../../../shared/components/EmptyState";
import { AlertIcon, buttonClasses, CheckCircleIcon, PackageIcon, Skeleton, Spinner } from "../../../shared/ui";
import { useAuth } from "../../auth/hooks/useAuth";
import { cartKey } from "../../cart/hooks/useCart";
import { useGetOrder } from "../../orders/hooks/useOrders";
import { formatDate, orderNumber } from "../../orders/orderLabels";
import { OrderFacts, OrderItems } from "../../orders/components/OrderBlocks";

// Design 7a. Stripe sends the shopper here after paying. The order turns PAID
// when Stripe's webhook reaches the API, which can take a moment, so we poll
// every 2s while it's still PENDING.
function PaymentReturnPage() {
  const [searchParams] = useSearchParams();
  const orderId = Number(searchParams.get("order_id"));
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: order, isPending, isError } = useGetOrder(orderId, { refetchInterval: 2000 });

  // The order emptied the cart on the server: refresh the header count
  useEffect(() => {
    qc.invalidateQueries({ queryKey: cartKey(user?.id) });
  }, [qc, user?.id]);

  if (isPending) {
    return (
      <Container className="pb-20">
        <div className="mx-auto flex max-w-190 flex-col gap-6 pt-12" aria-busy="true">
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </Container>
    );
  }

  if (isError || !order) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<AlertIcon />}
          title="We couldn't load your order"
          panel
          actions={
            <Link to="/profile/orders" className={buttonClasses()}>
              Your orders
            </Link>
          }
        >
          If you paid, your order is safe. You'll find it under your orders.
        </EmptyState>
      </Container>
    );
  }

  const firstName = user?.name.split(" ")[0];
  const confirmed = order.status !== "PENDING" && order.status !== "CANCELLED";

  return (
    <Container className="pb-20">
      <div className="mx-auto flex max-w-190 flex-col gap-8 pt-8 lg:pt-12">
        <div className="flex flex-col items-start gap-4">
          <span className="flex size-16 items-center justify-center rounded-full bg-surface-2 text-success [&_svg]:size-7">
            {confirmed ? <CheckCircleIcon /> : order.status === "CANCELLED" ? <AlertIcon /> : <Spinner />}
          </span>
          <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted">
            Order {orderNumber(order.id)} · {formatDate(order.createdAt)}
          </p>
          <h1 className="text-4xl text-balance lg:text-5xl" aria-live="polite">
            {confirmed
              ? `Thank you${firstName ? `, ${firstName}` : ""}. Your order is confirmed.`
              : order.status === "CANCELLED"
                ? "This order was cancelled."
                : "Confirming your payment…"}
          </h1>
          <p className="max-w-[60ch] text-lg text-muted">
            {confirmed
              ? `We've emailed a receipt to ${user?.email ?? "your email"}. You'll get a tracking link when it ships, usually within 1–2 working days.`
              : order.status === "CANCELLED"
                ? "Nothing was charged. Your items are no longer reserved."
                : "This usually takes a few seconds. You can stay on this page."}
          </p>
        </div>

        <OrderFacts order={order} />

        <OrderItems order={order}>
          <div className="flex flex-wrap gap-3">
            <Link to={`/orders/${order.id}`} className={buttonClasses({ variant: "secondary" })}>
              <PackageIcon />
              Track order
            </Link>
            <Link to="/products" className={buttonClasses()}>
              Continue shopping
            </Link>
          </div>
        </OrderItems>
      </div>
    </Container>
  );
}

export default PaymentReturnPage;
