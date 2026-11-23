import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import type { Favorite } from "../favorites.types";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/favorites.service";

export const favoritesKey = (userId?: number) => ["favorites", userId] as const;

export function useGetFavorites() {
  const { user } = useAuth();

  return useQuery({
    queryKey: favoritesKey(user?.id),
    queryFn: () => getFavorites(),
    enabled: !!user, // product pages are public: guests have no favorites to fetch
  });
}

// One source of truth: "is this a favorite?" is derived from the favorites
// list. Before, it was a separate ["isFavorite", ...] query that the
// mutations never refreshed, so after the first add the heart still read
// "not a favorite" and the next click POSTed again (400 duplicate).
// Bonus: product cards in a grid can use this too, with zero extra requests.
export function useIsFavorite(productId: number) {
  const { data: favorites } = useGetFavorites();
  return favorites?.some((f) => f.productId === productId) ?? false;
}

export function useFavoriteMutations() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const key = favoritesKey(user?.id);

  // Optimistic update: change the cache immediately so the heart fills
  // instantly, undo it if the request fails, re-sync with the server either way.
  const optimistic = (apply: (list: Favorite[], productId: number) => Favorite[]) => ({
    onMutate: async (productId: number) => {
      await qc.cancelQueries({ queryKey: key });
      const previous = qc.getQueryData<Favorite[]>(key);
      qc.setQueryData<Favorite[]>(key, (list = []) => apply(list, productId));
      return { previous };
    },
    onError: (_err: unknown, _productId: number, context?: { previous?: Favorite[] }) => {
      qc.setQueryData(key, context?.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  return {
    add: useMutation({
      mutationFn: addFavorite,
      ...optimistic((list, productId) =>
        list.some((f) => f.productId === productId)
          ? list
          : // placeholder row until the refetch brings the real one
            [...list, { productId } as Favorite],
      ),
    }),
    remove: useMutation({
      mutationFn: removeFavorite,
      ...optimistic((list, productId) => list.filter((f) => f.productId !== productId)),
    }),
  };
}

/** Toggle helper for heart buttons. */
export function useToggleFavorite(productId: number) {
  const isFavorite = useIsFavorite(productId);
  const { add, remove } = useFavoriteMutations();
  return {
    isFavorite,
    toggle: () => (isFavorite ? remove.mutate(productId) : add.mutate(productId)),
  };
}
