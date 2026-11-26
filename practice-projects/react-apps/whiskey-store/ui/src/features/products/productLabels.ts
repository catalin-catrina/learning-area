import type { WhiskeyProduct, WhiskyStyle } from "./product.types";

// How product data is turned into display text. One place, so cards, the
// product page, the cart and the filters all say the same thing.

export const STYLE_LABELS: Record<WhiskyStyle, string> = {
  single_malt: "Single malt",
  blended_malt: "Blended malt",
  blended: "Blended",
  single_grain: "Single grain",
  single_pot_still: "Single pot still",
  bourbon: "Bourbon",
  rye: "Rye",
};

/** Tasting notes are stored lowercase ("baked apple") → "Baked apple". */
export const noteLabel = (note: string) => note.charAt(0).toUpperCase() + note.slice(1);

export const ageLabel = (age: number | null) => (age === null ? "No age statement" : `${age} years`);

export const volumeLabel = (ml: number) => (ml % 10 === 0 ? `${ml / 10}cl` : `${ml}ml`);

/** "70cl · 40% · 12 years" (the age part only when there is one) */
export function productMeta(p: Pick<WhiskeyProduct, "volumeMl" | "abv" | "ageYears">): string {
  return [volumeLabel(p.volumeMl), `${p.abv}%`, p.ageYears !== null ? `${p.ageYears} years` : null]
    .filter(Boolean)
    .join(" · ");
}

/** "Glenfiddich · Speyside, Scotland" */
export function originLine(p: Pick<WhiskeyProduct, "brand" | "region" | "country">): string {
  return `${p.brand} · ${[p.region, p.country].filter(Boolean).join(", ")}`;
}

/** "-17%" or null when not on sale */
export function discountLabel(p: Pick<WhiskeyProduct, "priceCents" | "compareAtPriceCents">): string | null {
  if (!p.compareAtPriceCents || p.compareAtPriceCents <= p.priceCents) return null;
  return `-${Math.round((1 - p.priceCents / p.compareAtPriceCents) * 100)}%`;
}

export const productPath = (p: Pick<WhiskeyProduct, "id">) => `/products/${p.id}`;

// Header + footer category links (decided in the design map)
export const CATEGORY_LINKS = [
  { label: "Single malt", to: "/products?style=single_malt" },
  { label: "Blends", to: "/products?style=blended&style=blended_malt" },
  { label: "Gifts", to: "/products?giftBox=true" },
  { label: "Offers", to: "/products?onSale=true" },
];
