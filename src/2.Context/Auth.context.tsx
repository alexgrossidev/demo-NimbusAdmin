import { createContext, useReducer, useEffect, useCallback, useMemo, type ReactNode } from "react";
import type { User, UserRole } from "../0.Components/1.Auth/Signin/Interfaces/User"
import { TOKEN_STORAGE_KEY as TOKEN_KEY } from "../1.API/core/token";

// ============================================================================
// Types
// ============================================================================

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: "AUTH_START" }
    | { type: "AUTH_SUCCESS"; payload: User }
    | { type: "AUTH_FAILURE"; payload: string }
    | { type: "LOGOUT" }
    | { type: "CLEAR_ERROR" }
    | { type: "UPDATE_USER"; payload: Partial<User> };

interface AuthContextValue extends AuthState {
    login: (user: User, token?: string) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    clearError: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
    getPermission: (role: UserRole) => boolean;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = "auth_user";

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start loading to check for stored session
    error: null,
};

// ============================================================================
// Reducer (immutable state updates)
// ============================================================================

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "AUTH_START":
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case "AUTH_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };

        case "AUTH_FAILURE":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload,
            };

        case "LOGOUT":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };

        case "CLEAR_ERROR":
            return {
                ...state,
                error: null,
            };

        case "UPDATE_USER":
            if (!state.user) return state;
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };

        default:
            return state;
    }
};

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Hydrate from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        const storedToken = localStorage.getItem(TOKEN_KEY);

        if (storedUser && storedToken) {
            try {
                const user = JSON.parse(storedUser) as User;
                dispatch({ type: "AUTH_SUCCESS", payload: user });
            } catch {
                // Invalid stored data, clear it
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(TOKEN_KEY);
                dispatch({ type: "LOGOUT" });
            }
        } else {
            // No stored session, stop loading
            dispatch({ type: "LOGOUT" });
        }
    }, []);

    // Persist user to localStorage when it changes
    useEffect(() => {
        if (state.user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
        }
    }, [state.user]);

    const login = useCallback((user: User, token?: string) => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
        }
        dispatch({ type: "AUTH_SUCCESS", payload: user });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TOKEN_KEY);
        dispatch({ type: "LOGOUT" });
    }, []);

    const updateUser = useCallback((updates: Partial<User>) => {
        dispatch({ type: "UPDATE_USER", payload: updates });
    }, []);

    const clearError = useCallback(() => {
        dispatch({ type: "CLEAR_ERROR" });
    }, []);

    const setLoading = useCallback((loading: boolean) => {
        if (loading) {
            dispatch({ type: "AUTH_START" });
        }
    }, []);

    const setError = useCallback((error: string) => {
        dispatch({ type: "AUTH_FAILURE", payload: error });
    }, []);

    const getPermission = useCallback((permission: UserRole) => {
        return state.user?.role === permission || state.user?.role === "developer";
    }, [state.user]);

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo<AuthContextValue>(() => ({
        ...state,
        login,
        logout,
        updateUser,
        clearError,
        setLoading,
        setError,
        getPermission,
    }), [state, login, logout, updateUser, clearError, setLoading, setError, getPermission]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
