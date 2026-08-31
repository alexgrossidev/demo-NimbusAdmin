import type { LicenseAction } from "../Interfaces/licenseActions"
import { useEffect, useState } from "react"

const mockData: LicenseAction[] = [
    {
        id: "1",
        licenseId: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        issueType: "low-usage",
        status: "pending",
        actionDone: "phone",
        actionDate: new Date(),
        notes: "John Doe is not using the software",
        createdAt: new Date(),
        done: false
    },
    {
        id: "2",
        licenseId: "2",
        name: "Jane Doe",
        email: "jane.doe@example.com",
        issueType: "not-using",
        status: "pending",
        actionDone: "email",
        actionDate: new Date(),
        notes: "Jane Doe is not using the software",
        createdAt: new Date(),
        done: false
    },
    {
        id: "3",
        licenseId: "3",
        name: "John Doe",
        email: "john.doe@example.com",
        issueType: "close-to-expiry",
        status: "pending",
        actionDone: "phone",
        actionDate: new Date(),
        notes: "John Doe is not using the software",
        createdAt: new Date(),
        done: false
    },
    {
        id: "4",
        licenseId: "4",
        name: "John Doe",
        email: "john.doe@example.com",
        issueType: "low-usage",
        status: "pending",
        actionDone: "phone",
        actionDate: new Date(),
        notes: "John Doe is not using the software",
        createdAt: new Date(),
        done: false
    },
    {
        id: "5",
        licenseId: "5",
        name: "John Doe",
        email: "john.doe@example.com",
        issueType: "low-usage",
        status: "pending",
        actionDone: "phone",
        actionDate: new Date(),
        notes: "John Doe is not using the software",
        createdAt: new Date(),
        done: false
    }
]

interface DashboardMetric {
    title: string;
    value: string;
    trend: {
        value: string;
        direction: "up" | "down" | "neutral";
        label?: string;
    }
}

const generateDisplayData = (data: LicenseAction[]): DashboardMetric[] => {
    const counts = data.reduce((acc, item) => {
        acc[item.issueType] = (acc[item.issueType] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return [
        {
            title: "Low Usage",
            value: (counts["low-usage"] || 0).toString(),
            trend: {
                value: "+12%",
                direction: "up",
                label: "vs last month"
            }
        },
        {
            title: "Not Using",
            value: (counts["not-using"] || 0).toString(),
            trend: {
                value: "-5%",
                direction: "down",
                label: "vs last month"
            }
        },
        {
            title: "Azioni da fare",
            value: data.filter((item) => !item.done).length.toString(),
            trend: {
                value: "",
                direction: "neutral"
            }
        }
    ];
}

const useGetPMDashboardData = () => {
    const [pmData, setPmData] = useState<LicenseAction[]>([]);
    const [displayData, setDisplayData] = useState<DashboardMetric[]>([]);
    const [loading, setLoading] = useState(true);
    const [explode, setExplode] = useState(false);
    useEffect(() => {
        // Simulate API call
        setPmData(mockData);
        setDisplayData(generateDisplayData(mockData));
        setLoading(false);
    }, [])

    const updateDisplayActionToDo = (action: LicenseAction) => {
        //create a copy of the action and set it as done without changing the original action
        const updatedActions = pmData.map((item) => (item.id === action.id ? { ...item, done: !item.done } : item));
        setPmData(updatedActions);
        setDisplayData(generateDisplayData(updatedActions));
        if (updatedActions.filter((item) => !item.done).length === 0) {
            setExplode(true);
            setTimeout(() => {
                setExplode(false);
            }, 2000);
        }
    }


    return {
        pmData,
        displayData,
        loading,
        explode,
        updateDisplayActionToDo
    }
}

export default useGetPMDashboardData;
