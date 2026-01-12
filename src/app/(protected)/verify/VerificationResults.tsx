
'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Grid,
  Stack,
  Paper,
  alpha,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  HourglassEmpty,
  Warning,
  ContentCopy,
  VerifiedUser,
  Speed,
} from '@mui/icons-material';
import { VerificationResult } from '@/src/types';
import { formatDate } from '@/src/lib/utils/formatters';

interface VerificationResultsProps {
  result: VerificationResult;
}

export default function VerificationResults({ result }: VerificationResultsProps) {
  const statusConfig = {
    verified: {
      color: '#10b981',
      icon: <CheckCircle sx={{ fontSize: 48 }} />,
      title: '✓ Document Verified',
      subtitle: 'This document has passed all security checks',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    fraudulent: {
      color: '#ef4444',
      icon: <Cancel sx={{ fontSize: 48 }} />,
      title: '✗ Verification Failed',
      subtitle: 'This document did not pass security validation',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    },
    pending: {
      color: '#f59e0b',
      icon: <HourglassEmpty sx={{ fontSize: 48 }} />,
      title: '⏳ Verification Pending',
      subtitle: 'Additional checks are being performed',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
    warning: {
      color: '#f59e0b',
      icon: <Warning sx={{ fontSize: 48 }} />,
      title: '⚠ Warning',
      subtitle: 'Some checks require attention',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
  };

  const config = statusConfig[result.status];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const totalTime = result.checks.reduce((acc, check) => {
    return acc + parseFloat(check.time.replace('s', ''));
  }, 0);

  return (
    <Stack spacing={3}>
      {/* Status Banner */}
      <Card
        elevation={0}
        sx={{
          background: config.gradient,
          color: 'white',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box>{config.icon}</Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                {config.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.95, fontWeight: 500 }}>
                {config.subtitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Chip
                  icon={<Speed sx={{ color: 'white !important' }} />}
                  label={`${totalTime.toFixed(1)}s total`}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)',
                  }}
                />
                <Chip
                  label={`${(result.confidence * 100).toFixed(1)}% confidence`}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Validation Checks */}
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <VerifiedUser sx={{ color: config.color }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Security Checks
            </Typography>
          </Box>
          <List sx={{ p: 0 }}>
            {result.checks.map((check, index) => (
              <ListItem
                key={index}
                sx={{
                  px: 0,
                  py: 1.5,
                  borderBottom: index < result.checks.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: check.status === 'passed' ? alpha('#10b981', 0.1) : alpha('#ef4444', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {check.status === 'passed' ? (
                      <CheckCircle sx={{ color: '#10b981' }} />
                    ) : (
                      <Cancel sx={{ color: '#ef4444' }} />
                    )}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={check.name}
                  secondary={`Completed in ${check.time}`}
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Blockchain */}
      {result.blockchainHash && (
        <Card
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  🔗 Blockchain Certified
                </Typography>
              </Box>
              <Chip
                label="Immutable"
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 700,
                  backdropFilter: 'blur(10px)',
                }}
              />
            </Box>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontFamily: 'monospace', flex: 1, wordBreak: 'break-all', fontWeight: 600 }}
              >
                {result.blockchainHash}
              </Typography>
              <ContentCopy
                sx={{ cursor: 'pointer', fontSize: 20, flexShrink: 0 }}
                onClick={() => copyToClipboard(result.blockchainHash!)}
              />
            </Paper>
          </CardContent>
        </Card>
      )}

      {/* Metadata */}
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Document Information
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(result.metadata).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: alpha('#f8fafc', 0.8),
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {typeof value === 'string' ? value : JSON.stringify(value)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: alpha('#f8fafc', 0.8),
                  borderRadius: 2,
                  height: '100%',
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                  Verification Time
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {formatDate(result.timestamp)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}