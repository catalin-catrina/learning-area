import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart, useCartMutations } from "../../../cart/hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import { IconButton } from "@mui/material";

function ProductDetail() {
  const { id } = useParams(); // string | undefined

  const { add, update, remove } = useCartMutations();
  const {
    data: product,
    isPending: productPending,
    isError: productError,
  } = useProduct(Number(id));

  const { data: cart, isPending: cartPending, isError: cartError } = useCart();
  const quantityUpdatePending =
    add.isPending || update.isPending || remove.isPending;

  if (productPending || cartPending) return <p>Loading...</p>;
  if (productError || cartError) return <p>Could not load this page.</p>;
  if (!product) return <p>Product not found.</p>;

  const item = cart?.items.find((i) => i.productId === product.id);

  return (
    <div>
      <h1>{product?.name}</h1>
      {item ? (
        <>
          <IconButton
            disabled={quantityUpdatePending}
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
            disabled={quantityUpdatePending}
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
          disabled={quantityUpdatePending}
          onClick={() => add.mutate({ productId: product.id, quantity: 1 })}
        >
          Add to cart
        </button>
      )}
    </div>
  );
}

export default ProductDetail;
