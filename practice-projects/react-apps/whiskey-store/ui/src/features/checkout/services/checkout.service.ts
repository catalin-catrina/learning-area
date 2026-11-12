import api from "../../../shared/services/api";
import type { CreatePaymentSessionResponse } from "../checkout.types";

export async function createPaymentSession(
  orderId: number,
): Promise<CreatePaymentSessionResponse> {
  const response = await api.post(`/orders/${orderId}/payment-session`);
  return response.data;
}
