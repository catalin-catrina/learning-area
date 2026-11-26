import { Link } from "react-router-dom";
import EmptyState from "../../../shared/components/EmptyState";
import ProductThumb from "../../../shared/components/ProductThumb";
import { buttonClasses, PackageIcon, Skeleton, StatusDot } from "../../../shared/ui";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { useGetOrders } from "../hooks/useOrders";
import type { Order } from "../order.types";
import { ORDER_STATUS, formatDate, itemCount, orderNumber } from "../orderLabels";

// Designs 8b (list), 8c (loading), 8d (empty).
function OrdersPage() {
  const { data: orders, isPending, isError, refetch } = useGetOrders();

  if (isPending) {
    return (
      <ul className="flex flex-col gap-3" aria-busy="true" aria-label="Loading orders">
        {[0, 1, 2].map((i) => (
          <li key={i}>
            <Skeleton className="h-28 w-full rounded-lg lg:h-25" />
          </li>
        ))}
      </ul>
    );
  }
  if (isError) {
    return (
      <EmptyState
        icon={<PackageIcon />}
        title="We couldn't load your orders"
        panel
        actions={
          <button type="button" className={buttonClasses()} onClick={() => refetch()}>
            Try again
          </button>
        }
      />
    );
  }
  if (orders.length === 0) {
    return (
      <EmptyState
        icon={<PackageIcon />}
        title="No orders yet"
        panel
        actions={
          <Link to="/products?style=single_malt" className={buttonClasses()}>
            Browse single malts
          </Link>
        }
      >
        When you buy something, it shows up here with its status and receipt.
      </EmptyState>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </ul>
  );
}

export function OrderThumbs({ order, max = 2 }: { order: Order; max?: number }) {
  const extra = order.items.length - max;
  return (
    <div className="flex items-center gap-2">
      {order.items.slice(0, max).map((i) => (
        <ProductThumb key={i.id} src={i.product?.imageUrl} size="sm" />
      ))}
      {extra > 0 && <span className="text-sm text-muted">+{extra}</span>}
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const status = ORDER_STATUS[order.status];
  const n = itemCount(order.items);
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 rounded-lg border border-border bg-surface p-4 lg:grid-cols-[144px_minmax(0,1fr)_140px_100px_auto] lg:gap-6 lg:p-6">
      {/* mobile: one thumbnail; desktop: up to two */}
      <div className="lg:hidden">
        <OrderThumbs order={order} max={1} />
      </div>
      <div className="hidden lg:block">
        <OrderThumbs order={order} />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="font-semibold">{orderNumber(order.id)}</span>
        <span className="text-sm text-muted">
          {formatDate(order.createdAt)} · {n} {n === 1 ? "item" : "items"}
        </span>
      </div>
      <StatusDot tone={status.tone} className="self-start lg:self-center">
        {status.label}
      </StatusDot>
      <span className="text-lg font-bold tabular-nums">{formatPrice(order.totalCents)}</span>
      <Link
        to={`/orders/${order.id}`}
        className={buttonClasses({ variant: "secondary", size: "sm", className: "col-span-2 lg:col-span-1" })}
      >
        View<span className="sr-only"> order {orderNumber(order.id)}</span>
      </Link>
    </li>
  );
}

export default OrdersPage;
