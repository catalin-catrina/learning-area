import api from "../../../shared/services/api";
import type { Favorite } from "../favorites.types";

export async function getFavorites(): Promise<Favorite[]> {
  const response = await api.get("/favorites");
  return response.data;
}

export async function addFavorite(productId: number): Promise<Favorite> {
  const response = await api.post("/favorites", { productId });
  return response.data;
}

export async function removeFavorite(productId: number): Promise<void> {
  await api.delete(`/favorites/${productId}`);
}

export async function isFavorite(productId: number): Promise<boolean> {
  const response = await api.get(`/favorites/${productId}`);
  return response.data.isFavorite;
}