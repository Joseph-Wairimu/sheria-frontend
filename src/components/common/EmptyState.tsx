
'use client';

import { Box, Typography, Button, alpha } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface EmptyStateProps {
  icon: SvgIconComponent;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 10,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: alpha('#2563eb', 0.08),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <Icon sx={{ fontSize: 56, color: alpha('#2563eb', 0.4) }} />
      </Box>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ fontWeight: 700, color: 'text.primary' }}
      >
        {title}
      </Typography>
      {description && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 3, maxWidth: 450, fontWeight: 500 }}
        >
          {description}
        </Typography>
      )}
      {action && (
        <Button 
          variant="contained" 
          size="large"
          onClick={action.onClick}
          sx={{ 
            borderRadius: 2.5,
            px: 4,
            py: 1.5,
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
}
