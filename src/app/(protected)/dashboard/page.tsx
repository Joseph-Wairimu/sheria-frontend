"use client";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  Scanner,
  Verified,
  Chat,
  Insights,
  ArrowForward,
  TrendingUp,
  CheckCircle,
  Schedule,
  FolderOpen,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Playfair_Display, DM_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--dash-font-display",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--dash-font-mono",
});

// ── Design tokens (mirrors landing page) ──────────────────────
const T = {
  navy: "#070b14",
  navy2: "#0d1424",
  navy3: "#111827",
  navy4: "#1a2235",
  gold: "#d4a843",
  goldLt: "#f0c96a",
  emerald: "#10b981",
  blue: "#60a5fa",
  purple: "#c084fc",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

const card = (extra = {}) => ({
  background: T.navy2,
  border: `1px solid ${T.border}`,
  borderRadius: "16px",
  boxShadow: "none",
  transition: "all 0.25s ease",
  "&:hover": { background: T.navy3, borderColor: "rgba(255,255,255,0.12)" },
  ...extra,
});

export default function HomePage() {
  const router = useRouter();

  const modules = [
    {
      id: "digitize",
      number: "01",
      title: "Digitize Documents",
      description:
        "OCR-powered ingestion of paper records with automatic entity extraction, classification, and multi-language support.",
      icon: Scanner,
      accent: T.gold,
      tags: ["OCR Technology", "Multi-language", "Auto-classify"],
      progress: 78,
      progressLabel: "1.2M docs processed",
    },
    {
      id: "verify",
      number: "02",
      title: "Verify & Validate",
      description:
        "Real-time document authentication with AI fraud detection, tamper analysis, and cross-registry lookups via KRA, NTSA, and NLC.",
      icon: Verified,
      accent: T.emerald,
      tags: ["AI Fraud Detection", "Audit Trail", "Registry Cross-check"],
      progress: 94,
      progressLabel: "99.2% accuracy",
    },
    {
      id: "ask",
      number: "03",
      title: "Ask Questions",
      description:
        "Conversational AI search across your entire judicial corpus. Natural language queries with cited, source-grounded answers.",
      icon: Chat,
      accent: T.blue,
      tags: ["Natural Language", "Cited Sources", "Smart Search"],
      progress: 62,
      progressLabel: "500K+ cases indexed",
    },
    {
      id: "predict",
      number: "04",
      title: "Predict Trends",
      description:
        "ML-powered forecasting for case timelines, resource allocation, and emerging legal patterns across all courts.",
      icon: Insights,
      accent: T.purple,
      tags: ["Forecasting", "Analytics", "Resource Planning"],
      progress: 85,
      progressLabel: "4.2mo avg prediction",
    },
  ];

  const stats = [
    {
      label: "Documents Processed",
      value: "1.2M+",
      delta: "+12% this month",
      accent: T.gold,
      icon: FolderOpen,
    },
    {
      label: "Verifications Today",
      value: "3,847",
      delta: "+8% vs yesterday",
      accent: T.emerald,
      icon: CheckCircle,
    },
    {
      label: "Avg Response Time",
      value: "0.8s",
      delta: "↓ 0.2s improvement",
      accent: T.blue,
      icon: Schedule,
    },
    {
      label: "Case Predictions",
      value: "94.1%",
      delta: "Accuracy rate",
      accent: T.purple,
      icon: TrendingUp,
    },
  ];

  const recentActivity = [
    {
      action: "Document digitized",
      detail: "Case #KE-2024-8821 — Land Dispute",
      time: "2 min ago",
      color: T.gold,
    },
    {
      action: "Verification passed",
      detail: "Affidavit — John Mwangi vs. County Govt",
      time: "11 min ago",
      color: T.emerald,
    },
    {
      action: "AI query answered",
      detail: '"Adverse possession precedents 2018-2023"',
      time: "18 min ago",
      color: T.blue,
    },
    {
      action: "Prediction generated",
      detail: "Case #KE-2024-7103 — est. 3.8 months",
      time: "34 min ago",
      color: T.purple,
    },
    {
      action: "Document digitized",
      detail: "Case #KE-2024-9012 — Commercial Dispute",
      time: "1 hr ago",
      color: T.gold,
    },
  ];

  return (
    <Box
      className={`${playfair.variable} ${dmMono.variable}`}
      sx={{
        background: T.navy,
        minHeight: "100vh",
        p: { xs: 2, md: 3 },
        color: T.text,
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          mb: 3,
          p: { xs: 3, md: 5 },
          background: `linear-gradient(135deg, #0a1628 0%, #0d1f10 100%)`,
          border: `1px solid rgba(212,168,67,0.2)`,
        }}
      >
        {/* Glow blobs */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-30%",
              left: "40%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,168,67,0.12), transparent 70%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "-40%",
              right: "5%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)",
            }}
          />
        </Box>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Chip
            label="⚡  AI-Powered Judicial Intelligence"
            sx={{
              background: "rgba(212,168,67,0.12)",
              border: "1px solid rgba(212,168,67,0.3)",
              color: T.gold,
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              mb: 2.5,
              height: 30,
            }}
          />
          <Typography
            sx={{
              fontFamily: "var(--dash-font-display, Georgia, serif)",
              fontSize: { xs: "1.9rem", md: "2.8rem" },
              fontWeight: 900,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              mb: 1.5,
            }}
          >
            Welcome to <em style={{ color: T.gold }}>Sheria</em>
          </Typography>
          <Typography
            sx={{
              color: T.muted,
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: 560,
              mb: 3.5,
            }}
          >
            Streamline Kenya&apos;s judicial workflows — digitize, verify,
            query, and predict — all from one unified intelligence platform.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              onClick={() => router.push("/digitize")}
              endIcon={
                <ArrowForward
                  sx={{
                    transition: "transform 0.2s",
                    ".MuiButton-root:hover &": { transform: "translateX(3px)" },
                  }}
                />
              }
              sx={{
                background: T.gold,
                color: T.navy,
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: "12px",
                px: 3.5,
                py: 1.5,
                textTransform: "none",
                boxShadow: "0 8px 25px rgba(212,168,67,0.3)",
                "&:hover": {
                  background: T.goldLt,
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(212,168,67,0.4)",
                },
                transition: "all 0.25s ease",
              }}
            >
              Get Started
            </Button>
            <Button
              sx={{
                background: "transparent",
                color: "white",
                fontWeight: 600,
                fontSize: "0.95rem",
                borderRadius: "12px",
                px: 3.5,
                py: 1.5,
                border: `1px solid ${T.border}`,
                textTransform: "none",
                "&:hover": {
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              ▷ Watch Demo
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* ── STATS ROW ─────────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Grid item xs={6} md={3} key={i}>
              <Card sx={card({ position: "relative", overflow: "hidden" })}>
                {/* Accent top bar */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: s.accent,
                  }}
                />
                <CardContent sx={{ p: 2.5, pt: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        background: `${s.accent}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon sx={{ color: s.accent, fontSize: 18 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "var(--dash-font-mono, monospace)",
                        fontSize: "0.65rem",
                        color: T.emerald,
                        background: "rgba(16,185,129,0.1)",
                        px: 1,
                        py: 0.3,
                        borderRadius: "6px",
                      }}
                    >
                      {s.delta}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "var(--dash-font-display, Georgia, serif)",
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: "white",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      mb: 0.5,
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      color: T.muted,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {s.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* ── MODULES + ACTIVITY ────────────────────────────────── */}
      <Grid container spacing={2.5}>
        {/* Modules grid */}
        <Grid item xs={12} lg={8}>
          <Typography
            sx={{
              fontFamily: "var(--dash-font-mono, monospace)",
              fontSize: "0.7rem",
              color: T.gold,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              mb: 2,
              "&::before": { content: '"— "', opacity: 0.5 },
            }}
          >
            Core Modules
          </Typography>
          <Grid container spacing={2}>
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Grid item xs={12} sm={6} key={m.id}>
                  <Card
                    sx={{
                      ...card(),
                      cursor: "pointer",
                      height: "100%",
                      "&:hover": {
                        ...card()["&:hover"],
                        borderColor: `${m.accent}40`,
                        transform: "translateY(-4px)",
                        boxShadow: `0 16px 40px ${m.accent}15`,
                        "& .mod-icon": { transform: "scale(1.08)" },
                        "& .mod-arrow": { transform: "translateX(4px)" },
                      },
                    }}
                    onClick={() => router.push(`/${m.id}`)}
                  >
                    <CardContent
                      sx={{
                        p: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Header */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "12px",
                            background: `${m.accent}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon
                            className="mod-icon"
                            sx={{
                              color: m.accent,
                              fontSize: 22,
                              transition: "transform 0.3s",
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontFamily: "var(--dash-font-mono, monospace)",
                              fontSize: "0.6rem",
                              color: T.muted,
                              letterSpacing: "0.1em",
                            }}
                          >
                            {m.number}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily:
                                "var(--dash-font-display, Georgia, serif)",
                              fontSize: "1.05rem",
                              fontWeight: 700,
                              color: "white",
                              lineHeight: 1.2,
                            }}
                          >
                            {m.title}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: T.muted,
                          lineHeight: 1.65,
                          mb: 2,
                          flex: 1,
                        }}
                      >
                        {m.description}
                      </Typography>

                      {/* Progress */}
                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0.75,
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "0.72rem", color: T.muted }}
                          >
                            {m.progressLabel}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.72rem",
                              color: m.accent,
                              fontWeight: 700,
                            }}
                          >
                            {m.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={m.progress}
                          sx={{
                            height: 4,
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.06)",
                            "& .MuiLinearProgress-bar": {
                              background: m.accent,
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>

                      {/* Tags */}
                      <Stack
                        direction="row"
                        spacing={0.75}
                        flexWrap="wrap"
                        sx={{ gap: 0.75, mb: 2.5 }}
                      >
                        {m.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              background: `${m.accent}12`,
                              color: m.accent,
                              border: `1px solid ${m.accent}30`,
                              fontWeight: 600,
                              fontSize: "0.68rem",
                              height: 22,
                              borderRadius: "6px",
                            }}
                          />
                        ))}
                      </Stack>

                      {/* CTA */}
                      <Button
                        fullWidth
                        endIcon={
                          <ArrowForward
                            className="mod-arrow"
                            sx={{
                              fontSize: "16px !important",
                              transition: "transform 0.25s",
                            }}
                          />
                        }
                        sx={{
                          background: `${m.accent}10`,
                          color: m.accent,
                          border: `1px solid ${m.accent}25`,
                          borderRadius: "10px",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          textTransform: "none",
                          py: 1,
                          "&:hover": {
                            background: `${m.accent}20`,
                            borderColor: `${m.accent}50`,
                          },
                        }}
                      >
                        Open {m.title}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        {/* Activity feed */}
        <Grid item xs={12} lg={4}>
          <Typography
            sx={{
              fontFamily: "var(--dash-font-mono, monospace)",
              fontSize: "0.7rem",
              color: T.gold,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              mb: 2,
              "&::before": { content: '"— "', opacity: 0.5 },
            }}
          >
            Recent Activity
          </Typography>
          <Card sx={card({ height: "calc(100% - 32px)" })}>
            <CardContent sx={{ p: 0 }}>
              {recentActivity.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    p: 2.5,
                    borderBottom:
                      i < recentActivity.length - 1
                        ? `1px solid ${T.border}`
                        : "none",
                    transition: "background 0.2s",
                    "&:hover": { background: T.navy3 },
                  }}
                >
                  {/* Color dot */}
                  <Box sx={{ position: "relative", mt: 0.3, flexShrink: 0 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: item.color,
                        boxShadow: `0 0 8px ${item.color}80`,
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        color: "white",
                        fontWeight: 600,
                        mb: 0.25,
                      }}
                    >
                      {item.action}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: T.muted,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.detail}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "var(--dash-font-mono, monospace)",
                      fontSize: "0.65rem",
                      color: T.muted,
                      flexShrink: 0,
                      mt: 0.2,
                    }}
                  >
                    {item.time}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Quick stats mini-card */}
          <Card sx={{ ...card(), mt: 2 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography
                sx={{
                  fontFamily: "var(--dash-font-mono, monospace)",
                  fontSize: "0.65rem",
                  color: T.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 2,
                }}
              >
                System Health
              </Typography>
              {[
                { label: "OCR Engine", pct: 99, color: T.gold },
                { label: "Verification API", pct: 100, color: T.emerald },
                { label: "AI Query Layer", pct: 97, color: T.blue },
                { label: "Prediction Model", pct: 92, color: T.purple },
              ].map((sys) => (
                <Box key={sys.label} sx={{ mb: 1.75 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.6,
                    }}
                  >
                    <Typography sx={{ fontSize: "0.78rem", color: T.muted }}>
                      {sys.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: sys.color,
                        fontWeight: 700,
                        fontFamily: "var(--dash-font-mono, monospace)",
                      }}
                    >
                      {sys.pct}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={sys.pct}
                    sx={{
                      height: 3,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      "& .MuiLinearProgress-bar": {
                        background: sys.color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <Box
        sx={{
          mt: 3,
          borderRadius: "20px",
          p: { xs: 3, md: 4 },
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #0d1a0a 0%, #0a1420 50%, #0d1424 100%)",
          border: `1px solid rgba(212,168,67,0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <Box
            sx={{
              position: "absolute",
              top: "-50%",
              right: "-5%",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,168,67,0.1), transparent 70%)",
            }}
          />
        </Box>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            sx={{
              fontFamily: "var(--dash-font-display, Georgia, serif)",
              fontSize: { xs: "1.4rem", md: "1.9rem" },
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
              mb: 0.75,
            }}
          >
            Ready to upload your first document?
          </Typography>
          <Typography sx={{ color: T.muted, fontSize: "0.95rem" }}>
            Start digitizing court files and unlock the full power of
            Sheria&apos;s intelligence platform.
          </Typography>
        </Box>
        <Button
          onClick={() => router.push("/digitize")}
          endIcon={<ArrowForward />}
          sx={{
            position: "relative",
            zIndex: 1,
            background: T.gold,
            color: T.navy,
            fontWeight: 700,
            fontSize: "0.95rem",
            borderRadius: "12px",
            px: 4,
            py: 1.6,
            textTransform: "none",
            flexShrink: 0,
            boxShadow: "0 8px 25px rgba(212,168,67,0.25)",
            "&:hover": {
              background: T.goldLt,
              transform: "translateY(-2px)",
              boxShadow: "0 12px 30px rgba(212,168,67,0.4)",
            },
            transition: "all 0.25s ease",
          }}
        >
          Upload Document
        </Button>
      </Box>
    </Box>
  );
}
