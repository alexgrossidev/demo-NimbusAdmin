import { Box, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

interface ManageLicenseSearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const ManageLicenseSearchBar = ({ value, onChange }: ManageLicenseSearchBarProps) => {
    return (
        <Box paddingTop={3}>
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Cerca per nome, email o azienda..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search color="action" />
                        </InputAdornment>
                    ),
                    sx: {
                        borderRadius: 3,
                        bgcolor: "white",
                        "& fieldset": {
                            borderColor: "rgba(0,0,0,0.1)",
                        },
                        "&:hover fieldset": {
                            borderColor: "primary.main",
                        },
                    }
                }}
            />
        </Box>
    );
};

export default ManageLicenseSearchBar;
