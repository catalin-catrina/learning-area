import { useId, useState } from "react";
import { cn } from "cn";
import Spinner from "./Spinner";
import { StarIcon } from "./icons";

const STARS = [1, 2, 3, 4, 5];
const link = "text-fg underline underline-offset-3";

// ---------------------------------------------------------------------------
// Display: read-only stars (cards, product page)
// ---------------------------------------------------------------------------

type RatingProps = {
  rating: number; // 0–5, e.g. 4.3
  reviewCount: number;
  /** Where the review count links to, e.g. "#reviews". Plain text if omitted. */
  reviewsHref?: string;
  /** "Write one" link when there are no reviews yet. */
  writeHref?: string;
  /** Cards: "4.5 (2)" instead of "4.5 · 2 reviews". */
  compact?: boolean;
  className?: string;
};

export function Rating({ rating, reviewCount, reviewsHref, writeHref, compact = false, className }: RatingProps) {
  if (reviewCount === 0) {
    return (
      <p className={cn("text-sm text-muted", className)}>
        No reviews yet
        {writeHref && (
          <>
            {" · "}
            <a href={writeHref} className={link}>
              Write one
            </a>
          </>
        )}
      </p>
    );
  }

  const filled = Math.round(rating);
  const countText = `${reviewCount} ${reviewCount === 1 ? "review" : "reviews"}`;

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <span
        role="img"
        aria-label={`Rated ${rating.toFixed(1)} out of 5 from ${countText}`}
        className="flex gap-1"
      >
        {STARS.map((n) => (
          <StarIcon
            key={n}
            filled={n <= filled}
            className={cn("size-4", n <= filled ? "text-accent" : "text-input")}
          />
        ))}
      </span>
      <span className="font-semibold text-fg" aria-hidden="true">
        {rating.toFixed(1)}
      </span>
      {compact ? (
        <span className="text-muted" aria-hidden="true">
          ({reviewCount})
        </span>
      ) : (
        <>
          <span className="text-muted" aria-hidden="true">
            ·
          </span>
          {reviewsHref ? (
        <a href={reviewsHref} className={link}>
          {countText}
        </a>
          ) : (
            <span className="text-fg">{countText}</span>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Input: the user picks 1–5 (review form)
// ---------------------------------------------------------------------------

type RatingInputProps = {
  value: number | null;
  onChange: (value: number) => void;
  /** Read by screen readers as the group's name. */
  label?: string;
  disabled?: boolean;
  /** Text shown when disabled. */
  disabledNote?: string;
  loading?: boolean;
  className?: string;
};

// Five real radio buttons, visually hidden, so arrow keys work for free.
// Hover preview needs JS state (which star the mouse is on).
export function RatingInput({
  value,
  onChange,
  label = "Your rating",
  disabled = false,
  disabledNote = "Sign in to rate",
  loading = false,
  className,
}: RatingInputProps) {
  const name = useId();
  const [hovered, setHovered] = useState<number | null>(null);
  const interactive = !disabled && !loading;
  const preview = interactive && hovered !== null ? hovered : (value ?? 0);

  const note = disabled
    ? disabledNote
    : interactive && hovered !== null
      ? `${hovered} of 5`
      : value
        ? `${value} of 5 selected`
        : "Tap to rate";

  return (
    <fieldset
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn("flex items-center gap-3", className)}
    >
      <legend className="sr-only">{label}</legend>

      <div className="flex" onMouseLeave={() => setHovered(null)}>
        {STARS.map((n) => {
          const on = !disabled && n <= preview;
          const color = disabled
            ? "text-border"
            : on
              ? interactive && hovered !== null
                ? "text-accent-hover"
                : "text-accent"
              : "text-input";

          return (
            <label
              key={n}
              onMouseEnter={() => interactive && setHovered(n)}
              className={cn(
                "flex size-8 items-center justify-center rounded-md pointer-coarse:size-11",
                "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
                interactive ? "cursor-pointer" : loading ? "cursor-progress" : "cursor-not-allowed",
              )}
            >
              <input
                type="radio"
                name={name}
                value={n}
                checked={value === n}
                onChange={() => onChange(n)}
                className="sr-only"
              />
              <span className="sr-only">
                {n} {n === 1 ? "star" : "stars"}
              </span>
              <StarIcon filled={on} className={cn("size-5 transition-colors", color)} />
            </label>
          );
        })}
      </div>

      <span className="flex items-center gap-2 text-sm text-muted">
        {loading ? (
          <>
            <Spinner />
            Saving…
          </>
        ) : (
          note
        )}
      </span>
    </fieldset>
  );
}

export default Rating;
