export interface LicenseSearchResults {
  results: LicenseSearchResultItem[];
  total: number;
}
type ModulePermissions = Record<string, boolean>;

export interface LicenseSearchResultItem {
  id: number;
  name: string;
  email: string;
  businessName: string;
  permissions: ModulePermissions;
}
