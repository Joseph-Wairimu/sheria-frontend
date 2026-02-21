"use client";

import { Box, Typography, Chip, Grid, Stack, Divider } from "@mui/material";
import {
  CheckCircle,
  Cancel,
  HourglassEmpty,
  Warning,
  ContentCopy,
  VerifiedUser,
} from "@mui/icons-material";
import { VerificationResult } from "@/src/types";
import { formatDate } from "@/src/lib/utils/formatters";

const T = {
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  emerald: "#10b981",
  blue: "#60a5fa",
  amber: "#f59e0b",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
  red: "#f87171",
};

interface VerificationResultsProps {
  result: VerificationResult;
}

const statusConfig = {
  verified: {
    color: T.emerald,
    icon: CheckCircle,
    title: "Document Verified",
    subtitle: "This document passed all security checks",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    label: "VERIFIED",
  },
  fraudulent: {
    color: T.red,
    icon: Cancel,
    title: "Verification Failed",
    subtitle: "This document did not pass security validation",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.25)",
    label: "FRAUD DETECTED",
  },
  pending: {
    color: T.amber,
    icon: HourglassEmpty,
    title: "Verification Pending",
    subtitle: "Additional checks are being performed",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    label: "PENDING",
  },
  warning: {
    color: T.amber,
    icon: Warning,
    title: "Attention Required",
    subtitle: "Some checks require review",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    label: "WARNING",
  },
};

