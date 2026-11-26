import { cn } from "cn";
import { AlertIcon } from "./icons";
import { fieldLabel } from "./styles";

// The frame around a form control: label on top, the control, then a hint or
// an error below. Input and Select use it, so labels, hints and errors look the
// same everywhere.
// Wiring for screen readers: the label points at the control (htmlFor), and
// the control points at the hint/error (aria-describedby, set by the caller).

type FieldProps = {
  id: string;
  /** Text, or text + an extra part, e.g. <>Phone <Optional /></> */
  label?: React.ReactNode;
  hint?: React.ReactNode;
  hintId: string;
  error?: string;
  errorId: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Field({ id, label, hint, hintId, error, errorId, disabled, className, children }: FieldProps) {
  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className={cn(fieldLabel, disabled && "text-muted")}>
          {label}
        </label>
      )}
      {children}
      {error ? (
        <FieldError id={errorId}>{error}</FieldError>
      ) : (
        hint && (
          <p id={hintId} className="text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/** The muted "· optional" / "· for the courier" part after a label. */
export function LabelNote({ children }: { children: React.ReactNode }) {
  return <span className="font-normal text-muted"> · {children}</span>;
}

export function FieldError({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <p id={id} className="flex items-center gap-2 text-sm text-danger">
      <AlertIcon className="size-4 shrink-0" />
      {children}
    </p>
  );
}

export default Field;
