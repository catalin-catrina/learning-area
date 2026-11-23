import { cn } from "cn";
import Spinner from "./Spinner";
import { MinusIcon, PlusIcon } from "./icons";
import { focusRingInset } from "./styles";

type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  /**
   * Lowest value the minus button can reach. Default 1 (minus disabled at 1).
   * Pass 0 if minus at 1 should mean "remove from cart": you get onChange(0)
   * and decide what to do with it.
   */
  min?: number;
  /** Highest value, e.g. the stock left. Plus is disabled when reached. */
  max?: number;
  /** Out of stock. */
  disabled?: boolean;
  /** Updating the cart: spinner replaces the number, both buttons blocked. */
  loading?: boolean;
  label?: string;
  className?: string;
};

const stepButton = cn(
  "flex w-10 items-center justify-center rounded-[5px] transition-colors pointer-coarse:w-11", // 5px = radius-md minus the 1px border (NEW)
  "enabled:hover:bg-surface-2 disabled:cursor-not-allowed disabled:text-muted [&_svg]:size-4",
  focusRingInset, // inside the button, so it doesn't collide with the group's border
);

function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  loading = false,
  label = "Quantity",
  className,
}: QuantityStepperProps) {
  const blocked = disabled || loading;

  return (
    <div
      role="group"
      aria-label={label}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex h-10 items-stretch rounded-md border pointer-coarse:h-11",
        disabled ? "border-border bg-surface-2 text-muted" : "border-input bg-surface text-fg",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={blocked || value <= min}
        onClick={() => onChange(value - 1)}
        className={cn(stepButton, loading && "disabled:cursor-progress")}
      >
        <MinusIcon />
      </button>

      <span
        aria-live="polite"
        className="flex w-10 items-center justify-center text-base font-bold tabular-nums pointer-coarse:w-11"
      >
        {loading ? <Spinner /> : value}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={blocked || (max !== undefined && value >= max)}
        onClick={() => onChange(value + 1)}
        className={cn(stepButton, loading && "disabled:cursor-progress")}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export default QuantityStepper;
