import api from "../../../shared/services/api";
import type { CheckoutPayload, Order, OrderResponse } from "../order.types";

export async function getOrder(orderId: number): Promise<Order> {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
}

export async function getOrders(): Promise<Order[]> {
  const response = await api.get("/orders");
  return response.data;
}

export async function createOrder(
  payload: CheckoutPayload,
): Promise<OrderResponse> {
  const response = await api.post(`/orders/checkout`, payload);
  return response.data;
}

export async function cancelOrder(orderId: number): Promise<void> {
  await api.patch(`/orders/${orderId}/cancel`);
}
