import { Box, Button, CircularProgress } from "@mui/material";

interface ModalActionsProps {
    isValid: boolean;
    isSubmitting?: boolean;
    accentColor: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ModalActions = ({
    isValid,
    isSubmitting = false,
    accentColor,
    onCancel,
    onConfirm,
}: ModalActionsProps) => (
    <Box
        sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            gap: 1.5,
            justifyContent: "flex-end",
            borderTop: "1px solid",
            borderColor: "grey.100",
            backgroundColor: "grey.50",
            borderRadius: "0 0 16px 16px",
        }}
    >
        <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isSubmitting}
            sx={{
                borderRadius: "9px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                px: 2.5,
                borderColor: "grey.300",
                color: "grey.600",
                "&:hover": {
                    borderColor: "grey.400",
                    backgroundColor: "grey.100",
                },
            }}
        >
            Annulla
        </Button>

        <Button
            variant="contained"
            onClick={onConfirm}
            disabled={!isValid || isSubmitting}
            startIcon={
                isSubmitting ? (
                    <CircularProgress size={14} sx={{ color: "inherit" }} />
                ) : undefined
            }
            sx={{
                borderRadius: "9px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                px: 2.5,
                backgroundColor: accentColor,
                boxShadow: `0 4px 12px ${accentColor}40`,
                "&:hover": {
                    backgroundColor: accentColor,
                    filter: "brightness(0.9)",
                    boxShadow: `0 6px 16px ${accentColor}50`,
                },
                "&:disabled": {
                    backgroundColor: "grey.300",
                    color: "grey.500",
                    boxShadow: "none",
                },
                transition: "all 0.2s",
            }}
        >
            {isSubmitting ? "Salvataggio…" : "Conferma modifica"}
        </Button>
    </Box>
);

export default ModalActions;