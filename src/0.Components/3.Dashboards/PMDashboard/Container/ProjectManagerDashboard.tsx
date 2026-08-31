import { useAuth } from "@/2.Context/useAuth";
import useGetPMDashboardData from "../Logic/useGetPMDashboardData";
import PMDashboardDataDisplay from "../UI/PMDashboard.DataDisplay";
import AGTitle from "@/3.Theme/0.Atoms/AGTitle";
import AGBox from "@/3.Theme/0.Atoms/AGBox";
import PMDashboardDataTable from "../UI/PMDashboard.DataTable";
import useTablePMDashboard from "../Logic/useTablePMDashboard";
import ConfettiExplosion from "react-confetti-explosion";
import usePMDashboardActionModal from "../Logic/usePMDashboardActionModal";
import LicenseActionModal from "./PMDashboard.ActionModal";
import { Typography } from "@mui/material";

const ProjectManagerDashboard = () => {
  const { pmData, displayData, updateDisplayActionToDo, explode } =
    useGetPMDashboardData();
  const {
    loading,
    totalCount,
    page,
    rowsPerPage,
    action,
    onAction,
    onPageChange,
    onRowsPerPageChange,
    actionModal,
    selectedAction,
  } = useTablePMDashboard(pmData, updateDisplayActionToDo);

  const { issueType, handleClose } = usePMDashboardActionModal();

  const { user } = useAuth();

  return (
    <AGBox>
      <AGBox padding={4}>
        <AGTitle variant="h4">Ciao, {user?.name}</AGTitle>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 14,
            color: "text.secondary",
            mt: 0.5,
          }}
        >
          Ecco i clienti che richiedono la tua attenzione oggi.
        </Typography>
      </AGBox>

      <PMDashboardDataDisplay data={displayData} />

      <AGBox padding={4}>
        {explode && <ConfettiExplosion />}
        <PMDashboardDataTable
          loading={loading}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          action={action}
          onAction={onAction}
        />
        {selectedAction && (
          <LicenseActionModal
            open={actionModal}
            licenseAction={selectedAction}
            issueType={issueType}
            onSubmit={handleClose}
            onClose={handleClose}
          />
        )}
      </AGBox>
    </AGBox>
  );
};

export default ProjectManagerDashboard;
