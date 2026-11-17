import { useNavigate } from "react-router-dom";
import { useGetOrders } from "../hooks/useOrders";

function OrdersPage() {
  const navigate = useNavigate();
  const {data: orders, isLoading, error} = useGetOrders();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders</p>;

  return <div>
    <h1>My Orders</h1>
    {orders?.length === 0 ? (
      <p>You have no orders.</p>
    ) : (
      <ul>
        {orders?.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total: €{order.totalCents / 100}</p>
            <button onClick={() => navigate(`/orders/${order.id}`)}>View Order</button>
          </li>
        ))}
      </ul>
    )}
  </div>;
}

export default OrdersPage;
