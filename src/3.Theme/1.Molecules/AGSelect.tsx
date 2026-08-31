import { JUSTIFICATION_OPTIONS } from "@/0.Components/2.LicenseManagement/ManageLicense/JustificationModal/Interfaces/DefaultJustifications";
import { Box, Typography, alpha } from "@mui/material";

export const PlaceholderValue = () => (
  <Typography
    sx={{
      color: "#9CA3AF",
      fontSize: 14,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 400,
    }}
  >
    Seleziona una motivazione…
  </Typography>
);

// ─── Selected Value Render ──────────────────────────────────────────────────

export const SelectedValue = ({ value }: { value: string }) => {
  const option = JUSTIFICATION_OPTIONS.find((o) => o.value === value);
  if (!option) return <PlaceholderValue />;
  const Icon = option.icon;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "8px",
          backgroundColor: alpha(option.color, 0.1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 15, color: option.color }} />
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "#111827",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.2,
        }}
      >
        {option.title}
      </Typography>
    </Box>
  );
};

// ─── Category Divider ───────────────────────────────────────────────────────

export const CategoryHeader = ({ label }: { label: string }) => (
  <Box
    sx={{
      px: 1.5,
      py: 0.5,
      mt: 0.5,
      mb: 0.25,
    }}
  >
    <Typography
      sx={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#9CA3AF",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {label}
    </Typography>
  </Box>
);
