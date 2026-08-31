import type { FullLicenseInfo, LicenseStatus } from "../Interfaces/LicenzeInfo";

const STATUSES: LicenseStatus[] = ["active", "inactive", "paused", "cancelled"];

const generateMockLicenses = (count: number): FullLicenseInfo[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: "hashed_password",
        businessName: `Company ${Math.ceil((i + 1) / 2)}`,
        startDate: new Date(Date.now() - Math.random() * 10000000000),
        expirationDate: new Date(Date.now() + Math.random() * 10000000000),
        role: "client",
        isTrial: Math.random() > 0.8,
        createLicenseAfterTrial: true,
        deliveryData: {
            sendImmediately: true,
        },
        assignedProjectManagerID: `pm-${Math.floor(Math.random() * 5)}`,
        assignedProjectManager: `Manager ${Math.floor(Math.random() * 5)}`,
        licensePrice: Math.floor(Math.random() * 1000) + 500,
        licensePriceCurrency: "EUR",
        licenseDuration: 12,
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
        notes: [
            {
                id: `note-${i}-1`,
                date: new Date(),
                note: "Initial setup completed successfully.",
            },
        ],
    }));
};

const MOCK_DATA = generateMockLicenses(50);

export const fetchLicenses = async (
    page: number,
    limit: number,
    search: string
): Promise<{ data: FullLicenseInfo[]; total: number }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filtered = MOCK_DATA;
    if (search) {
        const lowSearch = search.toLowerCase();
        filtered = MOCK_DATA.filter(
            (l) =>
                l.name.toLowerCase().includes(lowSearch) ||
                l.email.toLowerCase().includes(lowSearch) ||
                l.businessName.toLowerCase().includes(lowSearch)
        );
    }

    const start = page * limit;
    const data = filtered.slice(start, start + limit);

    return {
        data,
        total: filtered.length,
    };
};

export const updateLicense = async (
    email: string,
    updates: Partial<FullLicenseInfo>,
    newNote?: string
): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const index = MOCK_DATA.findIndex(l => l.email === email);
    if (index === -1) throw new Error("License not found");

    const license = MOCK_DATA[index];

    // Update basic fields
    Object.assign(license, updates);

    // Add new note if provided
    if (newNote) {
        license.notes = [
            {
                id: `note-${Date.now()}`,
                date: new Date(),
                note: newNote
            },
            ...license.notes
        ];
    }

    MOCK_DATA[index] = license;
};
