import { useState } from "react";
import { useAuthContext } from "../../../shared/context/auth/AuthContext";
import type { LoginRequest } from "../auth.types";
import { login, logout } from "../services/auth.service";
import { setToken } from "../../../shared/services/tokenStore";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const { token, user, setAuth, clearAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin(loginReq: LoginRequest) {
    setLoading(true);
    setError(null);

    try {
      const data = await login(loginReq);
      setAuth(data.accessToken, data.payload);
      setToken(data.accessToken);
      navigate("/products", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    setError(null);

    try {
      await logout();
      clearAuth();
      setToken(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }

  return { token, user, handleLogin, handleLogout, loading, error };
}
