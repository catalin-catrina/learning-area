import { cn } from "cn";
import Spinner from "./Spinner";
import { focusRing, touchTarget } from "./styles";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  /** Shows a spinner, blocks clicks, keeps the normal colors. */
  loading?: boolean;
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
};

// Default colors + hover. `enabled:` stops hover on disabled and loading buttons.
const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg border-accent enabled:hover:bg-accent-hover enabled:hover:border-accent-hover",
  secondary: "bg-surface text-fg border-input enabled:hover:bg-surface-2",
  ghost:
    "bg-transparent text-fg border-transparent enabled:hover:bg-surface-2 enabled:hover:border-surface-2",
};

// Only applied when NOT loading. A loading button is also `disabled` (to block
// double submits), but the spec says it keeps its default colors.
const disabledStyles: Record<Variant, string> = {
  primary:
    "disabled:bg-surface-2 disabled:text-muted disabled:border-surface-2 disabled:cursor-not-allowed",
  secondary:
    "disabled:bg-surface-2 disabled:text-muted disabled:border-border disabled:cursor-not-allowed",
  ghost:
    "disabled:bg-transparent disabled:text-muted disabled:border-transparent disabled:cursor-not-allowed",
};

function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-state={loading ? "loading" : undefined}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition-colors",
        "[&_svg]:size-4 [&_svg]:shrink-0", // any icon inside = 16px
        "data-[state=loading]:cursor-progress",
        focusRing,
        touchTarget,
        sizes[size],
        variants[variant],
        !loading && disabledStyles[variant],
        className, // last, so the caller can override (cn resolves conflicts)
      )}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export default Button;
