import Stepper from "@/3.Theme/2.Components/Stepper";
import useStepper from "@/5.Utils/1.Hooks/stepper/useStepper";
import { Box, Typography } from "@mui/material";
import CreateLicenseWrapper from "../UI/CreateLicenseWrapper";
import { StepData } from "../Interfaces/StepData";
import useDynamicStepInfo from "../Logic/useDynamicStepInfo";
import CreateLicenseGiantButton from "../UI/CreateLicense.GiantButton";
import useCreateLicenseForm from "../Logic/useCreateLicenseForm";
import EmailField from "../UI/CreateLicense.FormFields";
import BusinessDataFields from "../UI/CreateLicense.BusinessData";
import CreateLicenseQuestionnaire from "../UI/CreateLicense.Questionnaire";
import { useState } from "react";
import DatesField from "../UI/CreateLicense.Dates";
import CreateLicenseFinishDates from "../UI/CreateLicense.FinishDates";
import CreateLicenseDeliveryForm from "../UI/CreateLicense.DeliveryForm";
import CreateLicenseLicenseReview from "../UI/CreateLicense.LicenseReview";
import CreateLicenseSuccess from "../UI/CreateLicense.Success";
import { useRole } from "@/2.Context/useAuth";

const CreateLicense = () => {
  const role = useRole();
  const [hasCreatedOnce, setHasCreatedOnce] = useState(false);
  const [isTrialLicense, setIsTrialLicense] = useState(false);
  const [addLicensePostTrial, setAddLicensePostTrial] = useState(false);
  const { stepTitle, stepSubtitle, updateStepInfo } =
    useDynamicStepInfo(isTrialLicense);

  const licenseForm = useCreateLicenseForm(() => {
    setHasCreatedOnce(true);
  });

  const stepper = useStepper({
    steps: [
      {
        label: StepData.steps["1"].label,
        description: StepData.steps["1"].description,
        hideContinueButton: true,
      },
      {
        label: StepData.steps["2"].label,
        description: StepData.steps["2"].description,
        validate: () => licenseForm.validateStepForm(1),
      },
      {
        label: StepData.steps["3"].label,
        description: StepData.steps["3"].description,
        validate: () => licenseForm.validateStepForm(2),
      },
      {
        label: StepData.steps["4"].label,
        description: StepData.steps["4"].description,
        hideContinueButton: true,
      },
      {
        label: StepData.steps["5"].label,
        description: StepData.steps["5"].description,
        validate: () => licenseForm.validateStepForm(4),
      },
      {
        label: StepData.steps["6"].label,
        description: StepData.steps["6"].description,
        hideContinueButton: isTrialLicense,
      },
      {
        label: StepData.steps["7"].label,
        description: StepData.steps["7"].description,
        validate: () => licenseForm.validateStepForm(6),
      },
      {
        label: StepData.steps["8"].label,
        description: StepData.steps["8"].description,
        validate: () => licenseForm.validateStepForm(7),
      },
      {
        label: StepData.steps["9"].label,
        description: StepData.steps["9"].description,
      },
    ],
    onComplete: () => {
      licenseForm.handleSubmit();
    },
    onStepChange: (step) => {
      updateStepInfo(step);
    },
  });

  const triggerIsTrialStep = (isTrial: boolean) => {
    licenseForm.setFieldValue("isTrial", isTrial);
    setIsTrialLicense(isTrial);
    stepper.next();
  };

  const triggerAddLicensePostTrial = (addLicensePostTrial: boolean) => {
    licenseForm.setFieldValue("createLicenseAfterTrial", addLicensePostTrial);
    setAddLicensePostTrial(addLicensePostTrial);
    stepper.next();
  };

  const handleReset = () => {
    licenseForm.resetForm();
    licenseForm.setIsSuccess(false);
    setIsTrialLicense(false);
    setAddLicensePostTrial(false);
    stepper.reset();
  };

  const renderStepContent = () => {
    if (licenseForm.isSuccess) {
      return <CreateLicenseSuccess onReset={handleReset} />;
    }

    switch (stepper.activeStep) {
      case 0:
        return (
          <CreateLicenseGiantButton
            onClick={() => stepper.next()}
            title={hasCreatedOnce ? "Crea un'altra licenza" : "Crea Licenza"}
            subtitle={
              hasCreatedOnce
                ? "Hai già creato una licenza. Vuoi aggiungerne un'altra?"
                : "Inizia il processo di creazione di una nuova licenza"
            }
          />
        );
      case 1:
        return <EmailField form={licenseForm} isAdmin={role === "admin"} />;

      case 2:
        return <BusinessDataFields form={licenseForm} />;

      case 3:
        return (
          <CreateLicenseQuestionnaire
            onSelect={triggerIsTrialStep}
            contentA={{
              title: "Licenza di prova",
              subtitle: "Il cliente inizia con una prova gratuita.",
            }}
            contentB={{
              title: "Il cliente sta pagando",
              subtitle: "Il cliente ha già acquistato la licenza.",
            }}
          />
        );

      case 4:
        return <DatesField form={licenseForm} isTrial={isTrialLicense} />;

      case 5:
        if (isTrialLicense) {
          return (
            <CreateLicenseQuestionnaire
              onSelect={triggerAddLicensePostTrial}
              contentA={{
                title: "Crea licenza post-prova",
                subtitle:
                  "Crea automaticamente una licenza a pagamento dopo la prova.",
              }}
              contentB={{
                title: "Non creare licenza post-prova",
                subtitle:
                  "Il cliente terminerà la prova senza una licenza a pagamento.",
              }}
            />
          );
        } else {
          return null;
        }
      case 6:
        if (!addLicensePostTrial && isTrialLicense) {
          return (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography variant="h6">Configurazione terminata</Typography>
              <Typography color="text.secondary">
                Premi avanti per procedere alla consegna.
              </Typography>
            </Box>
          );
        }
        return <CreateLicenseFinishDates form={licenseForm} />;
      case 7:
        return <CreateLicenseDeliveryForm form={licenseForm} />;
      case 8:
        return <CreateLicenseLicenseReview form={licenseForm} />;
      default:
        return null;
    }
  };
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Stepper stepper={stepper}>
        <CreateLicenseWrapper title={stepTitle} subtitle={stepSubtitle}>
          {renderStepContent()}
        </CreateLicenseWrapper>
      </Stepper>
    </Box>
  );
};

export default CreateLicense;
