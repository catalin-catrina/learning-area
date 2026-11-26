import { useState } from "react";
import { Checkbox, Input, Skeleton, TastingNoteChip, Toggle } from "../../../../shared/ui";
import type {
  BooleanFilterKey,
  FacetKey,
  FacetOption,
  FiltersResponse,
  ProductsFilters,
} from "../../product.types";
import type { ParamUpdates } from "../productFilters.url";
import { STYLE_LABELS, noteLabel, volumeLabel } from "../../productLabels";

type FilterPanelProps = {
  filters: ProductsFilters;
  options: FiltersResponse | undefined;
  onSet: (updates: ParamUpdates) => void;
  onToggle: (key: FacetKey, value: string) => void;
};

// Checkbox groups, in the order the shop reads best.
const LIST_FACETS: { key: Exclude<FacetKey, "tastingNotes">; label: string; format: (v: string | number) => string }[] = [
  { key: "style", label: "Style", format: (v) => STYLE_LABELS[v as keyof typeof STYLE_LABELS] ?? String(v) },
  { key: "brand", label: "Brand", format: String },
  { key: "region", label: "Region", format: String },
  { key: "country", label: "Country", format: String },
  { key: "age", label: "Age", format: (v) => `${v} years` },
  { key: "volume", label: "Volume", format: (v) => volumeLabel(Number(v)) },
];

const TOGGLES: { key: BooleanFilterKey; label: string }[] = [
  { key: "inStock", label: "In stock" },
  { key: "onSale", label: "On sale" },
  { key: "giftBox", label: "Gift box" },
  { key: "peated", label: "Peated" },
];

const COLLAPSED = 6; // long lists show this many until "Show all"
const NOTES_SHOWN = 12;

// A selected value can drop to 0 results when another filter changes, and the
// API omits it. Keep it in the list (count 0) so it can still be unticked.
function withSelected(options: FacetOption[], selected: (string | number)[] | undefined): FacetOption[] {
  const missing = (selected ?? [])
    .filter((s) => !options.some((o) => String(o.value) === String(s)))
    .map((value) => ({ value, count: 0 }));
  return [...options, ...missing];
}

const isSelected = (selected: (string | number)[] | undefined, value: string | number) =>
  (selected ?? []).some((s) => String(s) === String(value));

// Design 1a sidebar / 1d mobile sheet. Every change applies immediately (the
// URL is the source of truth), so there's no "Apply" button.
function FilterPanel({ filters, options, onSet, onToggle }: FilterPanelProps) {
  if (!options) return <FilterPanelSkeleton />;

  return (
    <div className="flex flex-col gap-6">
      {LIST_FACETS.map(({ key, label, format }) => {
        const list = withSelected(options.facets[key] ?? [], filters[key]);
        if (list.length < 2 && !filters[key]?.length) return null; // nothing to choose between
        return (
          <FacetGroup
            key={key}
            label={label}
            options={list}
            selected={filters[key]}
            format={format}
            onToggle={(v) => onToggle(key, v)}
          />
        );
      })}

      <Group label="Availability" gap="gap-1">
        {TOGGLES.map(({ key, label }) => (
          <Toggle
            key={key}
            checked={filters[key] === true}
            onCheckedChange={(on) => onSet({ [key]: on ? "true" : undefined })}
          >
            {label}
          </Toggle>
        ))}
      </Group>

      <PriceGroup filters={filters} range={options.priceRange} onSet={onSet} />

      <TastingNotes
        options={withSelected(options.facets.tastingNotes ?? [], filters.tastingNotes)}
        selected={filters.tastingNotes}
        onToggle={(v) => onToggle("tastingNotes", v)}
      />
    </div>
  );
}

function Group({
  label,
  gap = "gap-2",
  last = false,
  children,
}: {
  label: string;
  gap?: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset className={`flex flex-col ${gap} ${last ? "" : "border-b border-border pb-6"}`}>
      <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.12em] text-fg">{label}</legend>
      {children}
    </fieldset>
  );
}

