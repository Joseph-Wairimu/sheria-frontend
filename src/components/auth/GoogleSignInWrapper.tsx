// src/app/(auth)/login/GoogleSignInWrapper.tsx
'use client';

import { useState } from 'react';
import GoogleSignInButton from '@/src/components/auth/GoogleSignInButton';

type Props = {
  mode: 'signin' | 'signup';
};

export default function GoogleSignInWrapper({ mode }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    const query = mode === 'signup' ? '?mode=signup' : '';
    window.location.href = `/api/auth/google${query}`;
  };

  return (
    <GoogleSignInButton
      onClick={handleClick}
      loading={loading}
      mode={mode}
    />
  );
}