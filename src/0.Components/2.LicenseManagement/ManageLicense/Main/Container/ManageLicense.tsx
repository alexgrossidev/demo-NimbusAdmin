import AGTitle from "@/3.Theme/0.Atoms/AGTitle";
import { Box } from "@mui/material";
import ManageLicenseSearchBar from "../UI/ManageLicense.SearchBar";
import { useManageLicense } from "../Logic/useManageLicense";
import ManageLicenseTable from "../UI/ManageLicense.Table";
import useEditLicense from "../Logic/useEditLicense";
import useManageLicenseModal from "../Logic/useManageLicenseModal";
import ManageLicenseEditModal from "../UI/ManageLicense.EditModal";
import JustificationModal from "../../JustificationModal/Container/JustificationModal";
import type { LicenseStatus } from "../Interfaces/LicenzeInfo";
import useModifyLicense from "../Logic/useModifyLicense";
import useNavigation from "@/4.Routing/useNavigation";

const ManageLicense = () => {
  const { navigate } = useNavigation();
  const {
    search,
    handleSearchChange,
    licenses,
    loading,
    totalCount,
    rowsPerPage,
    page,
    editLicenseStatus,
    handlePageChange,
    handleRowsPerPageChange,
    justificationModalOpen,
    statusSelected,
    handleJustificationModalClose,
  } = useManageLicense();
  const {
    editModalOpen,
    activeLicense,
    handleEditModalClose,
    handleEditModalOpen,
  } = useManageLicenseModal();
  const { onSubmit } = useEditLicense(activeLicense, () => {});
  const { onModifyPermissions } = useModifyLicense({
    navigate: navigate,
  });
  return (
    <Box sx={{ mx: "auto", p: 4, paddingBottom: 50 }}>
      <AGTitle variant="h4">Pannello Licenze </AGTitle>
      <ManageLicenseSearchBar value={search} onChange={handleSearchChange} />
      <ManageLicenseTable
        licenses={licenses}
        loading={loading}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onEdit={handleEditModalOpen}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        editStatus={editLicenseStatus}
        onModifyPermissions={onModifyPermissions}
      />
      <ManageLicenseEditModal
        open={editModalOpen}
        license={activeLicense}
        onClose={handleEditModalClose}
        onSuccess={onSubmit}
      />
      <JustificationModal
        open={justificationModalOpen}
        onClose={handleJustificationModalClose}
        newStatus={statusSelected as LicenseStatus}
        onConfirm={handleJustificationModalClose}
      />
    </Box>
  );
};

export default ManageLicense;
