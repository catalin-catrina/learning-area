export type ShippingAddress = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderResponse = {
  message: string;
  order: Order;
};

export type Order = {
  id: number;
  userId: string;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  totalCents: number;
  checkoutSessionCreationKey: string;
  items: OrderItem[];
};

export type OrderItem = {
  id: number;
  quantity: number;
  unitPriceCents: number;
  productName: string;

  orderId: number;
  productId: number;
};

export type OrderStatus =
  | "PENDING"
  | "SHIPPED"
  | "DELIVERED"
  | "PAID"
  | "CANCELLED";
