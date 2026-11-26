import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

// Login / register: only for guests. Once signed in, go back to the page that
// sent them here (a product, the cart…) instead of always the shop.
// This runs the moment the user is set, so it decides where login/register
// land; it must agree with useAuth's redirect.
const PublicRoute = () => {
  const { user, isInitializing } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: Location } | null)?.from;

  if (isInitializing) return null;
  if (user) {
    const to =
      from && from.pathname !== "/login" && from.pathname !== "/register"
        ? `${from.pathname}${from.search}${from.hash}`
        : "/products";
    return <Navigate to={to} replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
