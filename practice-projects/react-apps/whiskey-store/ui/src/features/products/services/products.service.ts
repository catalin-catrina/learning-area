import type { Paginated } from "../../../shared/models/paginated.types";
import api from "../../../shared/services/api";
import type { ProductsFilters, WhiskeyProduct } from "../product.types";

export async function getProducts(
  filters: ProductsFilters,
): Promise<Paginated<WhiskeyProduct>> {
  const response = await api.get("/products", { params: filters });
  return response.data;
}
