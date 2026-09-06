export type WhiskeyProduct = {
  id: number;
  name: string;
  distillery: string;
  region: string;
  country: string;
  type: ProductType;
  age: number | null;
  abv: number;
  price: number;
  description: string;
  inStock: boolean;
  rating: number;
};

export type ProductsFilters = {
  region?: string;
  type?: ProductType;
  country?: string;
  inStock?: boolean;
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortOrder?: SortOrder;
  sortBy?: SortBy;
};

export type ProductType =
  | "single_malt"
  | "blended_scotch"
  | "blended_malt"
  | "bourbon"
  | "rye"
  | "irish"
  | "japanese";

export type SortOrder = "asc" | "desc";
export type SortBy = "price" | "age";
