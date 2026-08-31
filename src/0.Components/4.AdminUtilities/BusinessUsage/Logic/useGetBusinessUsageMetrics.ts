import { useEffect, useState } from "react";
import type { UsageReportMetrics } from "../Interfaces/UsageReportMetrics";
import type { PMDashboardDataDisplayProps } from "@/0.Components/3.Dashboards/PMDashboard/UI/PMDashboard.DataDisplay";

const convertMetricsToDataDisplay = (metrics: UsageReportMetrics): PMDashboardDataDisplayProps["data"] => {
    return [
        {
            title: "Licenze Attive",
            value: metrics.activeLicenses.toString(),
            trend: {
                value: `${metrics.activeLicenses}%`,
                direction: "up",
            },
        },
        {
            title: "Business Inattive",
            value: metrics.inactiveBusinesses.toString(),
            trend: {
                value: `${metrics.inactiveBusinesses}%`,
                direction: "down",
            },
        },
        {
            title: "Percentuale Non Utilizzata",
            value: `${metrics.unusedPercentage}%`,
            trend: {
                value: `${metrics.unusedPercentage}%`,
                direction: metrics.unusedPercentage > 50 ? "up" : "down",
            },
        },
        {
            title: "Percentuale Power User",
            value: `${metrics.powerUserPercentage}%`,
            trend: {
                value: `${metrics.powerUserPercentage}%`,
                direction: metrics.powerUserPercentage > 20 ? "up" : "down",
            },
        },
    ];
}

const useGetBusinessUsageMetrics = () => {
    // Placeholder for fetching business usage data

    const [metrics, setMetrics] = useState<PMDashboardDataDisplayProps["data"] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBusinessUsage = async () => {
        // Simulate an API call to fetch business usage metrics
        setLoading(true);
        setError(null);

        try {
            // Simulated response
            const response: UsageReportMetrics = {
                activeLicenses: 120,
                inactiveBusinesses: 30,
                unusedPercentage: 25,
                powerUserPercentage: 2,
            };

            const dataDisplay = convertMetricsToDataDisplay(response);

            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMetrics(dataDisplay);
        } catch (err) {
            console.error("Error fetching business usage data:", err);
            setError("Failed to fetch business usage data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinessUsage();
    }, []);

    return { metrics, loading, error };
}

export default useGetBusinessUsageMetrics;