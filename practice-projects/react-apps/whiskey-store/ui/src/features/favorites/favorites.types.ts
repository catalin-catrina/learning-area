import type { WhiskeyProduct } from "../products/product.types";

export type Favorite = {
  id: number;
  userId: number;
  productId: number;
  product: WhiskeyProduct;
};