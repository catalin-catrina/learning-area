import { cn } from "cn";

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode; // the explanation line
  actions?: React.ReactNode; // buttons / links
  /** Draw it inside a bordered panel (pages) or bare (drawer). */
  panel?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
};

// "Your cart is empty", "No whisky matches these filters"… A round icon, a
// title, one line of explanation and the next step as buttons.
function EmptyState({ icon, title, children, actions, panel = false, headingLevel = "h2", className }: EmptyStateProps) {
  const Heading = headingLevel;
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 px-2 py-12 text-center lg:px-6 lg:py-20",
        panel && "rounded-lg border border-border bg-surface",
        className,
      )}
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-surface-2 text-muted [&_svg]:size-7">
        {icon}
      </span>
      <Heading className="text-2xl">{title}</Heading>
      {children && <p className="max-w-[420px] text-muted">{children}</p>}
      {actions && <div className="flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
}

export default EmptyState;
