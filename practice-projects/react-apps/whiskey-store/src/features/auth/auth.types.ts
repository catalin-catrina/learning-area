import type { User } from "../../shared/models/user.types";

export type LoginRequest = { email: string; password: string };
export type LoginResponseDto = {
  message: string;
  accessToken: string;
  payload: User;
};
export type AccessTokenDto = {
  accessToken: string;
};
