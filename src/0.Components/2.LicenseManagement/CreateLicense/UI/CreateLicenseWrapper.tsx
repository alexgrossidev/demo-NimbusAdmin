import { memo, type ReactNode } from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import AGGlassBox from "@/3.Theme/0.Atoms/AGGlassBox";

// ============================================================================
// Types
// ============================================================================

interface StepMediaProps {
    /** URL to a GIF, image, or Lottie JSON */
    src: string;
    /** Alt text for accessibility */
    alt?: string;
    /** Media type */
    type?: "image" | "lottie";
    /** Height of the media container */
    height?: number | string;
}

interface CreateLicenseWrapperProps {
    /** Step title */
    title: string;
    /** Step subtitle/description */
    subtitle?: string;
    /** Optional media (GIF/animation) to show above the content */
    media?: StepMediaProps;
    /** Form content */
    children: ReactNode;
    /** Additional helper text below content */
    helperText?: string;
    /** Max width of the content area */
    maxWidth?: number | string;
}

// ============================================================================
// Component
// ============================================================================

const CreateLicenseWrapper = memo(
    ({
        title,
        subtitle,
        media,
        children,
        helperText,
        maxWidth = 800,
    }: CreateLicenseWrapperProps) => {
        const theme = useTheme();

        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    py: 2,
                }}
            >
                <AGGlassBox
                    glass
                    glassBlur={16}
                    glassOpacity={0.08}
                    rounded={24}
                    padding={0}
                    shadow={`0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`}
                    sx={{
                        width: "100%",
                        maxWidth,
                        overflow: "hidden",
                    }}
                >
                    {/* Media Section */}
                    {media && (
                        <Box
                            sx={{
                                width: "100%",
                                height: media.height ?? 180,
                                background: `linear-gradient(135deg, 
                                    ${alpha(theme.palette.primary.main, 0.08)} 0%, 
                                    ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            }}
                        >
                            {media.type === "lottie" ? (
                                // Placeholder for Lottie - you can integrate @lottiefiles/react-lottie-player
                                <Box
                                    component="img"
                                    src={media.src}
                                    alt={media.alt ?? "Step illustration"}
                                    sx={{
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            ) : (
                                <Box
                                    component="img"
                                    src={media.src}
                                    alt={media.alt ?? "Step illustration"}
                                    sx={{
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            )}
                        </Box>
                    )}

                    {/* Content Section */}
                    <Box sx={{ p: 4 }}>
                        {/* Header */}
                        <Box sx={{ textAlign: "center", mb: 4 }}>
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.text.secondary} 100%)`,
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    mb: subtitle ? 1 : 0,
                                }}
                            >
                                {title}
                            </Typography>

                            {subtitle && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ maxWidth: 400, mx: "auto" }}
                                >
                                    {subtitle}
                                </Typography>
                            )}
                        </Box>

                        {/* Form Content */}
                        <Box>{children}</Box>

                        {/* Helper Text */}
                        {helperText && (
                            <Box
                                sx={{
                                    mt: 3,
                                    pt: 3,
                                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    💡 {helperText}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </AGGlassBox>
            </Box>
        );
    }
);

CreateLicenseWrapper.displayName = "CreateLicenseWrapper";

export default CreateLicenseWrapper;
