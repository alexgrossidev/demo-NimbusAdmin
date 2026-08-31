import { forwardRef, useMemo } from "react";
import {
    TextField,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    useTheme,
    alpha,
} from "@mui/material";
import type { TextFieldProps, CheckboxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

// ============================================================================
// AGTextField - Modern styled text field
// ============================================================================

interface AGTextFieldProps extends Omit<TextFieldProps, "variant"> {
    /** Visual variant */
    variant?: "outlined" | "filled" | "glass";
    /** Left icon/adornment */
    startIcon?: React.ReactNode;
    /** Right icon/adornment */
    endIcon?: React.ReactNode;
    /** Border radius override */
    rounded?: number;
    /** Full width by default */
    fullWidth?: boolean;
    /** Helper text below the input (alias for helperText) */
    description?: string;
}

const StyledTextField = styled(TextField, {
    shouldForwardProp: (prop) =>
        !["$rounded", "$isGlass"].includes(prop as string),
})<{ $rounded?: number; $isGlass?: boolean }>(({ theme, $rounded, $isGlass }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: $rounded ?? (theme.shape.borderRadius as number),
        backgroundColor: $isGlass
            ? alpha(theme.palette.background.paper, 0.6)
            : theme.palette.background.paper,
        backdropFilter: $isGlass ? "blur(12px)" : undefined,
        transition: theme.transitions.create(
            ["border-color", "box-shadow", "background-color"],
            { duration: 200 }
        ),
        "& fieldset": {
            borderColor: alpha(theme.palette.divider, 0.3),
            borderWidth: 1,
            transition: theme.transitions.create(["border-color", "border-width"], {
                duration: 200,
            }),
        },
        "&:hover fieldset": {
            borderColor: alpha(theme.palette.primary.main, 0.5),
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
        },
        "&.Mui-focused": {
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.15)}`,
            backgroundColor: $isGlass
                ? alpha(theme.palette.background.paper, 0.8)
                : theme.palette.background.paper,
        },
        "&.Mui-error fieldset": {
            borderColor: theme.palette.error.main,
        },
        "&.Mui-error.Mui-focused": {
            boxShadow: `0 0 0 4px ${alpha(theme.palette.error.main, 0.1)}`,
        },
    },
    "& .MuiFilledInput-root": {
        borderRadius: $rounded ?? (theme.shape.borderRadius as number),
        backgroundColor: alpha(theme.palette.action.hover, 0.08),
        transition: theme.transitions.create(["background-color", "box-shadow"], {
            duration: 200,
        }),
        "&:hover": {
            backgroundColor: alpha(theme.palette.action.hover, 0.12),
        },
        "&.Mui-focused": {
            backgroundColor: alpha(theme.palette.action.hover, 0.08),
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
        "&::before, &::after": {
            display: "none",
        },
    },
    "& .MuiInputLabel-root": {
        fontWeight: 600,
        fontSize: "0.95rem",
        color: alpha(theme.palette.text.primary, 0.7),
        "&.Mui-focused": {
            color: theme.palette.primary.main,
        },
        "&.Mui-error": {
            color: theme.palette.error.main,
        },
    },
    "& .MuiFormHelperText-root": {
        marginLeft: 4,
        marginTop: 6,
        fontSize: "0.85rem",
        fontWeight: 500,
        lineHeight: 1.4,
        color: alpha(theme.palette.text.secondary, 0.8),
        "&.Mui-error": {
            color: theme.palette.error.main,
            fontWeight: 600,
        },
    },
    "& .MuiInputAdornment-root": {
        color: theme.palette.text.secondary,
    },
}));

export const AGTextField = forwardRef<HTMLInputElement, AGTextFieldProps>(
    (
        {
            variant = "outlined",
            startIcon,
            endIcon,
            rounded,
            fullWidth = true,
            InputProps,
            description,
            helperText,
            ...props
        },
        ref
    ) => {
        const isGlass = variant === "glass";
        const muiVariant = isGlass ? "outlined" : variant;

        return (
            <StyledTextField
                inputRef={ref}
                variant={muiVariant}
                fullWidth={fullWidth}
                $rounded={rounded}
                $isGlass={isGlass}
                helperText={helperText || description}
                InputProps={{
                    ...InputProps,
                    startAdornment: startIcon ? (
                        <InputAdornment position="start">{startIcon}</InputAdornment>
                    ) : (
                        InputProps?.startAdornment
                    ),
                    endAdornment: endIcon ? (
                        <InputAdornment position="end">{endIcon}</InputAdornment>
                    ) : (
                        InputProps?.endAdornment
                    ),
                }}
                {...props}
            />
        );
    }
);

AGTextField.displayName = "AGTextField";

// ============================================================================
// AGCheckbox - Modern styled checkbox
// ============================================================================

interface AGCheckboxProps extends Omit<CheckboxProps, "color"> {
    /** Label text */
    label?: React.ReactNode;
    /** Color variant */
    color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
    /** Helper text below the checkbox */
    helperText?: string;
    /** Whether there's an error */
    error?: boolean;
    /** Size variant */
    size?: "small" | "medium" | "large";
}

const StyledCheckbox = styled(Checkbox, {
    shouldForwardProp: (prop) => prop !== "$size",
})<{ $size?: "small" | "medium" | "large" }>(({ theme, $size }) => {
    const sizes = {
        small: { icon: 18, padding: 6 },
        medium: { icon: 22, padding: 8 },
        large: { icon: 28, padding: 10 },
    };
    const s = sizes[$size || "medium"];

    return {
        padding: s.padding,
        borderRadius: (theme.shape.borderRadius as number) / 2,
        transition: theme.transitions.create(["background-color", "transform"], {
            duration: 150,
        }),
        "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            transform: "scale(1.05)",
        },
        "&:active": {
            transform: "scale(0.95)",
        },
        "& .MuiSvgIcon-root": {
            fontSize: s.icon,
        },
        "&.Mui-checked": {
            "& .MuiSvgIcon-root": {
                animation: "checkPop 200ms ease-out",
            },
        },
        "@keyframes checkPop": {
            "0%": { transform: "scale(0.8)" },
            "50%": { transform: "scale(1.1)" },
            "100%": { transform: "scale(1)" },
        },
    };
});

const StyledFormControlLabel = styled(FormControlLabel, {
    shouldForwardProp: (prop) => prop !== "$error",
})<{ $error?: boolean }>(({ theme, $error }) => ({
    marginLeft: -8,
    marginRight: 16,
    "& .MuiFormControlLabel-label": {
        fontWeight: 600,
        fontSize: "1.05rem",
        color: $error ? theme.palette.error.main : alpha(theme.palette.text.primary, 0.9),
        userSelect: "none",
        transition: theme.transitions.create("color", { duration: 150 }),
    },
}));

const HelperText = styled("span", {
    shouldForwardProp: (prop) => prop !== "$error",
})<{ $error?: boolean }>(({ theme, $error }) => ({
    display: "block",
    marginLeft: 32,
    marginTop: -4,
    fontSize: "0.875rem",
    color: $error ? theme.palette.error.main : theme.palette.text.secondary,
}));

export const AGCheckbox = forwardRef<HTMLInputElement, AGCheckboxProps>(
    (
        {
            label,
            color = "primary",
            helperText,
            error = false,
            size = "medium",
            ...props
        },
        ref
    ) => {
        const theme = useTheme();

        const checkbox = (
            <StyledCheckbox
                inputRef={ref}
                color={color}
                $size={size}
                sx={{
                    color: error ? theme.palette.error.main : undefined,
                    "&.Mui-checked": {
                        color: error ? theme.palette.error.main : undefined,
                    },
                }}
                {...props}
            />
        );

        if (!label && !helperText) {
            return checkbox;
        }

        return (
            <div>
                <StyledFormControlLabel
                    control={checkbox}
                    label={label}
                    $error={error}
                />
                {helperText && <HelperText $error={error}>{helperText}</HelperText>}
            </div>
        );
    }
);

AGCheckbox.displayName = "AGCheckbox";

// ============================================================================
// AGDateField - Modern styled date field
// ============================================================================

interface AGDateFieldProps extends Omit<TextFieldProps, "variant" | "type"> {
    /** Visual variant */
    variant?: "outlined" | "filled" | "glass";
    /** Left icon/adornment */
    startIcon?: React.ReactNode;
    /** Right icon/adornment */
    endIcon?: React.ReactNode;
    /** Border radius override */
    rounded?: number;
    /** Full width by default */
    fullWidth?: boolean;
    /** Minimum date (yyyy-mm-dd) */
    min?: string;
    /** Maximum date (yyyy-mm-dd) */
    max?: string;
    description?: string;
    /** Value can be a Date object or string (YYYY-MM-DD) */
    value?: Date | string | null;
}

export const AGDateField = forwardRef<HTMLInputElement, AGDateFieldProps>(
    (
        {
            variant = "outlined",
            startIcon,
            endIcon,
            rounded,
            fullWidth = true,
            InputProps,
            min,
            max,
            description,
            value,
            helperText,
            ...props
        },
        ref
    ) => {
        const isGlass = variant === "glass";
        const muiVariant = isGlass ? "outlined" : variant;

        // Ensure date is in YYYY-MM-DD format for native input
        const dateValue = useMemo(() => {
            if (value instanceof Date && !isNaN(value.getTime())) {
                return value.toISOString().split("T")[0];
            }
            return value; // Keep as is (string or undefined)
        }, [value]);

        return (
            <StyledTextField
                inputRef={ref}
                type="date"
                variant={muiVariant}
                fullWidth={fullWidth}
                $rounded={rounded}
                $isGlass={isGlass}
                value={dateValue ?? ""}
                helperText={helperText || description}
                InputLabelProps={{
                    shrink: true,
                    ...props.InputLabelProps,
                }}
                InputProps={{
                    ...InputProps,
                    startAdornment: startIcon ? (
                        <InputAdornment position="start">{startIcon}</InputAdornment>
                    ) : (
                        InputProps?.startAdornment
                    ),
                    endAdornment: endIcon ? (
                        <InputAdornment position="end">{endIcon}</InputAdornment>
                    ) : (
                        InputProps?.endAdornment
                    ),
                }}
                inputProps={{
                    min,
                    max,
                    ...props.inputProps,
                }}
                {...props}
            />
        );
    }
);

AGDateField.displayName = "AGDateField";

// ============================================================================
// Exports
// ============================================================================

export default { AGTextField, AGCheckbox, AGDateField };