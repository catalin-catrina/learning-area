import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const PublicRoute = () => {
  const { user } = useAuth();
  if (user) <Navigate to="/products" />;
  return <Outlet />;
};

export default PublicRoute;
