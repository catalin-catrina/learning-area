import { cn } from "cn";
import { GiftIcon } from "./icons";

type BadgeVariant = "sale" | "gift" | "neutral" | "outOfStock" | "inStock";

type BadgeProps = {
  variant: BadgeVariant;
  /** Text. Defaults: "Gift box", "Out of stock", "In stock". Sale needs it ("-17%"). */
  children?: React.ReactNode;
  className?: string;
};

const pill = "inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-sm px-2 text-xs";

const variants: Record<BadgeVariant, string> = {
  sale: cn(pill, "bg-sale font-bold text-sale-fg"),
  gift: cn(pill, "border border-border bg-surface font-semibold text-fg"),
  // Same look as gift, no icon: "Default" on an address card
  neutral: cn(pill, "border border-border bg-surface font-semibold text-fg"),
  outOfStock: cn(pill, "bg-surface-2 font-semibold text-muted"),
  // Not a pill: a dot + text. The text always shows; color never carries the meaning alone.
  inStock: "inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-success",
};

const defaultText: Partial<Record<BadgeVariant, string>> = {
  gift: "Gift box",
  outOfStock: "Out of stock",
  inStock: "In stock",
};

// Static labels: no hover, focus or disabled states.
function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span className={cn(variants[variant], className)}>
      {variant === "gift" && <GiftIcon className="size-3 shrink-0" />}
      {variant === "inStock" && <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-current" />}
      {children ?? defaultText[variant]}
    </span>
  );
}

export default Badge;
