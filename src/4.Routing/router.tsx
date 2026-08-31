import { createRouter, createRoute, createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { routes, publicRoutes } from "./routes";
import type { Route } from "./useRoutes";
import type { JSX } from "react";
import AuthenticatedLayout from "@/3.Theme/4.Layouts/AuthenticatedLayout";
import NotFound from "./NotFound";
import { getToken } from "@/1.API/core/token";

const rootRoute = createRootRoute({ component: Outlet });

// Layout route for authenticated pages (includes sidebar)
const authenticatedLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "authenticated",
    component: AuthenticatedLayout,
    notFoundComponent: NotFound,
    beforeLoad: () => {
        const token = getToken();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!token) throw redirect({ to: "/signin" } as any);
    },
    onError: () => {
        throw redirect({ to: "/" });
    }
});

// Extract all LinkRoutes with components from route definitions
const extractLinkRoutes = (routeList: Route[]): { path: string; component: () => JSX.Element }[] => {
    const result: { path: string; component: () => JSX.Element }[] = [];

    for (const route of routeList) {
        if (route.type === "link" && route.component) {
            const Comp = route.component;
            result.push({ path: route.path, component: () => <Comp /> });
        }
        if (route.type === "collapse") {
            result.push(...extractLinkRoutes(route.children));
        }
    }
    return result;
};

// Public routes (no sidebar, no auth required)
const publicChildRoutes = extractLinkRoutes(publicRoutes).map(({ path, component }) =>
    createRoute({
        getParentRoute: () => rootRoute,
        path,
        component,
    })
);

// Protected routes (with sidebar, auth required)
const protectedChildRoutes = extractLinkRoutes(routes).map(({ path, component }) =>
    createRoute({
        getParentRoute: () => authenticatedLayoutRoute,
        path,
        component,
    })
);

// Index route - redirect based on auth status
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    beforeLoad: () => {
        const token = getToken();
        throw redirect({ to: (token ? "/dashboard" : "/signin") as "/" });
    },
    component: () => null,
});

// Build route tree
const authenticatedRouteTree = authenticatedLayoutRoute.addChildren(protectedChildRoutes);
const routeTree = rootRoute.addChildren([indexRoute, ...publicChildRoutes, authenticatedRouteTree]);

export const router = createRouter({
    routeTree,
    defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
