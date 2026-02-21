"use client";

import { Box, Typography, Stack } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const T = {
  navy2: "#0d1424",
  navy3: "#111827",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

const RISK_COLORS = ["#f87171", "#f59e0b", "#d4a843", "#10b981"];

interface RiskDistributionProps {
  data: Array<{ name: string; value: number }>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        background: T.navy3,
        border: `1px solid ${T.border}`,
        borderRadius: "10px",
        px: 2,
        py: 1.25,
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <Typography sx={{ fontSize: "0.82rem", color: "white", fontWeight: 700 }}>
        {payload[0].name}:{" "}
        <Box component="span" sx={{ fontFamily: "monospace" }}>
          {payload[0].value}%
        </Box>
      </Typography>
    </Box>
  );
};

export default function RiskDistribution({ data }: RiskDistributionProps) {
  return (
    <Box
      sx={{
        background: T.navy2,
        border: `1px solid ${T.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        height: "100%",
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
          — Risk Analysis
        </Typography>
        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "white",
          }}
        >
          Case Risk Distribution
        </Typography>
      </Box>

      <Box sx={{ px: 2, pt: 1 }}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={RISK_COLORS[i]} opacity={0.9} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ px: 3, pb: 3 }}>
        <Stack spacing={1}>
          {data.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: RISK_COLORS[i],
                    boxShadow: `0 0 6px ${RISK_COLORS[i]}80`,
                  }}
                />
                <Typography sx={{ fontSize: "0.82rem", color: T.muted }}>
                  {item.name}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "monospace",
                }}
              >
                {item.value}%
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
