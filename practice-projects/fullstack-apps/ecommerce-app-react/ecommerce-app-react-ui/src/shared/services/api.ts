import axios from "axios";
import { getToken, setToken } from "./tokenStore";
import { refreshToken } from "../../features/auth/services/authService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request interceptor — attach token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let interceptCount = 0;

// Response interceptor — handle 401 → refresh → retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    interceptCount++;
    const original = error.config;
    console.log("url:", original.url);
    console.log("includes check:", original.url?.includes("/auth/refresh"));
    if (interceptCount > 5) {
      console.log("BAILING — check logs above");
      return Promise.reject(error);
    }
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url?.includes("/auth/refresh")
    ) {
      original._retry = true;
      try {
        const { accessToken } = await refreshToken();
        setToken(accessToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original); // retry
      } catch {
        setToken(null);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
