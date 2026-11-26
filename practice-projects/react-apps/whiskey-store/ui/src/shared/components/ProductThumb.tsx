import { useState } from "react";
import { cn } from "cn";
import { BottleIcon } from "../ui";

type ProductThumbProps = {
  src: string | null | undefined;
  size?: "md" | "sm"; // md 96px (cart lines, 72 on mobile) · sm 64px (summaries)
  /** Small dark bubble with the quantity, top right. */
  quantity?: number;
  className?: string;
};

// A product image in a small bordered square. Falls back to a bottle icon
// when the product has no image (or the file is missing).
function ProductThumb({ src, size = "md", quantity, className }: ProductThumbProps) {
  const [broken, setBroken] = useState(false);
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-md border border-border bg-surface p-2",
        size === "md" ? "size-18 lg:size-24" : "size-16",
        className,
      )}
    >
      {src && !broken ? (
        <img src={src} alt="" className="max-h-full max-w-full object-contain" onError={() => setBroken(true)} />
      ) : (
        <BottleIcon className="size-1/2 text-muted" />
      )}
      {quantity !== undefined && (
        <span className="absolute -right-2 -top-2 h-5 min-w-5 rounded-full bg-fg px-1 text-center text-2xs font-bold leading-5 text-bg">
          <span className="sr-only">Quantity </span>
          {quantity}
        </span>
      )}
    </div>
  );
}

export default ProductThumb;
