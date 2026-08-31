import { memo, useMemo } from "react";
import {
  Box,
  Typography,
  alpha,
  useTheme,
  Stack,
  Tooltip,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { AGTextField } from "@atoms/AGFormComponent";
import type { UseFormResult } from "@/5.Utils/1.Hooks/form/useForm";
import type { LicenseFormData } from "../Logic/useCreateLicenseForm";
import { RoleDictionary } from "../Interfaces/LicenseDescriptions";
import type { LicenseRole } from "../Interfaces/License";
import { StyledToggle, StyledToggleGroup } from "@/3.Theme/0.Atoms/AGToggle";

interface EmailFieldProps {
  form: UseFormResult<LicenseFormData>;
  isAdmin?: boolean; // New prop to control "developer" visibility
}

const EmailField = memo(({ form, isAdmin = false }: EmailFieldProps) => {
  const theme = useTheme();

  // Filter roles based on admin status
  const visibleRoles = useMemo(() => {
    const allRoles = Object.keys(RoleDictionary) as LicenseRole[];
    return isAdmin ? allRoles : allRoles.filter((role) => role !== "developer");
  }, [isAdmin]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        py: 2,
      }}
    >
      {/* ... (Existing Icon & Title code remains same) ... */}
      <Stack alignItems="center" spacing={2} sx={{ mb: 1 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, 
                            ${alpha(theme.palette.primary.main, 0.15)} 0%, 
                            ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Email sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        </Box>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ color: theme.palette.text.primary }}
        >
          Qual è l'email del cliente?
        </Typography>
      </Stack>

      <AGTextField
        {...form.getFieldProps("email")}
        variant="glass"
        label="Indirizzo Email"
        type="email"
        placeholder="esempio@azienda.it"
        description="Useremo questa email per inviare i link di attivazione e le notifiche importanti."
        startIcon={<Email fontSize="small" />}
        autoComplete="email"
        autoFocus
        rounded={14}
        fullWidth
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1.35rem",
            fontWeight: 600,
            textAlign: "center",
            py: 2,
          },
        }}
      />

      {/* Role Selection Section */}
      <Stack spacing={2} alignItems="center" width="100%">
        <Typography variant="h6" fontWeight={700}>
          Seleziona il tipo di licenza
        </Typography>

        <StyledToggleGroup
          fullWidth
          exclusive
          // Explicitly map value and onChange to ensure form synchronization
          value={form.form.getValues().role}
          onChange={(_, newValue) => {
            if (newValue !== null) {
              form.setFieldValue("role", newValue);
            }
          }}
          sx={{
            gap: 1.5,
            "& .MuiToggleButtonGroup-grouped": {
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: "12px !important", // Rounded cards look better than a single bar
              mx: 0.5,
            },
          }}
        >
          {visibleRoles.map((roleKey) => {
            const { label, Icon, description } = RoleDictionary[roleKey];
            const isSelected = form.form.getValues().role === roleKey;

            return (
              <Tooltip key={roleKey} title={description} arrow placement="top">
                <StyledToggle
                  value={roleKey}
                  sx={{
                    py: 2,
                    transition: "all 0.2s ease-in-out",
                    // Blatant selection styles
                    ...(isSelected && {
                      backgroundColor: `${alpha(theme.palette.primary.main, 0.1)} !important`,
                      border: `2px solid ${theme.palette.primary.main} !important`,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                      transform: "translateY(-2px)",
                    }),
                  }}
                >
                  <Stack alignItems="center" spacing={1}>
                    <Icon
                      sx={{
                        fontSize: 28,
                        color: isSelected
                          ? theme.palette.primary.main
                          : "inherit",
                      }}
                    />
                    <Typography
                      variant="caption"
                      fontWeight={isSelected ? 700 : 500}
                      sx={{ textTransform: "none" }}
                    >
                      {label}
                    </Typography>

                    {/* Visual indicator (Radio-style dot) */}
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: isSelected
                          ? theme.palette.primary.main
                          : "transparent",
                        border: `1px solid ${isSelected ? "transparent" : theme.palette.divider}`,
                      }}
                    />
                  </Stack>
                </StyledToggle>
              </Tooltip>
            );
          })}
        </StyledToggleGroup>
      </Stack>

      {/* Hint Box */}
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.info.main, 0.05),
          border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
          maxWidth: 400,
          mt: 2,
        }}
      >
        <Typography
          variant="body2"
          color="text.primary"
          fontWeight={500}
          textAlign="center"
        >
          💡 <strong>Consiglio:</strong> Ti suggeriamo di usare un'email
          aziendale se possibile.
        </Typography>
      </Box>
    </Box>
  );
});

EmailField.displayName = "EmailField";
export default EmailField;
