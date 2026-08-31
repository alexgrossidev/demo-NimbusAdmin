export type LicenseRole = "client" | "sales" | "project-manager" | "developer";

export interface LicenseData {
    name: string;
    email: string;
    businessName: string;
    startDate: Date;
    expirationDate: Date;
    role: LicenseRole;
    isTrial: boolean;
    createLicenseAfterTrial: boolean;
    trialPeriodDays?: number;
    deliveryData: LicenseDeliveryData;
}

export interface LicenseDeliveryData {
    sendImmediately: boolean;
    deliverySchedule?: Date;
    customMessage?: string;
}

