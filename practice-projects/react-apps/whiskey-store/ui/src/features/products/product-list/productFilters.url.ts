import type {
  BooleanFilterKey,
  FacetKey,
  ProductsFilters,
  SortOption,
} from "../product.types";

// The URL is the single source of truth for list state (bookmarkable, back button works).
// This file is the only place that knows how filters map to/from search params.

export const FACET_KEYS: FacetKey[] = [
  "style",
  "brand",
  "country",
  "region",
  "age",
  "volume",
];
export const BOOLEAN_KEYS: BooleanFilterKey[] = [
  "inStock",
  "onSale",
  "peated",
  "giftBox",
];

const NUMERIC_FACETS: FacetKey[] = ["age", "volume"];

function toBool(value: string | null): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

function toNumber(value: string | null): number | undefined {
  if (value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export function parseFilters(params: URLSearchParams): ProductsFilters {
  const filters: ProductsFilters = {
    page: toNumber(params.get("page")),
    limit: toNumber(params.get("limit")),
    search: params.get("search") || undefined,
    minPrice: toNumber(params.get("minPrice")),
    maxPrice: toNumber(params.get("maxPrice")),
    sort: (params.get("sort") as SortOption) || undefined,
  };

  for (const key of FACET_KEYS) {
    const values = params.getAll(key);
    if (!values.length) continue;
    if (NUMERIC_FACETS.includes(key)) {
      (filters[key] as number[]) = values.map(Number).filter(Number.isFinite);
    } else {
      (filters[key] as string[]) = values;
    }
  }
  for (const key of BOOLEAN_KEYS) {
    filters[key] = toBool(params.get(key));
  }

  return filters;
}

// Facet counts don't depend on paging or sorting, so they get their own
// cache key without them (changing page doesn't refetch the facets).
export function facetFilters(filters: ProductsFilters): ProductsFilters {
  const rest = { ...filters };
  delete rest.page;
  delete rest.limit;
  delete rest.sort;
  return rest;
}

// Every change except paging goes back to page 1, or you can land on a page
// that no longer exists (page 3 of a result that now has 1 page).
// Takes several keys at once: two separate updates built from the same params
// would overwrite each other (the second one wouldn't see the first).
export type ParamUpdates = Record<string, string | undefined>;

export function setParams(
  params: URLSearchParams,
  updates: ParamUpdates,
): URLSearchParams {
  const next = new URLSearchParams(params);
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === "") next.delete(key);
    else next.set(key, value);
  }
  if (!("page" in updates)) next.delete("page");
  return next;
}

export function toggleParam(
  params: URLSearchParams,
  key: FacetKey,
  value: string,
): URLSearchParams {
  const next = new URLSearchParams(params);
  const current = next.getAll(key);
  next.delete(key);
  const updated = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  updated.forEach((v) => next.append(key, v));
  next.delete("page");
  return next;
}

export function clearFilters(params: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams();
  const sort = params.get("sort");
  if (sort) next.set("sort", sort); // sorting isn't a filter; keep it
  return next;
}

export function activeFilterCount(filters: ProductsFilters): number {
  let count = 0;
  for (const key of FACET_KEYS) count += filters[key]?.length ?? 0;
  for (const key of BOOLEAN_KEYS) if (filters[key] !== undefined) count++;
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) count++;
  if (filters.search) count++;
  return count;
}
