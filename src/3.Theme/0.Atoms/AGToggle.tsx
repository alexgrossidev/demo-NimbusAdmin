import {
  Box,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const ModalBox = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 620,
  maxHeight: "92vh",
  overflowY: "auto",
  outline: "none",
  fontFamily: "'Sora', sans-serif",
  "&::-webkit-scrollbar": { width: 4 },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 99,
  },
  borderRadius: "16px",
  boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
  overflow: "hidden",
  border: "1px solid",
  borderColor: "grey.100",
}));

export const SectionLabel = styled(Typography)(() => ({
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#000000",
  fontFamily: "'Sora', sans-serif",
  marginBottom: 10,
}));

export const DarkTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "'Sora', sans-serif",
    fontSize: 13,
    transition: "all 0.2s",
    "& fieldset": { border: "none" },
    "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
    "&.Mui-focused": {
      backgroundColor: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 0 0 3px rgba(255,255,255,0.04)",
    },
  },
  "& .MuiInputBase-input": {
    fontFamily: "'Sora', sans-serif",
    fontSize: 13,
    color: "#000000",
    "&::placeholder": { color: "rgba(255,255,255,0.25)", opacity: 1 },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.3)",
    fontFamily: "'Sora', sans-serif",
    fontSize: 13,
  },
}));

export const StyledToggleGroup = styled(ToggleButtonGroup)(() => ({
  gap: 4,
}));

export const StyledToggle = styled(ToggleButton)(() => ({
  padding: "8px 16px",
  borderRadius: "10px !important",
  border: "1px solid rgba(255,255,255,0.08) !important",
  backgroundColor: "rgba(255,255,255,0.03)",
  fontSize: 12,
  fontWeight: 600,
  fontFamily: "'Sora', sans-serif",
  textTransform: "none",
  transition: "all 0.15s",
  gap: 4,
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2) !important",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
  },
}));
