import { useId } from "react";
import { cn } from "cn";
import Field from "./Field";
import Spinner from "./Spinner";
import { ChevronDownIcon } from "./icons";
import { fieldBorder, fieldBox } from "./styles";

type SelectProps = React.ComponentProps<"select"> & {
  label?: string;
  error?: string;
  /** Options are loading: shows "Loading…", blocks the select, keeps normal colors. */
  loading?: boolean;
  /** Classes for the outer wrapper. */
  className?: string;
};

// A native <select> with the browser's arrow removed and our chevron drawn on
// top. Pass <option>s as children. The opened list is drawn by the OS.
function Select({
  label,
  error,
  loading = false,
  id,
  disabled,
  className,
  children,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const errorId = `${selectId}-error`;

  return (
    <Field
      id={selectId}
      label={label}
      error={error}
      errorId={errorId}
      disabled={disabled}
      className={className}
    >
      <div className="group relative">
        <select
          id={selectId}
          disabled={disabled || loading}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-busy={loading || undefined}
          className={cn(
            fieldBox,
            "cursor-pointer appearance-none pl-3 pr-9",
            error ? fieldBorder.error : fieldBorder.normal,
            // loading is disabled too, but keeps the default colors
            loading && "disabled:cursor-progress disabled:border-input disabled:bg-surface disabled:text-fg",
          )}
          {...rest}
        >
          {loading ? <option>Loading…</option> : children}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-fg">
          {loading ? <Spinner /> : <ChevronDownIcon className="size-4" />}
        </span>
      </div>
    </Field>
  );
}

export default Select;
