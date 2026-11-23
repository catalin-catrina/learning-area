import { cn } from "cn";
import Badge from "./Badge";
import { formatPrice } from "../utils/formatPrice";

type PriceProps = {
  priceCents: number;
  /** The old price. Set and higher than priceCents = on sale. */
  compareAtPriceCents?: number | null;
  /** card = product grid, page = product detail. */
  size?: "card" | "page";
  outOfStock?: boolean;
  /** Shows a placeholder bar instead of the price. */
  loading?: boolean;
  className?: string;
};

// Text, not a control. Same-width digits so prices line up in a grid.
// Screen readers don't announce strikethrough, so "Now" / "Was" are added
// as hidden text.
function Price({
  priceCents,
  compareAtPriceCents,
  size = "card",
  outOfStock = false,
  loading = false,
  className,
}: PriceProps) {
  const isCard = size === "card";

  if (loading) {
    return (
      <span className={cn("block rounded-sm bg-surface-2", isCard ? "h-7 w-16" : "h-9 w-30", className)}>
        <span className="sr-only">Loading price</span>
      </span>
    );
  }

  const onSale =
    !outOfStock && compareAtPriceCents != null && compareAtPriceCents > priceCents;
  const percentOff = onSale ? Math.round((1 - priceCents / compareAtPriceCents) * 100) : 0;

  return (
    <p className={cn("flex items-baseline tabular-nums", isCard ? "gap-2" : "gap-3", className)}>
      <span
        className={cn(
          "font-bold",
          isCard ? "text-lg" : "text-3xl",
          outOfStock ? "text-muted" : onSale ? "text-sale" : "text-fg",
        )}
      >
        {onSale && <span className="sr-only">Now </span>}
        {formatPrice(priceCents)}
      </span>

      {onSale && (
        <s className={cn("text-muted", isCard ? "text-sm" : "text-lg")}>
          <span className="sr-only">Was </span>
          {formatPrice(compareAtPriceCents)}
        </s>
      )}

      {/* Cards already show the % on the image, so only the product page gets it here */}
      {onSale && !isCard && (
        <Badge variant="sale" className="self-center">
          -{percentOff}%
        </Badge>
      )}
    </p>
  );
}

export default Price;
