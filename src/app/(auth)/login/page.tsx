
import { Suspense } from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import AuthCard from '@/src/components/auth/AuthCard'; 
import GoogleSignInWrapper from '@/src/components/auth/GoogleSignInWrapper'; 
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { exchangeToken } from "@/src/lib/auth";

async function isAuthenticated() {
  const cookieStore = cookies();
  return Boolean(cookieStore.get("access_token")?.value);
}
export const metadata = {
  title: 'Sign In - Sheria Platform',
  description: 'Sign in to access AI-powered governance tools',
};

export default async function LoginPage() {
 const cookieStore = cookies();

  const accessToken = cookieStore.get("access_token");

  if (!accessToken) {
    console.log("start Token Hit:");
    await exchangeToken();
  }

  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/dashboard");
  }

  return (
    <Container maxWidth="lg">
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={8}
      >
        <AuthCard
          title="Welcome back"
          subtitle="Sign in to continue to Sheria Governance Platform"
          footer={
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link href="/signup" color="primary" underline="hover">
                  Create account
                </Link>
              </Typography>
            </Box>
          }
        >
          <Box sx={{ mt: 4, mb: 2 }}>
            <Suspense fallback={<div>Loading sign-in options...</div>}>
              <GoogleSignInWrapper mode="signin" />
            </Suspense>
          </Box>
        </AuthCard>
      </Box>
    </Container>
  );
}