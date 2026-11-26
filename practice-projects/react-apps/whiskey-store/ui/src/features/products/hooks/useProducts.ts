import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products.service";
import type { ProductsFilters } from "../product.types";

export const productsKey = (filters: ProductsFilters) => ["products", filters] as const;

// Any product list: the main grid, "You may also like", "Popular right now".
// The key and the request are built from the same `filters` object, so they
// can never describe two different requests.
export function useProducts(filters: ProductsFilters, { enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: productsKey(filters),
    queryFn: () => getProducts(filters),
    // keep showing the previous page while the next one loads, instead of
    // flashing back to the loading state on every filter click
    placeholderData: keepPreviousData,
    enabled,
  });
}
