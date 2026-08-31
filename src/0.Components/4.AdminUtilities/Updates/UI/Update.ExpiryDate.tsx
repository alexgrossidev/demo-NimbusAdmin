import { AGCheckbox, AGDateField } from "@/3.Theme/0.Atoms/AGFormComponent";
import { Box, Stack, Typography } from "@mui/material";
import type React from "react";

import type { UseFormResult } from "@/5.Utils/1.Hooks/form/useForm";
import type { Update } from "../Interfaces/update.schema";

interface CreateUpdateExpiryDateProps {
  form: UseFormResult<Update>;
}

const CreateUpdateExpiryDate: React.FC<CreateUpdateExpiryDateProps> = ({
  form,
}) => (
  <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 400 }}>
    {/* Start Date */}
    <AGDateField
      {...form.getFieldProps("expiryDate")}
      value={form.getFieldValue("expiryDate")}
      label="Data di Inizio"
      description={"Lo scadere della notifica"}
      variant="glass"
      rounded={14}
      onChange={(e) => {
        const date = (e.target as HTMLInputElement).valueAsDate;
        if (date && !isNaN(date.getTime())) {
          form.setFieldValue("expiryDate", date);
        }
      }}
    />

    <AGCheckbox
      label={
        <Box sx={{ ml: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Ignora la data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Questo update NON avrà una scadenza, continuerà fino al prossimo
            update.
          </Typography>
        </Box>
      }
      checked={form.getFieldValue("options.removeExpiry")}
      color="secondary"
      onChange={(e) => {
        if (e.target.checked) form.setFieldValue("options.removeExpiry", false);
      }}
    />
  </Stack>
);

export default CreateUpdateExpiryDate;
