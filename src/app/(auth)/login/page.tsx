// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Link } from '@mui/material';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import AuthCard from '@/components/auth/AuthCard';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // Option A: Redirect directly (recommended for most cases)
      window.location.href = '/api/auth/google';

      // Option B: If you want to handle with fetch + redirect manually
      // const res = await fetch('/api/auth/google', { method: 'GET' });
      // const { url } = await res.json();
      // window.location.href = url;
    } catch (error) {
      console.error('Google sign in failed:', error);
      setLoading(false);
    }
  };

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
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link href="/signup" color="primary" underline="hover">
                  Create account
                </Link>
              </Typography>
            </Box>
          }
        >
          <Box sx={{ mt: 2, mb: 3 }}>
            <GoogleSignInButton
              onClick={handleGoogleSignIn}
              loading={loading}
              mode="signin"
            />
          </Box>
        </AuthCard>
      </Box>
    </Container>
  );
}