import type {
  ProductsFilters,
  ProductType,
  SortBy,
  SortOrder,
} from "../../product.types";
import { NavLink, useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import { useQuery } from "@tanstack/react-query";
import { getFilters, getProducts } from "../../services/products.service";

function parseFilters(params: URLSearchParams): ProductsFilters {
  return {
    page: params.get("page") ? Number(params.get("page")) : undefined,
    limit: params.get("limit") ? Number(params.get("limit")) : undefined,
    region: params.get("region") ?? undefined,
    country: params.get("country") ?? undefined,
    rating: params.get("rating") ? Number(params.get("rating")) : undefined,
    type: (params.get("type") as ProductType) ?? undefined,
    minPrice: params.get("minPrice")
      ? Number(params.get("minPrice"))
      : undefined,
    maxPrice: params.get("maxPrice")
      ? Number(params.get("maxPrice"))
      : undefined,
    inStock:
      params.get("inStock") === "true"
        ? true
        : params.get("inStock") === "false"
          ? false
          : undefined,
    search: params.get("search") ?? undefined,
    sortBy: (params.get("sortBy") as SortBy) ?? undefined,
    sortOrder: (params.get("sortOrder") as SortOrder) ?? undefined,
  };
}

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseFilters(searchParams);
  const currentPage = filters.page ?? 1;
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
  const {
    data: filterOptions,
    isLoading: isFilterOptionsLoading,
    isError: isFilterOptionsError,
  } = useQuery({
    queryKey: ["filters"],
    queryFn: () => getFilters(),
  });

  function updateFilter(key: keyof ProductsFilters, value: string | undefined) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete("page");
    setSearchParams(next, { replace: true });
  }

  function goToPage(page: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next);
  }

  if (isProductsLoading || isFilterOptionsLoading) return <p>Loading ...</p>;
  if (isProductsError || isFilterOptionsError)
    return <p>Something went wrong.</p>;
  if (!products || !filterOptions) return null; // unreachable in practice, but useQuery's data is typed T | undefined

  return (
    <div>
      <FilterBar
        filters={filters}
        filterOptions={filterOptions}
        onParamsChange={updateFilter}
      />

      {products.data.map((p) => (
        <div key={p.id}>
          <NavLink to={`/products/${p.id}`}>{p.name}</NavLink>
        </div>
      ))}

      <div className="pagination">
        <div className="prev">
          <button
            className="prev-btn"
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            &lt;
          </button>
        </div>

        {Array.from({ length: products.totalPages }, (_, i) => i + 1).map(
          (i) => (
            <button
              key={i}
              className={i === currentPage ? "active" : ""}
              onClick={() => goToPage(i)}
            >
              {i}
            </button>
          ),
        )}

        <div className="next">
          <button
            className="next-btn"
            disabled={currentPage >= products.totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
