import { cn } from "cn";

// A grey block that pulses while content loads. Size it with the same classes
// as the real content (h-7 for a text-xl line, h-70 for the card image…) so
// nothing jumps when the data arrives. Decorative: the region that is loading
// carries aria-busy and a hidden "Loading…" label.
function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block rounded-sm bg-surface-2 animate-pulse motion-reduce:animate-none", className)}
    />
  );
}

export default Skeleton;
