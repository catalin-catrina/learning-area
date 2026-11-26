import { Fragment } from "react";
import { cn } from "cn";
import { CheckIcon } from "../../../shared/ui";

const STEPS = ["Cart", "Shipping", "Payment"];

// Design 5a: Cart → Shipping → Payment. On mobile only the current step's
// name shows, the others are just their circles.
function CheckoutStepper({ current }: { current: 1 | 2 | 3 }) {
  return (
    <nav aria-label="Checkout progress" className="pb-2 pt-6">
      <ol className="flex items-center gap-3 text-sm">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const isCurrent = n === current;
          return (
            <Fragment key={label}>
              {i > 0 && <li aria-hidden="true" className="h-px w-6 bg-border" />}
              <li
                aria-current={isCurrent ? "step" : undefined}
                className={cn("flex items-center gap-2", isCurrent ? "font-semibold text-fg" : done ? "text-fg" : "text-muted")}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full border text-xs font-bold",
                    isCurrent && "border-accent bg-accent text-accent-fg",
                    done && "border-surface-2 bg-surface-2",
                    !isCurrent && !done && "border-input",
                  )}
                >
                  {done ? <CheckIcon className="size-3" /> : n}
                </span>
                <span className={cn(!isCurrent && "sr-only lg:not-sr-only")}>
                  {label}
                  {done && <span className="sr-only"> (done)</span>}
                </span>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default CheckoutStepper;
