import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { AuthContext } from "./AuthContext";
import { me } from "../../features/profile/services/profileService";
import { getToken, setToken } from "../services/tokenStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    me()
      .then((user) => {
        const token = getToken();
        if (token) setTokenState(token);
        setUserState(user);
      })
      .catch(() => {
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function setAuth(token: string, user: User) {
    setTokenState(token);
    setUserState(user);
  }

  function clearAuth() {
    setTokenState(null);
    setUserState(null);
  }

  return (
    <AuthContext value={{ token, user, setAuth, clearAuth }}>
      {children}
    </AuthContext>
  );
}
