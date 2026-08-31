import { memo } from "react";
import { Box, useTheme, Stack, Typography, alpha } from "@mui/material";
import { MonetizationOn, RocketLaunch } from "@mui/icons-material";
import CreateLicenseGiantButton from "./CreateLicense.GiantButton";

interface QuestionnaireProps {
    onSelect: (isTrial: boolean) => void;
    contentA: { title: string; subtitle: string; };
    contentB: { title: string; subtitle: string; };
    value?: boolean;
}

const CreateLicenseQuestionnaire = memo(({ onSelect, value, contentA, contentB }: QuestionnaireProps) => {
    const theme = useTheme();

    return (
        <Box sx={{ width: "100%", textAlign: "center" }}>
            <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
                    Che tipo di licenza stiamo creando?
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight={500} sx={{ maxWidth: 480 }}>
                    Scegli l'opzione che meglio si adatta alle esigenze del tuo cliente in questo momento.
                </Typography>
            </Stack>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <CreateLicenseGiantButton
                    onClick={() => onSelect(true)}
                    title={contentA.title}
                    subtitle={contentA.subtitle}
                    icon={<RocketLaunch sx={{ fontSize: 40, color: theme.palette.primary.contrastText }} />}
                    selected={value === true}
                />
                <CreateLicenseGiantButton
                    onClick={() => onSelect(false)}
                    title={contentB.title}
                    subtitle={contentB.subtitle}
                    icon={<MonetizationOn sx={{ fontSize: 40, color: theme.palette.primary.contrastText }} />}
                    selected={value === false}
                />
            </Box>

            {/* Hint Box */}
            <Box sx={{
                mt: 6,
                p: 2,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                mx: "auto",
                maxWidth: 500,
                display: "flex",
                alignItems: "center",
                gap: 2
            }}>
                <Typography variant="body2" color="text.primary" fontWeight={500} textAlign="left">
                    💡 <strong>Nota:</strong> Una licenza di prova ha una durata limitata, mentre una licenza a pagamento richiede una data di scadenza specifica.
                </Typography>
            </Box>
        </Box>
    );
});

CreateLicenseQuestionnaire.displayName = "CreateLicenseQuestionnaire";

export default CreateLicenseQuestionnaire;