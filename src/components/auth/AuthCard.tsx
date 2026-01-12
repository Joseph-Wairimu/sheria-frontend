// components/auth/AuthCard.tsx
'use client';

import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { ReactNode } from 'react';

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 460,
        mx: 'auto',
        borderRadius: 4,
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: { xs: 4, md: 5 } }}>
        <Typography
          variant="h4"
          fontWeight={800}
          color="primary"
          gutterBottom
          align="center"
        >
          Sheria
        </Typography>

        <Typography variant="h5" fontWeight={700} align="center" mb={1}>
          {title}
        </Typography>

        {subtitle && (
          <Typography
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            {subtitle}
          </Typography>
        )}

        {children}

        {footer && (
          <>
            <Divider sx={{ my: 3 }}>or</Divider>
            {footer}
          </>
        )}
      </CardContent>
    </Card>
  );
}