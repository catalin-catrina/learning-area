import { useState } from "react";
import { useAuthContext } from "../../../shared/context/auth/AuthContext";
import type { LoginRequest, RegisterRequest } from "../auth.types";
import { login, logout, register } from "../services/auth.service";
import { setToken } from "../../../shared/services/tokenStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const { token, user, isInitializing, setAuth, clearAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location } | null)?.from;

  const qc = useQueryClient();

  async function handleLogin(loginReq: LoginRequest) {
    setLoading(true);
    setError(null);

    try {
      const data = await login(loginReq);
      setAuth(data.accessToken, data.payload);
      setToken(data.accessToken);
      const redirectTo =
        from && from.pathname !== "/login"
          ? `${from.pathname}${from.search}${from.hash}`
          : "/products";
      navigate(redirectTo, { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(registerReq: RegisterRequest) {
    setLoading(true);
    setError(null);
    try {
      const data = await register(registerReq);
      setAuth(data.accessToken, data.payload);
      setToken(data.accessToken);
      navigate("/products", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.error);
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
      qc.clear();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.error);
      clearAuth();
      setToken(null);
      qc.clear();
    } finally {
      setLoading(false);
    }
  }

  return {
    token,
    user,
    isInitializing,
    handleLogin,
    handleLogout,
    handleRegister,
    loading,
    error,
  };
}
