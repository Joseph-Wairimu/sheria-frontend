
'use client';

import React from 'react';

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
import { PREDICTION_DOMAINS } from '@/src/lib/constants';

interface ModelBuilderProps {
  onTrain: (domain: string) => void;
  loading: boolean;
}

export default function ModelBuilder({ onTrain, loading }: ModelBuilderProps) {
  const [domain, setDomain] = React.useState('education');

  const handleTrain = () => {
    onTrain(domain);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Model Configuration
        </Typography>

        <Stack spacing={3}>
          <TextField
            select
            fullWidth
            label="Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            {PREDICTION_DOMAINS.map((d) => (
              <MenuItem key={d.value} value={d.value}>
                {d.label}
              </MenuItem>
            ))}
          </TextField>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Training Data
            </Typography>
            <Paper
              sx={{
                p: 4,
                border: '2px dashed',
                borderColor: 'divider',
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover',
                },
              }}
            >
              <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Upload CSV or connect to database
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
          >
            {loading ? 'Training Model...' : 'Train Model'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}