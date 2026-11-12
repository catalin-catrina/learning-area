import { useQuery } from "@tanstack/react-query";
import { createPaymentSession } from "../services/checkout.service";

export function usePaymentSession(orderId: number) {
  return useQuery({
    queryKey: ["payment-session", orderId],
    queryFn: () => createPaymentSession(orderId),
    enabled: Number.isSafeInteger(orderId) && orderId > 0,
    staleTime: Infinity, // stops React Query from refetching on window focus (because data is never considered stale)
    retry: false, // stops React Query from automatically firing the failed request 3 more times if the backend returns a 404 or 409 error.
  });
}
