import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const PublicRoute = () => {
  const { user, isInitializing } = useAuth();
  if (isInitializing) return null;
  if (user) return <Navigate to="/products" replace/>;
  return <Outlet />;
};

export default PublicRoute;
