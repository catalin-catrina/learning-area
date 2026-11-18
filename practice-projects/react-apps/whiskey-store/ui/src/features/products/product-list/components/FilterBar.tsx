import type {
  BooleanFilterKey,
  FacetKey,
  FacetOption,
  FiltersResponse,
  ProductsFilters,
  SortOption,
} from "../../product.types";
import { activeFilterCount, type ParamUpdates } from "../productFilters.url";

// Functional, unstyled on purpose: the markup gets restyled in the design pass.

type FilterBarProps = {
  filters: ProductsFilters;
  options: FiltersResponse;
  onSet: (updates: ParamUpdates) => void;
  onToggle: (key: FacetKey, value: string) => void;
  onClear: () => void;
};

const STYLE_LABELS: Record<string, string> = {
  single_malt: "Single Malt",
  blended_malt: "Blended Malt",
  blended: "Blended",
  single_grain: "Single Grain",
  single_pot_still: "Single Pot Still",
  bourbon: "Bourbon",
  rye: "Rye",
};

const FACETS: {
  key: FacetKey;
  label: string;
  format: (v: string | number) => string;
}[] = [
  { key: "style", label: "Style", format: (v) => STYLE_LABELS[v] ?? String(v) },
  { key: "brand", label: "Brand", format: String },
  { key: "country", label: "Country", format: String },
  { key: "region", label: "Region", format: String },
  { key: "age", label: "Age", format: (v) => `${v} years` },
  { key: "volume", label: "Volume", format: (v) => `${Number(v) / 10} cl` },
];

const TOGGLES: { key: BooleanFilterKey; label: string }[] = [
  { key: "inStock", label: "In stock only" },
  { key: "onSale", label: "On sale" },
  { key: "peated", label: "Peated" },
  { key: "giftBox", label: "Gift box" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name_asc", label: "Name (A–Z)" },
  { value: "name_desc", label: "Name (Z–A)" },
  { value: "price_asc", label: "Price (low to high)" },
  { value: "price_desc", label: "Price (high to low)" },
  { value: "age_desc", label: "Oldest first" },
  { value: "rating_desc", label: "Top rated" },
  { value: "newest", label: "Newest" },
];

// A selected value can drop to 0 results when another filter changes, and the
// API omits it. Keep it in the list (count 0) so it can still be unticked.
function withSelected(
  options: FacetOption[],
  selected: (string | number)[] | undefined,
): FacetOption[] {
  const missing = (selected ?? [])
    .filter((s) => !options.some((o) => String(o.value) === String(s)))
    .map((value) => ({ value, count: 0 }));
  return [...options, ...missing];
}

function FilterBar({
  filters,
  options,
  onSet,
  onToggle,
  onClear,
}: FilterBarProps) {
  const active = activeFilterCount(filters);
  const { min, max } = options.priceRange;

  return (
    <aside className="filter-bar">
      {/* Search: submit-based, so typing doesn't fire a request per keystroke */}
      <form
        key={filters.search ?? ""}
        onSubmit={(e) => {
          e.preventDefault();
          const value = new FormData(e.currentTarget).get("search");
          onSet({ search: String(value ?? "").trim() || undefined });
        }}
      >
        <input
          type="search"
          name="search"
          placeholder="Search name, brand, region"
          defaultValue={filters.search ?? ""}
        />
        <button type="submit">Search</button>
      </form>

      <label>
        Sort by{" "}
        <select
          value={filters.sort ?? "name_asc"}
          onChange={(e) => onSet({ sort: e.target.value })}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      {active > 0 && (
        <button type="button" onClick={onClear}>
          Clear filters ({active})
        </button>
      )}

      <fieldset>
        <legend>Availability</legend>
        {TOGGLES.map(({ key, label }) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={filters[key] === true}
              onChange={(e) =>
                onSet({ [key]: e.target.checked ? "true" : undefined })
              }
            />
            {label}
          </label>
        ))}
      </fieldset>

      {/* Price: applied on submit, not on every slider tick */}
      <fieldset>
        <legend>
          Price (€{min} – €{max})
        </legend>
        <form
          key={`${filters.minPrice}-${filters.maxPrice}`}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            onSet({
              minPrice: String(data.get("minPrice") ?? "") || undefined,
              maxPrice: String(data.get("maxPrice") ?? "") || undefined,
            });
          }}
        >
          <input
            type="number"
            name="minPrice"
            min={0}
            placeholder={String(min)}
            defaultValue={filters.minPrice}
            aria-label="Minimum price"
          />
          <input
            type="number"
            name="maxPrice"
            min={0}
            placeholder={String(max)}
            defaultValue={filters.maxPrice}
            aria-label="Maximum price"
          />
          <button type="submit">Apply</button>
        </form>
      </fieldset>

      {FACETS.map(({ key, label, format }) => {
        const selected = filters[key];
        const list = withSelected(options.facets[key], selected);
        if (!list.length) return null;
        return (
          <fieldset key={key}>
            <legend>{label}</legend>
            {list.map(({ value, count }) => {
              const checked = (selected ?? []).some(
                (s) => String(s) === String(value),
              );
              return (
                <label key={String(value)}>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={!checked && count === 0}
                    onChange={() => onToggle(key, String(value))}
                  />
                  {format(value)} ({count})
                </label>
              );
            })}
          </fieldset>
        );
      })}
    </aside>
  );
}

export default FilterBar;
