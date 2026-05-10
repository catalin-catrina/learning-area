export type WhiskeyProduct = {
  id: number;
  name: string;
  distillery: string;
  region: string;
  country: string;
  type:
    | "single_malt"
    | "blended_scotch"
    | "blended_malt"
    | "bourbon"
    | "rye"
    | "irish"
    | "japanese";
  age: number | null;
  abv: number;
  price: number;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: { userId: number; rating: number; comment: string }[];
};
