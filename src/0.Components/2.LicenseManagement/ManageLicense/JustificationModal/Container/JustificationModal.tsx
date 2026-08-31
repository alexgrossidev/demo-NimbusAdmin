import { useCallback } from "react";
import { Dialog, DialogContent, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { LicenseStatus } from "../../Main/Interfaces/LicenzeInfo";
import { useJustificationModal } from "../Logic/useJustificationModal";
import { getStatusConfig } from "../../Main/Logic/Utils";
import ModalHeader from "../UI/ManageLicense.JMHeader";
import JustificationField from "../UI/ManageLicense.JMJustificationField";
import ModalActions from "../UI/ManageLicense.JMModalActions";
import JustificationSelect from "../UI/ManageLicense.JMDropdown";
interface JustificationModalProps {
  open: boolean;
  newStatus: LicenseStatus;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: (justification: string) => void;
}

const JustificationModal = ({
  open,
  newStatus,
  isSubmitting = false,
  onClose,
  onConfirm,
}: JustificationModalProps) => {
  const {
    justification,
    isValid,
    option,
    charCount,
    isOverLimit,
    isTooShort,
    handleDefaultJustification,
    handleChange,
    handleReset,
  } = useJustificationModal();

  const { accentColor } = getStatusConfig(newStatus);

  const handleClose = useCallback(() => {
    handleReset();
    onClose();
  }, [handleReset, onClose]);

  const handleConfirm = useCallback(() => {
    if (!isValid) return;
    onConfirm(justification);
    handleReset();
  }, [isValid, justification, onConfirm, handleReset]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.35)",
          },
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "grey.100",
        },
      }}
    >
      {/* Close button */}
      <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "grey.400",
            backgroundColor: "white",
            border: "1px solid",
            borderColor: "grey.200",
            width: 28,
            height: 28,
            "&:hover": { backgroundColor: "grey.100", color: "grey.700" },
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <CloseIcon sx={{ fontSize: "0.9rem" }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <ModalHeader newStatus={newStatus} />

        <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mb: 2,
              p: 1.5,
              borderRadius: "8px",
              backgroundColor: "grey.50",
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <JustificationSelect
              value={option}
              onChange={handleDefaultJustification}
            />
          </Box>
        </Box>

        <JustificationField
          value={justification}
          charCount={charCount}
          isOverLimit={isOverLimit}
          isTooShort={isTooShort}
          accentColor={accentColor}
          onChange={handleChange}
        />

        <ModalActions
          isValid={isValid}
          isSubmitting={isSubmitting}
          accentColor={accentColor}
          onCancel={handleClose}
          onConfirm={handleConfirm}
        />
      </DialogContent>
    </Dialog>
  );
};

export default JustificationModal;
