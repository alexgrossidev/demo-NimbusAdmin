import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TablePagination,
  Skeleton,
  Tooltip,
  Chip,
  Box,
  alpha,
} from "@mui/material";
import {
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
} from "@mui/icons-material";
import {
  IssueTypeExplanation,
  type LicenseAction,
} from "../Interfaces/licenseActions";

/* ─── Props ─────────────────────────────────────────────── */

interface PMDashboardDataTableProps {
  loading: boolean;
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  action: LicenseAction[];
  onAction: (action: LicenseAction) => void;
}

interface PMDashboardActionRowProps {
  action: LicenseAction;
  onAction: (action: LicenseAction) => void;
}

/* ─── Shared cell typography ────────────────────────────── */

const cellFont = {
  fontFamily: "'Sora', sans-serif",
  fontSize: 13,
} as const;

/* ─── Row ───────────────────────────────────────────────── */

const Row = memo(({ action, onAction }: PMDashboardActionRowProps) => {
  const issue = IssueTypeExplanation.find((i) => i.key === action.issueType);
  const IssueIcon = issue?.icon;

  return (
    <TableRow
      sx={{
        transition: "background-color 150ms ease",
        "&:hover": { backgroundColor: "action.hover" },
        ...(action.done && { opacity: 0.55 }),
      }}
    >
      {/* ── Client ── */}
      <TableCell>
        <Typography sx={{ ...cellFont, fontWeight: 600, lineHeight: 1.3 }}>
          {action.name}
        </Typography>
        <Typography
          sx={{ ...cellFont, fontSize: 11.5, color: "text.secondary" }}
        >
          {action.email}
        </Typography>
      </TableCell>

      {/* ── Issue chip ── */}
      <TableCell>
        <Tooltip title={issue?.detailed ?? ""} placement="top" arrow>
          <Chip
            icon={
              IssueIcon ? (
                <IssueIcon
                  sx={{
                    fontSize: "14px !important",
                    color: `${issue?.color} !important`,
                  }}
                />
              ) : undefined
            }
            label={issue?.brief}
            size="small"
            sx={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              height: 26,
              color: issue?.color,
              backgroundColor: issue?.color
                ? alpha(issue.color, 0.08)
                : undefined,
              border: "1px solid",
              borderColor: issue?.color ? alpha(issue.color, 0.2) : "divider",
            }}
          />
        </Tooltip>
      </TableCell>

      {/* ── Status toggle ── */}
      <TableCell align="right">
        <Tooltip
          title={action.done ? "Segna come da fare" : "Segna come completato"}
          placement="top"
          arrow
        >
          <IconButton
            onClick={() => onAction(action)}
            size="small"
            sx={{
              transition: "all 150ms ease",
              color: action.done ? "success.main" : "text.disabled",
              "&:hover": {
                color: action.done ? "success.dark" : "success.light",
                backgroundColor: (theme) =>
                  alpha(theme.palette.success.main, 0.08),
              },
            }}
          >
            {action.done ? (
              <CheckCircleRounded fontSize="small" />
            ) : (
              <RadioButtonUncheckedRounded fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
});

/* ─── Table ─────────────────────────────────────────────── */

const PMDashboardDataTable = ({
  loading,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  action,
  onAction,
}: PMDashboardDataTableProps) => (
  <Box>
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
        <Table stickyHeader aria-label="pm-action-table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...cellFont, fontWeight: 700 }}>
                Cliente
              </TableCell>
              <TableCell sx={{ ...cellFont, fontWeight: 700 }}>
                Problema
              </TableCell>
              <TableCell sx={{ ...cellFont, fontWeight: 700 }} align="right">
                Fatto
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell colSpan={3}>
                      <Skeleton
                        variant="rounded"
                        height={44}
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : action.map((item, idx) => (
                  <Row
                    key={item.id ?? `${item.name}-${idx}`}
                    action={item}
                    onAction={onAction}
                  />
                ))}

            {!loading && action.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 10 }}>
                  <Typography
                    sx={{
                      ...cellFont,
                      fontSize: 14,
                      color: "text.secondary",
                    }}
                  >
                    Nessuna azione richiesta al momento.
                  </Typography>
                  <Typography
                    sx={{
                      ...cellFont,
                      fontSize: 12,
                      color: "text.disabled",
                      mt: 0.5,
                    }}
                  >
                    Tutti i clienti sono in buona salute!
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
      sx={{
        ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
          cellFont,
      }}
    />
  </Box>
);

export default PMDashboardDataTable;
