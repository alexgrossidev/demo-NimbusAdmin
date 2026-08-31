import React, { useState } from "react";
import {
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  IssueTypeExplanation,
  type ActionStatus,
  type ActionDone,
  type IssueType,
  type LicenseAction,
} from "../Interfaces/licenseActions";
import PMDashboardActionModalHeader from "../UI/PMDashboard.AMHeader";
import PMDashboardAMClientInfo from "../UI/PMDashboard.AMClientInfo";
import PMDashboardIssueDescription from "../UI/PMDashboard.AMIssue";
import PMDashboardAMContactDevTeam from "../UI/PMDashboard.AMContactDevTeam";
import PMDashboardAMFooter from "../UI/PMDashboard.AMFooter";

export interface LicenseActionModalProps {
  open: boolean;
  onClose: () => void;
  licenseAction: LicenseAction;
  issueType: IssueType;
  onSubmit: (action: Omit<LicenseAction, "id">) => void;
}

export const LicenseActionModal: React.FC<LicenseActionModalProps> = ({
  open,
  onClose,
  licenseAction,
  issueType,
}) => {
  const issue = IssueTypeExplanation.find((i) => i.key === issueType)!;
  const IssueIcon = issue.icon;

  const [actionDone, setActionDone] = useState<ActionDone>("phone");
  const [status, setStatus] = useState<ActionStatus>("pending");
  const [teamMessage, setTeamMessage] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [messageSent, setMessageSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleQuickMessage = (body: string) => {
    setTeamMessage(body);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(
      `ID: ${licenseAction.id}\nCliente: ${licenseAction.name}\nEmail: ${licenseAction.email}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /*
  const handleSubmit = () => {
    if (!actionDate) return;
    onSubmit({
      licenseId,
      name: clientName,
      email: clientEmail,
      issueType,
      status,
      actionDone,
      done: status === "completed",
      actionDate,
      notes,
      createdAt: new Date(),
    });
    onClose();
  };*/

  const handleSendMessage = () => {
    if (!teamMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
    setTeamMessage("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
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
        {/* ── Top accent bar ── */}

        <DialogTitle sx={{ p: 0 }}>
          <Box
            sx={{
              height: 3,
              borderRadius: "24px 24px 0 0",
              backgroundColor: issue.color,
            }}
          />
          <PMDashboardActionModalHeader
            issue={issue}
            onClose={onClose}
            IssueIcon={IssueIcon}
          />
        </DialogTitle>
        {/* ── Header ── */}

        <DialogContent sx={{ p: 0 }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
          <PMDashboardAMClientInfo
            action={licenseAction}
            issue={issue}
            Icon={IssueIcon}
            copied={copied}
            onCopyId={handleCopyId}
          />
          <PMDashboardIssueDescription
            actionDone={actionDone}
            setActionDone={(v) => setActionDone(v as ActionDone)}
            status={status}
            setStatus={(v) => setStatus(v as ActionStatus)}
            priority={priority}
            setPriority={(v) => setPriority(v)}
          />
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 3 }} />
          <Box sx={{ px: 3, pt: 2.5, pb: 3 }}>
            <PMDashboardAMContactDevTeam
              issueType={issueType}
              handleQuickMessage={handleQuickMessage}
              messageSent={messageSent}
              teamMessage={teamMessage}
              setTeamMessage={setTeamMessage}
              handleSendMessage={handleSendMessage}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0 }}>
          <PMDashboardAMFooter
            issue={issue}
            actionDate={new Date().toISOString()}
            onClose={onClose}
            handleSubmit={onClose}
          />
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default LicenseActionModal;
