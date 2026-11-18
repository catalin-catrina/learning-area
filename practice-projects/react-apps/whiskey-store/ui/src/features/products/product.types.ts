export type WhiskyStyle =
  | "single_malt"
  | "blended_malt"
  | "blended"
  | "single_grain"
  | "single_pot_still"
  | "bourbon"
  | "rye";

export type WhiskeyProduct = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  style: WhiskyStyle;
  country: string;
  region: string | null;
  ageYears: number | null; // null = no age statement
  abv: number;
  volumeMl: number;
  priceCents: number;
  compareAtPriceCents: number | null; // set = on sale
  peated: boolean;
  giftBox: boolean;
  inStock: boolean;
  cask: string | null;
  tastingNotes: string[];
  description: string;
  imageUrl: string | null;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

// rating/reviewCount/createdAt are server-owned
export type ProductPayload = Omit<
  WhiskeyProduct,
  "id" | "rating" | "reviewCount" | "createdAt"
>;

export type SortOption =
  | "name_asc"
  | "name_desc"
  | "price_asc"
  | "price_desc"
  | "age_desc"
  | "rating_desc"
  | "newest";

// Mirrors api/validators/productQueryValidator.js
export type ProductsFilters = {
  page?: number;
  limit?: number;
  search?: string;
  style?: WhiskyStyle[];
  brand?: string[];
  country?: string[];
  region?: string[];
  age?: number[];
  volume?: number[];
  peated?: boolean;
  giftBox?: boolean;
  inStock?: boolean;
  onSale?: boolean;
  minPrice?: number; // euros
  maxPrice?: number; // euros
  sort?: SortOption;
};

export type FacetKey =
  | "style"
  | "brand"
  | "country"
  | "region"
  | "age"
  | "volume";
export type BooleanFilterKey = "peated" | "giftBox" | "inStock" | "onSale";

export type FacetOption = { value: string | number; count: number };

export type FiltersResponse = {
  facets: Record<FacetKey, FacetOption[]>;
  priceRange: { min: number; max: number }; // euros, whole catalog
};
