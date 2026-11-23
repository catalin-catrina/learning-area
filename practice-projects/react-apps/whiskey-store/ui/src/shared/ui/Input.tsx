import { useId } from "react";
import { cn } from "cn";
import Field from "./Field";
import Spinner from "./Spinner";
import { fieldBorder, fieldBox } from "./styles";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  /** Error message. Turns the border red and is read out by screen readers. */
  error?: string;
  /** Checking the value (e.g. "is this email taken?"). Field stays editable. */
  loading?: boolean;
  /** Classes for the outer wrapper (layout: width, margins). */
  className?: string;
  /** Classes for the <input> itself, if you really need to override it. */
  inputClassName?: string;
};

function Input({
  label,
  error,
  loading = false,
  id,
  disabled,
  className,
  inputClassName,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <Field
      id={inputId}
      label={label}
      error={error}
      errorId={errorId}
      disabled={disabled}
      className={className}
    >
      <div className="relative">
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-busy={loading || undefined}
          className={cn(
            fieldBox,
            "px-3",
            error ? fieldBorder.error : fieldBorder.normal,
            loading && "pr-9", // room for the spinner: 12 edge + 16 icon + 8 gap
            inputClassName,
          )}
          {...rest}
        />
        {loading && (
          <Spinner className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
        )}
      </div>
    </Field>
  );
}

export default Input;
