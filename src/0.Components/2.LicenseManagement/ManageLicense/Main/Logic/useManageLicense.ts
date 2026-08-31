import { useState, useCallback, useEffect } from "react";
import type { FullLicenseInfo, LicenseStatus } from "../Interfaces/LicenzeInfo";
import { fetchLicenses } from "./ManageLicenseService";

export const useManageLicense = () => {
    const [licenses, setLicenses] = useState<FullLicenseInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [statusSelected, setStatusSelected] = useState<LicenseStatus | "open">("open");
    const [justificationModalOpen, setJustificationModalOpen] = useState(false);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const { data, total } = await fetchLicenses(page, rowsPerPage, search);
            setLicenses(data);
            setTotalCount(total);
        } catch (error) {
            console.error("Failed to fetch licenses:", error);
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, search]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(0);
    };

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const editLicenseStatus = async (id: number, newStatus: LicenseStatus) => {
        try {
            //ensure state has a different value to trigger the modal
            if (statusSelected === newStatus) {
                return;
            }
            // Update local state
            setLicenses((prev) =>
                prev.map((license) =>
                    license.id === id ? { ...license, status: newStatus as LicenseStatus } : license
                )
            );
            setStatusSelected(newStatus);
            //no need to open the justification modal if the new status is active, as it's the most common action and doesn't require justification
            if(newStatus === "active"){
                return;
            }
            setJustificationModalOpen(true);
        } catch (error) {
            console.error(`Failed to update license ${id} status:`, error);
        }
    };

    const handleJustificationModalClose = () => {
        setJustificationModalOpen(false);
    }

    return {
        licenses,
        loading,
        search,
        page,
        rowsPerPage,
        totalCount,
        handleSearchChange,
        handlePageChange,
        handleRowsPerPageChange,
        loadData,
        editLicenseStatus,
        justificationModalOpen,
        handleJustificationModalClose,
        statusSelected,
    };
};