export default function VerificationResults({
  result,
}: VerificationResultsProps) {
  const cfg = statusConfig[result.status];
  const Icon = cfg.icon;
  const totalTime = result.checks.reduce(
    (acc, c) => acc + parseFloat(c.time.replace("s", "")),
    0,
  );
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  return (
    <Stack spacing={2}>
      {/* ── STATUS BANNER ─────────────────────────────── */}
      <Box
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          position: "relative",
        }}
      >
        {/* Top colored strip */}
        <Box sx={{ height: 3, background: cfg.color }} />

        <Box
          sx={{ px: 3, py: 3, display: "flex", alignItems: "center", gap: 2.5 }}
        >
          {/* Icon circle */}
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              flexShrink: 0,
              background: `${cfg.color}15`,
              border: `1px solid ${cfg.color}35`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 8px 20px ${cfg.color}20`,
            }}
          >
            <Icon sx={{ fontSize: 26, color: cfg.color }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            {/* Status label */}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: "0.62rem",
                color: cfg.color,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 700,
                mb: 0.4,
              }}
            >
              {cfg.label}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "white",
                mb: 0.4,
              }}
            >
              {cfg.title}
            </Typography>
            <Typography sx={{ fontSize: "0.83rem", color: T.muted }}>
              {cfg.subtitle}
            </Typography>
          </Box>

          {/* Meta chips */}
          <Stack direction="column" spacing={0.75} alignItems="flex-end">
            <Chip
              label={`${totalTime.toFixed(1)}s`}
              size="small"
              sx={{
                background: `${cfg.color}15`,
                color: cfg.color,
                border: `1px solid ${cfg.color}30`,
                fontWeight: 700,
                fontSize: "0.72rem",
                height: 22,
                fontFamily: "monospace",
              }}
            />
            <Chip
              label={`${(result.confidence * 100).toFixed(1)}% conf.`}
              size="small"
              sx={{
                background: "rgba(255,255,255,0.06)",
                color: T.muted,
                border: `1px solid ${T.border}`,
                fontWeight: 700,
                fontSize: "0.72rem",
                height: 22,
                fontFamily: "monospace",
              }}
            />
          </Stack>
        </Box>
      </Box>

      {/* ── SECURITY CHECKS ───────────────────────────── */}
      <Box
        sx={{
          background: T.navy2,
          border: `1px solid ${T.border}`,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <VerifiedUser sx={{ fontSize: 17, color: cfg.color }} />
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: T.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Security Checks
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <Chip
              label={`${result.checks.filter((c) => c.status === "passed").length}/${result.checks.length} passed`}
              size="small"
              sx={{
                background: `${T.emerald}12`,
                color: T.emerald,
                border: `1px solid ${T.emerald}28`,
                fontWeight: 700,
                fontSize: "0.68rem",
                height: 20,
              }}
            />
          </Box>
        </Box>

        <Box sx={{ p: 1.5 }}>
          {result.checks.map((check, i) => {
            const passed = check.status === "passed";
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1.5,
                  py: 1.25,
                  borderRadius: "10px",
                  mb: i < result.checks.length - 1 ? 0.5 : 0,
                  transition: "background 0.2s",
                  "&:hover": { background: T.navy3 },
                }}
              >
                {/* Status icon */}
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "8px",
                    flexShrink: 0,
                    background: passed ? `${T.emerald}12` : `${T.red}12`,
                    border: `1px solid ${passed ? T.emerald : T.red}28`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {passed ? (
                    <CheckCircle sx={{ fontSize: 14, color: T.emerald }} />
                  ) : (
                    <Cancel sx={{ fontSize: 14, color: T.red }} />
                  )}
                </Box>

                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: T.text,
                    flex: 1,
                  }}
                >
                  {check.name}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.7rem",
                    color: T.muted,
                  }}
                >
                  {check.time}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── AUDIT HASH (replaces blockchain) ──────────── */}
      {result.blockchainHash && (
        <Box
          sx={{
            background: T.navy2,
            border: `1px solid ${T.border}`,
            borderRadius: "16px",
            p: 2.5,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-30%",
              right: "-5%",
              width: 160,
              height: 160,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,168,67,0.07), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: T.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                — Audit Hash
              </Typography>
            </Box>
            <Chip
              label="Immutable Record"
              size="small"
              sx={{
                background: `${T.gold}12`,
                color: T.gold,
                border: `1px solid ${T.gold}28`,
                fontWeight: 700,
                fontSize: "0.68rem",
                height: 20,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              background: T.navy3,
              border: `1px solid ${T.border}`,
              borderRadius: "10px",
              px: 2,
              py: 1.5,
            }}
          >
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: "0.78rem",
                color: T.text,
                flex: 1,
                wordBreak: "break-all",
                letterSpacing: "0.02em",
              }}
            >
              {result.blockchainHash}
            </Typography>
            <Box
              onClick={() => copyToClipboard(result.blockchainHash!)}
              sx={{
                cursor: "pointer",
                color: T.muted,
                flexShrink: 0,
                p: 0.5,
                borderRadius: "6px",
                "&:hover": { color: T.gold, background: `${T.gold}10` },
                transition: "all 0.15s",
              }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </Box>
      )}

      {/* ── DOCUMENT METADATA ─────────────────────────── */}
      <Box
        sx={{
          background: T.navy2,
          border: `1px solid ${T.border}`,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${T.border}` }}>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: T.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            — Document Information
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={1.5}>
            {Object.entries(result.metadata).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    background: T.navy3,
                    border: `1px solid ${T.border}`,
                    borderRadius: "10px",
                    transition: "all 0.2s",
                    "&:hover": { borderColor: `${T.gold}25` },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.6rem",
                      color: T.muted,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      mb: 0.5,
                      display: "block",
                    }}
                  >
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.9rem", fontWeight: 700, color: "white" }}
                  >
                    {typeof value === "string" ? value : JSON.stringify(value)}
                  </Typography>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  background: T.navy3,
                  border: `1px solid ${T.border}`,
                  borderRadius: "10px",
                  "&:hover": { borderColor: `${T.gold}25` },
                  transition: "all 0.2s",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    color: T.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    mb: 0.5,
                    display: "block",
                  }}
                >
                  Verification Time
                </Typography>
                <Typography
                  sx={{ fontSize: "0.9rem", fontWeight: 700, color: "white" }}
                >
                  {formatDate(result.timestamp)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}
