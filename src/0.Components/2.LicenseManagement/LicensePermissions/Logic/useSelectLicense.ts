import { useNavigation } from "@/4.Routing/useNavigation";
import { useState } from "react";
import type {
  LicenseSearchResultItem,
  LicenseSearchResults,
} from "../Interfaces/SearchResults";
import type {
  FullLicenseInfo,
  LicenseStatus,
} from "../../ManageLicense/Main/Interfaces/LicenzeInfo";

// ------- DEV STUFF ONLY ---------
const STATUSES: LicenseStatus[] = ["active", "inactive", "paused", "cancelled"];

const generateMockLicenses = (count: number): FullLicenseInfo[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    password: "hashed_password",
    businessName: `Company ${Math.ceil((i + 1) / 2)}`,
    startDate: new Date(Date.now() - Math.random() * 10000000000),
    expirationDate: new Date(Date.now() + Math.random() * 10000000000),
    role: "client",
    isTrial: Math.random() > 0.8,
    createLicenseAfterTrial: true,
    deliveryData: {
      sendImmediately: true,
    },
    assignedProjectManagerID: `pm-${Math.floor(Math.random() * 5)}`,
    assignedProjectManager: `Manager ${Math.floor(Math.random() * 5)}`,
    licensePrice: Math.floor(Math.random() * 1000) + 500,
    licensePriceCurrency: "EUR",
    licenseDuration: 12,
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    notes: [
      {
        id: `note-${i}-1`,
        date: new Date(),
        note: "Initial setup completed successfully.",
      },
    ],
  }));
};

const MOCK_DATA = generateMockLicenses(50);

// -----------------------------

interface UseSelectLicenseHookProps {
  setLicense: (license: LicenseSearchResultItem | null) => void;
}
const useSelectLicense = (props: UseSelectLicenseHookProps) => {
  const { setLicense } = props;
  const { getParams } = useNavigation();

  const [selectedLicenseId, setSelectedLicenseId] = useState<number | null>(
    () => {
      const values = getParams();
      const id = parseInt(values.id, 10);
      return isNaN(id) ? null : id;
    },
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResponse, setSearchResponse] =
    useState<LicenseSearchResults | null>(null);

  const onChange = (query: string) => {
    setSearchQuery(query);
    // Simulate API call
    const filtered = MOCK_DATA.filter(
      (l) =>
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.email.toLowerCase().includes(query.toLowerCase()) ||
        l.businessName.toLowerCase().includes(query.toLowerCase()),
    ).slice(0, 10);
    //add fake permissions to results
    const results = filtered.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      businessName: l.businessName,
      permissions: {
        dashboard: Math.random() > 0.5,
        projects: Math.random() > 0.5,
        billing: Math.random() > 0.5,
        settings: Math.random() > 0.5,
      },
    }));
    setSearchResponse({ results, total: results.length });
  };

  const selectLicense = (id: number | null) => {
    setSelectedLicenseId(id ?? null);
    const license = searchResponse?.results.find((l) => l.id === id) || null;
    setLicense(license);
    setLicense(license);
  };

  return {
    selectedLicenseId,
    selectLicense,
    searchQuery,
    onChange,
    searchResponse,
  };
};

export default useSelectLicense;
