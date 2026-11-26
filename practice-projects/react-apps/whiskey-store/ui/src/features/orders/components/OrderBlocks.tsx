import { Free, SummaryLines, SummaryRow, SummaryTotal } from "../../../shared/components/OrderSummary";
import { formatPrice } from "../../../shared/utils/formatPrice";
import type { Order } from "../order.types";
import { estimatedDelivery } from "../orderLabels";

// Building blocks shared by the order confirmation (7a) and order details pages.

const eyebrow = "font-sans text-2xs font-semibold uppercase tracking-[0.12em] text-muted";

/** "Delivering to · Estimated delivery · Total paid", 3 columns on desktop. */
export function OrderFacts({ order }: { order: Order }) {
  const a = order.shippingAddress;
  const showEta = order.status === "PAID" || order.status === "SHIPPED" || order.status === "PENDING";
  return (
    <div className="grid gap-6 rounded-lg border border-border bg-surface p-4 sm:grid-cols-3 lg:p-6">
      <div className="flex flex-col gap-1">
        <h2 className={eyebrow}>Delivering to</h2>
        <p className="text-sm">
          {a.name}
          <br />
          {a.line1}
          {a.line2 && `, ${a.line2}`}
          <br />
          {a.postalCode} {a.city}, {a.country}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className={eyebrow}>{showEta ? "Estimated delivery" : "Delivery"}</h2>
        {showEta ? (
          <p className="text-sm font-semibold">{estimatedDelivery(order.createdAt)}</p>
        ) : (
          <p className="text-sm font-semibold">Standard</p>
        )}
        <p className="text-sm text-muted">Standard · ID check at the door</p>
      </div>
      <div className="flex flex-col gap-1">
        {/* "Paid with Visa •••• 4242" is post-release (card details aren't stored yet) */}
        <h2 className={eyebrow}>{order.status === "PENDING" ? "To pay" : "Total paid"}</h2>
        <p className="text-sm font-bold tabular-nums">{formatPrice(order.totalCents)}</p>
      </div>
    </div>
  );
}

/** The "Items" panel: lines + subtotal, delivery, total. */
export function OrderItems({ order, children }: { order: Order; children?: React.ReactNode }) {
  return (
    <section aria-labelledby={`order-${order.id}-items`} className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4 lg:p-6">
      <h2 id={`order-${order.id}-items`} className="text-2xl">
        Items
      </h2>
      <SummaryLines
        lines={order.items.map((i) => ({
          key: i.id,
          name: i.productName,
          imageUrl: i.product?.imageUrl,
          unitCents: i.unitPriceCents,
          quantity: i.quantity,
        }))}
      />
      <hr className="border-border" />
      <SummaryRow label="Subtotal" value={formatPrice(order.totalCents)} />
      <SummaryRow label="Delivery · Standard, 2–4 working days" value={<Free />} />
      <hr className="border-border" />
      <SummaryTotal totalCents={order.totalCents} />
      <p className="text-xs text-muted">Includes VAT.</p>
      {children}
    </section>
  );
}
