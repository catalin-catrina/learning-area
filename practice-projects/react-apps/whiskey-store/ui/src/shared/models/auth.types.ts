import type { User } from "./user.types";

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface AuthContextType extends AuthState {
  isInitializing: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}
