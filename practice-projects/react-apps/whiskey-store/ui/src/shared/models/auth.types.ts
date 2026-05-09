import type { User } from "./user.types";

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface AuthContextType extends AuthState {
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}
