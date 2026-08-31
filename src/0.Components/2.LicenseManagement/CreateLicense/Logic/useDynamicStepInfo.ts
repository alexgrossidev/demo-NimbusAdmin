import { useState } from "react";
import { StepData } from "../Interfaces/StepData";

const useDynamicStepInfo = (isTrialLicense: boolean) => {
    const [stepTitle, setStepTitle] = useState(StepData.steps["1"].title);
    const [stepSubtitle, setStepSubtitle] = useState(StepData.steps["1"].subtitle);

    const updateStepInfo = (step: number) => {
        const stepKey = String(step + 1) as keyof typeof StepData.steps;
        const data = StepData.steps[stepKey];
        if (data) {
            if (isTrialLicense && data.trialTitle && data.trialSubtitle) {
                setStepTitle(data.trialTitle);
                setStepSubtitle(data.trialSubtitle);
            } else {
                setStepTitle(data.title);
                setStepSubtitle(data.subtitle);
            }
        }
    }

    return {
        stepTitle,
        stepSubtitle,
        updateStepInfo,
    }
}

export default useDynamicStepInfo;