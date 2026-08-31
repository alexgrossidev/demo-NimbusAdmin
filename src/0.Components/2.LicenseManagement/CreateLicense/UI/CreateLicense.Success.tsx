import { memo } from "react";
import { Box, Typography, alpha, useTheme, Button } from "@mui/material";
import { CheckCircleOutline, Replay } from "@mui/icons-material";

interface SuccessStepProps {
    onReset: () => void;
}

const CreateLicenseSuccess = memo(({ onReset }: SuccessStepProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                py: 4,
            }}
        >
            {/* Animated Checkmark */}
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    position: "relative",
                    mb: 4,
                    "@keyframes scaleIn": {
                        "0%": { transform: "scale(0)", opacity: 0 },
                        "70%": { transform: "scale(1.1)", opacity: 1 },
                        "100%": { transform: "scale(1)", opacity: 1 },
                    },
                    animation: "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                }}
            >
                <CheckCircleOutline sx={{ fontSize: 80 }} />

                {/* Ping rings */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "50%",
                        border: `2px solid ${theme.palette.success.main}`,
                        "@keyframes ping": {
                            "0%": { transform: "scale(1)", opacity: 0.5 },
                            "100%": { transform: "scale(1.5)", opacity: 0 },
                        },
                        animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                />
            </Box>

            <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: theme.palette.text.primary }}>
                Licenza Creata!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 400, mx: "auto" }}>
                Tutto fatto! La licenza è stata registrata con successo e la consegna è stata pianificata secondo le tue impostazioni.
            </Typography>

            <Button
                variant="contained"
                size="large"
                startIcon={<Replay />}
                onClick={onReset}
                sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.24)}`,
                }}
            >
                Crea un'altra licenza
            </Button>
        </Box>
    );
});

CreateLicenseSuccess.displayName = "CreateLicenseSuccess";

export default CreateLicenseSuccess;
