import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
    Stack,
    Box,
    alpha,
    useTheme,
    MenuItem,
} from "@mui/material";
import { Close, Edit, Person, CalendarMonth, Euro, Description } from "@mui/icons-material";
import type { FullLicenseInfo } from "../Interfaces/LicenzeInfo";
import useEditLicense from "../Logic/useEditLicense";
import { AGTextField, AGDateField } from "@/3.Theme/0.Atoms/AGFormComponent";
import { useEffect, type ChangeEvent } from "react";

interface ManageLicenseEditProps {
    open: boolean;
    license: FullLicenseInfo | null;
    onClose: () => void;
    onSuccess?: () => void;
}

const ManageLicenseEditModal = ({ open, license, onClose, onSuccess }: ManageLicenseEditProps) => {
    const theme = useTheme();
    const { form, onSubmit, projectManagers, isSubmitting } = useEditLicense(license, () => {
        onSuccess?.();
        onClose();
    });

    // Reset form when license changes or modal opens
    useEffect(() => {
        if (open && license) {
            form.reset({
                assignedProjectManagerID: license.assignedProjectManagerID,
                assignedProjectManager: license.assignedProjectManager,
                expirationDate: new Date(license.expirationDate),
                licensePrice: license.licensePrice,
                newNote: "",
            });
        }
    }, [open, license, form]);

    if (!license) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    padding: 1,
                    boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 3, pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                        }}
                    >
                        <Edit fontSize="small" />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={800}>
                            Modifica Licenza
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {license.businessName} - {license.name}
                        </Typography>
                    </Box>
                </Stack>
                <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, pt: 2 }}>
                <form id="edit-license-form" onSubmit={onSubmit}>
                    <Stack spacing={3.5} sx={{ mt: 1 }}>
                        {/* Select Project Manager */}
                        <AGTextField
                            select
                            label="Project Manager Assegnato"
                            description="Seleziona chi gestirà questa licenza."
                            startIcon={<Person fontSize="small" />}
                            {...form.register("assignedProjectManagerID")}
                            value={form.watch("assignedProjectManagerID")}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const pmId = e.target.value;
                                const pm = projectManagers.find((p) => p.id === pmId);
                                form.setValue("assignedProjectManagerID", pmId, { shouldValidate: true });
                                form.setValue("assignedProjectManager", pm?.name || "", { shouldValidate: true });
                            }}
                            error={!!form.formState.errors.assignedProjectManagerID}
                            helperText={form.formState.errors.assignedProjectManagerID?.message}
                        >
                            {projectManagers.map((pm) => (
                                <MenuItem key={pm.id} value={pm.id}>
                                    {pm.name}
                                </MenuItem>
                            ))}
                        </AGTextField>

                        {/* Date Picker */}
                        <AGDateField
                            label="Data di Scadenza"
                            description="Imposta la nuova data di fine validità."
                            startIcon={<CalendarMonth fontSize="small" />}
                            value={form.watch("expirationDate")}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const date = e.target.valueAsDate;
                                if (date) {
                                    form.setValue("expirationDate", date, { shouldValidate: true });
                                }
                            }}
                            error={!!form.formState.errors.expirationDate}
                            helperText={form.formState.errors.expirationDate?.message}
                        />

                        {/* Price */}
                        <AGTextField
                            type="number"
                            label="Valore Licenza (€)"
                            description="Il costo totale della licenza."
                            startIcon={<Euro fontSize="small" />}
                            {...form.register("licensePrice", { valueAsNumber: true })}
                            error={!!form.formState.errors.licensePrice}
                            helperText={form.formState.errors.licensePrice?.message}
                        />

                        {/* New Note */}
                        <AGTextField
                            multiline
                            rows={3}
                            label="Aggiungi Nota"
                            placeholder="Inserisci una nota descrittiva..."
                            description="Le note sono visibili solo agli amministratori."
                            startIcon={<Description fontSize="small" />}
                            {...form.register("newNote")}
                        />
                    </Stack>
                </form>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button
                    onClick={onClose}
                    sx={{ color: "text.secondary", fontWeight: 700 }}
                    disabled={isSubmitting}
                >
                    Annulla
                </Button>
                <Button
                    type="submit"
                    form="edit-license-form"
                    variant="contained"
                    disableElevation
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1,
                        fontWeight: 800,
                        textTransform: "none",
                        fontSize: "0.95rem",
                    }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Salvataggio..." : "Salva Modifiche"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ManageLicenseEditModal;