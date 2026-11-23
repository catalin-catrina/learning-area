import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useCart, useCartMutations } from "../../../cart/hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import {
  useFavoriteMutations,
  useIsFavorite,
} from "../../../favorites/hooks/useFavorites";
import { useAuth } from "../../../auth/hooks/useAuth";

function ProductDetail() {
  const { id } = useParams(); // string | undefined
  const {
    data: product,
    isPending: productPending,
    isError: productError,
  } = useProduct(Number(id));
  const { user } = useAuth();

  const { add: addFavorite, remove: removeFavorite } = useFavoriteMutations();
  const { data: isFavorite } = useIsFavorite(Number(id));
  const navigate = useNavigate();
  const location = useLocation();

  const { add, update, remove } = useCartMutations();
  const { data: cart, isError: cartError } = useCart();
  const quantityUpdatePending =
    add.isPending || update.isPending || remove.isPending;

  const handleAddToCart = (productId: number) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    add.mutate({ productId, quantity: 1 });
  };

  const handleFavoriteToggle = (productId: number) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (isFavorite) {
      removeFavorite.mutate(productId);
    } else {
      addFavorite.mutate(productId);
    }
  };

  if (productPending) return <p>Loading...</p>;
  if (productError || cartError) return <p>Could not load this page.</p>;
  if (!product) return <p>Product not found.</p>;

  const item = cart?.items.find((i) => i.productId === product.id);

  console.log("quantity update pending", quantityUpdatePending);

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
          onClick={() => handleAddToCart(product.id)}
        >
          Add to cart
        </button>
      )}

      <button onClick={() => handleFavoriteToggle(product.id)}>
        {isFavorite ? <RemoveIcon /> : <AddIcon />}
      </button>
    </div>
  );
}

export default ProductDetail;
