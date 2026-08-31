import type { LicenseData } from "../../../CreateLicense/Interfaces/License";

export interface LicenseInfo extends LicenseData {
  id: number;
  assignedProjectManagerID: string;
  assignedProjectManager: string;
  licensePrice: number;
  licensePriceCurrency: string;
  licenseDuration: number;
}

export interface LicenseInfoExtraDetails {
  status: LicenseStatus;
  notes: LicenseNote[];
}

export interface LicenseNote {
  id: string;
  date: Date;
  note: string;
}

export type LicenseStatus = "active" | "inactive" | "paused" | "cancelled";
export type LicenseInfoAction = "view" | "edit" | "delete" | "pause" | "resume";
export const STATUS_OPTIONS = [
  "active",
  "inactive",
  "paused",
  "cancelled",
] as const;
export interface FullLicenseInfo extends LicenseInfo, LicenseInfoExtraDetails {}
