export interface BusinessLicenseUsage{
    licenseId: number;
    businessName: string;
    isActive: boolean;
    lastUsed: Date | null;
    clientCount: number;
    leadCount: number;
    whatsappMessagesIn: number;
    whatsappMessagesOut: number;
    isPowerUser: boolean;
}