// components/ModelBuilder.tsx
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Stack,
  Paper,
} from '@mui/material';
import { CloudUpload, PlayArrow } from '@mui/icons-material';

interface ModelBuilderProps {
  onTrain: (domain: string) => void;
  loading: boolean;
}

const PREDICTION_DOMAINS = [
  { value: 'case-timeline', label: 'Case Timeline Forecasting' },
  { value: 'stall-risk', label: 'Case Stalling Risk Model' },
  { value: 'dismissal-risk', label: 'Dismissal Risk Prediction' },
  { value: 'resource', label: 'Resource Optimization' },
  { value: 'trend-analysis', label: 'Trend Analysis' },
];

export default function ModelBuilder({ onTrain, loading }: ModelBuilderProps) {
  const [domain, setDomain] = React.useState('case-timeline');

  const handleTrain = () => {
    onTrain(domain);
  };

  return (
    <Card sx={{ position: 'sticky', top: 16 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
          Prediction Engine
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Select Domain
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              {PREDICTION_DOMAINS.map((d) => (
                <MenuItem key={d.value} value={d.value}>
                  {d.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Training Data
            </Typography>
            <Paper
              sx={{
                p: 3,
                border: '2px dashed #cbd5e1',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#3b82f6',
                  bgcolor: '#eff6ff',
                },
              }}
            >
              <CloudUpload sx={{ fontSize: 40, color: '#94a3b8', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Upload CSV or Connect Database
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 1 }}
              >
                Supports: Case records, court schedules, historical data
              </Typography>
            </Paper>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<PlayArrow />}
            onClick={handleTrain}
            disabled={loading}
            sx={{ fontWeight: 600 }}
          >
            {loading ? 'Training...' : 'Train Model'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}