//import CreateLicense from "@/0.Components/2.LicenseManagement/CreateLicense/Container/CreateLicense";
import { link, collapse, title, divider, type Route } from "./useRoutes";
import SigninPage from "@/0.Components/1.Auth/Signin/Container/Signin";
//import ManageLicense from "../0.Components/2.LicenseManagement/ManageLicense/Main/Container/ManageLicense";
//import ProjectManagerDashboard from "@/0.Components/3.Dashboards/PMDashboard/Container/ProjectManagerDashboard";
import AdminDashboard from "@/0.Components/3.Dashboards/AdminDashboard/Container/AdminDashboard";
import { Analytics, BugReport, UpdateSharp } from "@mui/icons-material";
//import BusinessUsage from "@/0.Components/4.AdminUtilities/BusinessUsage/Container/BusinessUsage";
//import LicensePermission from "@/0.Components/2.LicenseManagement/LicensePermissions/Container/LicensePermission";
import UpdatesPanel from "@/0.Components/4.AdminUtilities/Updates/Container/Updates";
import TicketingPanel from "@/0.Components/4.AdminUtilities/Ticketing/Container/Ticketing";

// ============================================================================
// Routes Definition (single source of truth)
// ============================================================================

export const routes: Route[] = [
  title("Main"),

  link("Dashboard", "/dashboard", {
    permissions: ["admin", "assistant"],
    component: () => <AdminDashboard />,
    icon: <Analytics />,
  }),

  /*link("PM Dashboard", "/pm-dashboard", {
    permissions: ["project-manager"],
    component: ProjectManagerDashboard,
    icon: <TapAndPlayOutlined />,
  }),*/

  divider(),

  title("Management"),

  /*collapse(
    "Licenze",
    [
      link("Crea Licenza", "/users/create", {
        permissions: ["admin", "project-manager"],
        component: CreateLicense,
        icon: <Add />,
      }),
      link("Gestisci Licenze", "/users/manage", {
        permissions: ["admin", "project-manager"],
        component: ManageLicense,
        icon: <ManageAccounts />,
      }),
      link("Modifica Permessi", "/users/permissions", {
        permissions: ["admin", "project-manager"],
        component: () => <LicensePermission />,
        icon: <AdminPanelSettings />,
      }),
    ],
    {
      permissions: ["admin", "project-manager"],
    },
  ),*/

  collapse(
    "Utilities",
    [
      /*link("Utilizzo", "/utilities/userate", {
        permissions: ["admin"],
        component: BusinessUsage,
        icon: <DataUsage />,
      }),
      link("Automazioni", "/utilities/automations", {
        permissions: ["admin"],
        component: () => <div>Strumento 1</div>,
        icon: <Engineering />,
      }),
      link("Metricool", "/utilities/metricool", {
        permissions: ["admin"],
        component: () => <div>Strumento 1</div>,
        icon: <Facebook />,
      }),*/
      link("Aggiornamenti", "/utilities/updates", {
        permissions: ["admin"],
        component: UpdatesPanel,
        icon: <UpdateSharp />,
      }),
      link("Tickets", "/utilities/tickets", {
        permissions: ["admin", "project-manager", "assistant"],
        component: TicketingPanel,
        icon: <BugReport />,
      }),
    ],
    {
      permissions: ["admin", "assistant"],
    },
  ),
];

// Public routes (no auth required)
export const publicRoutes: Route[] = [
  link("Sign In", "/signin", { component: SigninPage }),
];
