import { DarkTextField, SectionLabel } from "@/3.Theme/0.Atoms/AGToggle";
import { BoltRounded, CheckCircle, Send } from "@mui/icons-material";
import { Box, Button, Chip, alpha } from "@mui/material";
import QUICK_MESSAGES from "../Interfaces/QuickMessages";
import type { IssueType } from "../Interfaces/licenseActions";

interface PMDashboardAMContactDevTeamProps {
  issueType: string;
  handleQuickMessage: (body: string) => void;
  messageSent: boolean;
  teamMessage: string;
  setTeamMessage: (v: string) => void;
  handleSendMessage: () => void;
}

const ACCENT = "#6366F1"; // A neutral indigo accent for the dev-team section

const PMDashboardAMContactDevTeam: React.FC<
  PMDashboardAMContactDevTeamProps
> = ({
  issueType,
  handleQuickMessage,
  messageSent,
  teamMessage,
  setTeamMessage,
  handleSendMessage,
}) => (
  <Box
    sx={{
      p: 2.5,
      borderRadius: "14px",
      backgroundColor: (theme) => alpha(theme.palette.action.hover, 0.4),
      border: "1px solid",
      borderColor: "divider",
    }}
  >
    {/* ── Section header ── */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
      <BoltRounded sx={{ fontSize: 14, color: ACCENT }} />
      <SectionLabel sx={{ mb: 0 }}>
        Messaggio al team di sviluppo (Opzionale)
      </SectionLabel>
    </Box>

    {/* ── Quick messages ── */}
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
      {QUICK_MESSAGES[issueType as IssueType].map((qm) => (
        <Chip
          key={qm.label}
          label={qm.label}
          size="small"
          onClick={() => handleQuickMessage(qm.body)}
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            backgroundColor: alpha(ACCENT, 0.08),
            color: ACCENT,
            border: `1px solid ${alpha(ACCENT, 0.2)}`,
            cursor: "pointer",
            height: 26,
            transition: "all 150ms ease",
            "&:hover": { backgroundColor: alpha(ACCENT, 0.15) },
          }}
        />
      ))}
    </Box>

    {/* ── Text field ── */}
    <DarkTextField
      multiline
      rows={3}
      fullWidth
      placeholder="Scrivi un messaggio al team di sviluppo (urgenze, bug, richieste specifiche…)"
      value={teamMessage}
      onChange={(e) => setTeamMessage(e.target.value)}
      sx={{ mb: 1.5 }}
    />

    {/* ── Send button ── */}
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        variant="contained"
        size="small"
        startIcon={messageSent ? <CheckCircle /> : <Send />}
        onClick={handleSendMessage}
        disabled={!teamMessage.trim()}
        sx={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: 12,
          textTransform: "none",
          borderRadius: "10px",
          px: 2.5,
          py: 1,
          backgroundColor: messageSent ? "#10B981" : ACCENT,
          color: "#fff",
          boxShadow: "none",
          transition: "all 200ms ease",
          "&:hover": {
            backgroundColor: messageSent ? "#059669" : "#4F46E5",
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: "action.disabledBackground",
            color: "text.disabled",
            boxShadow: "none",
          },
        }}
      >
        {messageSent ? "Inviato!" : "Invia al Team"}
      </Button>
    </Box>
  </Box>
);

export default PMDashboardAMContactDevTeam;
