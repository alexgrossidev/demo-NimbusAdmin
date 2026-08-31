import { memo } from "react";
import { Box, Typography, alpha, styled, keyframes } from "@mui/material";
import { Add } from "@mui/icons-material";

// ============================================================================
// Animations
// ============================================================================

const pulse = keyframes`
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.05); opacity: 0.3; }
`;

const shimmer = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

// ============================================================================
// Styled Components
// ============================================================================

const GiantButtonContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    cursor: "pointer",
    borderRadius: 24,
    padding: "48px 64px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    background: `linear-gradient(135deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.secondary.main} 50%,
        ${theme.palette.primary.dark} 100%)`,
    backgroundSize: "200% 200%",
    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.4)}`,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",

    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: `linear-gradient(90deg, 
            transparent 0%, 
            ${alpha("#fff", 0.2)} 50%, 
            transparent 100%)`,
        backgroundSize: "200% 100%",
        animation: `${shimmer} 3s infinite`,
        pointerEvents: "none",
    },

    "&::after": {
        content: '""',
        position: "absolute",
        inset: -2,
        borderRadius: 26,
        background: `linear-gradient(135deg, 
            ${alpha("#fff", 0.3)} 0%, 
            transparent 50%,
            ${alpha("#fff", 0.1)} 100%)`,
        zIndex: -1,
        animation: `${pulse} 2s ease-in-out infinite`,
    },

    "&:hover": {
        transform: "translateY(-8px) scale(1.02)",
        boxShadow: `0 32px 80px ${alpha(theme.palette.primary.main, 0.5)}`,
        backgroundPosition: "100% 100%",

        "& .icon-container": {
            transform: "rotate(90deg) scale(1.1)",
        },
    },

    "&:active": {
        transform: "translateY(-4px) scale(0.98)",
    },
}));

const IconContainer = styled(Box)(() => ({
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: alpha("#fff", 0.2),
    backdropFilter: "blur(8px)",
    border: `2px solid ${alpha("#fff", 0.3)}`,
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
}));

// ============================================================================
// Component
// ============================================================================


interface CreateLicenseGiantButtonProps {
    onClick: () => void;
    title?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    selected?: boolean;
}


const CreateLicenseGiantButton = memo(
    ({
        onClick,
        title = "Create New License",
        subtitle = "Click to start the license creation wizard",
        icon,
        selected = false,
    }: CreateLicenseGiantButtonProps) => {
        return (
            <GiantButtonContainer
                onClick={onClick}
                role="button"
                tabIndex={0}
                sx={selected ? {
                    boxShadow: `0 0 0 4px ${alpha('#fff', 0.5)}`,
                    outline: `2px solid ${alpha('#fff', 0.7)}`,
                    transform: 'scale(1.04)',
                } : {}}
            >
                <IconContainer className="icon-container">
                    {icon ?? <Add sx={{ fontSize: 40, color: "#fff" }} />}
                </IconContainer>

                <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                        color: "#fff",
                        textShadow: `0 2px 12px ${alpha("#000", 0.3)}`,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: alpha("#fff", 0.85),
                        textShadow: `0 1px 8px ${alpha("#000", 0.2)}`,
                    }}
                >
                    {subtitle}
                </Typography>
            </GiantButtonContainer>
        );
    }
);

CreateLicenseGiantButton.displayName = "CreateLicenseGiantButton";

export default CreateLicenseGiantButton;