function FacetGroup({
  label,
  options,
  selected,
  format,
  onToggle,
}: {
  label: string;
  options: FacetOption[];
  selected: (string | number)[] | undefined;
  format: (v: string | number) => string;
  onToggle: (value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const long = options.length > COLLAPSED + 1;
  // Selected values always stay visible, even when the list is collapsed
  const shown =
    long && !expanded
      ? options.filter((o, i) => i < COLLAPSED || isSelected(selected, o.value))
      : options;

  return (
    <Group label={label}>
      {shown.map(({ value, count }) => {
        const checked = isSelected(selected, value);
        return (
          <Checkbox
            key={String(value)}
            label={format(value)}
            count={count}
            checked={checked}
            disabled={!checked && count === 0}
            onChange={() => onToggle(String(value))}
          />
        );
      })}
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="self-start text-sm font-semibold underline underline-offset-3"
        >
          {expanded ? "Show fewer" : `Show all ${options.length}`}
        </button>
      )}
    </Group>
  );
}

function PriceGroup({
  filters,
  range,
  onSet,
}: {
  filters: ProductsFilters;
  range: { min: number; max: number };
  onSet: (updates: ParamUpdates) => void;
}) {
  // Applied when you leave a field or press Enter, not on every keystroke
  const apply = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const clean = (v: FormDataEntryValue | null) => String(v ?? "").replace(/[^\d.]/g, "") || undefined;
    const minPrice = clean(data.get("minPrice"));
    const maxPrice = clean(data.get("maxPrice"));
    // nothing changed: don't touch the URL (it would reset the page to 1)
    if (minPrice === filters.minPrice?.toString() && maxPrice === filters.maxPrice?.toString()) return;
    onSet({ minPrice, maxPrice });
  };

  return (
    <Group label="Price">
      <form
        // remount when the URL changes (e.g. "Clear all"), so the fields reset
        key={`${filters.minPrice}-${filters.maxPrice}`}
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          apply(e.currentTarget);
        }}
        // only when focus leaves BOTH fields (tabbing min → max shouldn't apply yet)
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) apply(e.currentTarget);
        }}
      >
        <Input
          name="minPrice"
          prefix="€"
          inputMode="numeric"
          aria-label="Minimum price in euro"
          placeholder={String(range.min)}
          defaultValue={filters.minPrice}
          className="flex-1"
        />
        <span aria-hidden="true" className="text-muted">
          –
        </span>
        <Input
          name="maxPrice"
          prefix="€"
          inputMode="numeric"
          aria-label="Maximum price in euro"
          placeholder={String(range.max)}
          defaultValue={filters.maxPrice}
          className="flex-1"
        />
        {/* Enter submits the form */}
        <button type="submit" hidden />
      </form>
    </Group>
  );
}

function TastingNotes({
  options,
  selected,
  onToggle,
}: {
  options: FacetOption[];
  selected: string[] | undefined;
  onToggle: (value: string) => void;
}) {
  if (!options.length) return null;
  // The most common notes, plus anything already picked
  const shown = options.filter((o, i) => i < NOTES_SHOWN || isSelected(selected, o.value));
  return (
    <Group label="Tasting notes" last>
      <div className="flex flex-wrap gap-2">
        {shown.map(({ value, count }) => {
          const on = isSelected(selected, value);
          return (
            <TastingNoteChip
              key={String(value)}
              selected={on}
              disabled={!on && count === 0}
              onClick={() => onToggle(String(value))}
            >
              {noteLabel(String(value))}
            </TastingNoteChip>
          );
        })}
      </div>
    </Group>
  );
}

function FilterPanelSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      {[0, 1, 2].map((g) => (
        <div key={g} className="flex flex-col gap-3 border-b border-border pb-6">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default FilterPanel;
