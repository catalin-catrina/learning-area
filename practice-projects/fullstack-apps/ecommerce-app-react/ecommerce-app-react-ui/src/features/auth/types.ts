import type { User } from "../../shared/types/User";

export type LoginRequest = { username: string; password: string };
export type LoginResponseDto = {
  message: string;
  accessToken: string;
  payload: User;
};
export type AccessTokenDto = {
  accessToken: string;
};
