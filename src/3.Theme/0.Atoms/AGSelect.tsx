
import {
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFormControl = styled(FormControl)(() => ({
  width: "100%",
  minWidth: 320,
  "& .MuiOutlinedInput-root": {
    borderRadius: 14,
    backgroundColor: "#FAFAFA",
    border: "1.5px solid #E5E7EB",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#9CA3AF",
      backgroundColor: "#F9FAFB",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    "&.Mui-focused": {
      borderColor: "#6366F1",
      backgroundColor: "#FFFFFF",
      boxShadow: "0 0 0 3px rgba(99,102,241,0.12), 0 4px 12px rgba(0,0,0,0.06)",
    },
    "& fieldset": {
      border: "none",
    },
  },
}));

export const StyledSelect = styled(Select)(() => ({
  "& .MuiSelect-select": {
    padding: "12px 16px",
    paddingRight: "44px !important",
    minHeight: "unset",
  },
  "& .MuiSelect-icon": {
    color: "#6B7280",
    right: 12,
    transition: "transform 0.2s ease",
  },
  "&.Mui-open .MuiSelect-icon": {
    transform: "rotate(180deg)",
  },
}));


export const StyledMenuPaper = {
  PaperProps: {
    sx: {
      mt: 1,
      borderRadius: "16px",
      border: "1.5px solid #E5E7EB",
      boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)",
      overflow: "hidden",
      maxHeight: 420,
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      "& .MuiList-root": {
        padding: "8px",
        overflowY: "auto",
        flex: 1,
        "&::-webkit-scrollbar": {
          width: 5,
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
          margin: "8px 0",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#D1D5DB",
          borderRadius: 99,
          "&:hover": {
            background: "#9CA3AF",
          },
        },
      },
    },
  },
};



// ─── Menu Item ──────────────────────────────────────────────────────────────

export const StyledMenuItem = styled(MenuItem)(() => ({
  borderRadius: 10,
  padding: "10px 12px",
  marginBottom: 2,
  overflow: "auto",
  transition: "all 0.15s ease",
  "&:hover": {
    backgroundColor: "#F3F4F6",
  },
  "&.Mui-selected": {
    backgroundColor: "#EEF2FF",
    "&:hover": {
      backgroundColor: "#E0E7FF",
    },
  },
  "&:last-child": {
    marginBottom: 0,
  },
}));