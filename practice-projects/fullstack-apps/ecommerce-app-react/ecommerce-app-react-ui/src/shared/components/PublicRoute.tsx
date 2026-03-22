import { type ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Navigate to="/products" replace /> : children;
}

export default PublicRoute;
