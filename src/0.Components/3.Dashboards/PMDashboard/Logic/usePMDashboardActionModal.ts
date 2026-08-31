import { useState } from "react";
import type { IssueType, LicenseAction } from "../Interfaces/licenseActions";

const usePMDashboardActionModal = () => {
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [issueType, setIssueType] = useState<IssueType>("low-usage");

  const handleOpen = (action: LicenseAction) => {
    setClientName(action.name);
    setClientEmail(action.email);
    setIssueType(action.issueType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClientName("");
    setClientEmail("");
    setIssueType("low-usage");
  };

  return {
    open,
    clientName,
    clientEmail,
    issueType,
    handleOpen,
    handleClose,
  };
}

export default usePMDashboardActionModal;