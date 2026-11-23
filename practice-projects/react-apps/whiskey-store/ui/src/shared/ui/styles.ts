// Class strings shared by several primitives, so each rule from the spec's
// "Shared rules" section is written exactly once.
// They're full strings on purpose: Tailwind only generates classes it can
// read as complete text in your source files.

/** Focus ring: 2px outline, 2px gap, `ring` color, keyboard focus only. */
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** Same ring, but drawn inside the element (QuantityStepper buttons). */
export const focusRingInset =
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring";

/** Same ring, on the visible box when the real input is visually hidden (Checkbox). */
export const peerFocusRing =
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring";

/**
 * Touch hit area: on touch screens an invisible ::after layer, centered on the
 * control, grows the clickable area to at least 44×44px without changing how
 * it looks. The element using it needs `relative`.
 */
export const touchTarget =
  "pointer-coarse:after:absolute pointer-coarse:after:left-1/2 pointer-coarse:after:top-1/2 pointer-coarse:after:h-11 pointer-coarse:after:w-full pointer-coarse:after:min-w-11 pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2";

/** Field label (Input, Select). */
export const fieldLabel = "text-sm font-semibold text-fg";

/**
 * Text field box shared by Input, Search and Select. Border colors are added
 * per component, because error / focus / hover combine differently.
 */
export const fieldBox =
  "h-10 w-full rounded-md border bg-surface text-base text-fg transition-colors placeholder:text-muted pointer-coarse:h-11 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring " +
  "disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-2 disabled:text-muted";

/** Border colors for a field: normal vs error. */
export const fieldBorder = {
  normal: "border-input enabled:hover:border-muted focus-visible:border-accent",
  error: "border-danger",
};
