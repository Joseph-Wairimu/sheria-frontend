"use client";

import { Box, Typography, Stack } from "@mui/material";

const T = {
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  emerald: "#10b981",
  amber: "#f59e0b",
  red: "#f87171",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

const getBarColor = (pct: number) => {
  if (pct > 80) return T.red;
  if (pct > 60) return T.amber;
  return T.emerald;
};

interface ResourceUtilizationProps {
  data: Array<{ court: string; utilization: number; capacity: number }>;
}

export default function ResourceUtilization({
  data,
}: ResourceUtilizationProps) {
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
          — Capacity
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
          Resource Utilization
        </Typography>
        <Typography sx={{ fontSize: "0.78rem", color: T.muted }}>
          Court workload status and optimization opportunities
        </Typography>
      </Box>

      <Box sx={{ px: 3, py: 2.5 }}>
        <Stack spacing={2.25}>
          {data.map((court) => {
            const color = getBarColor(court.utilization);
            return (
              <Box key={court.court}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 0.75,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "0.85rem", fontWeight: 600, color: T.text }}
                  >
                    {court.court}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {court.utilization > 80 && (
                      <Typography
                        sx={{
                          fontSize: "0.65rem",
                          color: T.red,
                          fontFamily: "monospace",
                          fontWeight: 700,
                          background: `${T.red}15`,
                          px: 0.75,
                          py: 0.2,
                          borderRadius: "4px",
                        }}
                      >
                        HIGH
                      </Typography>
                    )}
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color,
                        fontFamily: "monospace",
                      }}
                    >
                      {court.utilization}%
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: 6,
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.06)",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${court.utilization}%`,
                      borderRadius: "4px",
                      background: color,
                      boxShadow: `0 0 8px ${color}50`,
                      transition: "width 0.8s ease",
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Stack>

        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${T.border}`,
          }}
        >
          {[
            { label: "Critical (>80%)", color: T.red },
            { label: "Moderate (>60%)", color: T.amber },
            { label: "Optimal", color: T.emerald },
          ].map((l) => (
            <Box
              key={l.label}
              sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: l.color,
                }}
              />
              <Typography sx={{ fontSize: "0.7rem", color: T.muted }}>
                {l.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
