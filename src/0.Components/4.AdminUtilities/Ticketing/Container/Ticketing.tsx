import AGBox from "@/3.Theme/0.Atoms/AGBox";
import UpdateManager from "../UI/WriteUpdate";
import useCreateTicketForm from "../Logic/useCreateForm";

const TicketingPanel = () => {
  const form = useCreateTicketForm(() => {});
  return (
    <AGBox display="flex" flexDirection="column" height="100%">
      <UpdateManager form={form} />;
    </AGBox>
  );
};

export default TicketingPanel;

/**
 * 1. Crea aggiornamento
 * 2. Scrivi aggiornamento
 * 3. Crea scadenza (opzionale)
 * 4. Invia
 */
