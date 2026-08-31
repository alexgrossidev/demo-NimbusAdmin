import AGBox from "@/3.Theme/0.Atoms/AGBox";
import SigninFormUI from "../UI/Signin.FormUI";
import useLogin from "../Logic/useLogin";
import { Grid } from "@mui/material";
import { Image } from "@mui/icons-material";

const SigninPage = () => {
  const { form, APIerror, signinLoading } = useLogin();

  return (
    <AGBox
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Grid
        container
        alignItems="center"
        sx={{ maxWidth: 1200, width: "100%", px: 3 }}
      >
        <Grid size={7}>
          <SigninFormUI
            form={form}
            onForgotPassword={() => {}}
            APIerror={APIerror}
            signinLoading={signinLoading}
          />
        </Grid>
        <Grid size={5}>
          <Image />
        </Grid>
      </Grid>
    </AGBox>
  );
};

export default SigninPage;
