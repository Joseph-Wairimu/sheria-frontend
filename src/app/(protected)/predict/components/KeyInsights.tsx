"use client";

import { Box, Typography } from "@mui/material";
import { Lightbulb, CheckCircle } from "@mui/icons-material";

const T = {
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  emerald: "#10b981",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

interface KeyInsightsProps {
  insights: string[];
  accuracy: number;
}

export default function KeyInsights({ insights, accuracy }: KeyInsightsProps) {
  return (
    <Box
      sx={{
        background: T.navy2,
        border: `1px solid ${T.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,168,67,0.07), transparent)",
        }}
      />
      <Box
        sx={{
          height: 3,
          background: `linear-gradient(90deg, ${T.gold}, ${T.emerald})`,
        }}
      />

      <Box
        sx={{
          px: 3,
          pt: 2.5,
          pb: 2,
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "8px",
              background: `${T.gold}15`,
              border: `1px solid ${T.gold}28`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lightbulb sx={{ fontSize: 16, color: T.gold }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: "0.6rem",
                color: T.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              — AI Generated
            </Typography>
            <Typography
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.2,
              }}
            >
              Key Insights & Recommendations
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            px: 1.75,
            py: 0.75,
            background: `${T.emerald}12`,
            border: `1px solid ${T.emerald}28`,
            borderRadius: "10px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.6rem",
              color: T.muted,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Accuracy
          </Typography>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "1rem",
              fontWeight: 800,
              color: T.emerald,
            }}
          >
            {(accuracy * 100).toFixed(1)}%
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 3, py: 2.5, position: "relative" }}>
        {insights.map((insight, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
              py: 1.5,
              px: 1.5,
              borderRadius: "10px",
              mb: i < insights.length - 1 ? 0.5 : 0,
              transition: "background 0.2s",
              "&:hover": { background: T.navy3 },
            }}
          >
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "6px",
                flexShrink: 0,
                mt: 0.1,
                background: `${T.emerald}12`,
                border: `1px solid ${T.emerald}25`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle sx={{ fontSize: 13, color: T.emerald }} />
            </Box>
            <Typography
              sx={{
                fontSize: "0.87rem",
                color: T.text,
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              {insight}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
