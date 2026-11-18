import { Button, IconButton } from "@mui/material";
import { useCart, useCartMutations } from "../hooks/useCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../shared/utils/formatPrice";

function Cart() {
  const navigate = useNavigate();
  const { data: cart, isPending: cartPending } = useCart();
  const { update, remove } = useCartMutations();
  const quantityUpdatePending = update.isPending || remove.isPending;

  const totalItems = cart?.items.reduce(
    (prev, curr) => prev + curr.quantity,
    0,
  );

  if (cartPending) return <p>Loading...</p>;

  return (
    <div>
      <div className="cart flex justify-between p-4 gap-4">
        <div className="cart-items">
          {cart && cart.items
            ? cart.items.map((cartItem) => (
                <div key={cartItem.id} className="flex items-center">
                  <div>{cartItem.product.name}</div>
                  <div>
                    <IconButton
                      disabled={quantityUpdatePending}
                      onClick={() =>
                        cartItem.quantity === 1
                          ? remove.mutate(cartItem.product.id)
                          : update.mutate({
                              productId: cartItem.product.id,
                              quantity: cartItem.quantity - 1,
                            })
                      }
                    >
                      <RemoveIcon />
                    </IconButton>

                    <span>{cartItem.quantity}</span>

                    <IconButton
                      disabled={quantityUpdatePending}
                      onClick={() =>
                        update.mutate({
                          productId: cartItem.product.id,
                          quantity: cartItem.quantity + 1,
                        })
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className="cart-total">
          TOTAL: {totalItems} products - {cart && formatPrice(cart.totalCents)}
        </div>
      </div>

      <div className="btn-checkout-container">
        <Button
          onClick={() => navigate("/checkout")}
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
          Go to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
