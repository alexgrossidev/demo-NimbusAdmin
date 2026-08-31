import { useState, useCallback, useMemo } from "react";

export interface Step {
    label: string;
    description?: string;
    optional?: boolean;
    validate?: () => boolean | Promise<boolean>;
    hideContinueButton?: boolean;
}

export interface UseStepperOptions {
    steps: Step[];
    initialStep?: number;
    linear?: boolean; // If true, must complete steps in order
    onComplete?: () => void | Promise<void>;
    onStepChange?: (step: number, direction: "next" | "back") => void;
}

export interface UseStepperResult {
    // State
    activeStep: number;
    steps: Step[];
    isFirstStep: boolean;
    isLastStep: boolean;
    isComplete: boolean;
    completedSteps: Set<number>;
    skippedSteps: Set<number>;

    // Navigation
    next: () => Promise<boolean>;
    back: () => void;
    goTo: (step: number) => void;
    skip: () => void;
    reset: () => void;
    complete: () => Promise<void>;

    // Helpers
    isStepComplete: (step: number) => boolean;
    isStepSkipped: (step: number) => boolean;
    isStepOptional: (step: number) => boolean;
    canGoTo: (step: number) => boolean;
    progress: number; // 0-100
}

const useStepper = (options: UseStepperOptions): UseStepperResult => {
    const { steps, initialStep = 0, linear = true, onComplete, onStepChange } = options;

    const [activeStep, setActiveStep] = useState(initialStep);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [skippedSteps, setSkippedSteps] = useState<Set<number>>(new Set());
    const [isComplete, setIsComplete] = useState(false);

    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === steps.length - 1;

    const next = useCallback(async () => {
        const currentStep = steps[activeStep];

        // Validate current step if validator exists
        if (currentStep?.validate) {
            const isValid = await currentStep.validate();
            if (!isValid) return false;
        }


        // Mark as completed
        setCompletedSteps((prev) => new Set(prev).add(activeStep));

        // Remove from skipped if it was skipped before
        setSkippedSteps((prev) => {
            const next = new Set(prev);
            next.delete(activeStep);
            return next;
        });


        if (isLastStep) {
            setIsComplete(true);
            await onComplete?.();
        } else {
            setActiveStep((prev) => prev + 1);
            onStepChange?.(activeStep + 1, "next");
        }

        return true;
    }, [activeStep, steps, isLastStep, onComplete, onStepChange]);

    const back = useCallback(() => {
        if (!isFirstStep) {
            setActiveStep((prev) => prev - 1);
            onStepChange?.(activeStep - 1, "back");
        }


    }, [isFirstStep, activeStep, onStepChange]);

    const goTo = useCallback(
        (step: number) => {
            if (step < 0 || step >= steps.length) return;

            // In linear mode, can only go to completed steps or next incomplete
            if (linear) {
                const maxAllowed = Math.max(...Array.from(completedSteps), -1) + 1;
                if (step > maxAllowed) return;
            }

            setActiveStep(step);
        },
        [steps.length, linear, completedSteps]
    );

    const skip = useCallback(() => {
        const currentStep = steps[activeStep];
        if (!currentStep?.optional) return;

        setSkippedSteps((prev) => new Set(prev).add(activeStep));

        if (!isLastStep) {
            setActiveStep((prev) => prev + 1);
        }
    }, [activeStep, steps, isLastStep]);

    const reset = useCallback(() => {
        setActiveStep(initialStep);
        setCompletedSteps(new Set());
        setSkippedSteps(new Set());
        setIsComplete(false);
    }, [initialStep]);

    const complete = useCallback(async () => {
        setIsComplete(true);
        await onComplete?.();
    }, [onComplete]);

    const isStepComplete = useCallback((step: number) => completedSteps.has(step), [completedSteps]);
    const isStepSkipped = useCallback((step: number) => skippedSteps.has(step), [skippedSteps]);
    const isStepOptional = useCallback((step: number) => steps[step]?.optional ?? false, [steps]);

    const canGoTo = useCallback(
        (step: number) => {
            if (step < 0 || step >= steps.length) return false;
            if (!linear) return true;
            const maxAllowed = Math.max(...Array.from(completedSteps), -1) + 1;
            return step <= maxAllowed;
        },
        [steps.length, linear, completedSteps]
    );

    const progress = useMemo(() => {
        if (isComplete) return 100;
        return (completedSteps.size / steps.length) * 100;
    }, [completedSteps.size, steps.length, isComplete]);

    return {
        activeStep,
        steps,
        isFirstStep,
        isLastStep,
        isComplete,
        completedSteps,
        skippedSteps,
        next,
        back,
        goTo,
        skip,
        reset,
        complete,
        isStepComplete,
        isStepSkipped,
        isStepOptional,
        canGoTo,
        progress,
    };
};

export default useStepper;
