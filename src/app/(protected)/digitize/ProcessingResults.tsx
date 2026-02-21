"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  LinearProgress,
} from "@mui/material";
import { CheckCircle, Error, AutoAwesome } from "@mui/icons-material";

const T = {
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  emerald: "#10b981",
  blue: "#60a5fa",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
  red: "#f87171",
};

interface ProcessingResult {
  name: string;
  status: "completed" | "failed" | "processing";
  text?: string;
  metadata?: {
    documentType: string;
    language: string;
    confidence: number;
    entities: string[];
  };
}

interface ProcessingResultsProps {
  results: ProcessingResult[];
}

export default function ProcessingResults({ results }: ProcessingResultsProps) {
  return (
    <Stack spacing={2}>
      {results.map((result, index) => (
        <Card
          key={index}
          elevation={0}
          sx={{
            background: T.navy2,
            border: `1px solid ${
              result.status === "completed"
                ? `${T.emerald}30`
                : result.status === "failed"
                  ? `${T.red}30`
                  : T.border
            }`,
            borderRadius: "16px",
            transition: "all 0.25s ease",
            "&:hover": {
              background: T.navy3,
              borderColor:
                result.status === "completed"
                  ? `${T.emerald}50`
                  : result.status === "failed"
                    ? `${T.red}50`
                    : `${T.gold}25`,
              transform: "translateY(-2px)",
              boxShadow:
                result.status === "completed"
                  ? `0 8px 30px ${T.emerald}15`
                  : "none",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Header row */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                mb: 2.5,
              }}
            >
              <Box sx={{ flex: 1, pr: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "white",
                    mb: 0.5,
                    lineHeight: 1.3,
                  }}
                >
                  {result.name}
                </Typography>
                {result.status === "processing" && (
                  <LinearProgress
                    sx={{
                      mt: 1.5,
                      height: 3,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      "& .MuiLinearProgress-bar": {
                        background: T.gold,
                        borderRadius: 4,
                      },
                    }}
                  />
                )}
              </Box>
              {result.status === "completed" && (
                <Chip
                  icon={
                    <CheckCircle
                      sx={{
                        fontSize: "15px !important",
                        color: `${T.emerald} !important`,
                      }}
                    />
                  }
                  label="Completed"
                  size="small"
                  sx={{
                    background: `${T.emerald}15`,
                    color: T.emerald,
                    border: `1px solid ${T.emerald}30`,
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: 26,
                    flexShrink: 0,
                  }}
                />
              )}
              {result.status === "failed" && (
                <Chip
                  icon={
                    <Error
                      sx={{
                        fontSize: "15px !important",
                        color: `${T.red} !important`,
                      }}
                    />
                  }
                  label="Failed"
                  size="small"
                  sx={{
                    background: `${T.red}15`,
                    color: T.red,
                    border: `1px solid ${T.red}30`,
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: 26,
                    flexShrink: 0,
                  }}
                />
              )}
            </Box>

            {result.metadata && (
              <>
                {/* Metadata pills */}
                <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
                  {[
                    {
                      label: "Type",
                      value: result.metadata.documentType,
                      accent: T.gold,
                    },
                    {
                      label: "Language",
                      value: result.metadata.language,
                      accent: T.blue,
                    },
                    {
                      label: "Confidence",
                      value: `${(result.metadata.confidence * 100).toFixed(0)}%`,
                      accent: T.emerald,
                    },
                  ].map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        flex: 1,
                        px: 1.5,
                        py: 1.25,
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${T.border}`,
                        borderRadius: "10px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "monospace",
                          fontSize: "0.6rem",
                          color: item.accent,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontWeight: 500,
                          mb: 0.4,
                          display: "block",
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ borderColor: T.border, mb: 2 }} />

                {/* Entities */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.25,
                  }}
                >
                  <AutoAwesome sx={{ fontSize: 16, color: T.gold }} />
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.65rem",
                      color: T.muted,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Extracted Entities
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                  {result.metadata.entities.map((entity, i) => (
                    <Chip
                      key={i}
                      label={entity}
                      size="small"
                      sx={{
                        background: `${T.gold}12`,
                        color: T.gold,
                        border: `1px solid ${T.gold}28`,
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        height: 24,
                        borderRadius: "7px",
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
