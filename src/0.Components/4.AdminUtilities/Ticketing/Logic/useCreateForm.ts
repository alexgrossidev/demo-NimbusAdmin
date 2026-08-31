import useForm from "@/5.Utils/1.Hooks/form/useForm";
import { useState } from "react";
import {
  ticketingFormSchema,
  type TicketingForm,
} from "../Interfaces/ticketing.schema";

const useCreateTicketForm = (onCompleteSuccess?: () => void) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TicketingForm>({
    schema: ticketingFormSchema,
    defaultValues: {
      tickets: [
        {
          type: "bug",
          priority: "low",
          title: "",
          description: "",
          source: "customer",
        },
      ],
    },
    onSubmit: async () => {
      // No backend in this demo — simulate the network round-trip.
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
      if (onCompleteSuccess) onCompleteSuccess();
    },
  });

  // Step-specific validation
  /*
  const validateStepForm = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1: // Email
        return await form.validateField("email");

      case 2: // Business Data
        return (
          (await form.validateField("businessName")) &&
          (await form.validateField("name")) &&
          (await form.validateField("password"))
        );

      case 4: // Dates (Start Date & Trial Days)
        if (form.getFieldValue("isTrial")) {
          return (
            (await form.validateField("trialPeriodDays")) &&
            (await form.validateField("startDate"))
          );
        }
        return await form.validateField("startDate");

      case 6: // Finish Dates (Expiration)
        if (
          form.getFieldValue("isTrial") &&
          !form.getFieldValue("createLicenseAfterTrial")
        ) {
          return true; // No expiration to validate if trial only
        }
        return await form.validateField("expirationDate");

      case 7: // Delivery
        // Triggering the whole deliveryData object to run sub-schema and refinements
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await form.validateField("deliveryData" as any);

      default:
        return true;
    }
  };*/

  return {
    ...form,
    //validateStepForm,
    isSuccess,
    setIsSuccess,
  };
};

export default useCreateTicketForm;
