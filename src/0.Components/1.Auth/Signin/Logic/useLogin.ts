import { useAuthAPI } from "@/1.API/Auth.POST";
import { useAuth as useAuthContext } from "@/2.Context/useAuth";
import useNavigation from "@/4.Routing/useNavigation";
import useForm from "@/5.Utils/1.Hooks/form/useForm";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

// Infer TypeScript type from schema
export type LoginFormData = z.infer<typeof loginSchema>;

const useLogin = () => {
  const { login } = useAuthContext();
  const { signin, signinLoading } = useAuthAPI();
  const { navigate } = useNavigation();
  //error state for the API response
  const [APIerror, setAPIError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      setAPIError(null);
      const response = await signin(data.email, data.password);
      if (response.success && response.user) {
        login(response.user, response.token || "authenticated");
        navigate("/dashboard", true);
      } else {
        setAPIError(response.error || "An unknown error occurred");
      }
    },
    resetOnSuccess: true,
  });

  return {
    form,
    APIerror,
    signinLoading,
  };
};

export default useLogin;
