import { memo } from "react";
import { Box, Drawer, List, Divider, Typography, alpha, useTheme } from "@mui/material";
import { useCurrentUser } from "@/2.Context/useAuth";
import { routes } from "@/4.Routing/routes";
import { getRoutesForRole, type Route } from "@/4.Routing/useRoutes";
import SidebarLink from "../UI/Sidebar.Link";
import SidebarCollapse from "../UI/Sidebar.Collapse";
import useSidebar from "../Logic/useSidebar";
import AGButton from "@/3.Theme/0.Atoms/AGButton";

const DRAWER_WIDTH = 260;

const Sidebar = memo(() => {
    const theme = useTheme();
    const user = useCurrentUser();
    const { handleLogout } = useSidebar();
    // Filter routes based on user permissions (fallback to all routes for dev)
    const visibleRoutes = user
        ? getRoutesForRole(user.role, routes)
        : routes;



    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    border: "none",
                    background: `linear-gradient(180deg, 
                        ${alpha(theme.palette.background.paper, 0.95)} 0%, 
                        ${alpha(theme.palette.background.default, 0.98)} 100%)`,
                    backdropFilter: "blur(20px)",
                    boxShadow: `1px 0 20px ${alpha(theme.palette.common.black, 0.05)}`,
                },
            }}
        >
            {/* Logo / Brand */}
            <Box sx={{ p: 3, pb: 2 }}>
                <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    Nimbus Admin
                </Typography>
            </Box>

            {/* Navigation */}
            <List sx={{ px: 2, flex: 1 }}>
                {visibleRoutes.map((route, index) => (
                    <SidebarItem key={`${route.type}-${index}`} route={route} />
                ))}
            </List>

            {/* User info footer */}
            {user && (
                <Box sx={{ p: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                    <AGButton
                        variant="text"
                        color="primary"
                        onClick={handleLogout}
                        sx={{ width: "100%" }}
                    >
                        Logout
                    </AGButton>
                    <Typography variant="caption" color="text.secondary">
                        Signed in as
                    </Typography>
                    <Typography variant="body2" fontWeight={600} noWrap>
                        {user.name}
                    </Typography>
                </Box>
            )}
        </Drawer>
    );
});

// Route item renderer - delegates to specific components
const SidebarItem = memo(({ route }: { route: Route }) => {
    switch (route.type) {
        case "title":
            return (
                <Typography
                    variant="overline"
                    sx={{
                        px: 2,
                        pt: 2,
                        pb: 1,
                        display: "block",
                        color: "text.secondary",
                        fontWeight: 600,
                        letterSpacing: 1,
                    }}
                >
                    {route.name}
                </Typography>
            );

        case "divider":
            return <Divider sx={{ my: 1.5, opacity: 0.3 }} />;

        case "link":
            return <SidebarLink route={route} />;

        case "collapse":
            return <SidebarCollapse route={route} />;

        default:
            return null;
    }
});

Sidebar.displayName = "Sidebar";
SidebarItem.displayName = "SidebarItem";

export default Sidebar;
