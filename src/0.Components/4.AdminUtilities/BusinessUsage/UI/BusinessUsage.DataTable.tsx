import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Skeleton,
} from "@mui/material";
import type { BusinessLicenseUsage } from "../Interfaces/BusinessUsage";
import { Circle } from "@mui/icons-material";

interface PMDashboardDataTableProps {
  loading: boolean;
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  businesses: BusinessLicenseUsage[];
  onAction: (action: BusinessLicenseUsage) => void;
}

interface PMDashboardActionRowProps {
  business: BusinessLicenseUsage;
  onAction: (action: BusinessLicenseUsage) => void;
}

const Row = memo(({ business }: PMDashboardActionRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Circle color={business.isActive ? "success" : "error"} />
      </TableCell>
      <TableCell>{business.businessName}</TableCell>
      <TableCell>{business.leadCount}</TableCell>
      <TableCell>{business.clientCount}</TableCell>
      <TableCell>{business.whatsappMessagesIn}</TableCell>
      <TableCell>{business.whatsappMessagesOut}</TableCell>
      <TableCell>{business.lastUsed?.toLocaleString("IT")}</TableCell>
    </TableRow>
  );
});

const BusinessUsageDataTable = ({
  loading,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  businesses,
  onAction,
}: PMDashboardDataTableProps) => (
  <div>
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        mt: 3,
      }}
    >
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Utente / Email</TableCell>
              <TableCell>Lead</TableCell>
              <TableCell>Clienti</TableCell>
              <TableCell>WA in entrata</TableCell>
              <TableCell>WA in uscita</TableCell>
              <TableCell>Ultima Azione</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell colSpan={4}>
                      <Skeleton
                        variant="rectangular"
                        height={50}
                        sx={{ my: 1, borderRadius: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : businesses.map((biz, idx) => (
                  <Row
                    key={`${biz.businessName}-${idx}`}
                    business={biz}
                    onAction={onAction}
                  />
                ))}
            {!loading && businesses.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    Nessuna licenza disponibile
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage="Righe per pagina:"
    />
  </div>
);

export default BusinessUsageDataTable;
