import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { cn } from "cn";
import FilterPanel from "./FilterPanel";
import ActiveFilters from "./ActiveFilters";
import { getFilters } from "../../services/products.service";
import { useProducts } from "../../hooks/useProducts";
import {
  activeFilterCount,
  clearFilters,
  DEFAULT_SORT,
  facetFilters,
  parseFilters,
  setParams,
  toggleParam,
  type ParamUpdates,
} from "../productFilters.url";
import type { FacetKey, ProductsFilters, SortOption } from "../../product.types";
import { STYLE_LABELS } from "../../productLabels";
import { ProductCard, ProductCardSkeleton, ProductGrid } from "../../components/ProductCard";
import Container from "../../../../shared/layout/Container";
import Breadcrumbs from "../../../../shared/components/Breadcrumbs";
import Pagination from "../../../../shared/components/Pagination";
import EmptyState from "../../../../shared/components/EmptyState";
import Sheet from "../../../../shared/components/Sheet";
import { Button, buttonClasses, SearchIcon, Select, SlidersIcon } from "../../../../shared/ui";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "rating_desc", label: "Featured" }, // design map: Featured = best rated
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "age_desc", label: "Age statement" },
  { value: "newest", label: "Newest" },
  { value: "name_asc", label: "Name: A–Z" },
];

// The page heading follows the main filter, so the category links in the
// header land on "Single malt whisky", "Gift boxes", "Offers"…
function pageTitle(f: ProductsFilters): string {
  if (f.search) return `Results for “${f.search}”`;
  if (f.style?.length === 1) return `${STYLE_LABELS[f.style[0]]} whisky`;
  if (f.style?.length && f.style.every((s) => s === "blended" || s === "blended_malt")) return "Blended whisky";
  if (f.giftBox && !f.style?.length) return "Gift boxes";
  if (f.onSale && !f.style?.length) return "Offers";
  return "All whisky";
}

// Design 1a–1d.
const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseFilters(searchParams);
  const page = filters.page ?? 1;
  const sort = filters.sort ?? DEFAULT_SORT;
  const [sheetOpen, setSheetOpen] = useState(false);

  const products = useProducts({ ...filters, sort });
  const filterOptions = useQuery({
    queryKey: ["product-filters", facetFilters(filters)],
    queryFn: () => getFilters(facetFilters(filters)),
    placeholderData: keepPreviousData,
  });

  const onSet = (updates: ParamUpdates) => setSearchParams(setParams(searchParams, updates), { replace: true });
  const onToggle = (key: FacetKey, value: string) =>
    setSearchParams(toggleParam(searchParams, key, value), { replace: true });
  const onClear = () => setSearchParams(clearFilters(searchParams));
  // paging pushes a history entry so the back button returns to the previous page
  const goToPage = (p: number) => {
    setSearchParams(setParams(searchParams, { page: String(p) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const title = pageTitle(filters);
  const data = products.data;
  const activeCount = activeFilterCount(filters);
  const from = data && data.total > 0 ? (data.page - 1) * data.limit + 1 : 0;
  const to = data ? Math.min(data.page * data.limit, data.total) : 0;

  const sortSelect = (id: string, withLabel: boolean) => (
    <Select
      id={id}
      aria-label={withLabel ? undefined : "Sort by"}
      value={sort}
      onChange={(e) => onSet({ sort: e.target.value === DEFAULT_SORT ? undefined : e.target.value })}
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {withLabel ? o.label : `Sort: ${o.label}`}
        </option>
      ))}
    </Select>
  );

  const filterPanel = (
    <FilterPanel filters={filters} options={filterOptions.data} onSet={onSet} onToggle={onToggle} />
  );

  return (
    <Container className="pb-16">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/products" },
          ...(title === "All whisky" ? [{ label: "Whisky" }] : [{ label: "Whisky", to: "/products" }, { label: title }]),
        ]}
      />

      <div className="grid gap-12 pt-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:pt-6">
        {/* Desktop filters */}
        <aside aria-label="Filters" className="hidden pt-2 lg:block">
          {filterPanel}
        </aside>

        <div className="flex min-w-0 flex-col gap-6" aria-busy={products.isFetching}>
          <div className="flex items-end gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-[30px] leading-9 lg:text-4xl">{title}</h1>
              <p className="text-sm text-muted" aria-live="polite">
                {data ? (data.total > 0 ? `Showing ${from}–${to} of ${data.total}` : "No results") : "Loading…"}
              </p>
            </div>
            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <label htmlFor="sort-desktop" className="text-sm text-muted">
                Sort by
              </label>
              <div className="w-55">{sortSelect("sort-desktop", true)}</div>
            </div>
          </div>

          {/* Mobile: Filters button + sort */}
          <div className="grid grid-cols-2 gap-2 lg:hidden">
            <Button variant="secondary" aria-haspopup="dialog" onClick={() => setSheetOpen(true)}>
              <SlidersIcon />
              Filters
              {activeCount > 0 && (
                <>
                  <span className="sr-only">,</span> {activeCount}
                </>
              )}
            </Button>
            {sortSelect("sort-mobile", false)}
          </div>

          <ActiveFilters filters={filters} onSet={onSet} onToggle={onToggle} onClear={onClear} />

          {products.isError ? (
            <EmptyState icon={<SearchIcon />} title="Couldn't load the shop" panel
              actions={<Button onClick={() => products.refetch()}>Try again</Button>}>
              Something went wrong on our side. Please try again in a moment.
            </EmptyState>
          ) : !data ? (
            <ProductGrid aria-label="Loading products">
              {Array.from({ length: 6 }, (_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </ProductGrid>
          ) : data.data.length === 0 ? (
            <EmptyState
              icon={<SearchIcon />}
              title="No whisky matches these filters"
              panel
              actions={
                <>
                  <Button onClick={onClear}>Clear all filters</Button>
                  <Link to="/products?giftBox=true" className={buttonClasses({ variant: "secondary" })}>
                    Browse gift boxes
                  </Link>
                </>
              }
            >
              Remove a filter, or clear them all to see the full range.
            </EmptyState>
          ) : (
            <>
              <ProductGrid className={cn("transition-opacity", products.isPlaceholderData && "opacity-60")}>
                {data.data.map((p) => (
                  <ProductCard key={p.id} product={p} headingLevel="h2" />
                ))}
              </ProductGrid>
              <Pagination page={page} totalPages={data.totalPages} onPageChange={goToPage} />
            </>
          )}
        </div>
      </div>

      {/* Mobile filters (design 1d) */}
      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        side="bottom"
        title="Filters"
        closeLabel="Close filters"
        footer={
          <div className="grid grid-cols-[auto_1fr] gap-3">
            <Button variant="secondary" onClick={onClear} disabled={activeCount === 0}>
              Clear all
            </Button>
            <Button onClick={() => setSheetOpen(false)}>
              {data ? `Show ${data.total} ${data.total === 1 ? "result" : "results"}` : "Show results"}
            </Button>
          </div>
        }
      >
        <div className="py-4">{filterPanel}</div>
      </Sheet>
    </Container>
  );
};

export default ProductList;
