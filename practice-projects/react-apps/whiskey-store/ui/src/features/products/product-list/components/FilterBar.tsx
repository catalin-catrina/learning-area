import type {
  FiltersResponse,
  ProductsFilters,
  SortBy,
  SortOrder,
} from "../../product.types";

type FilterBarProps = {
  filters: ProductsFilters;
  filterOptions: FiltersResponse;
  onParamsChange: (
    key: keyof ProductsFilters,
    value: string | undefined,
  ) => void;
};

function FilterBar({ filters, filterOptions, onParamsChange }: FilterBarProps) {
  const filterFields: {
    optionsKey: keyof FiltersResponse;
    filterKey: keyof ProductsFilters;
    label: string;
  }[] = [
    { optionsKey: "flatRegions", filterKey: "region", label: "Region" },
    { optionsKey: "flatTypes", filterKey: "type", label: "Type" },
    { optionsKey: "flatCountries", filterKey: "country", label: "Country" },
  ];

  const sortByOptions: { value: SortBy; label: string }[] = [
    { value: "price", label: "Price" },
    { value: "age", label: "Age" },
  ];

  const sortOrderOptions: { value: SortOrder; label: string }[] = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  return (
    <div className="filter-bar">
      <div className="filter">
        <label htmlFor="minPrice">Min Price: </label>
        <input
          type="range"
          name="minPrice"
          id="minPrice"
          min="0"
          max="3000"
          step="50"
          value={filters.minPrice ?? 0}
          onChange={(e) => onParamsChange("minPrice", e.target.value)}
        />
      </div>

      <div className="filter">
        <label htmlFor="maxPrice">Max Price: </label>
        <input
          type="range"
          name="maxPrice"
          id="maxPrice"
          min="0"
          max="3000"
          step="50"
          value={filters.maxPrice ?? 0}
          onChange={(e) => onParamsChange("maxPrice", e.target.value)}
        />
      </div>

      {filterFields.map(({ optionsKey, filterKey, label }) => (
        <div className="filter" key={filterKey}>
          <label htmlFor={filterKey}>{label}</label>
          <select
            id={filterKey}
            value={String(filters[filterKey] ?? "")}
            onChange={(e) =>
              onParamsChange(filterKey, e.target.value || undefined)
            }
          >
            <option value="">All</option>
            {filterOptions[optionsKey].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="filter">
        <label htmlFor="sortBy"></label>
        <select
          value={filters.sortBy ?? ""}
          onChange={(e) =>
            onParamsChange("sortBy", e.target.value || undefined)
          }
          name="sortBy"
          id="sortBy"
        >
          {sortByOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter">
        <label htmlFor="sortOrder"></label>
        <select
          value={filters.sortOrder ?? ""}
          onChange={(e) =>
            onParamsChange("sortOrder", e.target.value || undefined)
          }
          name="sortOrder"
          id="sortOrder"
        >
          {sortOrderOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
