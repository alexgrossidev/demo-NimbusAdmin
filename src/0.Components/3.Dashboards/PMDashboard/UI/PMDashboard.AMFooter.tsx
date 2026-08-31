import { alpha, Box, Button } from "@mui/material";

interface PMDashboardAMFooterProps {
  issue: { color: string };
  actionDate: string;
  onClose: () => void;
  handleSubmit: () => void;
}

const PMDashboardAMFooter: React.FC<PMDashboardAMFooterProps> = ({
  issue,
  actionDate,
  onClose,
  handleSubmit,
}) => (
  <Box
    sx={{
      px: 3,
      py: 2.5,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 1.5,
      borderTop: "1px solid",
      borderColor: "divider",
    }}
  >
    <Button
      onClick={onClose}
      sx={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        fontSize: 13,
        textTransform: "none",
        color: "text.secondary",
        borderRadius: "10px",
        px: 2,
        transition: "all 150ms ease",
        "&:hover": {
          backgroundColor: "action.hover",
          color: "text.primary",
        },
      }}
    >
      Annulla
    </Button>
    <Button
      variant="contained"
      onClick={handleSubmit}
      disabled={!actionDate}
      sx={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        textTransform: "none",
        borderRadius: "12px",
        px: 3,
        py: 1.25,
        backgroundColor: issue.color,
        color: "#fff",
        boxShadow: `0 2px 12px ${alpha(issue.color, 0.25)}`,
        transition: "all 200ms ease",
        "&:hover": {
          backgroundColor: issue.color,
          boxShadow: `0 4px 20px ${alpha(issue.color, 0.4)}`,
          filter: "brightness(1.1)",
          transform: "translateY(-1px)",
        },
        "&.Mui-disabled": {
          backgroundColor: "action.disabledBackground",
          color: "text.disabled",
          boxShadow: "none",
        },
      }}
    >
      Salva Azione
    </Button>
  </Box>
);

export default PMDashboardAMFooter;
