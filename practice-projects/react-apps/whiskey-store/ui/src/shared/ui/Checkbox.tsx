import { useId } from "react";
import { cn } from "cn";
import { FieldError } from "./Field";
import { CheckIcon } from "./icons";
import { peerFocusRing } from "./styles";

type CheckboxProps = Omit<React.ComponentProps<"input">, "type"> & {
  label: React.ReactNode;
  /** Number shown on the far right in muted, e.g. how many products match a filter. */
  count?: number;
  error?: string;
  /** Classes for the outer wrapper. */
  className?: string;
};

// The real <input type="checkbox"> is visually hidden (sr-only) but still
// focusable and announced. The box you see is decoration. The whole row is a
// <label>, so clicking the text toggles it too.
// `peer` = the hidden input; `peer-checked:` styles the box when it's checked.
// `group` = the row; `group-hover:` styles the box when the row is hovered.
function Checkbox({ label, count, error, disabled, id, className, ...rest }: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={inputId}
        className={cn(
          "group relative -mx-2 flex min-h-7 items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors pointer-coarse:min-h-11",
          disabled ? "cursor-not-allowed text-muted" : "cursor-pointer text-fg hover:bg-surface-2",
        )}
      >
        <input
          id={inputId}
          type="checkbox"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="peer sr-only"
          {...rest}
        />
        <span
          aria-hidden="true"
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-sm border-2 text-transparent transition-colors",
            peerFocusRing,
            disabled
              ? "border-border bg-surface-2 peer-checked:text-muted"
              : cn(
                  "bg-surface",
                  error ? "border-danger" : "border-input group-hover:border-muted",
                  "peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-fg",
                  "peer-checked:group-hover:border-accent-hover peer-checked:group-hover:bg-accent-hover",
                ),
          )}
        >
          <CheckIcon className="size-3" />
        </span>
        <span className="min-w-0 flex-1">{label}</span>
        {count !== undefined && <span className="tabular-nums text-muted">{count}</span>}
      </label>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

export default Checkbox;
