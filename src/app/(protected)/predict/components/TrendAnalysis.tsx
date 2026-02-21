"use client";

import { Box, Typography, Chip } from "@mui/material";

const T = {
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  emerald: "#10b981",
  amber: "#f59e0b",
  red: "#f87171",
  blue: "#60a5fa",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

const riskConfig = {
  High: {
    color: T.red,
    bg: `rgba(248,113,113,0.12)`,
    border: `rgba(248,113,113,0.25)`,
  },
  Medium: {
    color: T.amber,
    bg: `rgba(245,158,11,0.12)`,
    border: `rgba(245,158,11,0.25)`,
  },
  Low: {
    color: T.emerald,
    bg: `rgba(16,185,129,0.12)`,
    border: `rgba(16,185,129,0.25)`,
  },
};

const typeConfig: Record<string, { color: string }> = {
  hotspot: { color: T.red },
  trend: { color: T.gold },
  emerging: { color: T.blue },
};

interface TrendAnalysisProps {
  data: Array<{
    case: string;
    type: string;
    risk: "High" | "Medium" | "Low";
    status: string;
  }>;
}

export default function TrendAnalysis({ data }: TrendAnalysisProps) {
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
          — Intelligence
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
          Emerging Legal Trends
        </Typography>
        <Typography sx={{ fontSize: "0.78rem", color: T.muted }}>
          Hotspots and emerging dispute categories requiring proactive attention
        </Typography>
      </Box>

      {/* Table header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          px: 3,
          py: 1.25,
          background: "rgba(255,255,255,0.02)",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        {["Dispute Type", "Category", "Risk Level", "Status"].map((h) => (
          <Typography
            key={h}
            sx={{
              fontFamily: "monospace",
              fontSize: "0.6rem",
              color: T.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {h}
          </Typography>
        ))}
      </Box>

      {data.map((row, i) => {
        const risk = riskConfig[row.risk];
        const type = typeConfig[row.type] || { color: T.muted };
        return (
          <Box
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              px: 3,
              py: 1.75,
              alignItems: "center",
              borderBottom:
                i < data.length - 1 ? `1px solid ${T.border}` : "none",
              transition: "background 0.2s",
              "&:hover": { background: T.navy3 },
            }}
          >
            <Typography
              sx={{ fontSize: "0.85rem", fontWeight: 600, color: T.text }}
            >
              {row.case}
            </Typography>

            <Chip
              label={row.type}
              size="small"
              sx={{
                background: `${type.color}12`,
                color: type.color,
                border: `1px solid ${type.color}28`,
                fontWeight: 600,
                fontSize: "0.68rem",
                height: 22,
                textTransform: "capitalize",
                width: "fit-content",
              }}
            />

            <Chip
              label={row.risk}
              size="small"
              sx={{
                background: risk.bg,
                color: risk.color,
                border: `1px solid ${risk.border}`,
                fontWeight: 700,
                fontSize: "0.68rem",
                height: 22,
                width: "fit-content",
              }}
            />

            <Typography
              sx={{ fontSize: "0.8rem", color: T.muted, fontWeight: 500 }}
            >
              {row.status}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
