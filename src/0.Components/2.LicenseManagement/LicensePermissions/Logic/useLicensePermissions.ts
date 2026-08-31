import { useState } from "react";
import type { LicenseSearchResultItem } from "../Interfaces/SearchResults";

const useLicensePermissions = () => {
  const [selectedLicense, setSelectedLicense] =
    useState<LicenseSearchResultItem | null>(null);

  const setLicense = (license: LicenseSearchResultItem | null) => {
    setSelectedLicense(license || null);
  };

  const editPermissions = (moduleKey: string) => {
    if (!selectedLicense) return;
    const updatedPermissions = {
      ...selectedLicense.permissions,
      [moduleKey]: !selectedLicense.permissions[moduleKey],
    };
    setSelectedLicense({
      ...selectedLicense,
      permissions: updatedPermissions,
    });
  };

  const toggleAllPermissions = (value: boolean) => {
    if (!selectedLicense) return;
    const allModules = Object.keys(selectedLicense.permissions);
    const updatedPermissions = allModules.reduce(
      (acc, module) => {
        acc[module] = value;
        return acc;
      },
      {} as Record<string, boolean>,
    );
    setSelectedLicense({
      ...selectedLicense,
      permissions: updatedPermissions,
    });
  };

  return { selectedLicense, setLicense, editPermissions, toggleAllPermissions };
};

export default useLicensePermissions;
