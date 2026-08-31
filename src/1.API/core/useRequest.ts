import { useState, useCallback, useRef, useEffect } from "react";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CancelTokenSource,
} from "axios";
import CONFIG from "@/6.Config/config";
import { getToken, clearToken } from "./token";

// ─── Types ────────────────────────────────────────────────────────────────────

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  status: number | null;
}

export interface ApiError {
  message: string;
  code?: string | number;
  status?: number;
  raw?: unknown;
}

export interface RequestOptions<TBody = unknown> extends AxiosRequestConfig {
  /** Request body for POST / PUT / PATCH */
  body?: TBody;
  /** Deduplicate identical in-flight GET requests */
  dedupe?: boolean;
  /** Abort any previous in-flight request from this hook instance */
  cancelPrevious?: boolean;
}

export interface UseApiReturn<TData, TBody = unknown> extends ApiState<TData> {
  /** Fire the request imperatively */
  request: (overrides?: RequestOptions<TBody>) => Promise<TData | null>;
  /** Reset state back to initial */
  reset: () => void;
}

// ─── In-Flight Deduplication Cache ───────────────────────────────────────────
// Shared across all hook instances. Prevents parallel identical GET requests
// from hitting the server twice.

const inflightCache = new Map<string, Promise<AxiosResponse>>();

function getCacheKey(
  method: HttpMethod,
  url: string,
  params?: unknown,
): string {
  return `${method}:${url}:${JSON.stringify(params ?? "")}`;
}

// ─── Axios Instance Factory ───────────────────────────────────────────────────

let sharedInstance: AxiosInstance | null = null;

/**
 * Returns (or creates) the shared axios instance.
 * Call configureApiClient() early in your app to customise it.
 */
export function getApiClient(): AxiosInstance {
  if (!sharedInstance) {
    sharedInstance = axios.create({
      baseURL: CONFIG.API_URL,
      timeout: 15_000,
      headers: { "Content-Type": "application/json" },
    });

    // Auth injection — reads token lazily so it always picks up refreshed values
    sharedInstance.interceptors.request.use((config) => {
      const token = getToken();
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });

    // Normalise errors into ApiError shape
    sharedInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        // Session expired / unauthorized — drop the stale token and redirect.
        if (
          err.response?.status === 401 &&
          typeof window !== "undefined" &&
          window.location.pathname !== "/signin"
        ) {
          clearToken();
          window.location.assign("/signin");
        }
        const apiError: ApiError = {
          message:
            err.response?.data?.message ??
            err.response?.data?.error ??
            err.message ??
            "An unexpected error occurred.",
          code: err.response?.data?.code ?? err.code,
          status: err.response?.status,
          raw: err,
        };
        return Promise.reject(apiError);
      },
    );
  }

  return sharedInstance;
}

/**
 * Override the shared axios instance (e.g. to attach custom interceptors or
 * set a baseURL from runtime config rather than env vars).
 *
 * @example
 * configureApiClient(axios.create({ baseURL: runtimeConfig.apiUrl }));
 */
export function configureApiClient(instance: AxiosInstance): void {
  sharedInstance = instance;
}

// ─── Core Hook ────────────────────────────────────────────────────────────────

/**
 * A lightweight, performant hook for firing HTTP requests with Axios.
 *
 * Features:
 * - Automatic cancellation on unmount
 * - Optional deduplication of identical in-flight GET requests
 * - Optional cancellation of previous in-flight request per hook instance
 * - Normalised error shape
 * - Imperative `request()` so you control when fetches fire
 * - Zero dependencies beyond axios and React
 *
 * @example — Simple GET
 * const { data, loading, error, request } = useApi<User[]>("/users", "GET");
 * useEffect(() => { request(); }, []);
 *
 * @example — POST with body
 * const { request, loading } = useApi<AuthResponse>("/auth/login", "POST");
 * const login = () => request({ body: { email, password } });
 *
 * @example — Cancel previous + dedupe
 * const { request } = useApi<SearchResult[]>("/search", "GET", {
 *   cancelPrevious: true,
 *   dedupe: true,
 * });
 * // Safe to call on every keystroke
 * const onSearch = (q: string) => request({ params: { q } });
 */
export function useApi<TData = unknown, TBody = unknown>(
  url: string,
  method: HttpMethod = "GET",
  defaultOptions: RequestOptions<TBody> = {},
): UseApiReturn<TData, TBody> {
  const [state, setState] = useState<ApiState<TData>>({
    data: null,
    loading: false,
    error: null,
    status: null,
  });

  // Hold cancel token source across renders without causing re-renders
  const cancelSourceRef = useRef<CancelTokenSource | null>(null);

  // Cancel on unmount
  useEffect(() => {
    return () => {
      cancelSourceRef.current?.cancel("Component unmounted.");
    };
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null, status: null });
  }, []);

  const request = useCallback(
    async (overrides: RequestOptions<TBody> = {}): Promise<TData | null> => {
      const merged = { ...defaultOptions, ...overrides };
      const {
        body,
        dedupe = false,
        cancelPrevious = false,
        params,
        ...axiosOverrides
      } = merged;

      // Cancel previous request from this instance if requested
      if (cancelPrevious) {
        cancelSourceRef.current?.cancel("Superseded by newer request.");
      }

      const source = axios.CancelToken.source();
      cancelSourceRef.current = source;

      setState((prev) => ({ ...prev, loading: true, error: null }));

      const client = getApiClient();
      const cacheKey = getCacheKey(method, url, params);

      try {
        let responsePromise: Promise<AxiosResponse<TData>>;

        if (dedupe && method === "GET" && inflightCache.has(cacheKey)) {
          // Reuse the existing in-flight promise
          responsePromise = inflightCache.get(cacheKey) as Promise<
            AxiosResponse<TData>
          >;
        } else {
          const promise = client.request<TData>({
            url,
            method,
            params,
            data: body,
            cancelToken: source.token,
            ...axiosOverrides,
          });

          if (dedupe && method === "GET") {
            inflightCache.set(cacheKey, promise);
            promise.finally(() => inflightCache.delete(cacheKey));
          }

          responsePromise = promise;
        }

        const response = await responsePromise;

        setState({
          data: response.data,
          loading: false,
          error: null,
          status: response.status,
        });

        return response.data;
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          // Silently ignore cancellations — don't update state for unmounted components
          return null;
        }

        const apiError = err as ApiError;

        setState({
          data: null,
          loading: false,
          error: apiError,
          status: apiError.status ?? null,
        });

        return null;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, method],
  );

  return { ...state, request, reset };
}

// ─── Convenience Wrappers ─────────────────────────────────────────────────────

/** Pre-bound GET hook. Deduplication on by default. */
export function useGet<TData = unknown>(
  url: string,
  options: Omit<RequestOptions, "body"> = {},
) {
  return useApi<TData>(url, "GET", { dedupe: true, ...options });
}

/** Pre-bound POST hook. */
export function usePost<TData = unknown, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {},
) {
  return useApi<TData, TBody>(url, "POST", options);
}

/** Pre-bound PUT hook. */
export function usePut<TData = unknown, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {},
) {
  return useApi<TData, TBody>(url, "PUT", options);
}

/** Pre-bound PATCH hook. */
export function usePatch<TData = unknown, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {},
) {
  return useApi<TData, TBody>(url, "PATCH", options);
}

/** Pre-bound DELETE hook. */
export function useDelete<TData = unknown>(
  url: string,
  options: RequestOptions = {},
) {
  return useApi<TData>(url, "DELETE", options);
}
