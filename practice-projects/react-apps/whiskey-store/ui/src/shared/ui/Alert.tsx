import { cn } from "cn";
import { AlertIcon } from "./icons";

// An error message for a whole form or page ("That email and password don't
// match."). role="alert" makes screen readers announce it as soon as it appears.
function Alert({ title, children, className }: { title: string; children?: React.ReactNode; className?: string }) {
  return (
    <div
      role="alert"
      className={cn("flex items-start gap-3 rounded-md border border-danger bg-surface px-4 py-3 text-sm", className)}
    >
      <AlertIcon className="mt-0.5 size-4 shrink-0 text-danger" />
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{title}</span>
        {children && <span className="text-muted">{children}</span>}
      </div>
    </div>
  );
}

export default Alert;
