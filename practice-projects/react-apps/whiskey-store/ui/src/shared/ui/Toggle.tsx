import { cn } from "cn";
import Spinner from "./Spinner";
import { focusRing } from "./styles";

type ToggleProps = Omit<React.ComponentProps<"button">, "onChange" | "children"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Saving the change: spinner in the knob, blocked until it finishes. */
  loading?: boolean;
  /** Number shown after the label in muted, e.g. how many products match. */
  count?: number;
  /** The label text. It's also what screen readers announce. */
  children: React.ReactNode;
};

// One <button role="switch">: label + track, so the whole row is clickable
// and the label is the accessible name. Controlled: the parent owns `checked`.
// The row fills its container (track pushed to the right), with a -8px margin
// on both sides so the hover/focus shape extends past the text column.
function Toggle({
  checked,
  onCheckedChange,
  loading = false,
  count,
  disabled,
  className,
  children,
  ...rest
}: ToggleProps) {
  const interactive = !disabled && !loading;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "group relative -mx-2 flex min-h-7 w-[calc(100%+16px)] items-center gap-3 rounded-md px-2 py-1 text-left text-sm pointer-coarse:min-h-11",
        focusRing,
        disabled ? "cursor-not-allowed text-muted" : "text-fg",
        loading && "cursor-progress",
        interactive && "cursor-pointer",
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {count !== undefined && <span className="tabular-nums text-muted">{count}</span>}

      {/* Track */}
      <span
        aria-hidden="true"
        className={cn(
          "relative ml-auto h-5 w-9 shrink-0 rounded-full transition-colors",
          disabled
            ? "bg-surface-2 inset-ring inset-ring-border" // 1px inner line, doesn't change size
            : checked
              ? cn("bg-accent", interactive && "group-hover:bg-accent-hover")
              : cn("bg-input", interactive && "group-hover:bg-muted"),
        )}
      >
        {/* Knob: slides 16px with a transform; no slide if the user prefers reduced motion */}
        <span
          className={cn(
            "absolute left-0.5 top-0.5 flex size-4 items-center justify-center rounded-full transition-transform motion-reduce:transition-none",
            checked && "translate-x-4",
            disabled ? "bg-border" : checked ? "bg-accent-fg" : "bg-surface",
          )}
        >
          {loading && <Spinner className="size-3 text-accent" />}
        </span>
      </span>
    </button>
  );
}

export default Toggle;
