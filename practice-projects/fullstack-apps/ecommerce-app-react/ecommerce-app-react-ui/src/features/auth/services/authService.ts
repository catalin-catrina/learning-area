import type { AccessTokenDto, LoginRequest, LoginResponseDto } from "../types";
import api from "../../../shared/services/api";

export async function login(
  loginRequest: LoginRequest,
): Promise<LoginResponseDto> {
  const response = await api.post("/auth/login", loginRequest);
  return response.data;
}

export async function refreshToken(): Promise<AccessTokenDto> {
  const response = await api.post("/auth/refresh", null);
  return response.data;
}

export async function logout(): Promise<void> {
  const response = await api.post("/auth/logout", null);
  return response.data;
}
