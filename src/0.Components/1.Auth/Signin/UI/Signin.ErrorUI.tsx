
import { Fade, Stack } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import AGGlassBox from "@atoms/AGGlassBox";
import AGRichText from "@atoms/AGRichText";

interface SigninErrorUIProps {
    error: string | null;
}

const SigninErrorUI = ({ error }: SigninErrorUIProps) => {
    if (!error) return null;

    return (
        <Fade in timeout={300}>
            <AGGlassBox
                glass
                glassBlur={8}
                glassOpacity={0.1}
                glassTint="error.main"
                rounded={12}
                padding={2}
                borderWidth={1}
                borderColor="error.main"
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <ErrorOutline sx={{ color: "error.main", fontSize: 20 }} />
                    <AGRichText variant="body2" color="error.main">
                        {error}
                    </AGRichText>
                </Stack>
            </AGGlassBox>
        </Fade>
    );
};

export default SigninErrorUI;