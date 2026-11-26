import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { cn } from "cn";
import { useProduct } from "../../hooks/useProduct";
import { useProducts } from "../../hooks/useProducts";
import { useAuth } from "../../../auth/hooks/useAuth";
import { useCart, useCartMutations } from "../../../cart/hooks/useCart";
import { useToggleFavorite } from "../../../favorites/hooks/useFavorites";
import { useUiStore } from "../../../../shared/stores/uiStore";
import Container from "../../../../shared/layout/Container";
import Breadcrumbs from "../../../../shared/components/Breadcrumbs";
import EmptyState from "../../../../shared/components/EmptyState";
import {
  Badge,
  BagIcon,
  BottleIcon,
  Button,
  buttonClasses,
  GiftIcon,
  HeartIcon,
  Price,
  QuantityStepper,
  Rating,
  ShieldIcon,
  Skeleton,
  StatusDot,
  TruckIcon,
  focusRing,
} from "../../../../shared/ui";
import { formatPrice } from "../../../../shared/utils/formatPrice";
import { ProductCard, ProductCardSkeleton, ProductGrid } from "../../components/ProductCard";
import type { WhiskeyProduct } from "../../product.types";
import { STYLE_LABELS, ageLabel, discountLabel, noteLabel, originLine, volumeLabel } from "../../productLabels";

