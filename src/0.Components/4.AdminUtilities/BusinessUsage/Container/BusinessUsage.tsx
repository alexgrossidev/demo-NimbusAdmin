import AGBox from "@/3.Theme/0.Atoms/AGBox";
import AGTitle from "@/3.Theme/0.Atoms/AGTitle";
import useGetBusinessUsageMetrics from "../Logic/useGetBusinessUsageMetrics";
import PMDashboardDataDisplay from "@/0.Components/3.Dashboards/PMDashboard/UI/PMDashboard.DataDisplay";
import BusinessUsageDataTable from "../UI/BusinessUsage.DataTable";
import useGetBusinessUsage from "../Logic/useGetBusinessUsage";

const BusinessUsage = () => {
  const { metrics, loading, error } = useGetBusinessUsageMetrics();
  const {
    businesses,
    loading: loadingBusinesses,
    onPageChange,
    onRowsPerPageChange,
    page,
    totalCount,
    rowsPerPage,
  } = useGetBusinessUsage();
  return (
    <AGBox display="flex" flexDirection="column" height="100%">
      <AGTitle variant="h4" gutterBottom>
        Report di Utilizzo
      </AGTitle>
      <PMDashboardDataDisplay
        data={metrics || []}
        gridSize={3}
        loading={loading}
        error={error}
      />
      <BusinessUsageDataTable
        businesses={businesses}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        onPageChange={onPageChange}
        onAction={() => {}}
        loading={loadingBusinesses}
      />
    </AGBox>
  );
};

export default BusinessUsage;
