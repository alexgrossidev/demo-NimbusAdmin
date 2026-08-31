import {
  People,
  PointOfSale,
  AssignmentInd,
  Terminal,
  type SvgIconComponent,
} from "@mui/icons-material";
import type { LicenseRole } from "./License";
interface RoleDetails {
  label: string;
  description: string;
  Icon: SvgIconComponent;
}

export const RoleDictionary: Record<LicenseRole, RoleDetails> = {
  client: {
    label: "Client",
    description: "External view-only access.",
    Icon: People,
  },
  sales: {
    label: "Sales",
    description: "Lead management access.",
    Icon: PointOfSale,
  },
  "project-manager": {
    label: "PM",
    description: "Full project oversight.",
    Icon: AssignmentInd,
  },
  developer: {
    label: "Dev",
    description: "Technical & API access.",
    Icon: Terminal,
  },
};
