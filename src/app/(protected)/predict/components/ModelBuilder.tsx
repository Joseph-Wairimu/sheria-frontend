"use client";

import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { CloudUpload, PlayArrow } from "@mui/icons-material";

const T = {
  navy: "#070b14",
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  goldLt: "#f0c96a",
  purple: "#c084fc",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    background: T.navy3,
    color: T.text,
    borderRadius: "12px",
    fontSize: "0.88rem",
    "& fieldset": { borderColor: T.border },
    "&:hover fieldset": { borderColor: `${T.purple}50` },
    "&.Mui-focused fieldset": { borderColor: `${T.purple}80` },
  },
  "& .MuiInputLabel-root": { color: T.muted, fontSize: "0.88rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: T.purple },
  "& .MuiSelect-icon": { color: T.muted },
};

const menuPaperSx = {
  background: T.navy2,
  border: `1px solid ${T.border}`,
  borderRadius: "12px",
  color: T.text,
  "& .MuiMenuItem-root": {
    fontSize: "0.85rem",
    "&:hover": { background: "rgba(255,255,255,0.05)" },
    "&.Mui-selected": { background: `${T.purple}14`, color: T.purple },
  },
};

const PREDICTION_DOMAINS = [
  { value: "case-timeline", label: "Case Timeline Forecasting" },
  { value: "stall-risk", label: "Case Stalling Risk Model" },
  { value: "dismissal-risk", label: "Dismissal Risk Prediction" },
  { value: "resource", label: "Resource Optimization" },
  { value: "trend-analysis", label: "Trend Analysis" },
];

interface ModelBuilderProps {
  onTrain: (domain: string) => void;
  loading: boolean;
}

export default function ModelBuilder({ onTrain, loading }: ModelBuilderProps) {
  const [domain, setDomain] = React.useState("case-timeline");

  return (
    <Box
      sx={{
        background: T.navy2,
        border: `1px solid ${T.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        position: "sticky",
        top: 16,
      }}
    >
      <Box
        sx={{
          position: "relative",
          px: 3,
          pt: 3.5,
          pb: 3,
          borderBottom: `1px solid ${T.border}`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(192,132,252,0.1), transparent)",
          }}
        />
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
          — Prediction Engine
        </Typography>
        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "white",
          }}
        >
          Model Builder
        </Typography>
      </Box>

      <Box sx={{ px: 3, py: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: T.muted,
                mb: 1,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontFamily: "monospace",
              }}
            >
              Select Domain
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              sx={inputSx}
              SelectProps={{
                MenuProps: { PaperProps: { elevation: 0, sx: menuPaperSx } },
              }}
            >
              {PREDICTION_DOMAINS.map((d) => (
                <MenuItem key={d.value} value={d.value}>
                  {d.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: T.muted,
                mb: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontFamily: "monospace",
              }}
            >
              Training Data
            </Typography>
            <Box
              sx={{
                px: 2.5,
                py: 3.5,
                border: `2px dashed ${T.border}`,
                borderRadius: "14px",
                textAlign: "center",
                cursor: "pointer",
                background: "rgba(255,255,255,0.02)",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: `${T.purple}50`,
                  background: `${T.purple}06`,
                  "& .upload-icon": { color: T.purple },
                },
              }}
            >
              <CloudUpload
                className="upload-icon"
                sx={{
                  fontSize: 32,
                  color: T.muted,
                  mb: 1.25,
                  transition: "color 0.25s",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: T.text,
                  mb: 0.5,
                }}
              >
                Upload CSV or Connect Database
              </Typography>
              <Typography
                sx={{ fontSize: "0.75rem", color: T.muted, lineHeight: 1.5 }}
              >
                Case records · Court schedules · Historical data
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            size="large"
            onClick={() => onTrain(domain)}
            disabled={loading}
            startIcon={
              loading ? (
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: `2px solid rgba(255,255,255,0.2)`,
                    borderTopColor: "white",
                    animation: "spin 0.8s linear infinite",
                    "@keyframes spin": { to: { transform: "rotate(360deg)" } },
                  }}
                />
              ) : (
                <PlayArrow sx={{ fontSize: "20px !important" }} />
              )
            }
            sx={{
              background: !loading ? T.purple : "rgba(255,255,255,0.04)",
              color: !loading ? "white" : T.muted,
              fontWeight: 700,
              fontSize: "0.95rem",
              borderRadius: "12px",
              py: 1.5,
              textTransform: "none",
              boxShadow: !loading ? `0 8px 25px ${T.purple}30` : "none",
              border: `1px solid ${!loading ? `${T.purple}50` : T.border}`,
              transition: "all 0.25s ease",
              "&:hover": !loading
                ? {
                    background: "#b06ee8",
                    transform: "translateY(-1px)",
                    boxShadow: `0 10px 30px ${T.purple}40`,
                  }
                : {},
              "&:disabled": {
                background: "rgba(255,255,255,0.04)",
                color: T.muted,
                border: `1px solid ${T.border}`,
              },
            }}
          >
            {loading ? "Training Model…" : "Train Model"}
          </Button>
        </Stack>
      </Box>

      {!loading && (
        <Box
          sx={{
            mx: 3,
            mb: 3,
            px: 2,
            py: 1.5,
            background: `${T.purple}08`,
            border: `1px solid ${T.purple}20`,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.purple,
              boxShadow: `0 0 6px ${T.purple}80`,
            }}
          />
          <Typography sx={{ fontSize: "0.75rem", color: T.muted }}>
            Models trained on{" "}
            <Box component="span" sx={{ color: T.text, fontWeight: 600 }}>
              live judicial data
            </Box>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
