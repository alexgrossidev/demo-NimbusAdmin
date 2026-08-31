import { useState } from "react";
import { Stack, Link, IconButton, Fade } from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import AGGlassBox from "@atoms/AGGlassBox";
import AGTitle from "@atoms/AGTitle";
import AGButton from "@atoms/AGButton";
import AGRichText from "@atoms/AGRichText";
import { AGTextField, AGCheckbox } from "@atoms/AGFormComponent";
import type { UseFormResult } from "@/5.Utils/1.Hooks/form/useForm";
import type { LoginFormData } from "../Logic/useLogin";
import SigninErrorUI from "./Signin.ErrorUI";
import FEATURE_FLAGS from "@/FEATUREFLAGS";

export interface SigninFormUIProps {
  /** Form instance from useForm hook */
  form: UseFormResult<LoginFormData>;
  /** Handler for forgot password link */
  onForgotPassword?: () => void;
  APIerror: string | null;
  signinLoading: boolean;
}

// ============================================================================
// Component
// ============================================================================

const SigninFormUI = ({
  form,
  APIerror,
  onForgotPassword,
  signinLoading,
}: SigninFormUIProps) => {
  // Local UI state (not form data)
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { handleSubmit, isSubmitting, getFieldProps, submissionError } = form;

  return (
    <AGGlassBox
      glass
      glassBlur={16}
      glassOpacity={0.08}
      glassTint="background.paper"
      rounded={24}
      borderWidth={1}
      borderColor="divider"
      shadow="0 8px 32px rgba(0,0,0,0.12)"
      liftOnHover
      liftAmount={2}
      padding={5}
      sx={{
        maxWidth: 420,
        width: "100%",
        mx: "auto",
      }}
    >
      <Fade in timeout={600}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Header */}
            <Stack spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <AGTitle
                variant="h4"
                weight={700}
                gradient={["primary.main", "secondary.main"]}
                clipText
              >
                Welcome Back
              </AGTitle>
              <AGRichText variant="body2" color="text.secondary" align="center">
                Sign in to continue to your dashboard
              </AGRichText>
            </Stack>

            <SigninErrorUI error={APIerror} />

            {/* General Error */}
            {submissionError && (
              <Fade in>
                <AGGlassBox
                  rounded={12}
                  padding={2}
                  borderWidth={1}
                  borderColor="error.main"
                  glassTint="error.main"
                  glassOpacity={0.1}
                  glass
                >
                  <AGRichText variant="body2" color="error.main" align="center">
                    {submissionError}
                  </AGRichText>
                </AGGlassBox>
              </Fade>
            )}

            {FEATURE_FLAGS.MOCK_LOGIN && (
              <AGRichText
                variant="caption"
                color="text.secondary"
                align="center"
              >
                Demo mode — sign in with admin@example.com, pm@example.com,
                assistant@example.com or developer@example.com (password:
                demo1234) to explore the different roles.
              </AGRichText>
            )}

            {/* Email Field */}
            <AGTextField
              {...getFieldProps("email")}
              variant="glass"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              startIcon={<EmailIcon fontSize="small" />}
              autoComplete="email"
              autoFocus
              rounded={14}
            />

            {/* Password Field */}
            <AGTextField
              {...getFieldProps("password")}
              variant="glass"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              startIcon={<LockIcon fontSize="small" />}
              endIcon={
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                  sx={{ color: "text.secondary" }}
                >
                  {showPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </IconButton>
              }
              autoComplete="current-password"
              rounded={14}
            />

            {/* Remember Me & Forgot Password Row */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: -1 }}
            >
              <AGCheckbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                size="small"
                color="primary"
              />
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={onForgotPassword}
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot password?
              </Link>
            </Stack>

            {/* Submit Button */}
            <AGButton
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              gradient={["primary.main", "primary.dark"]}
              gradientDirection={135}
              expandOnHover
              disabled={isSubmitting}
              startIcon={<LoginIcon />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
              }}
            >
              {signinLoading ? "Signing in..." : "Sign In"}
            </AGButton>
          </Stack>
        </form>
      </Fade>
    </AGGlassBox>
  );
};

export default SigninFormUI;
