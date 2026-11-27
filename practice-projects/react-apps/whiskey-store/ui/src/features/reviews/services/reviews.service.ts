import api from "../../../shared/services/api";
import type { RatingSummary, Review, ReviewPage, ReviewPayload } from "../review.types";

export async function getReviews(productId: number, page: number, limit = 5): Promise<ReviewPage> {
  const response = await api.get(`/products/${productId}/reviews`, { params: { page, limit } });
  return response.data;
}

export async function getMyReview(productId: number): Promise<Review | null> {
  const response = await api.get(`/products/${productId}/reviews/me`);
  return response.data;
}

export async function saveMyReview(
  productId: number,
  payload: ReviewPayload,
): Promise<{ review: Review; product: RatingSummary }> {
  const response = await api.put(`/products/${productId}/reviews/me`, payload);
  return response.data;
}

export async function deleteMyReview(productId: number): Promise<{ product: RatingSummary }> {
  const response = await api.delete(`/products/${productId}/reviews/me`);
  return response.data;
}
