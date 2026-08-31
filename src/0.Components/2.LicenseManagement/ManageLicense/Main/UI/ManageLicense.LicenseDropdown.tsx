import { useState } from "react";
import { Chip, Menu, MenuItem, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { STATUS_OPTIONS, type LicenseStatus } from "../Interfaces/LicenzeInfo";
import { getStatusConfig } from "../Logic/Utils";

interface StatusBadgeDropdownProps {
    status: LicenseStatus;
    onChange?: (status: LicenseStatus) => void;
}

const StatusBadgeDropdown = ({ status, onChange }: StatusBadgeDropdownProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { color, label } = getStatusConfig(status);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (selectedStatus: LicenseStatus) => {
        onChange?.(selectedStatus);
        handleClose();
    };

    return (
        <>
            <Chip
                label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        {label}
                        <KeyboardArrowDownIcon
                            sx={{
                                fontSize: "0.9rem",
                                transition: "transform 0.2s",
                                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                        />
                    </Box>
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                color={color as any}
                size="small"
                onClick={handleClick}
                sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: "0.7rem",
                    px: 1,
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    "& .MuiChip-label": {
                        display: "flex",
                        alignItems: "center",
                        px: 0,
                    },
                }}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 0.5,
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            minWidth: 140,
                        },
                    },
                }}
            >
                {STATUS_OPTIONS.map((option) => {
                    const { color: optionColor, label: optionLabel } = getStatusConfig(option);
                    return (
                        <MenuItem
                            key={option}
                            onClick={() => handleSelect(option)}
                            selected={option === status}
                            sx={{ py: 0.75 }}
                        >
                            <Chip
                                label={optionLabel}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                color={optionColor as any}
                                size="small"
                                sx={{
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    fontSize: "0.7rem",
                                    px: 1,
                                    borderRadius: "6px",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                    pointerEvents: "none",
                                }}
                            />
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};

export default StatusBadgeDropdown;