"use client";

import {
  Box,
  Container,
  Typography,
  Link,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useFormState, useFormStatus } from "react-dom";
import { registerAction } from "../../actions/signup";

export default function SignupPage() {
  const [state, formAction] = useFormState(registerAction, {});

  return (
    <div className="landing-root">
      <Container maxWidth="sm">
        <Box
          minHeight="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={8}
        >
          <Box
            className="lp-floating-card"
            sx={{
              width: "100%",
              maxWidth: 480,
              p: { xs: 4, md: 6 },
              borderRadius: "16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at bottom left, rgba(212,168,67,0.08), transparent 60%), radial-gradient(circle at top right, rgba(16,185,129,0.06), transparent 60%)",
                pointerEvents: "none",
              }}
            />

            <Typography
              variant="h4"
              fontFamily="var(--font-display, Georgia, serif)"
              fontWeight={900}
              color="white"
              textAlign="center"
              mb={1}
            >
              Join Sheria
            </Typography>

            <Typography
              variant="body1"
              color="var(--lp-muted)"
              textAlign="center"
              mb={4}
            >
              Create your account to access smart governance tools
            </Typography>

            {state?.error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {state.error}
              </Alert>
            )}

            <form action={formAction} className="space-y-5">
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                autoComplete="email"
                InputLabelProps={{ style: { color: "var(--lp-muted)" } }}
                InputProps={{
                  style: { color: "white", background: "var(--lp-navy-3)" },
                  sx: { "& fieldset": { borderColor: "var(--lp-border)" } },
                }}
                required
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                autoComplete="username"
                InputLabelProps={{ style: { color: "var(--lp-muted)" } }}
                InputProps={{
                  style: { color: "white", background: "var(--lp-navy-3)" },
                  sx: { "& fieldset": { borderColor: "var(--lp-border)" } },
                }}
                required
                sx={{ mb: 2 }}
              />

              <Box display="flex" gap={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  variant="outlined"
                  InputLabelProps={{ style: { color: "var(--lp-muted)" } }}
                  InputProps={{
                    style: { color: "white", background: "var(--lp-navy-3)" },
                    sx: { "& fieldset": { borderColor: "var(--lp-border)" } },
                  }}
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  variant="outlined"
                  InputLabelProps={{ style: { color: "var(--lp-muted)" } }}
                  InputProps={{
                    style: { color: "white", background: "var(--lp-navy-3)" },
                    sx: { "& fieldset": { borderColor: "var(--lp-border)" } },
                  }}
                  required
                  sx={{ mb: 2 }}
                />
              </Box>

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                autoComplete="new-password"
                InputLabelProps={{ style: { color: "var(--lp-muted)" } }}
                InputProps={{
                  style: { color: "white", background: "var(--lp-navy-3)" },
                  sx: { "& fieldset": { borderColor: "var(--lp-border)" } },
                }}
                required
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirm_password"
                type="password"
                variant="outlined"
                autoComplete="new-password"
                InputLabelProps={{ style: { color: "var(--lp-muted)" } }}
                InputProps={{
                  style: { color: "white", background: "var(--lp-navy-3)" },
                  sx: { "& fieldset": { borderColor: "var(--lp-border)" } },
                }}
                required
                sx={{ mb: 2 }}
              />

              <SubmitButton />
            </form>

            <Box my={4} display="flex" alignItems="center" gap={2}>
              <Box flex={1} height="1px" bgcolor="var(--lp-border)" />
              <Typography variant="body2" color="var(--lp-muted)">
                OR
              </Typography>
              <Box flex={1} height="1px" bgcolor="var(--lp-border)" />
            </Box>

            {/* Optional: Google signup if your backend supports it */}
            {/* <Suspense fallback={<CircularProgress size={24} color="inherit" />}>
              <GoogleSignInWrapper mode="signup" />
            </Suspense> */}

            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="var(--lp-muted)">
                Already have an account?{" "}
                <Link
                  href="/user-login"
                  color="var(--lp-gold)"
                  underline="hover"
                  fontWeight={600}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={pending}
      sx={{
        py: 1.8,
        mt: 2,
        background: "var(--lp-gold)",
        color: "var(--lp-navy)",
        fontWeight: 700,
        borderRadius: "12px",
        boxShadow: "0 8px 25px rgba(212,168,67,0.3)",
        "&:hover": {
          background: "var(--lp-gold-light)",
          transform: "translateY(-2px)",
          boxShadow: "0 12px 35px rgba(212,168,67,0.45)",
        },
        "&:disabled": { opacity: 0.6 },
      }}
    >
      {pending ? "Creating account..." : "Create Account"}
    </Button>
  );
}
