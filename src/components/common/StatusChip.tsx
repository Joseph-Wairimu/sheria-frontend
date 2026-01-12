
'use client';

import { Chip, alpha } from '@mui/material';
import type { ChipProps } from '@mui/material';
import {
  CheckCircle,
  Error,
  HourglassEmpty,
  Warning,
} from '@mui/icons-material';

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: 'success' | 'error' | 'pending' | 'warning' | 'processing';
}

export default function StatusChip({ status, ...props }: StatusChipProps) {
  const config = {
    success: {
      color: '#10b981',
      icon: <CheckCircle sx={{ fontSize: 18 }} />,
      label: 'Success',
      bgcolor: alpha('#10b981', 0.1),
    },
    error: {
      color: '#ef4444',
      icon: <Error sx={{ fontSize: 18 }} />,
      label: 'Error',
      bgcolor: alpha('#ef4444', 0.1),
    },
    pending: {
      color: '#f59e0b',
      icon: <HourglassEmpty sx={{ fontSize: 18 }} />,
      label: 'Pending',
      bgcolor: alpha('#f59e0b', 0.1),
    },
    warning: {
      color: '#f59e0b',
      icon: <Warning sx={{ fontSize: 18 }} />,
      label: 'Warning',
      bgcolor: alpha('#f59e0b', 0.1),
    },
    processing: {
      color: '#06b6d4',
      icon: <HourglassEmpty sx={{ fontSize: 18 }} />,
      label: 'Processing',
      bgcolor: alpha('#06b6d4', 0.1),
    },
  };

  const { color, icon, label, bgcolor } = config[status];

  return (
    <Chip
      icon={icon}
      label={props.label || label}
      size="small"
      sx={{
        bgcolor,
        color,
        fontWeight: 700,
        borderRadius: 2,
        '& .MuiChip-icon': {
          color,
        },
        ...props.sx,
      }}
      {...props}
    />
  );
}