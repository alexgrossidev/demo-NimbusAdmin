import { Box, Typography, IconButton, alpha } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface PMDashboardActionModalHeaderProps {
  issue: { color: string; brief: string };
  onClose: () => void;
  IssueIcon: React.ElementType;
}

const PMDashboardActionModalHeader: React.FC<
  PMDashboardActionModalHeaderProps
> = ({ issue, onClose, IssueIcon }) => (
  <Box
    sx={{
      px: 3,
      pt: 2.5,
      pb: 2,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: alpha(issue.color, 0.1),
          border: `1px solid ${alpha(issue.color, 0.15)}`,
        }}
      >
        <IssueIcon sx={{ fontSize: 20, color: issue.color }} />
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: issue.color,
            lineHeight: 1.2,
          }}
        >
          Nuova Azione
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 11.5,
            color: "text.secondary",
            mt: 0.25,
          }}
        >
          {issue.brief}
        </Typography>
      </Box>
    </Box>
    <IconButton
      onClick={onClose}
      size="small"
      sx={{
        color: "text.disabled",
        "&:hover": { color: "text.secondary" },
      }}
    >
      <CloseRoundedIcon fontSize="small" />
    </IconButton>
  </Box>
);

export default PMDashboardActionModalHeader;
