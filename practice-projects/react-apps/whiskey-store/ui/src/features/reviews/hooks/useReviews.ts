import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import type { WhiskeyProduct } from "../../products/product.types";
import type { RatingSummary, ReviewPayload } from "../review.types";
import { deleteMyReview, getMyReview, getReviews, saveMyReview } from "../services/reviews.service";

const PAGE_SIZE = 5;

export const reviewsKey = (productId: number) => ["reviews", productId] as const;
const myReviewKey = (productId: number, userId?: number) => ["reviews", productId, "me", userId] as const;

// "Show more reviews" appends the next page under the current ones.
// useInfiniteQuery keeps every loaded page in `data.pages`; the next page
// number comes from the last page the server sent.
export function useReviews(productId: number) {
  return useInfiniteQuery({
    queryKey: reviewsKey(productId),
    queryFn: ({ pageParam }) => getReviews(productId, pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
  });
}

/** The signed-in user's own review of this product (null if none). */
export function useMyReview(productId: number) {
  const { user } = useAuth();
  return useQuery({
    queryKey: myReviewKey(productId, user?.id),
    queryFn: () => getMyReview(productId),
    enabled: !!user,
  });
}

// Save and delete both change three cached things: my review, the review list,
// and the product's average (shown in the buy box and on cards). The server
// returns the new average, so the product page updates without a refetch.
export function useReviewMutations(productId: number) {
  const qc = useQueryClient();
  const { user } = useAuth();

  const syncRating = (summary: RatingSummary) => {
    qc.setQueryData<WhiskeyProduct>(["product", productId], (p) => (p ? { ...p, ...summary } : p));
    qc.invalidateQueries({ queryKey: reviewsKey(productId) }); // also matches my-review (same prefix)
    qc.invalidateQueries({ queryKey: ["products"] }); // card ratings in lists
  };

  const save = useMutation({
    mutationFn: (payload: ReviewPayload) => saveMyReview(productId, payload),
    onSuccess: ({ review, product }) => {
      qc.setQueryData(myReviewKey(productId, user?.id), review);
      syncRating(product);
    },
  });

  const remove = useMutation({
    mutationFn: () => deleteMyReview(productId),
    onSuccess: ({ product }) => {
      qc.setQueryData(myReviewKey(productId, user?.id), null);
      syncRating(product);
    },
  });

  return { save, remove };
}
