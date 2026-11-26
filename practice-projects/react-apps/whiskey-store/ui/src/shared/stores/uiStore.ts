import { create } from "zustand";

// Pure UI state that several unrelated components need: the header's cart
// button opens the drawer, and so does "Add to cart" on the product page.
// Server data (the cart itself) stays in TanStack Query.
type UiState = {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
}));
