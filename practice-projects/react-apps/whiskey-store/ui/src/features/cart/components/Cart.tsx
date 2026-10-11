import { IconButton } from "@mui/material";
import { useCart, useCartMutations } from "../hooks/useCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Cart() {
  const { data: cart, isPending: cartPending } = useCart();
  const { update, remove } = useCartMutations();

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
          TOTAL: {totalItems} products - {cart?.total}
        </div>
      </div>
    </div>
  );
}

export default Cart;
