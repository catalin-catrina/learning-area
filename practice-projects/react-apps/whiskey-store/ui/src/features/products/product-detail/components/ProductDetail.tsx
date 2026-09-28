import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/products.service";
import { useAuth } from "../../../auth/hooks/useAuth";

function ProductDetail() {
  const { id } = useParams(); // always a string, or undefined if truly absent
  const { user, token } = useAuth();

  console.log(`user, token: ${user}, ${token}`)

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id, // don't fire the query before an id exists
  });

  if (isLoading) return <p>Loading...</p>;
  return <div>{product?.name}</div>;
}

export default ProductDetail;
