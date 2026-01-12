// app/(auth)/signup/page.tsx
'use client';

import { Box, Container, Typography, Link } from '@mui/material';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import AuthCard from '@/components/auth/AuthCard';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignUp = () => {
    setLoading(true);
    window.location.href = '/api/auth/google?mode=signup';
    // or same endpoint — your backend can decide based on redirect uri / state
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
          title="Get started with Sheria"
          subtitle="Create your governance platform account"
          footer={
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link href="/login" color="primary" underline="hover">
                  Sign in
                </Link>
              </Typography>
            </Box>
          }
        >
          <Box sx={{ mt: 2, mb: 3 }}>
            <GoogleSignInButton
              onClick={handleGoogleSignUp}
              loading={loading}
              mode="signup"
            />
          </Box>
        </AuthCard>
      </Box>
    </Container>
  );
}