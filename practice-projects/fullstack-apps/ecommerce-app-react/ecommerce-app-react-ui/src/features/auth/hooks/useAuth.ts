import { useState } from "react";
import { useAuthContext } from "../../../shared/context/AuthContext";
import type { LoginRequest } from "../types";
import { login } from "../services/authService";
import { setToken } from "../../../shared/services/tokenStore";

export function useAuth() {
  const { setAuth, clearAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(loginReq: LoginRequest) {
    setLoading(true);
    setError(null);

    try {
      const data = await login(loginReq);
      setAuth(data.accessToken, data.payload);
      setToken(data.accessToken);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, loading, error };
}
