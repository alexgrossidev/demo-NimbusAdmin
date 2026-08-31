
export type UserRole = "developer" | "admin" | "project-manager" | "assistant";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole
}

