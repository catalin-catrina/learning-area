import { Button, CloseIcon, focusRing } from "../../../../shared/ui";
import { cn } from "cn";
import type { BooleanFilterKey, FacetKey, ProductsFilters } from "../../product.types";
import { FACET_KEYS, type ParamUpdates } from "../productFilters.url";
import { STYLE_LABELS, noteLabel, volumeLabel } from "../../productLabels";

type Chip = { id: string; label: string; remove: () => void };

const BOOLEAN_LABELS: Record<BooleanFilterKey, string> = {
  inStock: "In stock",
  onSale: "On sale",
  giftBox: "Gift box",
  peated: "Peated",
};

function facetLabel(key: FacetKey, value: string | number): string {
  if (key === "style") return STYLE_LABELS[value as keyof typeof STYLE_LABELS] ?? String(value);
  if (key === "age") return `${value} years`;
  if (key === "volume") return volumeLabel(Number(value));
  if (key === "tastingNotes") return noteLabel(String(value));
  return String(value);
}

// Design 1a: "Active filters: [Speyside ×] Clear all". One chip per active
// value; clicking a chip removes just that filter.
function ActiveFilters({
  filters,
  onSet,
  onToggle,
  onClear,
}: {
  filters: ProductsFilters;
  onSet: (updates: ParamUpdates) => void;
  onToggle: (key: FacetKey, value: string) => void;
  onClear: () => void;
}) {
  const chips: Chip[] = [];

  if (filters.search) {
    chips.push({ id: "search", label: `“${filters.search}”`, remove: () => onSet({ search: undefined }) });
  }
  for (const key of FACET_KEYS) {
    for (const value of filters[key] ?? []) {
      chips.push({ id: `${key}-${value}`, label: facetLabel(key, value), remove: () => onToggle(key, String(value)) });
    }
  }
  for (const key of Object.keys(BOOLEAN_LABELS) as BooleanFilterKey[]) {
    if (filters[key]) chips.push({ id: key, label: BOOLEAN_LABELS[key], remove: () => onSet({ [key]: undefined }) });
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const label = `€${filters.minPrice ?? 0} – ${filters.maxPrice !== undefined ? `€${filters.maxPrice}` : "any"}`;
    chips.push({ id: "price", label, remove: () => onSet({ minPrice: undefined, maxPrice: undefined }) });
  }

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted">Active filters:</span>
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.remove}
          aria-label={`Remove filter: ${chip.label}`}
          className={cn(
            "inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-full border border-accent bg-accent px-3 text-sm text-accent-fg transition-colors hover:border-accent-hover hover:bg-accent-hover",
            focusRing,
          )}
        >
          {chip.label}
          <CloseIcon className="size-3" />
        </button>
      ))}
      <Button variant="ghost" size="sm" onClick={onClear}>
        Clear all
      </Button>
    </div>
  );
}

export default ActiveFilters;
