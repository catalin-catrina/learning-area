import { Link } from "react-router-dom";
import { cn } from "cn";
import ProductThumb from "../../../shared/components/ProductThumb";
import { buttonClasses, Skeleton, StatusDot } from "../../../shared/ui";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { useAuth } from "../../auth/hooks/useAuth";
import { useGetOrders } from "../../orders/hooks/useOrders";
import { useAddresses } from "../../addresses/hooks/useAddresses";
import { useGetFavorites } from "../../favorites/hooks/useFavorites";
import { ORDER_STATUS, formatDate, itemCount, orderNumber } from "../../orders/orderLabels";
import { OrderThumbs } from "../../orders/components/OrdersPage";

const link = "ml-auto text-sm font-semibold underline underline-offset-3";

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 lg:p-6">
      <div className="flex items-center">
        <h2 className="text-xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

// Design 8a. ("Password last changed" and "Offers by email" were dropped:
// the backend doesn't store them.)
function ProfileOverview() {
  const { user } = useAuth();
  const orders = useGetOrders();
  const addresses = useAddresses();
  const favorites = useGetFavorites();

  const latest = orders.data?.[0];
  const defaultAddress = addresses.data?.find((a) => a.isDefault);
  const favs = (favorites.data ?? []).filter((f) => f.product);
  const outOfStock = favs.filter((f) => !f.product.inStock).length;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Panel title="Latest order" action={latest && <Link to="/profile/orders" className={link}>All orders</Link>}>
        {orders.isPending ? (
          <Skeleton className="h-24" />
        ) : latest ? (
          <>
            <div className="flex items-center gap-3">
              <span className="font-semibold">{orderNumber(latest.id)}</span>
              <StatusDot tone={ORDER_STATUS[latest.status].tone}>{ORDER_STATUS[latest.status].label}</StatusDot>
            </div>
            <p className="text-sm text-muted">
              Placed {formatDate(latest.createdAt)} · {itemCount(latest.items)} items ·{" "}
              <span className="font-bold text-fg">{formatPrice(latest.totalCents)}</span>
            </p>
            <OrderThumbs order={latest} max={4} />
            <Link to={`/orders/${latest.id}`} className={buttonClasses({ variant: "secondary", size: "sm", className: "self-start" })}>
              View order
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm text-muted">No orders yet.</p>
            <Link to="/products" className={buttonClasses({ size: "sm", className: "self-start" })}>
              Start shopping
            </Link>
          </>
        )}
      </Panel>

      <Panel title="Default address" action={<Link to="/profile/addresses" className={link}>Manage</Link>}>
        {addresses.isPending ? (
          <Skeleton className="h-20" />
        ) : defaultAddress ? (
          <>
            <p className="text-sm">
              {defaultAddress.name}
              <br />
              {defaultAddress.line1}
              {defaultAddress.line2 && `, ${defaultAddress.line2}`}
              <br />
              {defaultAddress.postalCode} {defaultAddress.city}, {defaultAddress.country}
            </p>
            {user?.phone && <p className="text-sm text-muted">{user.phone}</p>}
          </>
        ) : (
          <p className="text-sm text-muted">No saved address yet. Add one, or save one at checkout.</p>
        )}
      </Panel>

      <Panel title="Favorites" action={favs.length > 0 && <Link to="/profile/favorites" className={link}>See all</Link>}>
        {favorites.isPending ? (
          <Skeleton className="h-20" />
        ) : favs.length > 0 ? (
          <>
            <p className="text-sm text-muted">
              {favs.length} saved{outOfStock > 0 && ` · ${outOfStock} out of stock`}
            </p>
            <div className="flex gap-2">
              {favs.slice(0, 4).map((f) => (
                <Link key={f.productId} to={`/products/${f.productId}`} aria-label={f.product.name}>
                  <ProductThumb src={f.product.imageUrl} size="sm" />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">Tap the heart on any bottle to save it here.</p>
        )}
      </Panel>

      <Panel title="Account details">
        <dl className={cn("grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm")}>
          <dt className="text-muted">Name</dt>
          <dd>{user?.name}</dd>
          <dt className="text-muted">Email</dt>
          <dd className="break-all">{user?.email}</dd>
          {user?.phone && (
            <>
              <dt className="text-muted">Phone</dt>
              <dd>{user.phone}</dd>
            </>
          )}
        </dl>
      </Panel>
    </div>
  );
}

export default ProfileOverview;
