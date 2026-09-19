import type {
  ProductsFilters,
  ProductType,
  SortBy,
  SortOrder,
} from "../../product.types";
import { useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import { useQuery } from "@tanstack/react-query";
import { getFilters, getProducts } from "../../services/products.service";

function parseFilters(params: URLSearchParams): ProductsFilters {
  return {
    region: params.get("region") ?? undefined,
    type: (params.get("type") as ProductType) ?? undefined,
    minPrice: params.get("minPrice")
      ? Number(params.get("minPrice"))
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

  function updateParams(key: keyof ProductsFilters, value: string | undefined) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete("page"); // filter changed -> back to page 1
    setSearchParams(next, { replace: true });
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
        onParamsChange={updateParams}
      />
      
      {products.data.map(p => (
        <div key={p.id}>
          <h2>{p.name}</h2>
        </div>
      ))}


    </div>
  );
};

export default ProductList;
