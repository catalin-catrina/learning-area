import type { Paginated } from "../../shared/models/paginated.types";

export type Review = {
  id: number;
  rating: number; // 1–5
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  /** "Mihai D.": first name + last initial */
  author: string;
};

export type ReviewPage = Paginated<Review>;

export type ReviewPayload = { rating: number; comment?: string };

/** What the product's stored average became after a write. */
export type RatingSummary = { rating: number; reviewCount: number };
