import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";
import CONFIG from "@/6.Config/config";
import { getToken, clearToken } from "./token";

// Factory function to create specialized clients (e.g., Auth API vs Data API)
export const createApiClient = (
  configOverrides: CreateAxiosDefaults = {},
): AxiosInstance => {
  const instance = axios.create({
    baseURL: CONFIG.API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    ...configOverrides,
  });

  // Request Interceptor — attach the bearer token from the single shared store.
  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response Interceptor — on 401 clear the stale token and bounce to sign-in.
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 401 &&
        typeof window !== "undefined" &&
        window.location.pathname !== "/signin"
      ) {
        clearToken();
        window.location.assign("/signin");
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

// Default instance for general use
export const api = createApiClient();
