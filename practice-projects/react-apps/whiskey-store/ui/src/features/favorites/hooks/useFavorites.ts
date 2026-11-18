import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  addFavorite,
  getFavorites,
  isFavorite,
  removeFavorite,
} from "../services/favorites.service";

export const favoritesKey = (userId?: number) => ["favorites", userId] as const;

export function useGetFavorites() {
  const { user } = useAuth();

  return useQuery({
    queryKey: favoritesKey(user?.id),
    queryFn: () => getFavorites(),
  });
}

export function useFavoriteMutations() {
  const qc = useQueryClient();
  const { user } = useAuth();

  return {
    add: useMutation({
      mutationFn: addFavorite,
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: favoritesKey(user?.id) });
      },
    }),
    remove: useMutation({
      mutationFn: removeFavorite,
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: favoritesKey(user?.id) });
      },
    }),
  };
}

export function useIsFavorite(productId: number) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["isFavorite", user?.id, productId],
    queryFn: () => isFavorite(productId),
    enabled: !!user,
  });
}
