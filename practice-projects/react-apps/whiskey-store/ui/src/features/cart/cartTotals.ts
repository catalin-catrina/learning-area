import type { CartResponseDto } from "./cart.types";

/** Delivery is free over this amount (the "Free delivery unlocked" line). */
export const FREE_DELIVERY_CENTS = 100_00;

export function cartTotals(cart: CartResponseDto | undefined) {
  const items = cart?.items ?? [];
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  // What the shopper saves vs the struck-through prices
  const savedCents = items.reduce((sum, i) => {
    const was = i.product.compareAtPriceCents;
    return was && was > i.product.priceCents ? sum + (was - i.product.priceCents) * i.quantity : sum;
  }, 0);
  return { count, subtotalCents: cart?.totalCents ?? 0, savedCents };
}

export const itemsLabel = (n: number) => `${n} ${n === 1 ? "item" : "items"}`;
