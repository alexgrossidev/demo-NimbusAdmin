import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import BusinessIcon from "@mui/icons-material/Business";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ExtensionOffIcon from "@mui/icons-material/ExtensionOff";
import SecurityIcon from "@mui/icons-material/Security";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const JUSTIFICATION_OPTIONS = [
  {
    value: "software_malfunction",
    title: "Malfunzionamento del software",
    label:
      "Il software non funziona correttamente e necessita di assistenza tecnica.",
    icon: ErrorOutlineIcon,
    color: "#EF4444",
    category: "technical",
  },
  {
    value: "user_error",
    title: "Errore dell'utente",
    label: "L'utente ha commesso un errore che ha causato il problema.",
    icon: PersonOffIcon,
    color: "#F97316",
    category: "user",
  },
  {
    value: "not_useful",
    title: "Non più utile",
    label: "Il software non è più utile per le esigenze dell'utente.",
    icon: SentimentDissatisfiedIcon,
    color: "#8B5CF6",
    category: "user",
  },
  {
    value: "too_expensive",
    title: "Costo insostenibile",
    label: "Il costo del software è diventato insostenibile per l'utente.",
    icon: AttachMoneyIcon,
    color: "#10B981",
    category: "business",
  },
  {
    value: "not_paying",
    title: "Non ha pagato",
    label:
      "L'utente non ha effettuato il pagamento per il rinnovo della licenza.",
    icon: CreditCardOffIcon,
    color: "#10B981",
    category: "business",
  },
  {
    value: "business_closure",
    title: "Chiusura dell'azienda",
    label: "L'azienda ha cessato l'attività e non necessita più del software.",
    icon: BusinessIcon,
    color: "#6B7280",
    category: "business",
  },
  {
    value: "switch_to_competitor",
    title: "Passaggio a un concorrente",
    label: "L'utente ha deciso di passare a un software concorrente.",
    icon: CompareArrowsIcon,
    color: "#3B82F6",
    category: "business",
  },
  {
    value: "lack_of_features",
    title: "Mancanza di funzionalità",
    label: "Il software non offre le funzionalità necessarie per l'utente.",
    icon: ExtensionOffIcon,
    color: "#8B5CF6",
    category: "product",
  },
  {
    value: "security_concerns",
    title: "Preoccupazioni sulla sicurezza",
    label: "L'utente ha preoccupazioni riguardo alla sicurezza del software.",
    icon: SecurityIcon,
    color: "#EF4444",
    category: "compliance",
  },
  {
    value: "privacy_concerns",
    title: "Preoccupazioni sulla privacy",
    label:
      "L'utente ha preoccupazioni riguardo alla privacy dei dati gestiti dal software.",
    icon: PrivacyTipIcon,
    color: "#EF4444",
    category: "compliance",
  },
  {
    value: "technical_incompatibility",
    title: "Incompatibilità tecnica",
    label:
      "Il software è incompatibile con l'infrastruttura tecnica dell'utente.",
    icon: BuildIcon,
    color: "#F97316",
    category: "technical",
  },
  {
    value: "user_training_needed",
    title: "Necessità di formazione",
    label:
      "L'utente necessita di formazione aggiuntiva per utilizzare il software efficacemente.",
    icon: SchoolIcon,
    color: "#3B82F6",
    category: "user",
  },
  {
    value: "other",
    title: "Altro (specificare)",
    label: "Altro (specificare)",
    icon: MoreHorizIcon,
    color: "#6B7280",
    category: "other",
  },
];
