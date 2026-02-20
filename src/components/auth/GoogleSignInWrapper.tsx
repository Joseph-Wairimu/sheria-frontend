'use client';

import { useState } from 'react';
import GoogleSignInButton from '@/src/components/auth/GoogleSignInButton';
import { env } from 'next-runtime-env';

type Props = {
  mode: 'signin' | 'signup';
};

export default function GoogleSignInWrapper({ mode }: Props) {
  const [loading, setLoading] = useState(false);
  console.log('Google URL:', env('NEXT_PUBLIC_GOOGLE_URL'),mode);
  const NEXT_PUBLIC_GOOGLE_URL = env('NEXT_PUBLIC_GOOGLE_URL');

  const handleClick = () => {
    setLoading(true);
    const query = NEXT_PUBLIC_GOOGLE_URL;
    window.location.href = `${query}`;
  };

  return (
    <GoogleSignInButton
      onClick={handleClick}
      loading={loading}
      mode={mode}
    />
  );
}