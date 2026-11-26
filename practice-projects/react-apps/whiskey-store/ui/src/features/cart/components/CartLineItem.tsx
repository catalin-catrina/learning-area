import { Link } from "react-router-dom";
import { Badge, Button, QuantityStepper, TrashIcon } from "../../../shared/ui";
import ProductThumb from "../../../shared/components/ProductThumb";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { discountLabel, productMeta, productPath } from "../../products/productLabels";
import { useCartMutations } from "../hooks/useCart";
import type { CartItemDto } from "../cart.types";

// One line in the cart drawer (2a) and on the cart page (4a).
// Minus stops at 1 (as drawn); removing is the explicit "Remove" button.
function CartLineItem({ item, onNavigate }: { item: CartItemDto; onNavigate?: () => void }) {
  const { update, remove } = useCartMutations();
  const p = item.product;
  const discount = discountLabel(p);
  const busy =
    (update.isPending && update.variables?.productId === p.id) ||
    (remove.isPending && remove.variables === p.id);

  return (
    <li className="grid grid-cols-[72px_minmax(0,1fr)] items-start gap-3 border-b border-border py-4 lg:grid-cols-[96px_minmax(0,1fr)_auto] lg:gap-4 lg:py-5">
      <ProductThumb src={p.imageUrl} />

      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted">{p.brand}</p>
        <h3 className="text-lg">
          <Link to={productPath(p)} onClick={onNavigate} className="hover:underline hover:underline-offset-3">
            {p.name}
          </Link>
        </h3>
        <p className="text-xs text-muted">{productMeta(p)}</p>
        <div className="flex flex-wrap items-baseline gap-2 pt-1 text-sm tabular-nums">
          <span className={discount ? "font-bold text-sale" : "font-bold"}>{formatPrice(p.priceCents)} each</span>
          {discount && (
            <>
              <s className="text-muted">
                <span className="sr-only">Was </span>
                {formatPrice(p.compareAtPriceCents!)}
              </s>
              <Badge variant="sale" className="self-center">
                {discount}
              </Badge>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 pt-3">
          <QuantityStepper
            value={item.quantity}
            label={`Quantity for ${p.name}`}
            loading={busy}
            onChange={(quantity) => update.mutate({ productId: p.id, quantity })}
          />
          <Button variant="ghost" size="sm" disabled={busy} onClick={() => remove.mutate(p.id)}>
            <TrashIcon />
            Remove
          </Button>
        </div>
        {/* Mobile: line total under the controls */}
        <p className="pt-2 text-lg font-bold tabular-nums lg:hidden">{formatPrice(p.priceCents * item.quantity)}</p>
      </div>

      <p className="hidden text-lg font-bold tabular-nums lg:block">{formatPrice(p.priceCents * item.quantity)}</p>
    </li>
  );
}

export default CartLineItem;
