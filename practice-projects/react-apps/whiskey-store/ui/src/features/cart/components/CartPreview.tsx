import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

type CartPreviewProps = {
  onNavigate: () => void;
};

function CartPreview({ onNavigate }: CartPreviewProps) {
  const navigate = useNavigate();
  const { data: cart, isPending: cartPending } = useCart();

  const totalItems = cart?.items.reduce(
    (prev, curr) => prev + curr.quantity,
    0,
  );

  if (cartPending) return <p>Loading...</p>;

  return (
    <div className="cart flex flex-col p-4 gap-4">
      <div className="cart-items">
        {cart && cart.items
          ? cart.items.map((p) => (
              <div key={p.id}>
                {p.product.name} - {p.quantity} - {p.product.price * p.quantity}
              </div>
            ))
          : ""}
      </div>
      <div className="cart-total border border-transparent border-t-gray-300 border-b-gray-300 pt-3 pb-3">
        TOTAL: {totalItems} products - {cart?.total}
      </div>
      <div className="cart-button">
        <Button
          onClick={() => {
            onNavigate();
            navigate("/cart");
          }}
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#4c1d95",
            color: "#fff",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#3b0764",
            },
          }}
        >
          Go to cart
        </Button>
      </div>
    </div>
  );
}

export default CartPreview;
