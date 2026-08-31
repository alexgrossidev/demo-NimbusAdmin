import {
  CalendarMonth,
  Dashboard,
  Money,
  Scale,
  Shop,
  VerifiedUserSharp,
} from "@mui/icons-material";
import type React from "react";

export interface ProductModule {
  name: string;
  description: string;
  icon: React.ReactNode;
  selectable: boolean;
}

const ProductModules: Record<string, ProductModule> = {
  Dashboard: {
    name: "Dashboard",
    description: "Overview of key metrics and performance indicators.",
    icon: <Dashboard />,
    selectable: true,
  },
  Calendar: {
    name: "Calendar",
    description: "Manage your schedule and appointments.",
    icon: <CalendarMonth />,
    selectable: true,
  },
  LeadManagement: {
    name: "Lead Management",
    description: "Track and manage your sales leads effectively.",
    icon: <Scale />,
    selectable: true,
  },
  ClientManagement: {
    name: "Client Management",
    description: "Organize and maintain client information.",
    icon: <Money />,
    selectable: true,
  },
  Marketplace: {
    name: "Marketplace",
    description: "Central hub for all your business operations.",
    icon: <Shop />,
    selectable: true,
  },
  UserManagement: {
    name: "User Management",
    description: "Control user access and permissions.",
    icon: <VerifiedUserSharp />,
    selectable: true,
  },
};

export default ProductModules;
