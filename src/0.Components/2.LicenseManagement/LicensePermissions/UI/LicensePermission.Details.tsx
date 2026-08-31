import { CheckCircle, Cancel } from "@mui/icons-material";
import type React from "react";
import {
  Box,
  Typography,
  Switch,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Stack,
  Divider,
  Badge,
  useTheme,
  alpha,
  type Theme,
} from "@mui/material";
import ProductModules from "@/5.Utils/2.Libraries/ProductModules";
import type { ProductModule } from "@/5.Utils/2.Libraries/ProductModules";
import type { LicenseSearchResultItem } from "../Interfaces/SearchResults";

// ─── ModuleRow ────────────────────────────────────────────────────────────────

interface ModuleRowProps {
  moduleKey: string;
  module: ProductModule;
  enabled: boolean;
  onToggle: () => void;
}

const ModuleRow: React.FC<ModuleRowProps> = ({ module, enabled, onToggle }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        transition: "background 0.2s",
        "&:hover": { background: alpha(theme.palette.primary.main, 0.05) },
      }}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: enabled
            ? alpha(theme.palette.primary.main, 0.15)
            : alpha("#fff", 0.04),
          color: enabled
            ? theme.palette.primary.main
            : theme.palette.text.secondary,
          transition: "all 0.25s",
        }}
      >
        {module.icon}
      </Avatar>

      <Box flex={1} minWidth={0}>
        <Typography variant="body1" fontWeight={600} noWrap>
          {module.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {module.description}
        </Typography>
      </Box>

      <Tooltip title={enabled ? "Disable module" : "Enable module"} arrow>
        <Box display="flex" alignItems="center" gap={1}>
          {enabled ? (
            <CheckCircle sx={{ fontSize: 16, color: "primary.main" }} />
          ) : (
            <Cancel sx={{ fontSize: 16, color: "text.disabled" }} />
          )}
          <Switch
            size="small"
            checked={enabled}
            onChange={onToggle}
            disabled={!module.selectable}
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

// ─── LicenseAccordion ─────────────────────────────────────────────────────────

interface LicensePermissionDetails {
  license: LicenseSearchResultItem | null;
  onToggle: (moduleKey: string) => void;
  onToggleAll: (value: boolean) => void;
  theme: Theme;
}

const LicensePermissionDetails: React.FC<LicensePermissionDetails> = ({
  license,
  onToggle,
  onToggleAll,
  theme,
}) => {
  if (!license) return null;
  const enabledCount = Object.values(license.permissions).filter(
    Boolean,
  ).length;
  const total = Object.keys(ProductModules).length;
  const allEnabled = enabledCount === total;

  return (
    <Accordion defaultExpanded={true} disableGutters>
      <AccordionSummary>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          {license.name[0]}
        </Avatar>

        <Box flex={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">{license.name}</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {license.businessName} - {license.email}
          </Typography>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          onClick={(e) => e.stopPropagation()}
        >
          <Badge
            badgeContent={`${enabledCount}/${total}`}
            sx={{
              "& .MuiBadge-badge": {
                bgcolor:
                  enabledCount > 0
                    ? alpha(theme.palette.primary.main, 0.18)
                    : alpha("#fff", 0.07),
                color:
                  enabledCount > 0
                    ? theme.palette.primary.main
                    : "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
                position: "static",
                transform: "none",
                borderRadius: "8px",
                px: 1,
                minWidth: 42,
                height: 22,
              },
            }}
          >
            <Box />
          </Badge>

          <Tooltip
            title={allEnabled ? "Disable all modules" : "Enable all modules"}
            arrow
          >
            <Switch
              size="small"
              checked={allEnabled}
              onChange={(_, val) => onToggleAll(val)}
            />
          </Tooltip>
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 1.5, pb: 2, pt: 0 }}>
        <Divider sx={{ mb: 1.5, borderColor: "rgba(255,255,255,0.05)" }} />
        <Stack spacing={0.5}>
          {Object.entries(ProductModules).map(([key, mod]) => (
            <ModuleRow
              key={key}
              moduleKey={key}
              module={mod}
              enabled={!!license.permissions[key]}
              onToggle={() => onToggle(key)}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default LicensePermissionDetails;
