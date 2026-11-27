import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "cn";
import { Badge, BottleIcon, Button, CartAddIcon, HeartIcon, Price, Rating, Skeleton } from "../../../shared/ui";
import { useAuth } from "../../auth/hooks/useAuth";
import { useToggleFavorite } from "../../favorites/hooks/useFavorites";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import type { WhiskeyProduct } from "../product.types";
import { discountLabel, productMeta, productPath } from "../productLabels";

type ProductCardProps = {
  product: WhiskeyProduct;
  /** h3 inside a page section, h2 when the grid is the page's main list */
  headingLevel?: "h2" | "h3";
};

// Design 1a (card). Mobile values first, desktop (lg:) on top.
//
// The whole card is clickable, but only the name is a real link: the link's
// ::after layer stretches over the card ("stretched link"). The heart sits
// above that layer (z-10), so it stays its own button. Wrapping the whole card
// in <a> would put a button inside a link (invalid HTML, and a click on the
// heart would also open the product). The cart button works the same way.
export function ProductCard({ product, headingLevel: Heading = "h3" }: ProductCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isFavorite, toggle } = useToggleFavorite(product.id);
  const { addToCart, isPending: adding } = useAddToCart();
  const [imageBroken, setImageBroken] = useState(false);

  const discount = discountLabel(product);
  const soldOut = !product.inStock;

  const onHeart = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    toggle();
  };

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-[border-color,box-shadow]",
        "hover:border-input hover:shadow-md",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring",
      )}
    >
      {/* Image */}
      <div className="relative flex h-45 items-center justify-center p-3 lg:h-70 lg:p-6">
        {product.imageUrl && !imageBroken ? (
          <img
            src={product.imageUrl}
            alt=""
            loading="lazy"
            onError={() => setImageBroken(true)}
            className={cn("max-h-full max-w-full object-contain", soldOut && "opacity-45")}
          />
        ) : (
          <BottleIcon className="size-16 text-border lg:size-24" />
        )}

        <div className="absolute left-2 top-2 flex max-w-[calc(100%-64px)] flex-wrap gap-1 lg:left-3 lg:top-3 lg:gap-2">
          {discount && !soldOut && <Badge variant="sale">{discount}</Badge>}
          {product.giftBox && <Badge variant="gift" />}
          {soldOut && <Badge variant="outOfStock" />}
        </div>

        <Button
          variant="ghost"
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites`}
          onClick={onHeart}
          className={cn(
            "absolute right-1 top-1 z-10 w-10 px-0 [&_svg]:size-5 lg:right-2 lg:top-2",
            isFavorite && "text-sale",
          )}
        >
          <HeartIcon filled={isFavorite} />
        </Button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1 border-t border-border p-3 lg:p-4">
        <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted">{product.brand}</p>
        <Heading className="min-h-12 text-base lg:min-h-14 lg:text-xl">
          <Link
            to={productPath(product)}
            className="line-clamp-2 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </Heading>
        <p className="text-xs text-muted">{productMeta(product)}</p>
        <Rating rating={product.rating} reviewCount={product.reviewCount} compact className="flex-wrap gap-x-2 gap-y-0" />
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <Price
            priceCents={product.priceCents}
            compareAtPriceCents={product.compareAtPriceCents}
            outOfStock={soldOut}
            className="min-w-0 flex-wrap gap-y-0" // narrow phones: the old price drops under
          />
          {/* Adds exactly one; the toast confirms it */}
          {!soldOut && (
            <Button
              variant="secondary"
              aria-label={`Add ${product.name} to cart`}
              loading={adding}
              onClick={() => addToCart(product)}
              className="relative z-10 w-10 shrink-0 px-0 [&_svg]:size-5"
            >
              {!adding && <CartAddIcon />}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

// Design 1b: same box sizes as the real card, so nothing jumps on load.
export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex h-45 items-center justify-center p-3 lg:h-70 lg:p-6">
        <Skeleton className="h-[85%] w-[45%]" />
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-border p-3 lg:p-4">
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-5 w-[90%]" />
        <Skeleton className="h-5 w-[65%]" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="mt-3 h-6 w-[30%]" />
      </div>
    </div>
  );
}

/** Grid of cards: 2 columns on mobile, `columns` on desktop. */
export function ProductGrid({
  columns = 3,
  className,
  children,
  ...rest
}: {
  columns?: 3 | 4;
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<"div">) {
  return (
    <div
      {...rest}
      className={cn(
        "grid grid-cols-2 gap-3 lg:gap-6",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
