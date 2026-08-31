import { memo } from "react";
import {
    Box,
    Stack,
    Typography,
    alpha,
    useTheme,
    Divider,
    Paper,
} from "@mui/material";
import {
    Business,
    Email,
    Person,
    CalendarMonth,
    Send as SendIcon,
    EventAvailable,
    AssignmentInd,
    Description as NoteIcon,
} from "@mui/icons-material";
import type { DatesFieldProps } from "../Interfaces/Props";

const ReviewSection = ({
    icon,
    title,
    children,
    color = "primary"
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    color?: "primary" | "secondary" | "success" | "warning";
}) => {
    const theme = useTheme();
    const mainColor = theme.palette[color].main;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.background.paper, 0.4),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                backdropFilter: "blur(10px)",
                width: "100%",
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Box
                    sx={{
                        p: 1,
                        borderRadius: "12px",
                        bgcolor: alpha(mainColor, 0.1),
                        color: mainColor,
                        display: "flex",
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="subtitle1" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
                    {title}
                </Typography>
            </Stack>
            <Stack spacing={1.5}>
                {children}
            </Stack>
        </Paper>
    );
};

const DataRow = ({ label, value, icon }: { label: string; value: string | React.ReactNode; icon?: React.ReactNode }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                {icon && <Box sx={{ color: "text.secondary", display: "flex", opacity: 0.6 }}>{icon}</Box>}
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {label}
                </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={700} sx={{ color: theme.palette.text.primary, textAlign: "right" }}>
                {value}
            </Typography>
        </Stack>
    );
};

const CreateLicenseLicenseReview = memo(({ form }: DatesFieldProps) => {
    const theme = useTheme();
    const data = form.getAllValues();

    const formatDate = (dateValue?: Date | string) => {
        if (!dateValue) return "N/A";

        const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

        if (isNaN(date.getTime())) return "N/A";

        return date.toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", py: 2 }}>
            <Stack spacing={3}>

                {/* 1. Account & Azienda */}
                <ReviewSection icon={<Business fontSize="small" />} title="Dati Aziendali e Account">
                    <DataRow
                        label="Ragione Sociale"
                        value={data.businessName}
                        icon={<Business sx={{ fontSize: 16 }} />}
                    />
                    <DataRow
                        label="Referente"
                        value={data.name}
                        icon={<Person sx={{ fontSize: 16 }} />}
                    />
                    <DataRow
                        label="Email Invio"
                        value={data.email}
                        icon={<Email sx={{ fontSize: 16 }} />}
                    />
                    <Divider sx={{ opacity: 0.5, my: 0.5 }} />
                    <DataRow
                        label="Ruolo"
                        value={data.role.toUpperCase()}
                        icon={<AssignmentInd sx={{ fontSize: 16 }} />}
                    />
                </ReviewSection>

                {/* 2. Dettagli Licenza */}
                <ReviewSection
                    icon={<CalendarMonth fontSize="small" />}
                    title="Configurazione Licenza"
                    color="secondary"
                >
                    <DataRow
                        label="Tipo Licenza"
                        value={data.isTrial ? "PROVA GRATUITA" : "PAGAMENTO"}
                    />
                    <DataRow
                        label="Inizio Validità"
                        value={formatDate(data.startDate)}
                    />
                    {data.isTrial ? (
                        <>
                            <DataRow
                                label="Durata Prova"
                                value={`${data.trialPeriodDays} Giorni`}
                            />
                            {data.createLicenseAfterTrial && (
                                <DataRow
                                    label="Scadenza Post-Prova"
                                    value={formatDate(data.expirationDate)}
                                />
                            )}
                        </>
                    ) : (
                        <DataRow
                            label="Scadenza"
                            value={formatDate(data.expirationDate)}
                        />
                    )}
                </ReviewSection>

                {/* 3. Consegna */}
                <ReviewSection
                    icon={<SendIcon fontSize="small" />}
                    title="Pianificazione Invio"
                    color="success"
                >
                    <DataRow
                        label="Metodo Invio"
                        value={data.deliveryData.sendImmediately ? "Immediato" : "Pianificato"}
                        icon={<SendIcon sx={{ fontSize: 16 }} />}
                    />
                    {!data.deliveryData.sendImmediately && (
                        <DataRow
                            label="Data Invio"
                            value={formatDate(data.deliveryData.deliverySchedule)}
                            icon={<EventAvailable sx={{ fontSize: 16 }} />}
                        />
                    )}
                    {data.deliveryData.customMessage && (
                        <Box sx={{ mt: 1, p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.05), border: `1px solid ${alpha(theme.palette.success.main, 0.1)}` }}>
                            <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                                <NoteIcon sx={{ fontSize: 14, color: theme.palette.success.main }} />
                                <Typography variant="caption" fontWeight={700} color="success.main">MESSAGGIO PERSONALIZZATO</Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                "{data.deliveryData.customMessage}"
                            </Typography>
                        </Box>
                    )}
                </ReviewSection>

                {/* Warning Footer */}
                <Box sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.warning.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`
                }}>
                    <Typography variant="caption" color="warning.main" fontWeight={700} display="block" textAlign="center">
                        ⚠️ Cliccando su "Completa", la licenza verrà salvata e l'invio pianificato.
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
});

CreateLicenseLicenseReview.displayName = "CreateLicenseLicenseReview";

export default CreateLicenseLicenseReview;