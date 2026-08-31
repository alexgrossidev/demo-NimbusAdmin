import { memo, useCallback } from "react";
import { ListItemButton, ListItemIcon, ListItemText, alpha, useTheme } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useNavigation } from "@/4.Routing/useNavigation";
import type { LinkRoute } from "@/4.Routing/useRoutes";

interface SidebarLinkProps {
    route: LinkRoute;
    nested?: boolean;
}

const SidebarLink = memo(({ route, nested = false }: SidebarLinkProps) => {
    const theme = useTheme();
    const { navigate, isActive } = useNavigation();
    const active = isActive(route.path);

    const handleClick = useCallback(() => {
        navigate(route.path);
    }, [navigate, route.path]);

    return (
        <ListItemButton
            onClick={handleClick}
            sx={{
                borderRadius: 2,
                mb: 0.5,
                pl: nested ? 4 : 2,
                py: 1,
                transition: "all 0.15s ease",

                // Active state
                ...(active && {
                    background: `linear-gradient(135deg, 
                        ${alpha(theme.palette.primary.main, 0.12)} 0%, 
                        ${alpha(theme.palette.primary.main, 0.06)} 100%)`,
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: "60%",
                        borderRadius: 2,
                        background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    },
                }),

                // Hover state
                "&:hover": {
                    background: alpha(theme.palette.action.hover, 0.08),
                    transform: "translateX(4px)",
                },
            }}
        >
            {route.icon && (
                <ListItemIcon
                    sx={{
                        minWidth: 36,
                        color: active ? "primary.main" : "text.secondary",
                        transition: "color 0.15s ease",
                    }}
                >
                    {route.icon}
                </ListItemIcon>
            )}

            <ListItemText
                primary={route.name}
                primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 500,
                    color: active ? "text.primary" : "text.secondary",
                }}
            />

            {!nested && !route.icon && (
                <ChevronRight
                    sx={{
                        fontSize: 16,
                        color: "text.disabled",
                        opacity: active ? 1 : 0,
                        transition: "opacity 0.15s ease",
                    }}
                />
            )}
        </ListItemButton>
    );
});

SidebarLink.displayName = "SidebarLink";

export default SidebarLink;
