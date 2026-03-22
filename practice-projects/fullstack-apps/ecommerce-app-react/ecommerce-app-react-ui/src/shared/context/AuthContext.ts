import { useContext, createContext } from "react";
import type { AuthContextType } from "../types/AuthState";

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return {...context, isAuthenticated: !!context.token};
}
