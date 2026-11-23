import { cn } from "cn";
import { AlertIcon } from "./icons";
import { fieldLabel } from "./styles";

// The frame around a form control: label on top, the control, error below.
// Input and Select use it, so labels and errors look the same everywhere.
// Wiring for screen readers: the label points at the control (htmlFor), and
// the control points at the error (aria-describedby, set by the caller).

type FieldProps = {
  id: string;
  label?: string;
  error?: string;
  errorId: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Field({ id, label, error, errorId, disabled, className, children }: FieldProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className={cn(fieldLabel, disabled && "text-muted")}>
          {label}
        </label>
      )}
      {children}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="flex items-center gap-2 text-sm text-danger">
      <AlertIcon className="size-4 shrink-0" />
      {children}
    </p>
  );
}

export default Field;
