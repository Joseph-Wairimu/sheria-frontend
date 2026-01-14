// components/PredictionChart.tsx
'use client';

import { Card, CardContent, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PredictionChartProps {
  data: Array<{ month: string; actual: number; predicted: number }>;
}

export default function PredictionChart({ data }: PredictionChartProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Forecasted Case Timelines
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Case resolution duration based on complexity, history, and court workload
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#2563eb"
              strokeWidth={2}
              name="Actual Duration"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#7c3aed"
              strokeDasharray="5 5"
              strokeWidth={2}
              name="Predicted Duration"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}