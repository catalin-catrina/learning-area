import api from "../../../shared/services/api";
import type { AddItemPayload, CartResponseDto } from "../cart.types";

export async function getCart(): Promise<CartResponseDto> {
  const response = await api.get("/cart");
  return response.data;
}

export async function addItem(item: AddItemPayload): Promise<void> {
  const response = await api.post(`/cart/items`, item);
  return response.data;
}

export async function updateItemQuantity(
  productId: number,
  quantity: number,
): Promise<CartResponseDto> {
  const response = await api.patch(`/cart/items/${productId}`, quantity);
  return response.data;
}

export async function deleteItem(
  productId: number,
): Promise<CartResponseDto> {
  const response = await api.delete(`/cart/items/${productId}`);
  return response.data;
}
