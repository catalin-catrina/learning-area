import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/products.service";
import { useAuth } from "../../../auth/hooks/useAuth";
import { getCart } from "../../../cart/services/cart.service";
import { useEffect } from "react";

function ProductDetail() {
  const { id } = useParams(); // always a string, or undefined if truly absent
  const { user } = useAuth();

  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id, // don't fire the query before an id exists
  });

  const { data: cart, isLoading: isCartLoading } = useQuery({
    queryKey: ["cart", user],
    queryFn: () => getCart(),
    enabled: !!user,
  });

  let itemInCart;
  const itemInCartEffect = useEffect(() => {
    
  }, [cart])

  if (isProductLoading || isCartLoading) return <p>Loading...</p>;
  return (
    <div>
      <h1>{product?.name}</h1>
      <div className="cart">
        {cart ? cart.items.map((p) => `${p.product} - ${p.quantity}`) : ''}
      </div>
    </div>
  );
}

export default ProductDetail;
