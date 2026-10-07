import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  addItem,
  deleteItem,
  getCart,
  updateItemQuantity,
} from "../services/cart.service";
import type { CartResponseDto } from "../cart.types";

export const cartKey = (userId?: number) => ["cart", userId] as const;

export function useCart() {
  const { user } = useAuth();
  return useQuery({
    queryKey: cartKey(Number(user?.id)),
    queryFn: getCart,
    enabled: !!user, // don't fire the query before an user exists
    staleTime: 60_000,
  });
}

export function useCartMutations() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const onSuccess = (cart: CartResponseDto) =>
    qc.setQueryData(cartKey(Number(user?.id)), cart);

  return {
    add: useMutation({ mutationFn: addItem, onSuccess }),
    update: useMutation({ mutationFn: updateItemQuantity, onSuccess }),
    remove: useMutation({ mutationFn: deleteItem, onSuccess }),
  };
}
