import type { Favorite } from "../favorites.types";
import { useGetFavorites } from "../hooks/useFavorites";

function FavoritesPage() {
  const { data: favorites, isPending, isError } = useGetFavorites();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Could not load favorites.</p>;

  return (
    <div>
      <h1>Favorites</h1>
      {favorites?.length === 0 ? (
        <p>You have no favorite products.</p>
      ) : (
        <ul>
          {favorites?.map((favorite: Favorite) => (
            <li key={favorite.productId}>
              <h2>{favorite.product.name}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
