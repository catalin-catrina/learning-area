// Small inline SVG icons with the stroke widths from the spec (all on a
// 24×24 viewBox). They draw in `currentColor`, so they take the text color of
// whatever they sit in, and they size from `className` (e.g. "size-4").
// They replace @mui/icons-material inside the design system.

type IconProps = React.ComponentProps<"svg">;

function Svg({ children, strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg strokeWidth={3.5} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2.5} {...props}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </Svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5h.01" />
    </Svg>
  );
}

export function GiftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="8" width="17" height="4" rx="1" />
      <path d="M5 12v8h14v-8M12 8v12M12 8S10.5 4 8 4.5 7 8 12 8zM12 8s1.5-4 4-3.5S17 8 12 8z" />
    </Svg>
  );
}

export function StarIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <Svg strokeWidth={1.6} fill={filled ? "currentColor" : "none"} {...props}>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.15 1 5.85L12 16.9l-5.25 2.8 1-5.85L3.5 9.7l5.9-.9z" />
    </Svg>
  );
}

export function HeartIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <Svg fill={filled ? "currentColor" : "none"} {...props}>
      <path d="M12 20s-7.5-4.6-7.5-10A4.25 4.25 0 0 1 12 7.2 4.25 4.25 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
    </Svg>
  );
}
