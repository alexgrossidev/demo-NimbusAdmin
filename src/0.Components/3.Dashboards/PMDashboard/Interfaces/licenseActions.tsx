import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";

export type IssueType = "low-usage" | "not-using" | "close-to-expiry";
export type ActionStatus = "pending" | "completed" | "overdue";
export type ActionDone = "phone" | "email" | "other";

export const IssueTypeExplanation = [
  {
    key: "low-usage",
    brief: "Basso Utilizzo",
    detailed:
      "Il cliente sta utilizzando il software molto poco, il che potrebbe indicare una mancanza di coinvolgimento o difficoltà nell'adozione.",
    color: "#F59E0B",
    bg: "#FFFBEB",
    icon: TrendingDownRoundedIcon,
  },
  {
    key: "not-using",
    brief: "Non Utilizzo",
    detailed:
      "Il cliente non sta utilizzando affatto il software, il che è un segnale di allarme che potrebbe indicare una possibile cancellazione imminente.",
    color: "#EF4444",
    bg: "#FEF2F2",
    icon: BlockRoundedIcon,
  },
  {
    key: "close-to-expiry",
    brief: "Vicino alla Scadenza",
    detailed:
      "La licenza del cliente è vicina alla scadenza, il che richiede un follow-up per rinnovare o discutere le opzioni future.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    icon: EventRoundedIcon,
  },
];
export interface LicenseAction {
    id: string;
    licenseId: string;
    name: string;
    email: string;
    issueType: IssueType;
    status: ActionStatus;
    actionDone: ActionDone;
    done: boolean;
    actionDate: Date;
    notes: string;
    createdAt: Date;
}