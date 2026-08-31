import { Box, Typography, alpha } from "@mui/material";
import {
  StyledToggleGroup,
  StyledToggle,
  SectionLabel,
} from "@/3.Theme/0.Atoms/AGToggle";
import {
  AccessTime,
  CheckCircleOutline,
  EmailRounded,
  ErrorOutline,
  FlagRounded,
  MoreHorizOutlined,
  PhoneRounded,
  WarningAmber,
} from "@mui/icons-material";

interface PMDashboardIssueDescriptionProps {
  actionDone: string;
  setActionDone: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  priority: "low" | "medium" | "high";
  setPriority: (v: "low" | "medium" | "high") => void;
}

const PRIORITY_CONFIG = {
  low: { color: "#22C55E", label: "Bassa" },
  medium: { color: "#FBBF24", label: "Media" },
  high: { color: "#EF4444", label: "Alta" },
} as const;

const PMDashboardIssueDescription = ({
  actionDone,
  setActionDone,
  status,
  setStatus,
  priority,
  setPriority,
}: PMDashboardIssueDescriptionProps) => (
  <Box sx={{ px: 3, pt: 3, pb: 1 }}>
    {/* ── Contact type ── */}
    <SectionLabel>Tipo di contatto</SectionLabel>
    <StyledToggleGroup
      value={actionDone}
      exclusive
      onChange={(_, v) => v && setActionDone(v)}
      sx={{ flexWrap: "wrap", gap: 1, mb: 3 }}
    >
      <StyledToggle value="phone">
        <PhoneRounded sx={{ fontSize: 15 }} /> Telefono
      </StyledToggle>
      <StyledToggle value="email">
        <EmailRounded sx={{ fontSize: 15 }} /> Email
      </StyledToggle>
      <StyledToggle value="other">
        <MoreHorizOutlined sx={{ fontSize: 15 }} /> Altro
      </StyledToggle>
    </StyledToggleGroup>

    {/* ── Status ── */}
    <SectionLabel>Stato</SectionLabel>
    <StyledToggleGroup
      value={status}
      exclusive
      onChange={(_, v) => v && setStatus(v)}
      sx={{ flexWrap: "wrap", gap: 1, mb: 3 }}
    >
      <StyledToggle value="pending" sx={{ flex: 1 }}>
        <AccessTime sx={{ fontSize: 14 }} /> In attesa
      </StyledToggle>
      <StyledToggle value="completed" sx={{ flex: 1 }}>
        <CheckCircleOutline sx={{ fontSize: 14 }} /> Completato
      </StyledToggle>
      <StyledToggle value="overdue" sx={{ flex: 1 }}>
        <WarningAmber sx={{ fontSize: 14 }} /> Scaduto
      </StyledToggle>
      <StyledToggle value="failed" sx={{ flex: 1 }}>
        <ErrorOutline sx={{ fontSize: 14 }} /> Fallito
      </StyledToggle>
    </StyledToggleGroup>

    {/* ── Priority ── */}
    <SectionLabel>Priorità</SectionLabel>
    <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
      {(["low", "medium", "high"] as const).map((p) => {
        const { color, label } = PRIORITY_CONFIG[p];
        const isSelected = priority === p;

        return (
          <Box
            key={p}
            onClick={() => setPriority(p)}
            sx={{
              flex: 1,
              py: 1,
              px: 1.5,
              borderRadius: "10px",
              border: "1px solid",
              borderColor: isSelected ? alpha(color, 0.4) : "divider",
              backgroundColor: isSelected ? alpha(color, 0.1) : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
              cursor: "pointer",
              transition: "all 150ms ease",
              "&:hover": {
                backgroundColor: alpha(color, 0.08),
                borderColor: alpha(color, 0.25),
              },
            }}
          >
            <FlagRounded
              sx={{
                fontSize: 13,
                color: isSelected ? color : "text.disabled",
                transition: "color 150ms ease",
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 11.5,
                fontWeight: 600,
                color: isSelected ? color : "text.secondary",
                textTransform: "capitalize",
                transition: "color 150ms ease",
              }}
            >
              {label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  </Box>
);

export default PMDashboardIssueDescription;
