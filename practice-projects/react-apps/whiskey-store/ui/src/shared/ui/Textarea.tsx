import { useId } from "react";
import { cn } from "cn";
import Field from "./Field";
import { fieldBorder, fieldBox } from "./styles";

type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  /** Classes for the outer wrapper (layout). */
  className?: string;
};

// Multi-line Input: same Field frame, same border/focus/disabled look.
// `fieldBox` sets a fixed height for one-line fields; `h-auto` undoes it, and
// `rows` decides the starting height. The user can drag it taller only.
function Textarea({ label, hint, error, id, disabled, className, rows = 4, ...rest }: TextareaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

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
      <textarea
        id={inputId}
        rows={rows}
        disabled={disabled}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        aria-invalid={error ? true : undefined}
        {...rest}
        className={cn(
          fieldBox,
          "h-auto resize-y px-3 py-2 leading-6 pointer-coarse:h-auto",
          error ? fieldBorder.error : fieldBorder.normal,
        )}
      />
    </Field>
  );
}

export default Textarea;
