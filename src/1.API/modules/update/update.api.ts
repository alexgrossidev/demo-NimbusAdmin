import type { Update } from "@/0.Components/4.AdminUtilities/Updates/Interfaces/update.schema";
import { api } from "@/1.API/core/axios";

export const updateAPI = {
  submit: async (update: Update) => {
    await api.post("url", update);
  },

  get: () => {},
};
