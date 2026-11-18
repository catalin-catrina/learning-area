const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

// All money travels as integer cents; only format at the edge (the UI).
export function formatPrice(cents: number): string {
  return eur.format(cents / 100);
}
