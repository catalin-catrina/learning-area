import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { OrderResponse } from "../order.types";
import { cartKey } from "../../cart/hooks/useCart";
import {
  cancelOrder,
  createOrder,
  getOrder,
  getOrders,
} from "../services/orders.service";

export function useCreateOrder() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();
  const onSuccess = (data: OrderResponse) => {
    qc.invalidateQueries({ queryKey: cartKey(user?.id) });
    navigate(`/checkout/${data.order.id}`);
  };

  return useMutation({ mutationFn: createOrder, onSuccess });
}

export function useGetOrder(
  orderId: number,
  { refetchInterval = false }: { refetchInterval?: number | false } = {},
) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    refetchInterval: (query) =>
      query.state.data?.status === "PENDING" ? refetchInterval : false,
    enabled: !!orderId,
  });
}

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}

export function useCancelOrder(orderId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => cancelOrder(orderId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["order", orderId] });
    },
  });
}
