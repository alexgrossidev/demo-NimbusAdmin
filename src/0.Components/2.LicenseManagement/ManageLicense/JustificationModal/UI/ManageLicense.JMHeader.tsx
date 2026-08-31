import { Box, Typography, Chip } from "@mui/material";
import type { LicenseStatus } from "../../Main/Interfaces/LicenzeInfo";
import { getStatusConfig } from "../../Main/Logic/Utils";

interface ModalHeaderProps {
  newStatus: LicenseStatus;
}

const ModalHeader = ({ newStatus }: ModalHeaderProps) => {
  const config = getStatusConfig(newStatus);

  return (
    <Box
      sx={{
        px: 3,
        pt: 3.5,
        pb: 2.5,
        borderBottom: "1px solid",
        borderColor: "grey.100",
        background: `linear-gradient(135deg, ${config.lightBg} 0%, #fff 60%)`,
      }}
    >
      {/* Icon circle */}
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: "14px",
          backgroundColor: config.lightBg,
          border: `2px solid ${config.accentColor}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          mb: 2,
          boxShadow: `0 4px 12px ${config.accentColor}18`,
        }}
      >
        {config.icon}
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "grey.900",
          letterSpacing: "-0.01em",
          mb: 0.5,
        }}
      >
        Cambia stato licenza
      </Typography>

      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}
      >
        <Typography
          variant="body2"
          sx={{ color: "grey.500", fontSize: "0.82rem" }}
        >
          Nuovo stato:
        </Typography>
        <Chip
          label={config.label}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color={config.color as any}
          size="small"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "0.7rem",
            px: 1,
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          mt: 1.5,
          color: "grey.600",
          fontSize: "0.83rem",
          lineHeight: 1.5,
          p: 1.5,
          borderRadius: "8px",
          backgroundColor: `${config.accentColor}08`,
          border: `1px solid ${config.accentColor}18`,
        }}
      >
        {config.description}
      </Typography>
    </Box>
  );
};

export default ModalHeader;
