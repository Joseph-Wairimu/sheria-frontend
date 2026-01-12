
'use client';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  Lightbulb,
  CheckCircle,
} from '@mui/icons-material';

interface InsightsDashboardProps {
  accuracy: number;
  insights: string[];
}

export default function InsightsDashboard({ accuracy, insights }: InsightsDashboardProps) {
  return (
    <Grid container spacing={3}>
      {/* Quick Metrics */}
      <Grid item xs={12} md={4}>
        <Card sx={{ textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
          <CardContent>
            <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              ↑ 12%
            </Typography>
            <Typography variant="body2">Upward Trend</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ textAlign: 'center', bgcolor: 'info.light', color: 'info.contrastText' }}>
          <CardContent>
            <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              {(accuracy * 100).toFixed(0)}%
            </Typography>
            <Typography variant="body2">Model Accuracy</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ textAlign: 'center', bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
          <CardContent>
            <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              92
            </Typography>
            <Typography variant="body2">Next Month Forecast</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Key Insights */}
      <Grid item xs={12}>
        <Alert
          severity="info"
          icon={<Lightbulb />}
          sx={{ '& .MuiAlert-icon': { fontSize: 28 } }}
        >
          <Typography variant="h6" gutterBottom>
            Key Insights
          </Typography>
          <List dense>
            {insights.map((insight, i) => (
              <ListItem key={i} sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircle fontSize="small" color="info" />
                </ListItemIcon>
                <ListItemText primary={insight} />
              </ListItem>
            ))}
          </List>
        </Alert>
      </Grid>
    </Grid>
  );
}
