import type { WhiskeyProduct } from "../products/product.types";

export type CartResponseDto = {
  id: number;
  userId: number;
  total: number;
  items: CartItemDto[];
};

export type CartItemDto = {
  id: number;
  quantity: number;
  productId: number;
  product: WhiskeyProduct;
  cartId: number;
};

export type AddItemPayload = {
  productId: number;
  quantity: number;
}