import { Link } from "react-router-dom";
import EmptyState from "../../../shared/components/EmptyState";
import { buttonClasses, HeartIcon } from "../../../shared/ui";
import { ProductCard, ProductCardSkeleton, ProductGrid } from "../../products/components/ProductCard";
import { useGetFavorites } from "../hooks/useFavorites";

// Designs 8e (grid) / 8f (empty). The heart on each card removes it.
function FavoritesPage() {
  const { data: favorites, isPending, isError } = useGetFavorites();
  // skip optimistic placeholder rows (no product yet) until the refetch lands
  const list = (favorites ?? []).filter((f) => f.product);

  if (isPending) {
    return (
      <ProductGrid aria-busy="true" aria-label="Loading favorites">
        {[0, 1, 2].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </ProductGrid>
    );
  }
  if (isError) return <p className="text-danger">Could not load your favorites.</p>;

  if (list.length === 0) {
    return (
      <EmptyState
        icon={<HeartIcon />}
        title="No favorites yet"
        panel
        actions={
          <Link to="/products" className={buttonClasses()}>
            Browse the shop
          </Link>
        }
      >
        Tap the heart on any bottle to keep it here for later.
      </EmptyState>
    );
  }

  return (
    <ProductGrid>
      {list.map((f) => (
        <ProductCard key={f.productId} product={f.product} />
      ))}
    </ProductGrid>
  );
}

export default FavoritesPage;
