import api from "../../../shared/services/api";
import type { Order, OrderResponse, ShippingAddress } from "../order.types";

export async function getOrder(orderId: number): Promise<Order> {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
}

export async function getOrders(): Promise<Order[]> {
  const response = await api.get("/orders");
  return response.data;
}

export async function createOrder(
  shippingAddress: ShippingAddress,
): Promise<OrderResponse> {
  const response = await api.post(`/orders/checkout`, { shippingAddress });
  return response.data;
}

export async function cancelOrder(orderId: number): Promise<void> {
  await api.patch(`/orders/${orderId}/cancel`);
}
