import { Link } from "react-router-dom";
import Container from "../../../shared/layout/Container";
import EmptyState from "../../../shared/components/EmptyState";
import { BagIcon, buttonClasses, LockIcon, Skeleton, StatusDot } from "../../../shared/ui";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { useProducts } from "../../products/hooks/useProducts";
import { ProductCard, ProductCardSkeleton, ProductGrid } from "../../products/components/ProductCard";
import { useCart } from "../hooks/useCart";
import { cartTotals, FREE_DELIVERY_CENTS, itemsLabel } from "../cartTotals";
import CartLineItem from "./CartLineItem";
import { Free, SummaryPanel, SummaryRow, SummaryTotal } from "../../../shared/components/OrderSummary";

// Design 4a (items) / 4b (empty).
function Cart() {
  const { data: cart, isPending } = useCart();
  const { count, subtotalCents, savedCents } = cartTotals(cart);

  return (
    <Container className="pb-20">
      <div className="flex flex-col gap-1 pt-8">
        <h1 className="text-[30px] leading-9 lg:text-4xl">Your cart</h1>
        <p className="text-sm text-muted">{isPending ? "Loading…" : itemsLabel(count)}</p>
      </div>

      {isPending ? (
        <div aria-busy="true" className="flex flex-col gap-4 pt-6">
          <span className="sr-only">Loading your cart</span>
          {[0, 1].map((i) => (
            <Skeleton key={i} className="h-30 w-full max-w-3xl" />
          ))}
        </div>
      ) : count === 0 ? (
        <>
          <EmptyState
            icon={<BagIcon />}
            title="Your cart is empty"
            panel
            className="mt-6"
            actions={
              <>
                <Link to="/products?style=single_malt" className={buttonClasses()}>
                  Browse single malts
                </Link>
                <Link to="/products?onSale=true" className={buttonClasses({ variant: "secondary" })}>
                  See offers
                </Link>
              </>
            }
          >
            Nothing in here yet. Start with a Speyside classic, or check what's on offer.
          </EmptyState>
          <PopularRightNow />
        </>
      ) : (
        <div className="flex flex-col gap-8 pt-2 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
          <section aria-label="Items" className="min-w-0">
            {subtotalCents >= FREE_DELIVERY_CENTS && (
              <StatusDot tone="success" className="pt-4">
                Free delivery unlocked: your order is over €100
              </StatusDot>
            )}
            <ul aria-label="Items in your cart">
              {cart?.items.map((item) => (
                <CartLineItem key={item.id} item={item} />
              ))}
            </ul>
            <Link to="/products" className="mt-5 inline-block text-sm font-semibold underline underline-offset-3">
              Continue shopping
            </Link>
          </section>

          <SummaryPanel titleId="cart-summary">
            <SummaryRow label={`Subtotal (${itemsLabel(count)})`} value={formatPrice(subtotalCents + savedCents)} />
            {savedCents > 0 && (
              <SummaryRow label="You save" value={<span className="font-semibold text-sale">−{formatPrice(savedCents)}</span>} />
            )}
            <SummaryRow label="Delivery" value={<Free />} />
            <hr className="border-border" />
            <SummaryTotal totalCents={subtotalCents} />
            <p className="text-xs text-muted">Prices include VAT for your delivery country.</p>
            <Link to="/checkout" className={buttonClasses({ className: "w-full" })}>
              <LockIcon />
              Checkout
            </Link>
            <p className="text-center text-xs text-muted">You'll confirm you're 18 or over before paying.</p>
          </SummaryPanel>
        </div>
      )}
    </Container>
  );
}

function PopularRightNow() {
  const { data, isPending } = useProducts({ sort: "rating_desc", limit: 4, inStock: true });
  return (
    <section aria-labelledby="popular-heading" className="flex flex-col gap-6 pt-14">
      <h2 id="popular-heading" className="text-2xl">
        Popular right now
      </h2>
      <ProductGrid columns={4}>
        {isPending
          ? Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)
          : data?.data.map((p) => <ProductCard key={p.id} product={p} />)}
      </ProductGrid>
    </section>
  );
}

export default Cart;
