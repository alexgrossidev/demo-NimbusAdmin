import { Box, Typography, Chip, Tooltip, alpha } from "@mui/material";
import type { LicenseAction } from "../Interfaces/licenseActions";
import { ContentCopyRounded } from "@mui/icons-material";

interface PMDashboardAMClientInfoProps {
  action: LicenseAction;
  issue: { brief: string; color: string; detailed: string };
  Icon: React.ElementType;
  copied?: boolean;
  onCopyId: (id: string) => void;
}

const PMDashboardAMClientInfo: React.FC<PMDashboardAMClientInfoProps> = ({
  action,
  issue,
  Icon,
  copied,
  onCopyId,
}) => (
  <Box
    sx={{
      mx: 3,
      mt: 2.5,
      p: 2.5,
      borderRadius: "14px",
      backgroundColor: (theme) => alpha(theme.palette.action.hover, 0.4),
      border: "1px solid",
      borderColor: "divider",
    }}
  >
    {/* ── Client row ── */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 13.5,
          }}
        >
          {action.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 11.5,
            color: "text.secondary",
          }}
        >
          {action.email}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip
          icon={
            <Icon
              sx={{
                fontSize: "14px !important",
                color: `${issue.color} !important`,
              }}
            />
          }
          label={issue.brief}
          size="small"
          sx={{
            color: issue.color,
            backgroundColor: alpha(issue.color, 0.08),
            border: `1px solid ${alpha(issue.color, 0.2)}`,
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            height: 26,
          }}
        />
        <Tooltip
          title={copied ? "Copiato!" : "Copia ID licenza"}
          placement="top"
          arrow
        >
          <Chip
            icon={
              <ContentCopyRounded
                sx={{
                  fontSize: "12px !important",
                  color: "text.disabled !important",
                }}
              />
            }
            label={action.licenseId.slice(0, 8) + "…"}
            size="small"
            onClick={() => onCopyId(action.licenseId)}
            sx={{
              backgroundColor: (theme) =>
                alpha(theme.palette.action.hover, 0.5),
              color: "text.secondary",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 500,
              fontSize: 10.5,
              border: "1px solid",
              borderColor: "divider",
              height: 26,
              cursor: "pointer",
              transition: "all 150ms ease",
              "&:hover": {
                backgroundColor: "action.selected",
              },
            }}
          />
        </Tooltip>
      </Box>
    </Box>

    {/* ── Issue detail callout ── */}
    <Box
      sx={{
        mt: 1.5,
        p: 1.5,
        borderRadius: "10px",
        backgroundColor: alpha(issue.color, 0.06),
        border: `1px solid ${alpha(issue.color, 0.12)}`,
        display: "flex",
        gap: 1,
        alignItems: "flex-start",
      }}
    >
      <Icon
        sx={{ fontSize: 14, color: issue.color, mt: "2px", flexShrink: 0 }}
      />
      <Typography
        sx={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 11.5,
          color: "text.secondary",
          lineHeight: 1.5,
        }}
      >
        {issue.detailed}
      </Typography>
    </Box>
  </Box>
);

export default PMDashboardAMClientInfo;
