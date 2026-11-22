# Dramshop components: developer spec (light theme)

Values are for the light theme (Distillery paper). The dark theme (Cask copper, 2b) only swaps the token values in `.dark`. Every size, rule and state mapping below stays the same in both themes.

**How to read this**

- `40px (10)` means 40px, or 10 × your 4px spacing unit (`--spacing: 0.25rem`).
- Only borders, insets and icon strokes are allowed to land on fractions (0.25, 0.5). Every box a layout depends on is a whole multiple.
- All heights are border-box, so the border counts inside the height.
- **NEW** marks a value that isn't one of your tokens. The note next to it says what it is.
- `transparent` is the plain CSS keyword. It's used where a border has to keep its width but be invisible, so buttons in different variants stay the same size. It isn't marked NEW.
- Each component has two tables: one for dimensions and one for states. They have different columns, so they don't fit in one table.

---

## Shared rules

### Focus ring

| Property | Value |
|---|---|
| Trigger | `:focus-visible`. Browsers always treat text fields as focus-visible, so inputs also show it when clicked. |
| Drawn as | `outline`, not `box-shadow` |
| Width | 2px (0.5) |
| Offset | 2px (0.5), outside the element. The gap between element and ring is see-through. |
| Color | `ring` (4.54:1 on `bg`; non-text elements need 3:1) |
| Shape | Follows the element's border-radius (current Chrome, Safari and Firefox all do this) |
| Exception | Buttons inside a bordered group (the QuantityStepper) use offset −2px (−0.5), so the ring sits inside the button and doesn't collide with the group's border |
| Fields | Input, Search and Select also switch their border to `accent` while focused |

Why outline: Windows High Contrast mode (forced colors) deletes `box-shadow`, so a shadow ring disappears for exactly the people who need it. An outline survives. The Components sheet draws the ring as a box-shadow, so this is a change (see the last section).

### Hover

| Applies to | Rule |
|---|---|
| Anything filled with `accent` (primary button, checked checkbox, on toggle, selected chip, rating preview) | Background (and border) become **`accent-hover`**: **NEW** token = `color-mix(in oklab, var(--accent) 84%, var(--fg))`. That's 84% accent mixed toward `fg`. It computes to #1f4432 in light and #d69b68 in dark. |
| Neutral controls (secondary and ghost buttons, chips, stepper buttons, checkbox and toggle rows) | Background becomes `surface-2` |
| Unfilled control edges (field border, unchecked checkbox, off toggle track) | `input` becomes `muted` |
| Everything else | No change. Hover never adds a shadow or moves anything on these components. |
| Devices | Tailwind v4's `hover:` variant already only applies on devices that can hover (`@media (hover: hover)`), so touch screens don't get stuck hover states |

Why mix toward `fg`: it darkens the accent in light mode and lightens it in dark mode. Either way the contrast against `accent-fg` goes up (light 9.88 → 10.70:1, dark 6.76 → 7.83:1), so hover can never fail AA.

### Disabled

