import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useToastStore } from "../../../shared/stores/toastStore";
import { useUiStore } from "../../../shared/stores/uiStore";
import type { WhiskeyProduct } from "../../products/product.types";
import { addItem } from "../services/cart.service";
import { cartKey } from "./useCart";

// "Add to cart" from a product card or the product page: login check, the
// request, and the "Added to cart" toast, in one place. The +/− steppers in
// the cart use `update` from useCartMutations instead, so they never toast.
export function useAddToCart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const qc = useQueryClient();
  const show = useToastStore((s) => s.show);
  const openCart = useUiStore((s) => s.openCart);

  const mutation = useMutation({
    mutationFn: addItem,
    onSuccess: (cart) => qc.setQueryData(cartKey(user?.id), cart),
  });

  const addToCart = (product: WhiskeyProduct, quantity = 1, onDone?: () => void) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    mutation.mutate(
      { productId: product.id, quantity },
      {
        onSuccess: () => {
          show({
            title: "Added to cart",
            description: quantity > 1 ? `${quantity} × ${product.name}` : product.name,
            imageUrl: product.imageUrl ?? null,
            action: { label: "View cart", onClick: openCart },
          });
          onDone?.();
        },
        onError: () => show({ tone: "error", title: "Couldn't add to cart", description: "Please try again." }),
      },
    );
  };

  return { addToCart, isPending: mutation.isPending };
}
