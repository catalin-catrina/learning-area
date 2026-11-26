import { Link } from "react-router-dom";
import { cn } from "cn";
import Sheet from "../../../shared/components/Sheet";
import EmptyState from "../../../shared/components/EmptyState";
import { BagIcon, buttonClasses, Spinner, StatusDot } from "../../../shared/ui";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { useUiStore } from "../../../shared/stores/uiStore";
import { useCart } from "../hooks/useCart";
import { cartTotals, FREE_DELIVERY_CENTS, itemsLabel } from "../cartTotals";
import CartLineItem from "./CartLineItem";

// Design 2a/2b. Opens from the header's cart button, or after "Add to cart".
function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen);
  const close = useUiStore((s) => s.closeCart);
  const { data: cart, isPending } = useCart();
  const { count, subtotalCents } = cartTotals(cart);
  const empty = !isPending && count === 0;

  return (
    <Sheet
      open={open}
      onClose={close}
      title="Your cart"
      subtitle={isPending ? undefined : itemsLabel(count)}
      closeLabel="Close cart"
      footer={
        !empty &&
        !isPending && (
          <>
            <div className="flex justify-between gap-4 text-sm">
              <span>Subtotal</span>
              <span className="font-bold tabular-nums">{formatPrice(subtotalCents)}</span>
            </div>
            <p className="text-xs text-muted">Includes VAT. Delivery is free over €100; worked out at checkout.</p>
            <Link to="/checkout" onClick={close} className={buttonClasses({ className: "w-full" })}>
              Checkout
            </Link>
            <Link to="/cart" onClick={close} className={buttonClasses({ variant: "secondary", className: "w-full" })}>
              View cart
            </Link>
          </>
        )
      }
    >
      {isPending ? (
        <div className="flex justify-center py-12" aria-busy="true">
          <Spinner className="size-6" />
          <span className="sr-only">Loading your cart</span>
        </div>
      ) : empty ? (
        <EmptyState
          icon={<BagIcon />}
          title="Your cart is empty"
          headingLevel="h3"
          actions={
            <Link to="/products?style=single_malt" onClick={close} className={buttonClasses()}>
              Browse single malts
            </Link>
          }
        >
          Add a bottle and it will wait here for you.
        </EmptyState>
      ) : (
        <>
          {subtotalCents >= FREE_DELIVERY_CENTS && (
            <StatusDot tone="success" className={cn("mt-4")}>
              Free delivery unlocked: your order is over €100
            </StatusDot>
          )}
          <ul aria-label="Items in your cart">
            {cart?.items.map((item) => <CartLineItem key={item.id} item={item} onNavigate={close} />)}
          </ul>
        </>
      )}
    </Sheet>
  );
}

export default CartDrawer;
