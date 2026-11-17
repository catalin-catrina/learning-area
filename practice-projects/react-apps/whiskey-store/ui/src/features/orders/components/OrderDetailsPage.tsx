import { useParams } from "react-router-dom";
import { useGetOrder } from "../hooks/useOrders";

function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, error } = useGetOrder(Number(orderId));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading order details</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order?.id}</p>
      <p>Status: {order?.status}</p>
      <p>Total: €{order.totalCents / 100}</p>
      <h2>Shipping Address</h2>
      <p>{order?.shippingAddress.name}</p>
      <p>{order?.shippingAddress.line1}</p>
      {order?.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
      <p>
        {order?.shippingAddress.city}, {order?.shippingAddress.postalCode}
      </p>
      <p>{order?.shippingAddress.country}</p>
    </div>
  );
}

export default OrderDetailsPage;
