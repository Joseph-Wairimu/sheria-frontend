"use client";

import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const T = {
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  purple: "#c084fc",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

interface PredictionChartProps {
  data: Array<{ month: string; actual: number; predicted: number }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        background: T.navy3,
        border: `1px solid ${T.border}`,
        borderRadius: "10px",
        px: 2,
        py: 1.5,
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "0.65rem",
          color: T.muted,
          mb: 0.75,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </Typography>
      {payload.map((p: any, i: number) => (
        <Box
          key={i}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.4 }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: p.color,
            }}
          />
          <Typography sx={{ fontSize: "0.8rem", color: T.muted }}>
            {p.name}:
          </Typography>
          <Typography
            sx={{
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "white",
              fontFamily: "monospace",
            }}
          >
            {p.value} days
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default function PredictionChart({ data }: PredictionChartProps) {
  return (
    <Box
      sx={{
        background: T.navy2,
        border: `1px solid ${T.border}`,
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 3, pt: 3, pb: 2, borderBottom: `1px solid ${T.border}` }}>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.62rem",
            color: T.muted,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            mb: 0.5,
          }}
        >
          — Forecast
        </Typography>
        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "white",
            mb: 0.25,
          }}
        >
          Case Timeline Prediction
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: T.muted }}>
          Resolution duration based on complexity, history, and court workload
        </Typography>
      </Box>

      <Box sx={{ px: 2, pt: 2.5, pb: 2 }}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={T.gold} stopOpacity={0.2} />
                <stop offset="95%" stopColor={T.gold} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={T.purple} stopOpacity={0.2} />
                <stop offset="95%" stopColor={T.purple} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: T.muted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: T.muted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              unit=" d"
              width={45}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }}
            />
            <Legend
              formatter={(value) => (
                <span
                  style={{
                    color: T.muted,
                    fontSize: "0.78rem",
                    fontWeight: 500,
                  }}
                >
                  {value}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke={T.gold}
              strokeWidth={2.5}
              fill="url(#actualGrad)"
              name="Actual Duration"
              dot={{ fill: T.gold, r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: T.gold }}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke={T.purple}
              strokeWidth={2.5}
              strokeDasharray="6 4"
              fill="url(#predictedGrad)"
              name="Predicted Duration"
              dot={{ fill: T.purple, r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: T.purple }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
