import { useContext } from "react";
import AuthContext from "./Auth.context";
import type { User, UserRole } from "../0.Components/1.Auth/Signin/Interfaces/User";

import { TOKEN_STORAGE_KEY as TOKEN_KEY } from "@/1.API/core/token";

/** Main auth hook - returns full context */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

/** Returns only the current user (or null) */
export const useCurrentUser = (): User | null => {
    const { user } = useAuth();
    return user;
};

/** Returns true if user is authenticated */
export const useIsAuthenticated = (): boolean => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated;
};

/** Returns the auth token from storage */
export const useAuthToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const useRole = () : UserRole | null => {
    const {user} = useAuth();
    return user?.role ?? null;
}

export const usePermission = (permission: UserRole): boolean => {
    const { getPermission } = useAuth();
    return getPermission(permission);
};