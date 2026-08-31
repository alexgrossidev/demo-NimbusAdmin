import type { IssueType } from "./licenseActions";

const QUICK_MESSAGES: Record<IssueType, { label: string; body: string }[]> = {
  "low-usage": [
    {
      label: "Offri supporto",
      body: "Il cliente mostra basso utilizzo da alcune settimane. Suggerisco di pianificare una sessione di onboarding o una demo avanzata per riattivare l'engagement.",
    },
    {
      label: "Proponi check-in",
      body: "Basso utilizzo rilevato. Consiglio un check-in proattivo per capire eventuali blocchi o insoddisfazioni. Priorità: media.",
    },
  ],
  "not-using": [
    {
      label: "Rischio churning",
      body: "ATTENZIONE: cliente inattivo totale. Rischio churning elevato. Richiedo intervento urgente del team commerciale entro 48h.",
    },
    {
      label: "Richiedi escalation",
      body: "Cliente fermo da troppo tempo. Escalation necessaria. Verificare se ci sono problemi tecnici bloccanti o insoddisfazione latente.",
    },
  ],
  "close-to-expiry": [
    {
      label: "Rinnovo imminente",
      body: "La licenza scade a breve. Preparare offerta di rinnovo personalizzata. Contattare il cliente almeno 2 settimane prima della scadenza.",
    },
    {
      label: "Upsell opportunity",
      body: "Licenza in scadenza: ottima finestra per proporre upgrade o piano annuale con sconto. Coinvolgere il team commerciale.",
    },
  ],
};

export default QUICK_MESSAGES;