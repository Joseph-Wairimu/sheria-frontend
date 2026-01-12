// components/auth/GoogleSignInButton.tsx
'use client';

import { Button, CircularProgress } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

interface GoogleSignInButtonProps {
  onClick: () => void;
  loading?: boolean;
  mode?: 'signin' | 'signup';
}

export default function GoogleSignInButton({
  onClick,
  loading = false,
  mode = 'signin'
}: GoogleSignInButtonProps) {
  const text = mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google';

  return (
    <Button
      fullWidth
      variant="outlined"
      size="large"
      onClick={onClick}
      disabled={loading}
      sx={{
        py: 1.5,
        borderColor: '#e2e8f0',
        color: '#1e293b',
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '1rem',
        borderRadius: '10px',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#f8fafc',
          borderColor: '#cbd5e1',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.12)',
        },
        position: 'relative',
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: '#2563eb' }} />
      ) : (
        <>
          <FcGoogle size={22} style={{ marginRight: 12 }} />
          {text}
        </>
      )}
    </Button>
  );
}