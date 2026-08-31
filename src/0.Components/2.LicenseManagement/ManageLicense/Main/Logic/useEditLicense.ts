import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { FullLicenseInfo } from "../Interfaces/LicenzeInfo";
import { useAuth } from "@/2.Context/useAuth";
import { useState } from "react";
import { updateLicense } from "./ManageLicenseService";

const editLicenseSchema = z.object({
    assignedProjectManagerID: z.string().min(1, "Assegnazione obbligatoria"),
    assignedProjectManager: z.string(),
    expirationDate: z.date({
        message: "Data non valida"
    }),
    licensePrice: z.number().min(0, "Il prezzo non può essere negativo"),
    newNote: z.string().trim().optional(),
});

export type EditLicenseFormValues = z.infer<typeof editLicenseSchema>;

const useEditLicense = (license: FullLicenseInfo | null, onSuccess: () => void) => {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<EditLicenseFormValues>({
        resolver: zodResolver(editLicenseSchema),
        defaultValues: {
            assignedProjectManagerID: license?.assignedProjectManagerID || "",
            assignedProjectManager: license?.assignedProjectManager || "",
            expirationDate: license?.expirationDate ? new Date(license.expirationDate) : new Date(),
            licensePrice: license?.licensePrice || 0,
            newNote: "",
        },
    });

    // Mock list of PMs
    const projectManagers = [
        { id: "pm-1", name: "Marco Rossi" },
        { id: "pm-2", name: "Giulia Bianchi" },
        { id: "pm-3", name: "Alessandro Neri" },
        ...(user ? [{ id: user.id, name: `${user.name} (IO)` }] : []),
    ];

    const onSubmit = async (data: EditLicenseFormValues) => {
        if (!license) return;

        setIsSubmitting(true);
        try {
            await updateLicense(
                license.email,
                {
                    assignedProjectManagerID: data.assignedProjectManagerID,
                    assignedProjectManager: data.assignedProjectManager,
                    expirationDate: data.expirationDate,
                    licensePrice: data.licensePrice,
                },
                data.newNote
            );

            onSuccess();
            form.reset();
        } catch (error) {
            console.error("Failed to update license:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        projectManagers,
        isSubmitting,
    };
};

export default useEditLicense;