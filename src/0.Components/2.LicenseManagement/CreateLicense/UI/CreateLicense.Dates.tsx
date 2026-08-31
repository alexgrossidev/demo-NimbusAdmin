import { memo } from "react";
import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { AGDateField, AGTextField } from "@atoms/AGFormComponent";
import type { DatesFieldProps } from "../Interfaces/Props";

interface DatesFieldWithTrialProps extends DatesFieldProps {
    isTrial: boolean;
}
const DatesField = memo(({ form, isTrial }: DatesFieldWithTrialProps) => {
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
                    <CalendarMonth
                        sx={{
                            fontSize: 40,
                            color: theme.palette.primary.main,
                        }}
                    />
                </Box>
                <Typography variant="h5" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
                    {isTrial ? "Configura Periodo di Prova" : "Configura Inizio Licenza"}
                </Typography>
            </Stack>

            <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 400 }}>
                {/* Start Date */}
                <AGDateField
                    {...form.getFieldProps("startDate")}
                    value={form.getFieldValue("startDate")}
                    label="Data di Inizio"
                    description={isTrial ? "Quando deve iniziare il periodo di prova?" : "La data in cui la licenza diventerà attiva."}
                    variant="glass"
                    rounded={14}
                    onChange={(e) => {
                        const date = (e.target as HTMLInputElement).valueAsDate;
                        if (date && !isNaN(date.getTime())) {
                            form.setFieldValue("startDate", date);
                        }
                    }}
                />

                {/* Trial Duration */}
                {isTrial && (
                    <AGTextField
                        {...form.getFieldProps("trialPeriodDays")}
                        value={form.getFieldValue("trialPeriodDays") ?? ""}
                        type="number"
                        label="Durata della Prova (Giorni)"
                        placeholder="Esempio: 14"
                        description="Quanti giorni di prova gratuita vuoi concedere?"
                        inputProps={{ min: 1, max: 90 }}
                        variant="glass"
                        fullWidth
                        rounded={14}
                        onChange={(e) => {
                            const val = e.target.value;
                            const num = val === "" ? undefined : Number(val);
                            form.setFieldValue("trialPeriodDays", num as any);
                        }}
                    />
                )}
            </Stack>

            {/* Info Box */}
            <Box sx={{
                mt: 1,
                p: 2,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.warning.main, 0.05),
                border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                width: "100%",
                maxWidth: 400
            }}>
                <Typography variant="body2" color="text.primary" fontWeight={500} textAlign="center">
                    {isTrial
                        ? "⚠️ La prova gratuita può durare al massimo 90 giorni."
                        : "ℹ️ La licenza sarà valida a partire dalla data selezionata."}
                </Typography>
            </Box>
        </Box>
    );
});

DatesField.displayName = "DatesField";

export default DatesField;
