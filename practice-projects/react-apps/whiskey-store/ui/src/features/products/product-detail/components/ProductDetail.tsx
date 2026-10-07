import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart, useCartMutations } from "../../../cart/hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import { IconButton } from "@mui/material";

function ProductDetail() {
  const { id } = useParams(); // string | undefined

  const { data: product } = useProduct(Number(id));
  const { data: cart, isPending: cartPending } = useCart();
  const { add, update, remove } = useCartMutations();

  if (!product || cartPending) return <p>Loading...</p>;

  const item = cart?.items.find((i) => i.productId === product.id);

  return (
    <div>
      <h1>{product?.name}</h1>
      {item ? (
        <>
          <IconButton
            disabled={cartPending}
            onClick={() =>
              item.quantity === 1
                ? remove.mutate(product.id)
                : update.mutate({
                    productId: product.id,
                    quantity: item.quantity - 1,
                  })
            }
          >
            <RemoveIcon />
          </IconButton>

          <span>{item.quantity}</span>

          <IconButton
            disabled={cartPending}
            onClick={() =>
              update.mutate({
                productId: product.id,
                quantity: item.quantity + 1,
              })
            }
          >
            <AddIcon />
          </IconButton>
        </>
      ) : (
        <button
          onClick={() => add.mutate({ productId: product.id, quantity: 1 })}
        >
          Add to cart
        </button>
      )}
      <div className="cart flex flex-col">
        {cart && cart.items
          ? cart.items.map((p) => (
              <div key={p.id}>
                {p.product.name} - {p.quantity}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default ProductDetail;
