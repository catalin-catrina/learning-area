import { cn } from "cn";

type SpinnerProps = {
  /** Tailwind size class. Default 16px (size-4), per the spec. */
  className?: string;
};

// A faint full circle (30% opacity) with a spinning quarter arc on top.
// Draws in currentColor, so it matches the text it sits next to.
// Decorative: the component using it sets aria-busy and changes its label.
function Spinner({ className }: SpinnerProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
      focusable="false"
      className={cn("size-4 shrink-0 animate-spinner", className)}
    >
      <circle cx="12" cy="12" r="9" className="opacity-30" />
      <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
    </svg>
  );
}

export default Spinner;
