import { useId, useState } from "react";
import { cn } from "cn";
import Field from "./Field";
import Spinner from "./Spinner";
import { EyeIcon, EyeOffIcon } from "./icons";
import { fieldBorder, fieldBox, focusRing } from "./styles";

type InputProps = React.ComponentProps<"input"> & {
  label?: React.ReactNode;
  /** Help text under the field ("At least 8 characters"). Replaced by the error when there is one. */
  hint?: React.ReactNode;
  /** Error message. Turns the border red and is read out by screen readers. */
  error?: string;
  /** Checking the value (e.g. "is this email taken?"). Field stays editable. */
  loading?: boolean;
  /** Short text inside the field on the left, e.g. "€". */
  prefix?: string;
  /** Classes for the outer wrapper (layout: width, margins). */
  className?: string;
  /** Classes for the <input> itself, if you really need to override it. */
  inputClassName?: string;
};

// type="password" fields get a show/hide button automatically.
function Input({
  label,
  hint,
  error,
  loading = false,
  prefix,
  id,
  type,
  disabled,
  className,
  inputClassName,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";

  const describedBy = error ? errorId : hint ? hintId : undefined;
  // red border: an error message, or the caller marking the field invalid
  // without one (login: "That email and password don't match" is shown above)
  const invalid = !!error || rest["aria-invalid"] === true;

  return (
    <Field
      id={inputId}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
      errorId={errorId}
      disabled={disabled}
      className={className}
    >
      <div className="relative">
        {prefix && (
          <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          type={isPassword && revealed ? "text" : type}
          disabled={disabled}
          aria-describedby={describedBy}
          aria-busy={loading || undefined}
          className={cn(
            fieldBox,
            "px-3",
            invalid ? fieldBorder.error : fieldBorder.normal,
            prefix && "pl-7", // 12 edge + the € sign
            (loading || isPassword) && "pr-11",
            inputClassName,
          )}
          {...rest}
          aria-invalid={invalid || undefined}
        />
        {loading && (
          <Spinner className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
        )}
        {isPassword && !loading && (
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            disabled={disabled}
            className={cn(
              "absolute right-0 top-0 flex size-10 items-center justify-center rounded-md text-fg transition-colors enabled:hover:bg-surface-2 pointer-coarse:size-11",
              focusRing,
            )}
          >
            {revealed ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        )}
      </div>
    </Field>
  );
}

export default Input;
