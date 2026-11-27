import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { Alert, Badge, Button, PencilIcon, RatingInput, Skeleton, Stars, Textarea } from "../../../shared/ui";
import { useAuth } from "../../auth/hooks/useAuth";
import { formatDate } from "../../orders/orderLabels";
import type { WhiskeyProduct } from "../../products/product.types";
import type { Review } from "../review.types";
import { useMyReview, useReviewMutations, useReviews } from "../hooks/useReviews";

const COMMENT_MAX = 2000;
const reviewsLabel = (n: number) => `${n} ${n === 1 ? "review" : "reviews"}`;
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .replace(".", "")
    .slice(0, 2)
    .toUpperCase();

// Design 3a "Reviews": summary + "Write a review" on the left (320px on
// desktop, stacked on mobile), the list on the right. The write form has no
// design; it opens in place of the button, in the same column.
export function ReviewsSection({ product }: { product: WhiskeyProduct }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const reviews = useReviews(product.id);
  const mine = useMyReview(product.id);
  const [writing, setWriting] = useState(false);

  // Returning from login with #reviews: React Router doesn't scroll to hashes,
  // so do it once here (an effect is right for this: it touches the DOM).
  useEffect(() => {
    if (location.hash === "#reviews") document.getElementById("reviews")?.scrollIntoView();
  }, [location.hash]);

  const myReview = mine.data ?? null;
  const items = reviews.data?.pages.flatMap((p) => p.data) ?? [];

  const onWrite = () => {
    // back to this section after signing in
    if (!user) return navigate("/login", { state: { from: { ...location, hash: "#reviews" } } });
    setWriting(true);
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="flex scroll-mt-24 flex-col gap-4 pt-12 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16 lg:pt-20"
    >
      <div className="flex flex-col gap-3">
        <h2 id="reviews-title" className="text-2xl">
          Reviews
        </h2>

        {product.reviewCount > 0 ? (
          <div className="flex items-center gap-3">
            <span className="font-sans text-3xl font-bold">{product.rating.toFixed(1)}</span>
            <div className="flex flex-col gap-1">
              <Stars
                value={product.rating}
                label={`Rated ${product.rating.toFixed(1)} out of 5 from ${reviewsLabel(product.reviewCount)}`}
              />
              <span className="text-sm text-muted">Based on {reviewsLabel(product.reviewCount)}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">No reviews yet. Be the first to share what you thought.</p>
        )}

        {writing ? (
          <ReviewForm
            key={myReview?.id ?? "new"}
            productId={product.id}
            existing={myReview}
            onClose={() => setWriting(false)}
          />
        ) : (
          <Button variant="secondary" size="sm" className="self-start" onClick={onWrite} disabled={mine.isLoading}>
            <PencilIcon />
            {myReview ? "Edit your review" : "Write a review"}
          </Button>
        )}
      </div>

      <div className="flex flex-col">
        {reviews.isPending ? (
          <ReviewListSkeleton />
        ) : reviews.isError ? (
          <Alert title="Couldn't load reviews">Please refresh the page to try again.</Alert>
        ) : (
          <>
            <ul className="flex flex-col">
              {items.map((r) => (
                <ReviewItem key={r.id} review={r} isMine={r.id === myReview?.id} />
              ))}
            </ul>
            {reviews.hasNextPage && (
              <Button
                variant="secondary"
                className="mt-4 self-start"
                loading={reviews.isFetchingNextPage}
                onClick={() => reviews.fetchNextPage()}
              >
                Show more reviews
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ReviewItem({ review, isMine }: { review: Review; isMine: boolean }) {
  const edited = review.updatedAt !== review.createdAt;
  return (
    <li className="flex flex-col gap-2 border-t border-border py-5 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-full border border-border bg-surface-2 text-xs font-bold"
        >
          {initials(review.author)}
        </span>
        <span className="text-sm font-semibold">{review.author}</span>
        {isMine && <Badge variant="neutral">Your review</Badge>}
        <span className="text-xs text-muted">
          {formatDate(review.createdAt)}
          {edited && " · edited"}
        </span>
        <Stars value={review.rating} label={`${review.rating} out of 5`} className="ml-auto" />
      </div>
      {review.comment && <p className="whitespace-pre-line text-base leading-[26px]">{review.comment}</p>}
    </li>
  );
}

function ReviewForm({
  productId,
  existing,
  onClose,
}: {
  productId: number;
  existing: Review | null;
  onClose: () => void;
}) {
  const { save, remove } = useReviewMutations(productId);
  const [rating, setRating] = useState<number | null>(existing?.rating ?? null);
  const [comment, setComment] = useState(existing?.comment ?? "");
  const [ratingError, setRatingError] = useState(false);

  const failed = save.error ?? remove.error;
  const serverMessage =
    failed && isAxiosError(failed) ? (failed.response?.data?.error as string | undefined) : undefined;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return setRatingError(true);
    save.mutate({ rating, comment: comment.trim() }, { onSuccess: onClose });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4">
      <h3 className="text-lg">{existing ? "Edit your review" : "Write a review"}</h3>

      {failed && <Alert title="Couldn't save your review">{serverMessage ?? "Please try again."}</Alert>}

      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold" aria-hidden="true">
          Rating
        </span>
        <RatingInput
          value={rating}
          onChange={(v) => {
            setRating(v);
            setRatingError(false);
          }}
          loading={save.isPending}
        />
        {ratingError && (
          <p role="alert" className="text-sm text-danger">
            Choose a rating from 1 to 5 stars.
          </p>
        )}
      </div>

      <Textarea
        label="Your review"
        hint={`Optional · ${comment.length}/${COMMENT_MAX}`}
        maxLength={COMMENT_MAX}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Nose, palate, finish… how did you drink it?"
        disabled={save.isPending}
      />

      <div className="flex flex-wrap gap-2">
        <Button type="submit" loading={save.isPending}>
          {existing ? "Save changes" : "Post review"}
        </Button>
        <Button variant="ghost" onClick={onClose} disabled={save.isPending || remove.isPending}>
          Cancel
        </Button>
        {existing && (
          <Button
            variant="ghost"
            className="ml-auto text-danger"
            loading={remove.isPending}
            onClick={() => remove.mutate(undefined, { onSuccess: onClose })}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}

function ReviewListSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-5">
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-col gap-3 border-t border-border pt-5 first:border-t-0 first:pt-0">
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}
