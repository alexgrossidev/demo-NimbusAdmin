import useForm, { z } from "@/5.Utils/1.Hooks/form/useForm";
import { useState } from "react";

// ============================================================================
// Schema
// ============================================================================

const licenseDeliverySchema = z
  .object({
    sendImmediately: z.boolean(),
    deliverySchedule: z.coerce.date().optional(),
    customMessage: z.string().optional(),
  })
  .refine((data) => data.sendImmediately || data.deliverySchedule, {
    message: "Data di invio obbligatoria per invii programmati",
    path: ["deliverySchedule"],
  });

const licenseSchema = z
  .object({
    // User Info
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),

    // Business Info
    businessName: z.string().min(2, "Business name is required"),

    // License Details
    startDate: z.coerce.date(),
    expirationDate: z.coerce.date(),
    role: z.enum(["client", "sales", "project-manager"]),

    // Trial Options
    isTrial: z.boolean(),
    createLicenseAfterTrial: z.boolean(),
    trialPeriodDays: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.coerce.number().min(1).max(90).optional(),
    ),

    // Delivery
    deliveryData: licenseDeliverySchema,
  })
  .refine(
    (data) => {
      // Only validate expiration if it's a paid license or a trial with post-trial license
      if (!data.isTrial || data.createLicenseAfterTrial) {
        return data.expirationDate > data.startDate;
      }
      return true;
    },
    {
      message: "La data di scadenza deve essere successiva alla data di inizio",
      path: ["expirationDate"],
    },
  )
  .refine((data) => !data.isTrial || data.trialPeriodDays !== undefined, {
    message: "La durata della prova è obbligatoria",
    path: ["trialPeriodDays"],
  });

export type LicenseFormData = z.infer<typeof licenseSchema>;

// ============================================================================
// Hook
// ============================================================================

const useCreateLicenseForm = (onCompleteSuccess?: () => void) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<LicenseFormData>({
    schema: licenseSchema,
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      startDate: new Date(),
      expirationDate: new Date(),
      role: "client",
      isTrial: false,
      createLicenseAfterTrial: false,
      trialPeriodDays: undefined,
      deliveryData: {
        sendImmediately: true,
        deliverySchedule: undefined,
        customMessage: undefined,
      },
    },
    onSubmit: async () => {
      // No backend in this demo — simulate the network round-trip.
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
      if (onCompleteSuccess) onCompleteSuccess();
    },
  });

  // Step-specific validation
  const validateStepForm = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1: // Email
        return await form.validateField("email");

      case 2: // Business Data
        return (
          (await form.validateField("businessName")) &&
          (await form.validateField("name"))
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
  };

  return {
    ...form,
    validateStepForm,
    isSuccess,
    setIsSuccess,
  };
};

export default useCreateLicenseForm;
