import { Suspense } from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import AuthCard from '@/src/components/auth/AuthCard';
import GoogleSignInWrapper from '@/src/components/auth/GoogleSignInWrapper';

export const metadata = {
  title: 'Sign Up - Sheria Platform',
  description: 'Create your account on Sheria Governance Platform',
};

export default function SignUpPage() {
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
          title="Get started with Sheria"
          subtitle="Create your governance platform account"
          footer={
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link href="/login" color="primary" underline="hover">
                  Sign in
                </Link>
              </Typography>
            </Box>
          }
        >
          <Box sx={{ mt: 4, mb: 2 }}>
            <Suspense fallback={<div>Loading sign-up options...</div>}>
              <GoogleSignInWrapper mode="signup" />
            </Suspense>
          </Box>
        </AuthCard>
      </Box>
    </Container>
  );
}