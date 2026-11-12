import { useSearchParams } from "react-router-dom";
import { useOrder } from "../../orders/hooks/useOrders";

function PaymentReturnPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const numericOrderId = Number(orderId);

  const {
    data: order,
    isPending,
    isError,
  } = useOrder(numericOrderId, { refetchInterval: 2000 });

  if (isPending) return <p>Loading...</p>;

  if (isError) {
    return (
      <div role="alert">
        <p>Could not fetch order details.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Information about your payment</h1>
      <p>Order ID: {order?.id}</p>
      <p>Status: {order?.status}</p>
      Ordered items:{" "}
      {order.items.map((item) => (
        <div key={item.id}>
          <p>
            Item: {item.quantity}x {item.productName}
          </p>
        </div>
      ))}
      <p>Total: €{order.totalCents / 100}</p>
    </div>
  );
}

export default PaymentReturnPage;
