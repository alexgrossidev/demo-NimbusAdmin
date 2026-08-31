import { useState, useCallback } from "react";
import type { FullLicenseInfo } from "../Interfaces/LicenzeInfo";

const useManageLicenseModal = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [activeLicense, setActiveLicense] = useState<FullLicenseInfo | null>(null);
    
    const handleEditModalOpen = useCallback((license: FullLicenseInfo) => {
        setActiveLicense(license);
        setEditModalOpen(true);
    }, []);

    const handleEditModalClose = useCallback(() => {
        setActiveLicense(null);
        setEditModalOpen(false);
    }, []);

    return {
        activeLicense,
        editModalOpen,
        handleEditModalOpen,
        handleEditModalClose,
    };
};

export default useManageLicenseModal;