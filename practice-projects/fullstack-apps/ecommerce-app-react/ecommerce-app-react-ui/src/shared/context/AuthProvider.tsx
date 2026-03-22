import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { AuthContext } from "./AuthContext";
import type { AuthState } from "../types/AuthState";
import { me } from "../../features/profile/services/profileService";
import { getToken, setToken } from "../services/tokenStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
  });
  const [, setLoading] = useState(true);

  useEffect(() => {
    me()
      .then((user) => {
        setAuthState({ token: getToken(), user });
      })
      .catch(() => {
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function setAuth(token: string, user: User) {
    setAuthState({ token, user });
  }

  function clearAuth() {
    setAuthState({ token: null, user: null });
  }

  return (
    <AuthContext value={{ ...auth, setAuth, clearAuth }}>
      {children}
    </AuthContext>
  );
}
