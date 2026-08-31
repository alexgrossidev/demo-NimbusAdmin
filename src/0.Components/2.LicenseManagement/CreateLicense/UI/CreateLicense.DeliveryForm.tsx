import { memo } from "react";
import { Box, Stack, Typography, alpha, useTheme, Collapse, Fade } from "@mui/material";
import {
    Send as SendIcon,
    EventNote as ScheduleIcon,
    ChatBubbleOutline as MessageIcon,
    InfoOutlined as InfoIcon
} from "@mui/icons-material";
import { AGTextField, AGDateField, AGCheckbox } from "@atoms/AGFormComponent";
import type { DatesFieldProps } from "../Interfaces/Props";

const CreateLicenseDeliveryForm = memo(({ form }: DatesFieldProps) => {
    const theme = useTheme();

    // Watch fields for conditional rendering
    const sendImmediately = form.watch("deliveryData.sendImmediately");

    return (
        <Box sx={{ width: "100%", maxWidth: 500, mx: "auto", py: 2 }}>
            <Stack spacing={4}>

                {/* Section 1: When to send (The Big Choice) */}
                <Box>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                        <Box sx={{
                            p: 1,
                            borderRadius: "50%",
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            display: "flex"
                        }}>
                            <SendIcon color="primary" fontSize="small" />
                        </Box>
                        <Typography variant="h6" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
                            1. Quando vuoi inviare la licenza?
                        </Typography>
                    </Stack>

                    <Box sx={{
                        p: 3,
                        borderRadius: 4,
                        bgcolor: sendImmediately === true ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.background.paper, 0.4),
                        border: `2px solid ${sendImmediately === true ? theme.palette.primary.main : alpha(theme.palette.divider, 0.1)}`,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: sendImmediately === true ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.background.paper, 0.6),
                            transform: sendImmediately === true ? 'none' : 'translateY(-2px)',
                        }
                    }} onClick={() => form.setFieldValue("deliveryData.sendImmediately", true)}>
                        <AGCheckbox
                            label={
                                <Box sx={{ ml: 1 }}>
                                    <Typography variant="subtitle1" fontWeight={700}>
                                        Invia subito (Consigliato)
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Il cliente riceverà l'email con i dettagli tra pochi istanti.
                                    </Typography>
                                </Box>
                            }
                            checked={sendImmediately === true}
                            // Handled by Box onClick for easier UX, but keeping internal for accessibility
                            onChange={(e) => {
                                if (e.target.checked) form.setFieldValue("deliveryData.sendImmediately", true);
                            }}
                        />
                    </Box>

                    <Box sx={{
                        mt: 2,
                        p: 3,
                        borderRadius: 4,
                        bgcolor: sendImmediately === false ? alpha(theme.palette.secondary.main, 0.05) : alpha(theme.palette.background.paper, 0.4),
                        border: `2px solid ${sendImmediately === false ? theme.palette.secondary.main : alpha(theme.palette.divider, 0.1)}`,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: sendImmediately === false ? alpha(theme.palette.secondary.main, 0.08) : alpha(theme.palette.background.paper, 0.6),
                            transform: sendImmediately === false ? 'none' : 'translateY(-2px)',
                        }
                    }} onClick={() => form.setFieldValue("deliveryData.sendImmediately", false)}>
                        <AGCheckbox
                            label={
                                <Box sx={{ ml: 1 }}>
                                    <Typography variant="subtitle1" fontWeight={700}>
                                        Pianifica per un'altra data
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Scegli tu il giorno esatto in cui il sistema invierà l'email.
                                    </Typography>
                                </Box>
                            }
                            checked={sendImmediately === false}
                            color="secondary"
                            onChange={(e) => {
                                if (e.target.checked) form.setFieldValue("deliveryData.sendImmediately", false);
                            }}
                        />

                        <Collapse in={!sendImmediately} timeout={400}>
                            <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                                <Stack direction="row" spacing={1} sx={{ mb: 1, color: theme.palette.secondary.main }}>
                                    <ScheduleIcon fontSize="small" />
                                    <Typography variant="caption" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                                        Scegli la data di invio:
                                    </Typography>
                                </Stack>
                                <AGDateField
                                    {...form.getFieldProps("deliveryData.deliverySchedule")}
                                    value={form.getFieldValue("deliveryData.deliverySchedule")}
                                    onChange={(e) => {
                                        const date = (e.target as HTMLInputElement).valueAsDate;
                                        if (date) form.setFieldValue("deliveryData.deliverySchedule", date);
                                    }}
                                    variant="glass"
                                    rounded={12}
                                    placeholder="Seleziona giorno"
                                    description="Assicurati di scegliere una data futura."
                                    fullWidth
                                />
                            </Box>
                        </Collapse>
                    </Box>
                </Box>

                {/* Section 2: Custom Message */}
                <Box>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                        <Box sx={{
                            p: 1,
                            borderRadius: "50%",
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            display: "flex"
                        }}>
                            <MessageIcon color="secondary" fontSize="small" />
                        </Box>
                        <Typography variant="h6" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
                            2. Vuoi aggiungere un messaggio?
                        </Typography>
                    </Stack>

                    <AGTextField
                        {...form.getFieldProps("deliveryData.customMessage")}
                        label="Messaggio di Benvenuto"
                        multiline
                        rows={3}
                        variant="glass"
                        rounded={16}
                        placeholder="Esempio: Benvenuto! Siamo felici di averti con noi. Ecco la tua nuova licenza..."
                        description="Questo testo verrà inserito nell'email che riceverà il cliente."
                        fullWidth
                    />
                </Box>

                {/* Guidance Footer */}
                <Fade in timeout={1000}>
                    <Box sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.info.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2
                    }}>
                        <InfoIcon color="info" sx={{ mt: 0.3 }} />
                        <Typography variant="body2" color="text.secondary">
                            <strong>Controllo finale:</strong> Una volta cliccato su "Prossimo", potrai rivedere tutti i dati prima di confermare definitivamente.
                        </Typography>
                    </Box>
                </Fade>

            </Stack>
        </Box>
    );
});

CreateLicenseDeliveryForm.displayName = "CreateLicenseDeliveryForm";

export default CreateLicenseDeliveryForm;
