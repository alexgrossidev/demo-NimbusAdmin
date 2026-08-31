import { memo, type ReactNode } from "react";
import {
    Stepper as MuiStepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses,
    Box,
    Typography,
    Button,
    alpha,
    useTheme,
    styled,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import type { UseStepperResult } from "@/5.Utils/1.Hooks/stepper/useStepper";

// ============================================================================
// Styled Components
// ============================================================================

const GradientConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 20,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: alpha(theme.palette.divider, 0.3),
        borderRadius: 2,
        transition: "background 0.3s ease",
    },
}));

interface StepIconContainerProps {
    active: boolean;
    completed: boolean;
}

const StepIconContainer = styled("div")<StepIconContainerProps>(({ theme, active, completed }) => ({
    width: 44,
    height: 44,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    ...(completed && {
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
    }),
    ...(active && {
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
        transform: "scale(1.1)",
    }),
    ...(!active && !completed && {
        backgroundColor: alpha(theme.palette.action.disabled, 0.2),
        border: `2px solid ${alpha(theme.palette.divider, 0.3)}`,
    }),
}));

// ============================================================================
// Step Icon Component
// ============================================================================

interface StepIconProps {
    active: boolean;
    completed: boolean;
    stepNumber: number;
}

const StepIcon = memo(({ active, completed, stepNumber }: StepIconProps) => {
    const theme = useTheme();

    return (
        <StepIconContainer active={active} completed={completed}>
            {completed ? (
                <Check sx={{ color: "#fff", fontSize: 22 }} />
            ) : (
                <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                        color: active ? "#fff" : theme.palette.text.secondary,
                    }}
                >
                    {stepNumber}
                </Typography>
            )}
        </StepIconContainer>
    );
});

StepIcon.displayName = "StepIcon";

// ============================================================================
// Main Stepper Component
// ============================================================================

interface StepperProps {
    stepper: UseStepperResult;
    children: ReactNode; // Current step content
    showNavigation?: boolean;
    nextLabel?: string;
    backLabel?: string;
    completeLabel?: string;
    skipLabel?: string;
    alternativeLabel?: boolean;
    orientation?: "horizontal" | "vertical";
}

const Stepper = memo(
    ({
        stepper,
        children,
        showNavigation = true,
        nextLabel = "Continue",
        backLabel = "Back",
        completeLabel = "Complete",
        skipLabel = "Skip",
        alternativeLabel = true,
        orientation = "horizontal",
    }: StepperProps) => {
        const theme = useTheme();
        const {
            activeStep,
            steps,
            isFirstStep,
            isLastStep,
            isComplete,
            next,
            back,
            skip,
            goTo,
            isStepComplete,
            isStepSkipped,
            isStepOptional,
            canGoTo,
        } = stepper;

        if (isComplete) {
            return <>{children}</>;
        }

        return (
            <Box sx={{ width: "100%" }}>
                {/* Stepper Header */}
                <MuiStepper
                    activeStep={activeStep}
                    alternativeLabel={alternativeLabel && orientation === "horizontal"}
                    orientation={orientation}
                    connector={<GradientConnector />}
                    sx={{ mb: 4 }}
                >
                    {steps.map((step, index) => (
                        <Step
                            key={step.label}
                            completed={isStepComplete(index)}
                            sx={{
                                cursor: canGoTo(index) ? "pointer" : "default",
                                "&:hover": canGoTo(index)
                                    ? { "& .MuiStepLabel-label": { color: theme.palette.primary.main } }
                                    : {},
                            }}
                            onClick={() => canGoTo(index) && goTo(index)}
                        >
                            <StepLabel
                                StepIconComponent={() => (
                                    <StepIcon
                                        active={activeStep === index}
                                        completed={isStepComplete(index)}
                                        stepNumber={index + 1}
                                    />
                                )}
                                optional={
                                    isStepOptional(index) ? (
                                        <Typography variant="caption" color="text.secondary">
                                            Optional
                                        </Typography>
                                    ) : isStepSkipped(index) ? (
                                        <Typography variant="caption" color="warning.main">
                                            Skipped
                                        </Typography>
                                    ) : step.description ? (
                                        <Typography variant="caption" color="text.secondary">
                                            {step.description}
                                        </Typography>
                                    ) : undefined
                                }
                                sx={{
                                    "& .MuiStepLabel-label": {
                                        mt: 1,
                                        fontWeight: activeStep === index ? 600 : 400,
                                        transition: "all 0.2s ease",
                                    },
                                }}
                            >
                                {step.label}
                            </StepLabel>
                        </Step>
                    ))}
                </MuiStepper>

                {/* Step Content */}
                <Box sx={{ minHeight: 200, py: 2 }}>{children}</Box>

                {/* Navigation */}
                {showNavigation && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={back}
                            disabled={isFirstStep}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                opacity: isFirstStep ? 0 : 1,
                                visibility: isFirstStep ? "hidden" : "visible",
                            }}
                        >
                            {backLabel}
                        </Button>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            {isStepOptional(activeStep) && (
                                <Button variant="text" onClick={skip} sx={{ borderRadius: 2 }}>
                                    {skipLabel}
                                </Button>
                            )}

                            {/* Hide continue button if step.hideContinueButton is true */}
                            {!steps[activeStep]?.hideContinueButton && (
                                <Button
                                    variant="contained"
                                    onClick={next}
                                    sx={{
                                        borderRadius: 2,
                                        px: 4,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                                        "&:hover": {
                                            boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                                        },
                                    }}
                                >
                                    {isLastStep ? completeLabel : nextLabel}
                                </Button>
                            )}
                        </Box>
                    </Box>
                )}
            </Box>
        );
    }
);

Stepper.displayName = "Stepper";

export default Stepper;
