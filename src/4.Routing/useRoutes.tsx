import type { UserRole } from "@/0.Components/1.Auth/Signin/Interfaces/User";
import type { ReactNode, ComponentType } from "react";

// ============================================================================
// Types
// ============================================================================

type RouteType = "title" | "link" | "divider" | "collapse";

interface BaseRoute {
  name: string;
  icon?: ReactNode;
  permissions?: UserRole[];
}

interface TitleRoute extends BaseRoute {
  type: "title";
}

interface DividerRoute {
  type: "divider";
  name?: never;
}

interface LinkRoute extends BaseRoute {
  type: "link";
  path: string;
  component?: ComponentType;
}

interface CollapseRoute extends BaseRoute {
  type: "collapse";
  children: Route[];
}

type Route = TitleRoute | DividerRoute | LinkRoute | CollapseRoute;

// ============================================================================
// Helper - creates routes with type inference
// ============================================================================

export const link = (
  name: string,
  path: string,
  options?: {
    icon?: ReactNode;
    permissions?: UserRole[];
    component?: ComponentType;
  },
): LinkRoute => ({
  type: "link",
  name,
  path,
  ...options,
});

export const collapse = (
  name: string,
  children: Route[],
  options?: { icon?: ReactNode; permissions?: UserRole[] },
): CollapseRoute => ({
  type: "collapse",
  name,
  children,
  ...options,
});

export const title = (name: string): TitleRoute => ({
  type: "title",
  name,
});

export const divider = (): DividerRoute => ({
  type: "divider",
});

// ============================================================================
// Utilities
// ============================================================================

/** Filter routes by user role */
export const getRoutesForRole = (
  role: UserRole,
  routeList: Route[],
): Route[] => {
  const filterRoutes = (routes: Route[]): Route[] => {
    if (role === "admin") return routes; // Admin sees all routes
    return routes
      .filter((route) => {
        if (route.type === "divider") return true;
        if (!route.permissions || route.permissions.length === 0) return true;
        return route.permissions.includes(role);
      })
      .map((route) => {
        if (route.type === "collapse") {
          return { ...route, children: filterRoutes(route.children) };
        }
        return route;
      })
      .filter((route) => {
        // Remove empty collapses
        if (route.type === "collapse" && route.children.length === 0)
          return false;
        return true;
      });
  };
  return filterRoutes(routeList);
};

/** Find a route by path */
export const findRouteByPath = (
  path: string,
  routeList: Route[],
): LinkRoute | undefined => {
  const search = (routes: Route[]): LinkRoute | undefined => {
    for (const route of routes) {
      if (route.type === "link" && route.path === path) return route;
      if (route.type === "collapse") {
        const found = search(route.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return search(routeList);
};

export type {
  Route,
  LinkRoute,
  CollapseRoute,
  TitleRoute,
  DividerRoute,
  RouteType,
};
