import { cn } from "cn";
import { buttonClasses, disabledStyles, type Size, type Variant } from "./buttonClasses";
import Spinner from "./Spinner";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  /** Shows a spinner, blocks clicks, keeps the normal colors. */
  loading?: boolean;
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
      className={buttonClasses({
        variant,
        size,
        className: cn(!loading && disabledStyles[variant], className),
      })}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export default Button;
