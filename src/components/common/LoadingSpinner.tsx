
'use client';

import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

export default function LoadingSpinner({ message, size = 48 }: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2.5,
        py: 10,
      }}
    >
      <CircularProgress size={size} thickness={4} />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontWeight: 600 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}