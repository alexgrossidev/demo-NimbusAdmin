/**
 * Example usage of useStepper hook with Stepper component
 */
import { Box, TextField, Typography } from "@mui/material";
import useStepper from "./useStepper";
import Stepper from "@/3.Theme/2.Components/Stepper";
import { useState } from "react";

const StepperExample = () => {
    const [formData, setFormData] = useState({ name: "", email: "", company: "" });

    const stepper = useStepper({
        steps: [
            {
                label: "Personal Info",
                description: "Your details",
                validate: () => formData.name.length > 0,
            },
            {
                label: "Contact",
                validate: () => formData.email.includes("@"),
            },
            {
                label: "Company",
                optional: true,
            },
            {
                label: "Review",
            },
        ],
        onComplete: () => {
            console.log("Wizard complete!", formData);
        },
        onStepChange: (step, direction) => {
            console.log(`Moved ${direction} to step ${step}`);
        },
    });

    // Render step content based on activeStep
    const renderStepContent = () => {
        if (stepper.isComplete) {
            return (
                <Box textAlign="center" py={4}>
                    <Typography variant="h5" gutterBottom>
                        🎉 All done!
                    </Typography>
                    <Typography color="text.secondary">
                        Welcome, {formData.name}!
                    </Typography>
                </Box>
            );
        }

        switch (stepper.activeStep) {
            case 0:
                return (
                    <TextField
                        fullWidth
                        label="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                );
            case 1:
                return (
                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                );
            case 2:
                return (
                    <TextField
                        fullWidth
                        label="Company (Optional)"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                );
            case 3:
                return (
                    <Box>
                        <Typography variant="body1">Name: {formData.name}</Typography>
                        <Typography variant="body1">Email: {formData.email}</Typography>
                        <Typography variant="body1">Company: {formData.company || "N/A"}</Typography>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
            <Stepper stepper={stepper}>{renderStepContent()}</Stepper>
        </Box>
    );
};

export default StepperExample;
