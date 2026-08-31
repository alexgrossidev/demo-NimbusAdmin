import { useState, memo, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  TablePagination,
  Skeleton,
  Stack,
  Divider,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Event,
  Person,
  Business,
  Edit,
  AdminPanelSettingsTwoTone,
} from "@mui/icons-material";
import type { FullLicenseInfo, LicenseStatus } from "../Interfaces/LicenzeInfo";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import StatusBadgeDropdown from "./ManageLicense.LicenseDropdown";

interface ManageLicenseTableProps {
  licenses: FullLicenseInfo[];
  loading: boolean;
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onEdit: (license: FullLicenseInfo) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editStatus: (id: number, newStatus: LicenseStatus) => void;
  onModifyPermissions: (id: number) => void;
}

interface RowProps {
  license: FullLicenseInfo;
  onEdit: (license: FullLicenseInfo) => void;
  editStatus: (id: number, newStatus: LicenseStatus) => void;
  onModifyPermissions: (id: number) => void;
}

const Row = memo(
  ({ license, onEdit, editStatus, onModifyPermissions }: RowProps) => {
    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        <TableRow
          hover
          onClick={() => setOpen(!open)}
          sx={{
            cursor: "pointer",
            "& > *": { borderBottom: "unset" },
            transition: "background-color 0.2s",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.02) !important" },
          }}
        >
          <TableCell width="50">
            <IconButton aria-label="expand row" size="small">
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {license.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {license.email}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Business fontSize="small" color="action" />
              <Typography variant="body2">{license.businessName}</Typography>
            </Box>
          </TableCell>
          <TableCell>
            <StatusBadgeDropdown
              status={license.status}
              onChange={(newStatus) => editStatus(license.id, newStatus)}
            />
          </TableCell>
          <TableCell>
            <Typography variant="body2">
              {format(license.expirationDate, "dd MMM yyyy", { locale: it })}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {license.licensePrice.toLocaleString("it-IT", {
                style: "currency",
                currency: license.licensePriceCurrency,
              })}
            </Typography>
          </TableCell>
          {/* Edit button - can be used to open a modal with more details or editing options */}
          <TableCell align="right">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onEdit(license);
              }}
            >
              <Edit />
            </IconButton>
          </TableCell>
          {/* Modify Permissions button - can be used to remove the license */}
          <TableCell align="right">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onModifyPermissions(license.id);
              }}
            >
              <AdminPanelSettingsTwoTone />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  margin: 2,
                  p: 2,
                  bgcolor: "rgba(0,0,0,0.01)",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ fontSize: "1rem", fontWeight: 700 }}
                >
                  Dettagli Licenza
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Gestione
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Person fontSize="small" color="primary" />
                        <Typography variant="body2">
                          PM: <b>{license.assignedProjectManager}</b>
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Event fontSize="small" color="primary" />
                        <Typography variant="body2">
                          Inizio: {format(license.startDate, "dd/MM/yyyy")}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="overline" color="text.secondary">
                      Note e Storico
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                      {license.notes.map((note) => (
                        <Box
                          key={note.id}
                          sx={{
                            p: 1.5,
                            borderLeft: "3px solid",
                            borderColor: "primary.main",
                            bgcolor: "white",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              color: "text.secondary",
                              mb: 0.5,
                            }}
                          >
                            {format(note.date, "dd/MM/yyyy HH:mm")}
                          </Typography>
                          <Typography variant="body2">{note.note}</Typography>
                        </Box>
                      ))}
                      {license.notes.length === 0 && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontStyle: "italic" }}
                        >
                          Nessuna nota presente.
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  },
);

Row.displayName = "ManageLicenseTableRow";

const ManageLicenseTable = memo(
  ({
    licenses,
    loading,
    totalCount,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onEdit,
    editStatus,
    onModifyPermissions,
  }: ManageLicenseTableProps) => {
    return (
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
                <TableCell width="50" />
                <TableCell>Utente / Email</TableCell>
                <TableCell>Azienda</TableCell>
                <TableCell>Stato</TableCell>
                <TableCell>Scadenza</TableCell>
                <TableCell align="right">Prezzo</TableCell>
                <TableCell align="right" />
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      <TableCell colSpan={7}>
                        <Skeleton
                          variant="rectangular"
                          height={50}
                          sx={{ my: 1, borderRadius: 1 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : licenses.map((license, idx) => (
                    <Row
                      key={`${license.email}-${idx}`}
                      license={license}
                      onEdit={onEdit}
                      editStatus={editStatus}
                      onModifyPermissions={onModifyPermissions}
                    />
                  ))}
              {!loading && licenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <Typography variant="body1" color="text.secondary">
                      Nessuna licenza trovata per i criteri selezionati.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
      </Paper>
    );
  },
);

ManageLicenseTable.displayName = "ManageLicenseTable";

export default ManageLicenseTable;
