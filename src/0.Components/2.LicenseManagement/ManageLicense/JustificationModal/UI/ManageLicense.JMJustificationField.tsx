import { Box, TextField, Typography, Collapse } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { MAX_LENGTH, MIN_LENGTH } from "../Logic/useJustificationModal";

interface JustificationFieldProps {
  value: string;
  charCount: number;
  isOverLimit: boolean;
  isTooShort: boolean;
  accentColor: string;
  onChange: (value: string) => void;
}

const HELPER_HINTS = [
  "Motivo della modifica",
  "Responsabile della decisione",
  "Data prevista di revisione",
];

const JustificationField = ({
  value,
  charCount,
  isOverLimit,
  isTooShort,
  accentColor,
  onChange,
}: JustificationFieldProps) => {
  const hasError = isOverLimit || isTooShort;
  const progressPct = Math.min((charCount / MAX_LENGTH) * 100, 100);

  const getHelperText = () => {
    if (isOverLimit)
      return `Testo troppo lungo. Rimuovi ${charCount - MAX_LENGTH} caratteri.`;
    if (isTooShort)
      return `Scrivi almeno ${MIN_LENGTH} caratteri per continuare.`;
    return "";
  };

  return (
    <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
      {/* Guidance note */}
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
        <InfoOutlinedIcon
          sx={{
            fontSize: "0.95rem",
            color: "grey.400",
            mt: "1px",
            flexShrink: 0,
          }}
        />
        <Box>
          <Typography
            sx={{ fontSize: "0.78rem", color: "grey.500", lineHeight: 1.5 }}
          >
            Includi nella motivazione:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, mt: 0.5 }}>
            {HELPER_HINTS.map((hint) => (
              <Box
                component="li"
                key={hint}
                sx={{ fontSize: "0.78rem", color: "grey.500", lineHeight: 1.6 }}
              >
                {hint}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Textarea */}
      <TextField
        multiline
        rows={4}
        fullWidth
        placeholder="Es: Sospensione temporanea per manutenzione programmata dal 20 al 25 febbraio. Approvata da Mario Rossi."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={hasError}
        slotProps={{
          input: {
            sx: {
              fontSize: "0.88rem",
              lineHeight: 1.6,
              borderRadius: "10px",
              color: "grey.800",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: hasError ? "error.main" : accentColor,
                borderWidth: "2px",
              },
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            transition: "box-shadow 0.2s",
            "&.Mui-focused": {
              boxShadow: hasError
                ? "0 0 0 3px rgba(198,40,40,0.1)"
                : `0 0 0 3px ${accentColor}18`,
            },
          },
        }}
      />

      {/* Footer row: error + char count */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Collapse in={hasError} unmountOnExit>
          <Typography
            sx={{ fontSize: "0.76rem", color: "error.main", fontWeight: 500 }}
          >
            {getHelperText()}
          </Typography>
        </Collapse>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
          {/* Progress bar */}
          <Box
            sx={{
              width: 48,
              height: 3,
              borderRadius: 2,
              backgroundColor: "grey.200",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${progressPct}%`,
                backgroundColor: isOverLimit
                  ? "error.main"
                  : charCount >= MIN_LENGTH
                    ? accentColor
                    : "grey.400",
                borderRadius: 2,
                transition: "width 0.2s, background-color 0.2s",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: "0.73rem",
              color: isOverLimit ? "error.main" : "grey.400",
              fontVariantNumeric: "tabular-nums",
              transition: "color 0.2s",
            }}
          >
            {charCount}/{MAX_LENGTH}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default JustificationField;
