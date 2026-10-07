import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/products.service";

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: Number.isFinite(id)
  });
}