import type { Paginated } from "../../../shared/models/paginated.types";
import api from "../../../shared/services/api";
import type {
  FiltersResponse,
  ProductPayload,
  ProductsFilters,
  WhiskeyProduct,
} from "../product.types";

// Arrays go out as `style=a&style=b` (axios's default is `style[]=a`).
const repeatArrays = { indexes: null } as const;

export async function getProducts(
  filters: ProductsFilters,
): Promise<Paginated<WhiskeyProduct>> {
  const response = await api.get("/products", {
    params: filters,
    paramsSerializer: repeatArrays,
  });
  return response.data;
}

export async function getProductById(
  productId: number,
): Promise<WhiskeyProduct> {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}

// Send the active filters so facet counts reflect them.
export async function getFilters(
  filters: ProductsFilters,
): Promise<FiltersResponse> {
  const response = await api.get(`/products/filters`, {
    params: filters,
    paramsSerializer: repeatArrays,
  });
  return response.data;
}

export async function createProduct(product: ProductPayload): Promise<void> {
  const response = await api.post(`/products`, product);
  return response.data;
}

export async function editProduct(
  productId: number,
  product: ProductPayload,
): Promise<{ message: string; product: WhiskeyProduct }> {
  const response = await api.put(`/products/${productId}`, product);
  return response.data;
}

export async function deleteProduct(
  productId: number,
): Promise<{ message: string }> {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
}
