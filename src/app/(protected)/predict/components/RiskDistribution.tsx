// components/RiskDistribution.tsx
'use client';

import { Card, CardContent, Typography } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RiskDistributionProps {
  data: Array<{ name: string; value: number }>;
}

const RISK_COLORS = ['#dc2626', '#f97316', '#eab308', '#22c55e'];

export default function RiskDistribution({ data }: RiskDistributionProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Case Risk Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={RISK_COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}