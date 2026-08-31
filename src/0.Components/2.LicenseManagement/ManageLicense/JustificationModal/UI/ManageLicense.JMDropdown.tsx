import React from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Box, Typography } from "@mui/material";
import {
  StyledFormControl,
  StyledSelect,
  StyledMenuItem,
  StyledMenuPaper,
} from "@/3.Theme/0.Atoms/AGSelect";
import { CategoryHeader } from "@/3.Theme/1.Molecules/AGSelect";
import { JUSTIFICATION_OPTIONS } from "../Interfaces/DefaultJustifications";
import { alpha } from "@mui/material";
import { SelectedValue } from "@/3.Theme/1.Molecules/AGSelect";
import { PlaceholderValue } from "@/3.Theme/1.Molecules/AGSelect";

interface JustificationSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  technical: "Tecnico",
  user: "Utente",
  business: "Business",
  product: "Prodotto",
  compliance: "Conformità",
  other: "Altro",
};

export const JustificationSelect: React.FC<JustificationSelectProps> = ({
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  label = "Motivazione",
}) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as string);
  };

  // Group options by category
  const grouped = JUSTIFICATION_OPTIONS.reduce<
    Record<string, typeof JUSTIFICATION_OPTIONS>
  >((acc, opt) => {
    if (!acc[opt.category]) acc[opt.category] = [];
    acc[opt.category].push(opt);
    return acc;
  }, {});

  const categoryOrder = [
    "technical",
    "user",
    "business",
    "product",
    "compliance",
    "other",
  ];

  const menuItems: React.ReactNode[] = [];
  categoryOrder.forEach((cat) => {
    if (!grouped[cat]) return;
    menuItems.push(
      <CategoryHeader key={`header-${cat}`} label={CATEGORY_LABELS[cat]} />,
    );
    grouped[cat].forEach((opt) => {
      const Icon = opt.icon;
      menuItems.push(
        <StyledMenuItem key={opt.value} value={opt.value} disableRipple>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "10px",
                backgroundColor: alpha(opt.color, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background-color 0.15s ease",
              }}
            >
              <Icon sx={{ fontSize: 17, color: opt.color }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "#111827",
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.3,
                  mb: 0.25,
                }}
              >
                {opt.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11.5,
                  color: "#6B7280",
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {opt.label}
              </Typography>
            </Box>
            {value === opt.value && (
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "#6366F1",
                  flexShrink: 0,
                  ml: 1,
                }}
              />
            )}
          </Box>
        </StyledMenuItem>,
      );
    });
  });

  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 600,
            color: error ? "#EF4444" : "#374151",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.02em",
            mb: 0.75,
            display: "block",
          }}
        >
          {label}
        </Typography>
      )}
      <StyledFormControl error={error}>
        <StyledSelect
          value={value || ""}
          onChange={handleChange}
          disabled={disabled}
          displayEmpty
          renderValue={(val) =>
            val ? <SelectedValue value={val as string} /> : <PlaceholderValue />
          }
          IconComponent={KeyboardArrowDownRoundedIcon}
          MenuProps={{
            ...StyledMenuPaper,
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            transformOrigin: { vertical: "top", horizontal: "left" },
          }}
        >
          {menuItems}
        </StyledSelect>
      </StyledFormControl>
      {helperText && (
        <Typography
          sx={{
            fontSize: 11.5,
            color: error ? "#EF4444" : "#9CA3AF",
            fontFamily: "'DM Sans', sans-serif",
            mt: 0.75,
            ml: 0.5,
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default JustificationSelect;
