// Single source of truth for where the auth token is persisted in the browser.
// Centralised so the API clients, auth context and route guards can never drift
// onto different storage keys (previously "token", "access_token" and
// "auth_token" were used in three different places, so the API layer never saw
// the token the auth context wrote).
//
// SECURITY NOTE: storing a bearer token in localStorage is convenient for a
// front-end-only demo, but it is readable by any script on the page, so a
// successful XSS can exfiltrate it. A production deployment should prefer an
// httpOnly, Secure, SameSite cookie issued by the backend.
export const TOKEN_STORAGE_KEY = "auth_token";

export const getToken = (): string | null =>
  typeof window !== "undefined"
    ? window.localStorage.getItem(TOKEN_STORAGE_KEY)
    : null;

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
};

export const clearToken = (): void => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};
