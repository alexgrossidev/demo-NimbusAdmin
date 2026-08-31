import { memo } from "react";
import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";
import { Business, Person } from "@mui/icons-material";
import { AGTextField } from "@atoms/AGFormComponent";
import type { UseFormResult } from "@/5.Utils/1.Hooks/form/useForm";
import type { LicenseFormData } from "../Logic/useCreateLicenseForm";

interface BusinessDataFieldsProps {
    form: UseFormResult<LicenseFormData>;
}

const BusinessDataFields = memo(({ form }: BusinessDataFieldsProps) => {
    const theme = useTheme();

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
            {/* Header */}
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
                    <Business
                        sx={{
                            fontSize: 40,
                            color: theme.palette.primary.main,
                        }}
                    />
                </Box>
                <Typography variant="h5" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
                    Informazioni Aziendali
                </Typography>
            </Stack>

            {/* Form Fields */}
            <Stack spacing={3.5} sx={{ width: "100%" }}>
                {/* Business Name */}
                <AGTextField
                    {...form.getFieldProps("businessName")}
                    variant="glass"
                    label="Ragione Sociale"
                    placeholder="Esempio: Acme S.r.l."
                    description="Inserisci il nome ufficiale dell'azienda del cliente."
                    startIcon={<Business fontSize="small" />}
                    autoComplete="organization"
                    autoFocus
                    rounded={14}
                    fullWidth
                />

                <Box sx={{ pt: 1 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                        <Box sx={{
                            p: 0.8,
                            borderRadius: "50%",
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            display: "flex"
                        }}>
                            <Person color="secondary" fontSize="small" />
                        </Box>
                        <Typography variant="h6" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
                            Dati del Cliente
                        </Typography>
                    </Stack>

                    <Stack spacing={2.5}>
                        {/* Username / Name */}
                        <AGTextField
                            {...form.getFieldProps("name")}
                            variant="glass"
                            label="Nome Utente o Nome Completo"
                            placeholder="Esempio: Mario Rossi"
                            description="Il nome visualizzato nel profilo del cliente."
                            startIcon={<Person fontSize="small" />}
                            autoComplete="name"
                            rounded={14}
                            fullWidth
                        />

                        {/* Provisional-password entry was removed: an admin
                            should not set or see another user's password. The
                            client instead receives a secure activation link
                            (see the email step) to set their own. */}
                    </Stack>
                </Box>
            </Stack>

            {/* Hint Box */}
            <Box sx={{
                mt: 1,
                p: 2,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.success.main, 0.05),
                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                width: "100%"
            }}>
                <Typography variant="body2" color="text.primary" fontWeight={500} textAlign="center">
                    🔒 Il cliente riceverà un link di attivazione sicuro per impostare la propria password al primo accesso.
                </Typography>
            </Box>
        </Box>
    );
});

BusinessDataFields.displayName = "BusinessDataFields";

export default BusinessDataFields;
