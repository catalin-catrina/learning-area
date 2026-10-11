import axios from "axios";
import { getToken, setToken } from "./tokenStore";
import { refreshToken } from "../../features/auth/services/auth.service";

// Stores the SINGLE active refresh promise (or null if idle)
let refreshPromise: Promise<string> | null = null;

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

// Response interceptor — handle 401 → refresh → retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // STEP 1: Guard clause — Ignore errors that are NOT 401s,
    // or requests that were already retried, or auth routes (login/refresh)
    const is401 = error.response?.status === 401;
    const isAuthRoute = originalRequest.url?.includes("/auth/");

    if (!is401 || originalRequest._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    // Mark request so it won't re-enter this interceptor if it fails again
    originalRequest._retry = true;

    try {
      // STEP 2: If NO refresh promise exists, start one and save it to the module variable
      if (!refreshPromise) {
        refreshPromise = refreshToken()
          .then((res) => {
            setToken(res.accessToken);
            return res.accessToken; // Resolves the promise with the token string
          })
          .finally(() => {
            // When finished (success or fail), reset to null so future 401s can refresh again
            refreshPromise = null;
          });
      }

      // STEP 3: Await the shared promise!
      // Request A starts it and awaits it.
      // Request B skips Step 2 and awaits the EXACT SAME promise here.
      const newAccessToken = await refreshPromise;

      // STEP 4: Attach the new token to original headers and retry the original call
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch {
      // If the refresh call itself failed (e.g. invalid refresh cookie), log out
      setToken(null);
      return Promise.reject(error);
    }
  },
);

export default api;
