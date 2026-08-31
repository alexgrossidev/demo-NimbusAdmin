import { memo, useState, useCallback } from "react";
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    List,
    alpha,
    useTheme,
} from "@mui/material";
import { ExpandMore, ExpandLess, FolderOutlined } from "@mui/icons-material";
import { useNavigation } from "@/4.Routing/useNavigation";
import type { CollapseRoute } from "@/4.Routing/useRoutes";
import SidebarLink from "./Sidebar.Link";

interface SidebarCollapseProps {
    route: CollapseRoute;
}

const SidebarCollapse = memo(({ route }: SidebarCollapseProps) => {
    const theme = useTheme();
    const { pathname } = useNavigation();

    // Check if any child is active
    const hasActiveChild = route.children.some(
        (child) => child.type === "link" && pathname.startsWith(child.path)
    );

    // Auto-expand if a child is active
    const [open, setOpen] = useState(hasActiveChild);

    const handleToggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return (
        <>
            <ListItemButton
                onClick={handleToggle}
                sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    py: 1,
                    transition: "all 0.15s ease",

                    ...(hasActiveChild && {
                        background: alpha(theme.palette.primary.main, 0.04),
                    }),

                    "&:hover": {
                        background: alpha(theme.palette.action.hover, 0.08),
                    },
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 36,
                        color: hasActiveChild ? "primary.main" : "text.secondary",
                    }}
                >
                    {route.icon || <FolderOutlined fontSize="small" />}
                </ListItemIcon>

                <ListItemText
                    primary={route.name}
                    primaryTypographyProps={{
                        fontSize: "0.875rem",
                        fontWeight: hasActiveChild ? 600 : 500,
                        color: hasActiveChild ? "text.primary" : "text.secondary",
                    }}
                />

                {open ? (
                    <ExpandLess sx={{ color: "text.disabled", fontSize: 20 }} />
                ) : (
                    <ExpandMore sx={{ color: "text.disabled", fontSize: 20 }} />
                )}
            </ListItemButton>

            <Collapse in={open} timeout={200} unmountOnExit>
                <List disablePadding sx={{ pl: 1 }}>
                    {route.children.map((child) =>
                        child.type === "link" ? (
                            <SidebarLink
                                key={child.path}
                                route={child}
                                nested
                            />
                        ) : null
                    )}
                </List>
            </Collapse>
        </>
    );
});

SidebarCollapse.displayName = "SidebarCollapse";

export default SidebarCollapse;
