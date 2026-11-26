import { cn } from "cn";
import ProductThumb from "./ProductThumb";
import { formatPrice } from "../utils/formatPrice";

// Pieces of the "Order summary" panel (cart, checkout, confirmation).

export function SummaryRow({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 text-sm tabular-nums">
      <span>{label}</span>
      <span className="shrink-0">{value}</span>
    </div>
  );
}

export function SummaryTotal({ totalCents }: { totalCents: number }) {
  return (
    <div className="flex items-baseline justify-between text-lg font-bold tabular-nums">
      <span>Total</span>
      <span>{formatPrice(totalCents)}</span>
    </div>
  );
}

export const Free = () => <span className="font-semibold text-success">Free</span>;

export type SummaryLine = {
  key: string | number;
  name: string;
  imageUrl: string | null | undefined;
  unitCents: number;
  quantity: number;
};

/** Thumbnail + name + "€99.00 each" + line total, one row per product. */
export function SummaryLines({ lines }: { lines: SummaryLine[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {lines.map((l) => (
        <li key={l.key} className="flex items-center gap-4">
          <ProductThumb src={l.imageUrl} size="sm" quantity={l.quantity} />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-semibold">{l.name}</span>
            <span className="text-xs text-muted tabular-nums">{formatPrice(l.unitCents)} each</span>
          </div>
          <span className="text-sm font-bold tabular-nums">{formatPrice(l.unitCents * l.quantity)}</span>
        </li>
      ))}
    </ul>
  );
}

/** The bordered panel around a summary. */
export function SummaryPanel({
  title = "Order summary",
  titleId,
  className,
  children,
}: {
  title?: string;
  titleId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-4 self-start rounded-lg border border-border bg-surface p-4 lg:p-6", className)}
    >
      <h2 id={titleId} className="text-2xl">
        {title}
      </h2>
      {children}
    </aside>
  );
}
