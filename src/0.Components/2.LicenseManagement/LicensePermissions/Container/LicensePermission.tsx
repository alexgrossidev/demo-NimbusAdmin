import AGBox from "@/3.Theme/0.Atoms/AGBox";
import useSelectLicense from "../Logic/useSelectLicense";
import ManageLicenseSearchBar from "../../ManageLicense/Main/UI/ManageLicense.SearchBar";
import SearchResultsDropdown from "../UI/LicensePermission.SearchResults";
import LicensePermissionDetails from "../UI/LicensePermission.Details";
import { useTheme, type Theme } from "@mui/material";
import useLicensePermissions from "../Logic/useLicensePermissions";
const LicensePermission = () => {
  const theme = useTheme<Theme>();
  const permissions = useLicensePermissions();
  const selection = useSelectLicense({ setLicense: permissions.setLicense });

  return (
    <AGBox>
      {selection.selectedLicenseId === null ? (
        <AGBox padding={2} borderRadius={2}>
          <ManageLicenseSearchBar
            value={selection.searchQuery}
            onChange={selection.onChange}
          />
          {selection.searchResponse && (
            <SearchResultsDropdown
              total={selection.searchResponse.total}
              results={selection.searchResponse.results}
              pagination={{
                page: 1,
                limit: 10,
                onPageChange: () => {}, // Implement pagination logic as needed
              }}
              select={selection.selectLicense}
            />
          )}
        </AGBox>
      ) : (
        <>
          <button onClick={() => selection.selectLicense(null)}>
            Deseleziona
          </button>
          <p>licenza selezionata: {selection.selectedLicenseId}</p>
          <LicensePermissionDetails
            license={permissions.selectedLicense}
            onToggle={permissions.editPermissions}
            onToggleAll={permissions.toggleAllPermissions}
            theme={theme} // Pass the actual theme object here
          />
        </>
      )}
    </AGBox>
  );
};

export default LicensePermission;
