'use client';

import { Card, CardContent, Typography, Box, alpha, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: SvgIconComponent;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string; 
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = '#2563eb',
}: StatCardProps) {
  const theme = useTheme();

  const resolvedColor = (theme.palette as any)[color]?.main || color;

  return (
    <Card 
      sx={{ 
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${alpha(resolvedColor, 0.15)}`,
          borderColor: alpha(resolvedColor, 0.3),
        },
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              bgcolor: alpha(resolvedColor, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color: resolvedColor, fontSize: 26 }} />
          </Box>
          {trend && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: 1.5,
                bgcolor: trend.isPositive ? alpha('#10b981', 0.1) : alpha('#ef4444', 0.1),
              }}
            >
              {trend.isPositive ? (
                <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: '#ef4444' }} />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: trend.isPositive ? '#10b981' : '#ef4444',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              >
                {Math.abs(trend.value)}%
              </Typography>
            </Box>
          )}
        </Box>

        <Typography 
          variant="h4" 
          sx={{ 
            mb: 0.5, 
            fontWeight: 800,
            color: 'text.primary',
          }}
        >
          {value}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </CardContent>

      <Box
        sx={{
          position: 'absolute',
          right: -20,
          bottom: -20,
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: alpha(resolvedColor, 0.05),
        }}
      />
    </Card>
  );
}
