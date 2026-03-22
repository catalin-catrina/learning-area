import React from "react";
import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? children : <Navigate to="/login" replace/>;
}

export default ProtectedRoute;