// Design 3a (page) and 3b (loading).
function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, isPending, isError } = useProduct(productId);

  const validId = Number.isInteger(productId) && productId > 0;
  if (validId && isPending) return <ProductDetailSkeleton />;
  if (!validId || isError || !product) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<BottleIcon />}
          title="We couldn't find that bottle"
          panel
          actions={
            <Link to="/products" className={buttonClasses()}>
              Back to the shop
            </Link>
          }
        >
          It may have been removed, or the link is wrong.
        </EmptyState>
      </Container>
    );
  }

  // `key`: a fresh component (and fresh quantity state) for every product
  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }: { product: WhiskeyProduct }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const openCart = useUiStore((s) => s.openCart);
  const { data: cart } = useCart();
  const { add } = useCartMutations();
  const { isFavorite, toggle } = useToggleFavorite(product.id);
  const [quantity, setQuantity] = useState(1);
  const [imageBroken, setImageBroken] = useState(false);

  const discount = discountLabel(product);
  const inCart = cart?.items.find((i) => i.productId === product.id)?.quantity ?? 0;

  const requireLogin = () => {
    if (user) return false;
    navigate("/login", { state: { from: location } });
    return true;
  };

  const onAdd = () => {
    if (requireLogin()) return;
    add.mutate(
      { productId: product.id, quantity },
      {
        onSuccess: () => {
          setQuantity(1);
          openCart();
        },
      },
    );
  };

  const specs = [
    { label: "Region", value: product.region ?? product.country },
    { label: "Age", value: ageLabel(product.ageYears) },
    { label: "ABV", value: `${product.abv}%` },
    { label: "Volume", value: volumeLabel(product.volumeMl) },
  ];

  return (
    <Container className="pb-16">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/products" },
          { label: STYLE_LABELS[product.style], to: `/products?style=${product.style}` },
          { label: product.name },
        ]}
      />

      <div className="flex flex-col gap-6 pt-4 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pt-6">
        {/* Image */}
        <div className="relative flex h-95 items-center justify-center rounded-lg border border-border bg-surface p-6 lg:h-170 lg:p-12">
          {product.imageUrl && !imageBroken ? (
            <img
              src={product.imageUrl}
              alt={`${product.name}, ${volumeLabel(product.volumeMl)} bottle`}
              onError={() => setImageBroken(true)}
              className={cn("max-h-full max-w-full object-contain", !product.inStock && "opacity-45")}
            />
          ) : (
            <BottleIcon className="size-32 text-border" strokeWidth={1.25} />
          )}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {discount && product.inStock && <Badge variant="sale">{discount}</Badge>}
            {product.giftBox && <Badge variant="gift" />}
          </div>
        </div>

        {/* Buy box */}
        <div className="flex min-w-0 flex-col gap-6 pt-2">
          <div className="flex flex-col gap-2">
            <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted">{originLine(product)}</p>
            <h1 className="text-4xl text-balance lg:text-5xl">{product.name}</h1>
            {/* Reviews list + "Write a review" are post-release; the summary stays */}
            <Rating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Price
              size="page"
              priceCents={product.priceCents}
              compareAtPriceCents={product.compareAtPriceCents}
              outOfStock={!product.inStock}
            />
            {product.inStock ? (
              <StatusDot tone="success" className="ml-auto">
                In stock
              </StatusDot>
            ) : (
              <StatusDot tone="muted" className="ml-auto">
                Out of stock
              </StatusDot>
            )}
          </div>

          <dl className="grid grid-cols-2 rounded-lg border border-border bg-surface lg:grid-cols-4">
            {specs.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "flex flex-col gap-1 px-4 py-3",
                  // mobile 2×2: lines between columns and rows · desktop 1×4: lines between columns
                  i % 2 === 1 && "border-l border-border",
                  i >= 2 && "border-t border-border lg:border-t-0",
                  i === 2 && "lg:border-l",
                )}
              >
                <dt className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted">{s.label}</dt>
                <dd className="text-sm font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>

          {product.tastingNotes.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="font-sans text-2xs font-bold uppercase tracking-[0.12em] text-fg">Tasting notes</h2>
              <ul className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note) => (
                  <li key={note}>
                    {/* A link, not a toggle: it opens the list filtered by this note */}
                    <Link
                      to={`/products?tastingNotes=${encodeURIComponent(note)}`}
                      className={cn(
                        "inline-flex h-8 items-center rounded-full border border-border bg-surface px-3 text-sm transition-colors hover:border-input hover:bg-surface-2",
                        focusRing,
                      )}
                    >
                      {noteLabel(note)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="max-w-[56ch] text-base leading-[26px]">{product.description}</p>

          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              {product.inStock && (
                <QuantityStepper value={quantity} onChange={setQuantity} max={99} label="Quantity" />
              )}
              <Button className="min-w-0 flex-1 pointer-coarse:h-11" onClick={onAdd} loading={add.isPending} disabled={!product.inStock}>
                {!add.isPending && <BagIcon />}
                {!product.inStock ? (
                  "Out of stock"
                ) : add.isPending ? (
                  "Adding…"
                ) : (
                  <>
                    Add to cart
                    {/* the mobile design drops the price to make room */}
                    <span className="hidden lg:inline">· {formatPrice(product.priceCents * quantity)}</span>
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                className={cn("w-10 px-0 [&_svg]:size-5 pointer-coarse:size-11", isFavorite && "text-sale")}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
                onClick={() => !requireLogin() && toggle()}
              >
                <HeartIcon filled={isFavorite} />
              </Button>
            </div>
            {inCart > 0 && (
              <p className="text-sm text-muted">
                {inCart} in your cart ·{" "}
                <button type="button" onClick={openCart} className="font-semibold text-fg underline underline-offset-3">
                  View cart
                </button>
              </p>
            )}
          </div>

          <ul className="flex flex-col gap-2 rounded-lg border border-border p-4 text-sm">
            <li className="flex items-center gap-3">
              <TruckIcon className="size-4 shrink-0" />
              Free delivery over €100 · arrives in 2–4 working days
            </li>
            <li className="flex items-center gap-3">
              <ShieldIcon className="size-4 shrink-0" />
              18+ only. The courier checks ID on delivery.
            </li>
            {product.giftBox && (
              <li className="flex items-center gap-3">
                <GiftIcon className="size-4 shrink-0" />
                Comes in a gift box
              </li>
            )}
          </ul>
        </div>
      </div>

      <YouMayAlsoLike product={product} />
    </Container>
  );
}

// Same brand, minus this bottle. Asks for 5 so there are still 4 after
// removing the current one.
function YouMayAlsoLike({ product }: { product: WhiskeyProduct }) {
  const { data, isPending } = useProducts({ brand: [product.brand], limit: 5, sort: "rating_desc" });
  const related = data?.data.filter((p) => p.id !== product.id).slice(0, 4) ?? [];

  if (!isPending && related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="flex flex-col gap-6 pt-16">
      <h2 id="related-heading" className="text-2xl">
        You may also like
      </h2>
      <ProductGrid columns={4}>
        {isPending
          ? Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)
          : related.map((p) => <ProductCard key={p.id} product={p} />)}
      </ProductGrid>
    </section>
  );
}

// Design 3b: the page's shape in grey blocks, at the real sizes.
function ProductDetailSkeleton() {
  return (
    <Container className="pb-16">
      <div className="flex gap-2 pt-6" aria-hidden="true">
        <Skeleton className="h-5 w-48" />
      </div>
      <div
        aria-busy="true"
        className="flex flex-col gap-6 pt-4 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pt-6"
      >
        <span className="sr-only">Loading product</span>
        <Skeleton className="h-95 rounded-lg lg:h-170" />
        <div className="flex flex-col gap-4 pt-2">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-11 w-[85%]" />
          <Skeleton className="h-11 w-[60%]" />
          <Skeleton className="h-5 w-[35%]" />
          <Skeleton className="mt-2 h-9 w-[45%]" />
          <Skeleton className="h-18 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="h-4 w-[92%]" />
          <Skeleton className="h-4 w-[70%]" />
          <Skeleton className="mt-4 h-10 w-full" />
        </div>
      </div>
    </Container>
  );
}

export default ProductDetail;