| Property | Value |
|---|---|
| Markup | Native `disabled` attribute on buttons and inputs, never just a class. Links that look disabled become a `<span aria-disabled="true">`. |
| Background | `surface-2` |
| Text and icons | `muted` (4.79:1 on `surface-2`; WCAG doesn't require this for disabled controls, but it stays readable) |
| Border | `border` on bordered components, `transparent` on borderless ones |
| Cursor | `not-allowed` |
| Hover | None |
| Opacity | Never used. Lowering opacity makes text contrast unpredictable on top of photos. |
| Checked or on | Shown by shape only (the check mark, the knob position), not by accent color |

### Loading

| Property | Value |
|---|---|
| Colors | Same as Default. Loading is not Disabled. |
| How to style it | Use a `data-state="loading"` attribute, not `:disabled`. Loading buttons carry `disabled` to block double submits, and styling off `:disabled` would wrongly give them disabled colors. |
| ARIA | `aria-busy="true"` on the component |
| Cursor | `progress` |
| Spinner | 16px (4) unless the component says otherwise. Stroke 2.5 on a 24 viewBox, about 1.67px when drawn at 16px (**NEW**: icon stroke). The faint full circle behind it is at 30% opacity (**NEW**). It turns once every 800ms, linear, forever (**NEW**: duration). |
| Label | Switches to an "-ing…" verb ("Adding…"). The button may get wider or narrower. Where that would push its neighbours around, give the button a fixed width. |

### Motion

| Property | Value |
|---|---|
| Color changes | Background, border, text, fill, stroke and outline color fade over 150ms with `cubic-bezier(0.4, 0, 0.2, 1)`. These are Tailwind's built-in defaults, which is what `transition-colors` gives you. **NEW**: you have no motion tokens yet. |
| Toggle knob | Moves (transform) over the same 150ms with the same easing |
| Focus ring | Appears instantly. CSS can't animate whether an outline is shown or not. |
| `prefers-reduced-motion` | Turn off movement transitions (the knob slide). Keep the color fades. Keep the spinner, because it's the only sign that something is loading. |

### Touch target

| Input type | Minimum hit area |
|---|---|
| Touch (`pointer: coarse`) | 44×44px (11). That's WCAG 2.5.5 (AAA) and Apple's guideline. |
| Mouse (`pointer: fine`) | 24×24px (6). That's WCAG 2.2 AA 2.5.8. |

The visible control can be smaller than its hit area. Grow the hit area with an invisible `::after` centered on the control. Where neighbouring hit areas would overlap (stepper buttons, rating stars) or the element can't take a pseudo-element (text fields), the control itself grows on touch screens. Each component says which it does. Tailwind v4 has `pointer-coarse:` and `pointer-fine:` variants for this.

### Shadows

None of these 11 components uses a shadow in any state. Focus is drawn as an outline. The only exception is the disabled toggle track, which uses an inset 1px `border` line drawn as a shadow (see Toggle). `shadow-sm` / `shadow-md` / `shadow-lg` are for cards and overlays, which aren't covered here.

### Error color

Errors use `sale` (#a3362a, 5.42:1 on `surface`). I'd still add a **NEW** `danger` token with the same value today. Otherwise, if marketing ever changes the promo color, every form error changes with it. Error messages: text-sm 14px (3.5) / 20px (5), color `sale`, 8px (2) below the field, with a 16px (4) icon. Mark the field with `aria-invalid="true"` and point `aria-describedby` at the message.

---

## Button

| Property | sm | md |
|---|---|---|
| Height | 32px (8) | 40px (10) |
| Width | auto (content + padding). Full width when stretched, e.g. quick add on a card. | auto. Same rule. |
| Padding x | 12px (3) | 16px (4) |
| Padding y | 0. Height is fixed, content centered with flex. | 0 |
| Gap (icon ↔ label) | 8px (2) | 8px (2) |
| Font size | text-sm 14px (3.5) | text-base 16px (4) |
| Font weight | 600 | 600 |
| Line height | 20px (5) | 24px (6) |
| Border width | 1px (0.25) on every variant, `transparent` where it shouldn't show, so all variants are the same size | 1px (0.25) |
| Border radius | md 6px (1.5) | md 6px (1.5) |
| Icon size | 16px (4) | 16px (4) |
| Hit area | Touch: `::after` grows it to 44px (11) | Touch: `::after` grows it to 44px (11) |

| Variant · State | Background | Text / icon | Border |
|---|---|---|---|
| Primary · default | accent | accent-fg (9.88:1) | accent |
| Primary · hover | accent-hover **NEW** | accent-fg (10.70:1) | accent-hover **NEW** |
| Primary · focus | accent | accent-fg | accent, plus focus ring |
| Primary · disabled | surface-2 | muted | surface-2 |
| Primary · loading | accent | accent-fg, spinner accent-fg | accent |
| Secondary · default | surface | fg | input |
| Secondary · hover | surface-2 | fg | input |
| Secondary · focus | surface | fg | input, plus focus ring |
| Secondary · disabled | surface-2 | muted | border |
| Secondary · loading | surface | fg, spinner fg | input |
| Ghost · default | transparent | fg | transparent |
| Ghost · hover | surface-2 | fg | surface-2 |
| Ghost · focus | transparent | fg | transparent, plus focus ring |
| Ghost · disabled | transparent | muted | transparent |
| Ghost · loading | transparent | fg, spinner fg | transparent |

---

## Input

One size.

| Property | md |
|---|---|
| Height | 40px (10). Touch: 44px (11), because a text field can't take an `::after`. |
| Width | 100% of its container |
| Padding x | 12px (3). Right side becomes 36px (9) while a trailing spinner shows (12 edge + 16 icon + 8 gap). |
| Padding y | 0 |
| Gap | Label → field 8px (2). Field → error message 8px (2). |
| Font size | text-base 16px (4). 16px is the smallest size that stops iPhone Safari zooming in when the field is tapped. |
| Font weight | 400. Label: 600. |
| Line height | 24px (6). Label: 20px (5). |
| Label | text-sm 14px (3.5) / 20px (5), 600, color fg |
| Placeholder | color muted (4.79:1) |
| Border width | 1px (0.25) |
| Border radius | md 6px (1.5) |
| Icon size | 16px (4), placed 12px (3) from the edge |

| State | Background | Text | Border | Label |
|---|---|---|---|---|
| Default | surface | fg (placeholder muted) | input (3.57:1 on surface) | fg |
| Hover | surface | fg | muted | fg |
| Focus | surface | fg | accent, plus focus ring | fg |
| Disabled | surface-2 | muted | border | muted |
| Loading (checking the value) | surface | fg. The field stays editable; trailing spinner in muted. | input | fg |
| Error | surface | fg; message below in sale (danger **NEW**) | sale (danger **NEW**) | fg |
| Error + focus | surface | fg | sale, plus focus ring | fg |

---

## Search

Same sizes as Input, except for the rows below.

| Property | md |
|---|---|
| Height | 40px (10). Touch: 44px (11). |
| Width | 100% of its container |
| Padding x | Left 36px (9) (12 edge + 16 icon + 8 gap). Right 12px (3). |
| Padding y | 0 |
| Gap (icon ↔ text) | 8px (2), built into the left padding |
| Font size | text-base 16px (4) |
| Font weight | 400 |
| Line height | 24px (6) |
| Border width | 1px (0.25) |
| Border radius | md 6px (1.5) |
| Icon size | 16px (4) magnifier, 12px (3) from the left edge |
| Label | No visible label. Use a visually hidden `<label>` ("Search the shop") inside a form with `role="search"`, and `type="search"` on the field. |
| Placeholder | "Whisky, brands, regions" in muted |

| State | Background | Text | Border | Leading icon |
|---|---|---|---|---|
| Default | surface | fg (placeholder muted) | input | muted magnifier |
| Hover | surface | fg | muted | muted magnifier |
| Focus | surface | fg | accent, plus focus ring | fg magnifier |
| Disabled | surface-2 | muted | border | muted magnifier |
| Loading (fetching results) | surface | fg. The field stays editable. | input | Spinner replaces the magnifier, muted |

No error state: an empty search isn't an error.

---

## Select

A native `<select>` with the browser's own arrow turned off (`appearance: none`). The opened option list is drawn by the operating system and isn't covered here.

| Property | md |
|---|---|
| Height | 40px (10). Touch: 44px (11). |
| Width | 100% of its container |
| Padding x | Left 12px (3). Right 36px (9) to leave room for the chevron. |
| Padding y | 0 |
| Gap | Label → field 8px (2) |
| Font size | text-base 16px (4) |
| Font weight | 400. Label: 600. |
| Line height | 24px (6). Label: 20px (5). |
| Border width | 1px (0.25) |
| Border radius | md 6px (1.5) |
| Icon size | 16px (4) chevron, 12px (3) from the right edge, ignores clicks (`pointer-events: none`) |

| State | Background | Text | Border | Chevron |
|---|---|---|---|---|
| Default | surface | fg | input | muted |
| Hover | surface | fg | muted | muted |
| Focus | surface | fg | accent, plus focus ring | fg |
| Disabled | surface-2 | muted | border | muted |
| Loading (options loading) | surface | fg; shows "Loading…" | input | Spinner replaces the chevron, muted. The select is disabled while loading but keeps default colors. |
| Error | surface | fg; message below in sale | sale (danger **NEW**) | muted |

---

## Checkbox

The real `<input type="checkbox">` is visually hidden (still focusable and announced). The visible box is decoration, marked `aria-hidden`. The whole row is a `<label>`, so clicking the text toggles it too.

| Property | Value |
|---|---|
| Box | 20×20px (5) |
| Row height | 28px (7) |
| Row width | 100% of its container |
| Row padding x | 8px (2), with a −8px (−2) margin on both sides so the hover fill extends past the edge while the text still lines up |
| Row padding y | 4px (1) |
| Gap | Box → label 8px (2). The count is pushed to the far right. |
| Font size | text-sm 14px (3.5). Count: same, in muted. |
| Font weight | 400 |
| Line height | 20px (5) |
| Box border width | 2px (0.5) |
| Box radius | sm 4px (1). Row radius: md 6px (1.5). |
| Check icon | 12px (3), stroke 3.5 on a 24 viewBox, about 1.75px drawn (**NEW**: icon stroke) |
| Hit area | The whole row. Touch: row min-height 44px (11). |

| State | Box background | Check mark | Box border | Label text | Row background |
|---|---|---|---|---|---|
| Unchecked · default | surface | none | input | fg | transparent |
| Unchecked · hover | surface | none | muted | fg | surface-2 |
| Unchecked · focus | surface | none | input; focus ring on the box | fg | transparent |
| Unchecked · disabled | surface-2 | none | border | muted | transparent |
| Unchecked · error | surface | none | sale (danger **NEW**) | fg; message below in sale | transparent |
| Checked · default | accent | accent-fg | accent | fg | transparent |
| Checked · hover | accent-hover **NEW** | accent-fg | accent-hover **NEW** | fg | surface-2 |
| Checked · focus | accent | accent-fg | accent; focus ring on the box | fg | transparent |
| Checked · disabled | surface-2 | muted | border | muted | transparent |
| Loading | n/a. A checkbox applies instantly. A slow filter result shows loading on the filter group, not the box. | | | | |

---

## Toggle

The whole row (label + track) is one `<button role="switch" aria-checked="true|false">`, so the label text is its accessible name.

| Property | Value |
|---|---|
| Track | 36×20px (9×5) |
| Knob | 16×16px (4), a circle |
| Knob inset | 2px (0.5) from the track edge |
| Knob travel | 16px (4), moved with a transform. Left edge at 2px when off, 18px when on. |
| Row height | 28px (7) |
| Row width | auto |
| Row padding x | 8px (2), with a −8px (−2) margin on both sides |
| Row padding y | 4px (1) |
| Gap | Label → track 12px (3) |
| Font size | text-sm 14px (3.5) |
| Font weight | 400 |
| Line height | 20px (5) |
| Border width | 0. The disabled track draws a 1px (0.25) line as an inset shadow, so it doesn't change size. |
| Border radius | Track and knob full. Row md 6px (1.5), which shapes the focus ring. |
| Icon size | Loading spinner 12px (3), inside the knob |
| Hit area | Touch: row min-height 44px (11) |

| State | Track | Knob | Label | Track edge |
|---|---|---|---|---|
| Off · default | input (3.22:1 on bg) | surface | fg | none |
| Off · hover | muted | surface | fg | none |
| Off · focus | input | surface | fg; focus ring around the whole row | none |
| Off · disabled | surface-2 | border | muted | inset 1px border |
| Off · loading | input | surface, with an accent spinner | fg | none |
| On · default | accent | accent-fg | fg | none |
| On · hover | accent-hover **NEW** | accent-fg | fg | none |
| On · focus | accent | accent-fg | fg; focus ring around the whole row | none |
| On · disabled | surface-2 | border, on the right | muted | inset 1px border |
| On · loading | accent | accent-fg, with an accent spinner | fg | none |

While loading, the toggle has `aria-busy="true"` and is disabled until the save finishes.

---

## Badge

Badges are static labels. They have no hover, focus, disabled or loading states, so the second table lists variants instead.

| Property | Sale % · Gift box · Out of stock | Stock status |
|---|---|---|
| Height | 24px (6) | 20px (5), the line height |
| Width | auto, never wraps | auto, never wraps |
| Padding x | 8px (2) | 0 |
| Padding y | 4px (1) | 0 |
| Gap | 4px (1), icon → text | 8px (2), dot → text |
| Font size | text-xs 12px (3) | text-sm 14px (3.5) |
| Font weight | 700 for sale; 600 for gift and out of stock | 600 |
| Line height | 16px (4) | 20px (5) |
| Border width | 0. Gift box: 1px (0.25), still 24px total height. | 0 |
| Border radius | sm 4px (1) | n/a. The dot is a full circle. |
| Icon size | 12px (3) gift icon | 8px (2) dot |
| Placement on a product image | 12px (3) from the top and left, 8px (2) between badges | n/a |

| Variant | Background | Text | Border | Icon |
|---|---|---|---|---|
| Sale % (e.g. "-17%") | sale | sale-fg (6.73:1) | none | none |
| Gift box | surface | fg | border | fg gift icon |
| Out of stock | surface-2 | muted (4.79:1) | none | none |
| Stock status · in stock | transparent | success (5.12:1) | none | success dot. The text always appears too; the color alone never carries the meaning. |

---

## Price

Prices are text, not controls, so there's no hover, focus or disabled state.

| Property | Card | Product page |
|---|---|---|
| Height | 28px (7) | 36px (9) |
| Width | auto | auto |
| Padding | 0 | 0 |
| Gap (now ↔ was ↔ badge) | 8px (2) | 12px (3) |
| Current price | text-lg 18px (4.5) / 28px (7), weight 700 | text-3xl 30px (7.5) / 36px (9), weight 700 |
| Old ("was") price | text-sm 14px (3.5) / 20px (5), weight 400, struck through | text-lg 18px (4.5) / 28px (7), weight 400, struck through |
| Alignment | Text baselines lined up | Text baselines lined up |
| Sale badge | None. The card's image badge already shows the %. | Badge · Sale, inline after the old price |
| Digits | Same-width digits (`font-variant-numeric: tabular-nums`), so prices line up in a grid | Same |
| Border, radius, icon | none | none |

| State | Current price | Old price | Badge |
|---|---|---|---|
| Regular | fg | none | none |
| On sale | sale (5.42:1 on bg) | muted, struck through | Product page only: sale / sale-fg |
| Out of stock | muted | none | none (the Out of stock badge lives on the image) |
| Loading | A placeholder bar in surface-2, as tall as the line height, 64px (16) wide on cards and 120px (30) on the product page, radius sm | none | none |

Format: `€39.90`, with the € in front and a dot before the cents. Formatting the number with the `en-IE` locale and currency EUR produces exactly this. Add visually hidden "Now" and "Was" before the two prices, because screen readers don't announce strikethrough.

---

## Rating

There are two modes: Display (read-only stars on cards and the product page) and Input (the user picks a rating in a review form).

| Property | Display | Input |
|---|---|---|
| Height | 20px (5), the line height | 32px (8). Touch: 44px (11). |
| Width | 96px (24) of stars (5 × 16 + 4 × 4), then the text | 160px (40) (5 × 32). Touch: 220px (55). |
| Star icon | 16px (4) | 20px (5), centered in a 32×32px (8) button. Touch: 44×44px (11). |
| Gap between stars | 4px (1) | 0. The 32px boxes already leave 12px around each icon. |
| Gap stars → text | 8px (2) | 12px (3) |
| Padding | 0 | 0 |
| Score ("4.0") | text-sm 14px (3.5) / 20px (5), weight 600, fg | n/a |
| Review count / note | text-sm 14px (3.5) / 20px (5). The count is a link in fg, underlined with a 3px offset (**NEW**: underline offset). | text-sm 14px (3.5) / 20px (5), weight 400, muted |
| Star stroke | 1.6 on a 24 viewBox, about 1.07px drawn (**NEW**: icon stroke) | about 1.33px drawn (**NEW**) |
| Border radius | n/a | Star button md 6px (1.5), which shapes the focus ring |
| Spinner | n/a | 16px (4), before "Saving…" |
| Markup | `role="img"` with `aria-label="Rated 4.0 out of 5"` | A group of 5 native radio buttons, visually hidden, so arrow keys work without extra code |

| State | Filled stars | Empty stars | Note |
|---|---|---|---|
| Display · with reviews | accent fill and stroke | No fill, input stroke (3.22:1 on bg) | "4.0 · 1 review" |
| Display · no reviews | none | none (no stars shown) | "No reviews yet · Write one", muted, with the link in fg |
| Input · default (nothing picked) | none | No fill, input stroke | "Tap to rate", muted |
| Input · hover | Stars up to the hovered one: accent-hover fill and stroke **NEW** | No fill, input stroke | "3 of 5", muted |
| Input · focus | The current pick: accent fill and stroke | No fill, input stroke | Focus ring on the focused star |
| Input · selected (checked) | Stars up to the pick: accent fill and stroke | No fill, input stroke | "4 of 5 selected", muted |
| Input · disabled | none | No fill, border stroke | "Sign in to rate", muted |
| Input · loading | The pick stays accent | No fill, input stroke | Spinner + "Saving…", muted. All stars disabled, group has `aria-busy`. |

---

## QuantityStepper

A group (`role="group"`, `aria-label="Quantity"`) with a minus button, the number, and a plus button.

| Property | Value |
|---|---|
| Height | 40px (10). Touch: 44px (11). |
| Width | 122px (30.5) = 3 × 40px + the 1px border on each side. The inside is 120px (30). Touch: 3 × 44px + border. |
| Button size | 40px (10) wide, filling the full inside height of 38px (9.5). Touch: 44px (11) wide. |
| Number column | 40px (10) wide, centered, same-width digits (`tabular-nums`), announced politely to screen readers when it changes (`aria-live="polite"`) |
| Padding | 0 |
| Gap | 0 |
| Font size | Number: text-base 16px (4) |
| Font weight | Number: 700 |
| Line height | 24px (6) |
| Border width | 1px (0.25) on the container |
| Border radius | Container md 6px (1.5). Buttons 5px (**NEW**: radius-md minus the 1px border, so the hover fill tucks neatly inside the container). |
| Icon size | Minus and plus are 16px (4) icons, stroke 2 on a 24 viewBox (**NEW**: icon stroke). The sheet used text characters; those sit at different heights in different fonts. |
| Spinner | 16px (4), replaces the number while loading |
| Focus ring | Drawn inside the button (offset −2px), per the shared exception |

| State | Container background | Container border | Button background | Button icons | Number |
|---|---|---|---|---|---|
| Default | surface | input | transparent | fg | fg |
| Hover (on one button) | surface | input | surface-2 on the hovered button | fg | fg |
| Focus (on one button) | surface | input | transparent, ring inside the focused button | fg | fg |
| At minimum (1) or at stock limit | surface | input | transparent | The blocked button is muted and `disabled`; the other stays fg | fg |
| Disabled (out of stock) | surface-2 | border | transparent | muted | muted |
| Loading (updating the cart) | surface | input | transparent | muted; both buttons disabled | Spinner in fg; group has `aria-busy` |

---

## TastingNoteChip

A `<button aria-pressed="true|false">` that switches a tasting-note filter on and off.

| Property | Value |
|---|---|
| Height | 32px (8). Touch: `::after` grows it to 44px (11). |
| Width | auto |
| Padding x | 12px (3) |
| Padding y | 0. Height is fixed, content centered. |
| Gap | 4px (1), check icon → text |
| Font size | text-sm 14px (3.5) |
| Font weight | 400 |
| Line height | 20px (5) |
| Border width | 1px (0.25) |
| Border radius | full |
| Icon size | 12px (3) check, only when selected. Stroke 3.5 on a 24 viewBox (**NEW**: icon stroke). |

| State | Background | Text / icon | Border |
|---|---|---|---|
| Default | surface | fg | border |
| Hover | surface-2 | fg | input |
| Focus | surface | fg | border, plus focus ring |
| Selected | accent | accent-fg, with check icon | accent |
| Selected · hover | accent-hover **NEW** | accent-fg | accent-hover **NEW** |
| Disabled | surface-2 | muted | border |
| Loading | n/a. The chip toggles instantly; the results area shows the loading. | | |

---

## Everything marked NEW

| Name | Value | What it is |
|---|---|---|
| `accent-hover` | `color-mix(in oklab, var(--accent) 84%, var(--fg))` = #1f4432 light, #d69b68 dark | Hover color for anything filled with accent |
| `danger` (recommended) | Same as `sale` today | Error borders and messages, kept separate from the promo color |
| Transition | 150ms, `cubic-bezier(0.4, 0, 0.2, 1)` | Color fades and the toggle knob slide (Tailwind's defaults) |
| Spinner speed | 800ms per turn, linear | Every spinner |
| Spinner track | 30% opacity | The faint circle behind the spinning arc |
| Icon strokes | 1.6 (stars), 2 (stepper, magnifier), 2.5 (spinner, chevron), 3.5 (check marks), all on a 24 viewBox | Line thickness of icons |
| Inner radius | 5px | Stepper buttons (radius-md minus 1px border) |
| Underline offset | 3px | The review-count link |

---

## Changes from the Components sheet

This spec is meant to be the source of truth. These are the places where it differs from what the sheet draws:

| Component | On the sheet | In this spec | Why |
|---|---|---|---|
| All | Focus ring as a box-shadow | Outline, 2px wide, 2px offset | Survives Windows High Contrast mode |
| All | No touch-target rule | 44px (11) on touch, 24px (6) on mouse | Accessibility |
| Button | Loading styled the same way as disabled | Loading driven by `data-state` | Keeps loading in default colors |
| Input, Select | Label → field gap 6px (1.5) | 8px (2) | 4px grid |
| Input, Search, Select | No error state | Error state added | You asked for it |
| Checkbox | 18px box, 1.5px border, row gap 10px, row padding 6px | 20px box, 2px border, gap 8px, padding 8px | 4px grid; a 1.5px line renders unevenly on standard (non-retina) screens |
| Toggle | Row padding 6px (1.5) top and bottom | 4px (1) | 4px grid |
| Badge | 22px tall (3px top/bottom padding), 6px gap, 13px gift icon, 13px text on the product page | 24px tall, 4px gap, 12px icon, 12px text everywhere | 4px grid; 13px isn't in your type scale |
| Price | Sale badge shown in the card's price row | Badge only on the product page | The card already shows it on the image |
| Rating | Hover preview mixed 60% toward bg; buttons with aria-pressed; 2px star gap; 13px note text | accent-hover; native radio group; 4px gap; text-sm | One hover formula; arrow keys for free; 4px grid; type scale |
| QuantityStepper | 36px number column, "−" and "+" as text characters | 40px column, 16px icons | 4px grid; icons sit evenly in every font |
| TastingNoteChip | 34px tall, 14px side padding, 6px gap | 32px, 12px, 4px | 4px grid |
