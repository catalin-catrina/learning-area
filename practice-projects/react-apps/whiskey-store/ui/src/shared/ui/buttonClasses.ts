import { cn } from "cn";
import { focusRing, touchTarget } from "./styles";

// The button's class recipe, in its own file so both <Button> and links that
// look like buttons (<Link className={buttonClasses()}>) can use it.

export type Variant = "primary" | "secondary" | "ghost";
export type Size = "sm" | "md";

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
};

// Default colors + hover. `not-disabled:` stops hover on disabled and loading
// buttons, and (unlike `enabled:`) still matches a <Link> styled as a button.
const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg border-accent not-disabled:hover:bg-accent-hover not-disabled:hover:border-accent-hover",
  secondary: "bg-surface text-fg border-input not-disabled:hover:bg-surface-2",
  ghost:
    "bg-transparent text-fg border-transparent not-disabled:hover:bg-surface-2 not-disabled:hover:border-surface-2",
};

// Only applied when NOT loading. A loading button is also `disabled` (to block
// double submits), but the spec says it keeps its default colors.
export const disabledStyles: Record<Variant, string> = {
  primary:
    "disabled:bg-surface-2 disabled:text-muted disabled:border-surface-2 disabled:cursor-not-allowed",
  secondary:
    "disabled:bg-surface-2 disabled:text-muted disabled:border-border disabled:cursor-not-allowed",
  ghost:
    "disabled:bg-transparent disabled:text-muted disabled:border-transparent disabled:cursor-not-allowed",
};

/**
 * The button look, for elements that aren't <button>: a react-router <Link>
 * that should look like a button ("Checkout", "View cart").
 * <Link to="/cart" className={buttonClasses({ variant: "secondary" })}>
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition-colors",
    "[&_svg]:size-4 [&_svg]:shrink-0", // any icon inside = 16px
    "data-[state=loading]:cursor-progress",
    focusRing,
    touchTarget,
    sizes[size],
    variants[variant],
    className, // last, so the caller can override (cn resolves conflicts)
  );
}

