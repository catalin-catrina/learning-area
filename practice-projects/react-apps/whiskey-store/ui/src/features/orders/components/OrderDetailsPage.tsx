import { Link, useParams } from "react-router-dom";
import Container from "../../../shared/layout/Container";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import EmptyState from "../../../shared/components/EmptyState";
import { Alert, Button, buttonClasses, LockIcon, PackageIcon, Skeleton, StatusDot } from "../../../shared/ui";
import { useCancelOrder, useGetOrder } from "../hooks/useOrders";
import { ORDER_STATUS, formatDate, orderNumber } from "../orderLabels";
import { OrderFacts, OrderItems } from "./OrderBlocks";

// No design for this page: it reuses the confirmation page's blocks (7a).
function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const id = Number(orderId);
  const { data: order, isPending, isError } = useGetOrder(id);
  const cancel = useCancelOrder(id);

  if (isPending) {
    return (
      <Container className="pb-20">
        <div className="mx-auto flex max-w-190 flex-col gap-6 pt-12" aria-busy="true">
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Container>
    );
  }
  if (isError || !order) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<PackageIcon />}
          title="We couldn't find this order"
          panel
          actions={
            <Link to="/profile/orders" className={buttonClasses()}>
              Your orders
            </Link>
          }
        />
      </Container>
    );
  }

  const status = ORDER_STATUS[order.status];
  const pending = order.status === "PENDING";

  return (
    <Container className="pb-20">
      <Breadcrumbs
        items={[
          { label: "My account", to: "/profile" },
          { label: "Orders", to: "/profile/orders" },
          { label: orderNumber(order.id) },
        ]}
      />
      <div className="mx-auto flex max-w-190 flex-col gap-8 pt-6">
        <div className="flex flex-col gap-2">
          <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted">
            Placed {formatDate(order.createdAt)}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-[30px] leading-9 lg:text-4xl">Order {orderNumber(order.id)}</h1>
            <StatusDot tone={status.tone}>{status.label}</StatusDot>
          </div>
        </div>

        {pending && (
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center lg:p-6">
            <p className="flex-1 text-sm">This order hasn't been paid yet. Your items are reserved until you pay or cancel.</p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" loading={cancel.isPending} onClick={() => cancel.mutate()}>
                Cancel order
              </Button>
              <Link to={`/checkout/${order.id}`} className={buttonClasses({ size: "sm" })}>
                <LockIcon />
                Pay now
              </Link>
            </div>
          </div>
        )}
        {cancel.isError && <Alert title="We couldn't cancel this order">Please try again in a moment.</Alert>}

        <OrderFacts order={order} />
        <OrderItems order={order} />
      </div>
    </Container>
  );
}

export default OrderDetailsPage;
