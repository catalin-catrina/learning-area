import { cn } from "cn";

// Page width + side padding: 16px on mobile, 80px on desktop (design `.wrap`),
// centered and capped at the 1440px the designs are drawn at.
function Container({ className, children, ...rest }: React.ComponentProps<"div">) {
  return (
    <div {...rest} className={cn("mx-auto w-full max-w-[1440px] px-4 lg:px-20", className)}>
      {children}
    </div>
  );
}

export default Container;
