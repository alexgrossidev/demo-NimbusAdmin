import { Box, Typography } from "@mui/material";

const ManageLicenseRemovalNote: React.FC = () => {
    return (
        <Box sx={{ mt: 2, p: 2, backgroundColor: "#fff3f3", borderRadius: 1 }}>
            <Typography variant="body2" color="error">
                Nota: Rimuovendo una licenza, l'utente perderà immediatamente l'accesso al sistema. Assicurati di comunicare questa azione all'utente interessato.
            </Typography>
        </Box>
    );
};

export default ManageLicenseRemovalNote;