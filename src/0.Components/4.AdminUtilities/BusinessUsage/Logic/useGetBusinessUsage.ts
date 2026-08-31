import { useEffect, useState } from "react";
import type { BusinessLicenseUsage } from "../Interfaces/BusinessUsage";

const createRandomMockData = (count: number): BusinessLicenseUsage[] => {
  const mockData: BusinessLicenseUsage[] = [];
  for (let i = 0; i < count; i++) {
    mockData.push({
      licenseId: i + 1,
      businessName: `Business ${i + 1} - ${Math.random().toString(36).substring(7)}`,
      isActive: Math.random() > 0.5,
      lastUsed: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      clientCount: Math.floor(Math.random() * 100),
      leadCount: Math.floor(Math.random() * 50),
      whatsappMessagesIn: Math.floor(Math.random() * 1000),
      whatsappMessagesOut: Math.floor(Math.random() * 1000),
      isPowerUser: Math.random() > 0.8,
    });
  }
  return mockData;
}

const useGetBusinessUsage = () => {
    const [businesses, setBusinesses] = useState<BusinessLicenseUsage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const fetchBusinessUsage = async () => {
        setLoading(true);
        setError(null);

        try {
            // Simulate an API call to fetch business usage data
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const mockData = createRandomMockData(10);
            setBusinesses(mockData);
            setTotalCount(mockData.length);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch business usage data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinessUsage();
    }, []);

    const onPageChange = (_: unknown, newPage: number) => {
        setPage(newPage);
    }

    const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return { businesses, loading, error, totalCount, rowsPerPage, page, onPageChange, onRowsPerPageChange };
}

export default useGetBusinessUsage; 