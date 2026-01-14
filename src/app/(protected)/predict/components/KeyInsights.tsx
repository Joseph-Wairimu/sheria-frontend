// components/KeyInsights.tsx
'use client';

import {
  Alert,
  Stack,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Lightbulb, CheckCircle } from '@mui/icons-material';

interface KeyInsightsProps {
  insights: string[];
  accuracy: number;
}

export default function KeyInsights({ insights, accuracy }: KeyInsightsProps) {
  return (
    <Alert severity="info" sx={{ borderRadius: 1 }}>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Lightbulb sx={{ fontSize: 20 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Key Insights & Recommendations
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Model Accuracy: {(accuracy * 100).toFixed(1)}%
        </Typography>
        <List dense>
          {insights.map((insight, idx) => (
            <ListItem key={idx}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={insight} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Alert>
  );
}