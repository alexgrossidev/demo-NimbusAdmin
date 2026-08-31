import { AGDateField } from "@/3.Theme/0.Atoms/AGFormComponent";
import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";
import { EventAvailable } from "@mui/icons-material";
import type { DatesFieldProps } from "../Interfaces/Props";

const CreateLicenseFinishDates = ({ form }: DatesFieldProps) => {
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
                            ${alpha(theme.palette.success.main, 0.15)} 0%, 
                            ${alpha(theme.palette.primary.main, 0.15)} 100%)`,
                        border: `2px solid ${alpha(theme.palette.success.main, 0.2)}`,
                    }}
                >
                    <EventAvailable
                        sx={{
                            fontSize: 40,
                            color: theme.palette.success.main,
                        }}
                    />
                </Box>
                <Typography variant="h5" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
                    Scadenza Licenza
                </Typography>
            </Stack>

            <Stack spacing={3} sx={{ width: "100%", maxWidth: 400 }}>
                <AGDateField
                    {...form.getFieldProps("expirationDate")}
                    value={form.getFieldValue("expirationDate")}
                    label="Data di Fine"
                    description="Seleziona l'ultimo giorno di validità della licenza."
                    variant="glass"
                    rounded={14}
                    onChange={(e) => {
                        const date = (e.target as HTMLInputElement).valueAsDate;
                        if (date && !isNaN(date.getTime())) {
                            form.setFieldValue("expirationDate", date);
                        }
                    }}
                />
            </Stack>

            {/* Hint Box */}
            <Box sx={{
                mt: 1,
                p: 2,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.info.main, 0.05),
                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                width: "100%",
                maxWidth: 400
            }}>
                <Typography variant="body2" color="text.primary" fontWeight={500} textAlign="center">
                    🎯 Oltre questa data, il cliente non potrà più accedere alle funzionalità Premium.
                </Typography>
            </Box>
        </Box>
    );
};

export default CreateLicenseFinishDates;
