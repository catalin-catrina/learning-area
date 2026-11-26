export type ShippingAddress = {
  /** Only on saved addresses ("Home"); order snapshots don't keep it. */
  label?: string | null;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
};

// Checkout body: a saved address, or a one-off address (optionally saved to the profile)
export type CheckoutPayload =
  | { addressId: number }
  | { shippingAddress: ShippingAddress; saveAddress?: boolean; makeDefault?: boolean };

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
  createdAt: string;
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
  /** A few product fields for thumbnails (null if the product was deleted). */
  product?: { imageUrl: string | null; brand: string; slug: string } | null;
};

export type OrderStatus =
  | "PENDING"
  | "SHIPPED"
  | "DELIVERED"
  | "PAID"
  | "CANCELLED";
