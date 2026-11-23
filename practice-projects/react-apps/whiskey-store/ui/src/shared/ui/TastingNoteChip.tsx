import { cn } from "cn";
import { CheckIcon } from "./icons";
import { focusRing, touchTarget } from "./styles";

type TastingNoteChipProps = React.ComponentProps<"button"> & {
  selected: boolean;
};

// A filter you switch on and off. aria-pressed tells screen readers it's a
// toggle button and whether it's on.
function TastingNoteChip({ selected, className, children, ...rest }: TastingNoteChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "relative inline-flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-3 text-sm transition-colors",
        "disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-2 disabled:text-muted",
        focusRing,
        touchTarget,
        selected
          ? "border-accent bg-accent text-accent-fg enabled:hover:border-accent-hover enabled:hover:bg-accent-hover"
          : "border-border bg-surface text-fg enabled:hover:border-input enabled:hover:bg-surface-2",
        className,
      )}
      {...rest}
    >
      {selected && <CheckIcon className="size-3 shrink-0" />}
      {children}
    </button>
  );
}

export default TastingNoteChip;
