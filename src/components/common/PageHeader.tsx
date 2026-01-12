
'use client';

import { Box, Typography, Breadcrumbs, Link, alpha } from '@mui/material';
import { NavigateNext, Home } from '@mui/icons-material';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
}: PageHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 2 }}
        >
          <Link
            href="/"
            color="inherit"
            underline="hover"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.875rem',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <Home fontSize="small" />
            Home
          </Link>
          {breadcrumbs.map((item, index) => (
            <Link
              key={index}
              color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
              href={item.href || '#'}
              underline="hover"
              sx={{
                fontWeight: 600,
                fontSize: '0.875rem',
                ...(index === breadcrumbs.length - 1 && {
                  color: 'primary.main',
                  pointerEvents: 'none',
                }),
              }}
            >
              {item.label}
            </Link>
          ))}
        </Breadcrumbs>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              color: 'text.primary',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
                maxWidth: 600,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        {action && <Box>{action}</Box>}
      </Box>
    </Box>
  );
}