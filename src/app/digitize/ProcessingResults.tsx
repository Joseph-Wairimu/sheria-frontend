
'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  LinearProgress,
  alpha,
  Paper,
} from '@mui/material';
import { CheckCircle, Error, AutoAwesome } from '@mui/icons-material';

interface ProcessingResult {
  name: string;
  status: 'completed' | 'failed' | 'processing';
  text?: string;
  metadata?: {
    documentType: string;
    language: string;
    confidence: number;
    entities: string[];
  };
}

interface ProcessingResultsProps {
  results: ProcessingResult[];
}

export default function ProcessingResults({ results }: ProcessingResultsProps) {
  return (
    <Stack spacing={2.5}>
      {results.map((result, index) => (
        <Card
          key={index}
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: result.status === 'completed' ? 'success.main' : 'divider',
              boxShadow: result.status === 'completed' ? `0 8px 24px ${alpha('#10b981', 0.15)}` : 'none',
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {result.name}
                </Typography>
                {result.status === 'processing' && (
                  <LinearProgress sx={{ mt: 1, borderRadius: 1 }} />
                )}
              </Box>
              {result.status === 'completed' && (
                <Chip
                  icon={<CheckCircle />}
                  label="Completed"
                  color="success"
                  sx={{ fontWeight: 700, borderRadius: 2 }}
                />
              )}
              {result.status === 'failed' && (
                <Chip
                  icon={<Error />}
                  label="Failed"
                  color="error"
                  sx={{ fontWeight: 700, borderRadius: 2 }}
                />
              )}
            </Box>

            {result.metadata && (
              <>
                <Stack direction="row" spacing={2} sx={{ mb: 2.5 }}>
                  {[
                    { label: 'Type', value: result.metadata.documentType },
                    { label: 'Language', value: result.metadata.language },
                    { label: 'Confidence', value: `${(result.metadata.confidence * 100).toFixed(0)}%` },
                  ].map((item) => (
                    <Paper
                      key={item.label}
                      elevation={0}
                      sx={{
                        px: 2,
                        py: 1.5,
                        bgcolor: alpha('#f8fafc', 0.8),
                        borderRadius: 2,
                        flex: 1,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {item.value}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <AutoAwesome sx={{ fontSize: 18, color: '#8b5cf6' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Extracted Entities
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {result.metadata.entities.map((entity, i) => (
                    <Chip
                      key={i}
                      label={entity}
                      size="small"
                      sx={{
                        bgcolor: alpha('#8b5cf6', 0.1),
                        color: '#8b5cf6',
                        fontWeight: 700,
                        borderRadius: 1.5,
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}