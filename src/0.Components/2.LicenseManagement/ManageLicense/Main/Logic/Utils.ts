import type { LicenseStatus } from "../Interfaces/LicenzeInfo";

export interface StatusConfig {
    color: "success" | "error" | "warning" | "default";
    label: string;
    description: string;
    icon: string;
    accentColor: string;
    lightBg: string;
}

export const getStatusConfig = (status: LicenseStatus): StatusConfig => {
    switch (status) {
        case "active":
            return {
                color: "success",
                label: "Attiva",
                description: "La licenza sarà riattivata e operativa.",
                icon: "✓",
                accentColor: "#2e7d32",
                lightBg: "#f0faf0",
            };
        case "inactive":
            return {
                color: "error",
                label: "Inattiva",
                description: "La licenza verrà disattivata e non sarà più utilizzabile.",
                icon: "✕",
                accentColor: "#c62828",
                lightBg: "#fff5f5",
            };
        case "paused":
            return {
                color: "warning",
                label: "In Pausa",
                description: "La licenza sarà sospesa temporaneamente.",
                icon: "⏸",
                accentColor: "#e65100",
                lightBg: "#fff8f0",
            };
        case "cancelled":
            return {
                color: "default",
                label: "Annullata",
                description: "La licenza sarà annullata definitivamente.",
                icon: "⊘",
                accentColor: "#424242",
                lightBg: "#f5f5f5",
            };
        default:
            return {
                color: "default",
                label: status,
                description: "Modifica dello stato della licenza.",
                icon: "◦",
                accentColor: "#424242",
                lightBg: "#f5f5f5",
            };
    }
};