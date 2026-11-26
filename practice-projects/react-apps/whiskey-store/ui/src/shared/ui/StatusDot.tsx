import { cn } from "cn";

type Tone = "success" | "accent" | "muted";

// A colored dot + text, e.g. an order status ("Delivered", "Processing").
// The text always shows: color alone never carries the meaning.
const tones: Record<Tone, string> = {
  success: "text-success",
  accent: "text-fg before:bg-accent",
  muted: "text-muted",
};

function StatusDot({ tone, children, className }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold",
        "before:size-2 before:shrink-0 before:rounded-full before:bg-current before:content-['']",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default StatusDot;
