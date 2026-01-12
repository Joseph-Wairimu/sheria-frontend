
import { Suspense } from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import AuthCard from '@/src/components/auth/AuthCard'; 
import GoogleSignInWrapper from '@/src/components/auth/GoogleSignInWrapper'; 

export const metadata = {
  title: 'Sign In - Sheria Platform',
  description: 'Sign in to access AI-powered governance tools',
};

export default function LoginPage() {
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