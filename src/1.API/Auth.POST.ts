import { usePost } from "./core/useRequest";
import FEATURE_FLAGS from "@/FEATUREFLAGS";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "project-manager" | "assistant" | "developer";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

export type DebugResponse =
  | "invalid-credentials"
  | "server-error"
  | "network-error"
  | "success";

// ─── Mock Accounts ────────────────────────────────────────────────────────────
// Used ONLY when FEATURE_FLAGS.MOCK_LOGIN is on. This is a client-side stand-in
// for a real auth backend so the demo is interactive. It is NOT a security
// boundary: never trust client-side credential checks in production — the server
// must authenticate and issue the token.

interface DemoAccount {
  password: string;
  user: User;
}

const DEMO_PASSWORD = "demo1234";

const DEMO_ACCOUNTS: Record<string, DemoAccount> = {
  "admin@example.com": {
    password: DEMO_PASSWORD,
    user: { id: "u-admin", email: "admin@example.com", name: "Admin User", role: "admin" },
  },
  "pm@example.com": {
    password: DEMO_PASSWORD,
    user: {
      id: "u-pm",
      email: "pm@example.com",
      name: "Project Manager User",
      role: "project-manager",
    },
  },
  "assistant@example.com": {
    password: DEMO_PASSWORD,
    user: {
      id: "u-assistant",
      email: "assistant@example.com",
      name: "Assistant User",
      role: "assistant",
    },
  },
  "developer@example.com": {
    password: DEMO_PASSWORD,
    user: {
      id: "u-dev",
      email: "developer@example.com",
      name: "Developer User",
      role: "developer",
    },
  },
};

// Scenario responses kept available for tests / manual QA of error states.
const DEBUG_RESPONSES: Record<DebugResponse, () => Promise<AuthResponse>> = {
  success: () =>
    Promise.resolve({
      success: true,
      user: DEMO_ACCOUNTS["admin@example.com"].user,
      token: "mock-token-u-admin",
    }),
  "invalid-credentials": () =>
    Promise.resolve({ success: false, error: "Invalid email or password." }),
  "server-error": () =>
    Promise.resolve({
      success: false,
      error: "Server error. Please try again later.",
    }),
  "network-error": () =>
    Promise.reject(new Error("Network error. Please check your connection.")),
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuthAPI = () => {
  const { request: postSignin, loading: signinLoading } =
    usePost<AuthResponse>("/auth/signin");

  const signin = async (
    email: string,
    password: string,
    debug?: DebugResponse,
  ): Promise<AuthResponse> => {
    // Mock path — never reaches the network.
    if (FEATURE_FLAGS.MOCK_LOGIN) {
      if (debug) return DEBUG_RESPONSES[debug]();

      const account = DEMO_ACCOUNTS[email.trim().toLowerCase()];
      if (!account || account.password !== password) {
        return { success: false, error: "Invalid email or password." };
      }
      return {
        success: true,
        user: account.user,
        token: `mock-token-${account.user.id}`,
      };
    }

    // Real path
    const data = await postSignin({ body: { email, password } });

    return data ?? { success: false, error: "Sign in failed." };
  };

  return {
    signin,
    signinLoading,
  };
};
