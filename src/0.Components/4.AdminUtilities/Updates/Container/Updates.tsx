import AGBox from "@/3.Theme/0.Atoms/AGBox";
import Stepper from "@/3.Theme/2.Components/Stepper";
import useStepper from "@/5.Utils/1.Hooks/stepper/useStepper";
import CreateUpdateGiantButton from "../UI/CreateUpdate.GiantButton";
import CreateUpdateWrapper from "../UI/CreateUpdateWrapper";
import UpdateManager from "../UI/WriteUpdate";
import CreateUpdateExpiryDate from "../UI/Update.ExpiryDate";
import useCreateUpdateForm from "../Logic/useCreateForm";

const UpdatesPanel = () => {
  const form = useCreateUpdateForm(() => {});
  const stepper = useStepper({
    steps: [
      {
        label: "1",
        description: "Create",
        hideContinueButton: true,
      },
      {
        label: "2",
        description: "Add details",
        hideContinueButton: false,
      },
      {
        label: "3",
        description: "Add expiry",
        hideContinueButton: false,
      },
    ],
    onComplete: () => {
      // No backend in this demo — this is where the composed update payload
      // (form.getAllValues()) would be POSTed to the updates API.
    },
    onStepChange: () => {},
  });

  const renderStepContent = () => {
    switch (stepper.activeStep) {
      case 0:
        return (
          <CreateUpdateGiantButton
            onClick={() => stepper.next()}
            title="Create new update"
            subtitle="Let everybody know the platform is now updated"
          />
        );
      case 1:
        return <UpdateManager form={form} />;

      case 2:
        return <CreateUpdateExpiryDate form={form} />;

      default:
        return null;
    }
  };
  return (
    <AGBox display="flex" flexDirection="column" height="100%">
      <Stepper stepper={stepper}>
        <CreateUpdateWrapper title="Crea update">
          {renderStepContent()}
        </CreateUpdateWrapper>
      </Stepper>
    </AGBox>
  );
};

export default UpdatesPanel;

/**
 * 1. Crea aggiornamento
 * 2. Scrivi aggiornamento
 * 3. Crea scadenza (opzionale)
 * 4. Invia
 */
