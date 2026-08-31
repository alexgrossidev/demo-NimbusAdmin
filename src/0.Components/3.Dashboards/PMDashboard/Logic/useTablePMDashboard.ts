import { useState, useEffect } from "react";
import type { LicenseAction } from "../Interfaces/licenseActions";

const useTablePMDashboard = (
    licenses: LicenseAction[],
    updateDisplayData: (licenseAction: LicenseAction) => void,
) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [action, setAction] = useState<LicenseAction[]>(licenses || []);
    const [actionModal, setActionModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState<LicenseAction | null>(null);

    useEffect(() => {
        if (licenses) {
            setAction(licenses);
            setTotalCount(licenses.length);
        }
    }, [licenses]);

    //Open the modal to edit the action
    const onAction = (action: LicenseAction) => {
        setSelectedAction(action);
        setActionModal(true);
    }

    const markActionAsDone = (action: LicenseAction) => {
        updateDisplayData(action);
        setAction((prev) => prev.map((item) => (item.id === action.id ? { ...item, done: true } : item)));
        setSelectedAction(action);
        setActionModal(false);
    }

    const onPageChange = (_: unknown, newPage: number) => {
        setPage(newPage);
    }

    const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return {
        page,
        rowsPerPage,
        loading,
        totalCount,
        action,
        actionModal,
        selectedAction,
        onAction,
        onPageChange,
        onRowsPerPageChange,
        markActionAsDone,
    }
}

export default useTablePMDashboard;