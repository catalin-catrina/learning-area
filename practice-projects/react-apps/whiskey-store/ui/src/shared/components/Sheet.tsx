import { useEffect, useId, useRef } from "react";
import { cn } from "cn";
import { Button, CloseIcon } from "../ui";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  /** Small muted text next to the title ("3 items"). */
  subtitle?: React.ReactNode;
  /** right = cart drawer (440px, full width on mobile) · bottom = mobile filters · left = mobile menu */
  side?: "right" | "bottom" | "left";
  /** Sticky footer (buttons). */
  footer?: React.ReactNode;
  closeLabel?: string;
  children: React.ReactNode;
};

// A panel that slides over the page, built on the native <dialog> element.
// showModal() gives us for free: focus moves into the panel and stays there
// (focus trap), Esc closes it, the rest of the page is inert, and ::backdrop
// draws the dimmed layer behind it.
// The component is controlled: the parent owns `open`; we sync the DOM to it.
function Sheet({
  open,
  onClose,
  title,
  subtitle,
  side = "right",
  footer,
  closeLabel = "Close",
  children,
}: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      // Esc fires "cancel": stop the browser closing it on its own, let the parent decide
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // A click on the dialog element itself (not its content) = a click on the backdrop
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "m-0 max-h-none max-w-none bg-transparent p-0 text-fg backdrop:bg-[rgb(20_17_15/0.5)]",
        side === "right" && "ml-auto h-dvh w-full sm:max-w-[440px]",
        side === "left" && "mr-auto h-dvh w-full max-w-[360px]",
        side === "bottom" && "mt-auto h-[calc(100dvh-56px)] w-full",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col bg-bg shadow-lg",
          side === "bottom" && "rounded-t-lg",
        )}
      >
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border pl-4 pr-2 lg:h-18 lg:pl-6 lg:pr-4">
          <h2 id={titleId} className="text-2xl">
            {title}
          </h2>
          {subtitle && <span className="text-sm text-muted">{subtitle}</span>}
          <Button variant="ghost" className="ml-auto w-10 px-0" aria-label={closeLabel} onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 lg:px-6">{children}</div>
        {footer && (
          <div className="flex shrink-0 flex-col gap-3 border-t border-border bg-bg p-4 lg:px-6 lg:pb-6 lg:pt-5">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}

export default Sheet;
