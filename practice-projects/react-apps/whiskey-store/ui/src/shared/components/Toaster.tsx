import { useToastStore } from "../stores/toastStore";
import { AlertIcon, Button, CheckCircleIcon, CloseIcon } from "../ui";
import ProductThumb from "./ProductThumb";

// Renders the toast stack, top right (full width on mobile). Mounted once in
// MainLayout. The container is always in the DOM with aria-live, so screen
// readers announce each toast as it is added (a live region that appears
// together with its content is often not announced).
function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      role="region"
      className="pointer-events-none fixed inset-x-4 top-4 z-50 flex flex-col items-end gap-2 lg:inset-x-auto lg:right-6 lg:top-20"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex w-full items-center gap-3 rounded-lg border border-border bg-surface p-3 shadow-lg transition duration-200 starting:translate-y-[-8px] starting:opacity-0 motion-reduce:transition-none lg:w-90"
        >
          {t.imageUrl !== undefined ? (
            <ProductThumb src={t.imageUrl} size="sm" className="size-12 p-1" />
          ) : t.tone === "error" ? (
            <AlertIcon className="size-6 shrink-0 text-danger" />
          ) : (
            <CheckCircleIcon className="size-6 shrink-0 text-success" />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="flex items-center gap-1 text-sm font-semibold">
              {t.imageUrl !== undefined && <CheckCircleIcon className="size-4 shrink-0 text-success" />}
              {t.title}
            </p>
            {t.description && <p className="truncate text-xs text-muted">{t.description}</p>}
          </div>
          {t.action && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                t.action!.onClick();
                dismiss(t.id);
              }}
            >
              {t.action.label}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="w-8 px-0"
            aria-label="Dismiss notification"
            onClick={() => dismiss(t.id)}
          >
            <CloseIcon />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Toaster;
