import type { OrderStatus } from "./order.types";

// How orders are shown to the shopper (decided in the design map).

export const orderNumber = (id: number) => `DR-${id}`;

export const ORDER_STATUS: Record<OrderStatus, { label: string; tone: "success" | "accent" | "muted" }> = {
  PENDING: { label: "Awaiting payment", tone: "muted" },
  PAID: { label: "Processing", tone: "accent" },
  SHIPPED: { label: "Shipped", tone: "accent" },
  DELIVERED: { label: "Delivered", tone: "success" },
  CANCELLED: { label: "Cancelled", tone: "muted" },
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
/** "23 Nov 2026" */
export const formatDate = (iso: string) => dateFmt.format(new Date(iso));

function addWorkingDays(from: Date, days: number): Date {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) added++;
  }
  return d;
}

const dayFmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });
/** "Wed 25 Nov – Fri 27 Nov": order date + 2 to 4 working days (static rule for now) */
export function estimatedDelivery(iso: string): string {
  const start = new Date(iso);
  return `${dayFmt.format(addWorkingDays(start, 2))} – ${dayFmt.format(addWorkingDays(start, 4))}`;
}

export const itemCount = (items: { quantity: number }[]) => items.reduce((sum, i) => sum + i.quantity, 0);
