import { NavLink, useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import FilterBar from "./FilterBar";
import { getFilters, getProducts } from "../../services/products.service";
import {
  clearFilters,
  facetFilters,
  parseFilters,
  setParams,
  toggleParam,
  type ParamUpdates,
} from "../productFilters.url";
import type { FacetKey } from "../../product.types";
import { formatPrice } from "../../../../shared/utils/formatPrice";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseFilters(searchParams);
  const currentPage = filters.page ?? 1;
  const facetQuery = facetFilters(filters);

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    isFetching: isProductsFetching,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    // keep showing the previous page while the next one loads, instead of
    // flashing back to the loading state on every filter click
    placeholderData: keepPreviousData,
  });

  const {
    data: filterOptions,
    isLoading: isFilterOptionsLoading,
    isError: isFilterOptionsError,
  } = useQuery({
    queryKey: ["product-filters", facetQuery],
    queryFn: () => getFilters(facetQuery),
    placeholderData: keepPreviousData,
  });

  const onSet = (updates: ParamUpdates) =>
    setSearchParams(setParams(searchParams, updates), { replace: true });

  const onToggle = (key: FacetKey, value: string) =>
    setSearchParams(toggleParam(searchParams, key, value), { replace: true });

  const onClear = () => setSearchParams(clearFilters(searchParams));

  // paging pushes a history entry so the back button returns to the previous page
  const goToPage = (page: number) =>
    setSearchParams(setParams(searchParams, { page: String(page) }));

  if (isProductsLoading || isFilterOptionsLoading) return <p>Loading ...</p>;
  if (isProductsError || isFilterOptionsError)
    return <p>Something went wrong.</p>;
  if (!products || !filterOptions) return null;

  return (
    <div>
      <FilterBar
        filters={filters}
        options={filterOptions}
        onSet={onSet}
        onToggle={onToggle}
        onClear={onClear}
      />

      <p>
        {products.total} products{isProductsFetching ? " (updating…)" : ""}
      </p>

      {products.data.length === 0 ? (
        <div>
          <p>No products match these filters.</p>
          <button onClick={onClear}>Clear filters</button>
        </div>
      ) : (
        products.data.map((p) => (
          <div key={p.id}>
            <NavLink to={`/products/${p.id}`}>{p.name}</NavLink>{" "}
            {p.compareAtPriceCents && (
              <s>{formatPrice(p.compareAtPriceCents)}</s>
            )}{" "}
            {formatPrice(p.priceCents)} · {p.volumeMl / 10}cl / {p.abv}%
            {!p.inStock && " · Out of stock"}
          </div>
        ))
      )}

      {products.totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: products.totalPages }, (_, i) => i + 1).map(
            (i) => (
              <button
                key={i}
                className={i === currentPage ? "active" : ""}
                aria-current={i === currentPage ? "page" : undefined}
                onClick={() => goToPage(i)}
              >
                {i}
              </button>
            ),
          )}
          <button
            disabled={currentPage >= products.totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
