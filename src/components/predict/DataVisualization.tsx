'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataVisualizationProps {
  data: any[];
  type?: 'line' | 'bar';
  xKey: string;
  yKeys: { key: string; name: string; color: string }[];
}

export function DataVisualization({
  data,
  type = 'line',
  xKey,
  yKeys
}: DataVisualizationProps) {
  const Chart = type === 'line' ? LineChart : BarChart;

  // 🔥 MAGIC FIX — avoids all TS overload issues
  const DataComponent =
    (type === 'line' ? Line : Bar) as unknown as React.ElementType;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />

        {yKeys.map((yKey) => (
          <DataComponent
            key={yKey.key}
            type={type === 'line' ? 'monotone' : undefined}
            dataKey={yKey.key}
            name={yKey.name}
            stroke={yKey.color}
            fill={yKey.color}
          />
        ))}
      </Chart>
    </ResponsiveContainer>
  );
}
