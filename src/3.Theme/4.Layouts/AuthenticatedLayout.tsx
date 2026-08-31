import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import Sidebar from "@/0.Components/0.Sidebar/Container/Sidebar";

/** Layout for authenticated pages - includes sidebar */
const AuthenticatedLayout = () => {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AuthenticatedLayout;
