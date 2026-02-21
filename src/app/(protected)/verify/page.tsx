"use client";

import { useState } from "react";
import { Box, Grid, Chip, Typography } from "@mui/material";
import {
  Shield,
  TrendingUp,
  Schedule,
  CheckCircle,
  Bolt,
} from "@mui/icons-material";
import PageHeader from "@/src/components/common/PageHeader";
import StatCard from "@/src/components/common/StatCard";
import { VerificationResult } from "@/src/types";
import VerificationForm from "./VerificationForm";
import VerificationResults from "./VerificationResults";

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
};

export default function VerifyPage() {
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async (documentId: string, documentType: string) => {
    setVerifying(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        id: "1",
        documentId,
        status: "verified",
        confidence: 0.96,
        timestamp: new Date(),
        blockchainHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4",
        checks: [
          {
            name: "Government Database Validation",
            status: "passed",
            time: "0.3s",
          },
          {
            name: "AI Fraud Detection Analysis",
            status: "passed",
            time: "0.5s",
          },
          { name: "Document Integrity Check", status: "passed", time: "0.2s" },
          { name: "Registry Cross-Reference", status: "passed", time: "0.4s" },
        ],
        metadata: {
          issuer: "Kenya National ID Authority",
          issueDate: "2020-03-15",
          expiryDate: "2030-03-15",
          holderName: "John Doe",
          documentStatus: "Valid",
        },
      });
      setVerifying(false);
    }, 1500);
  };

  const stats = [
    {
      title: "Verifications Today",
      value: "3,847",
      icon: TrendingUp,
      color: T.emerald,
    },
    {
      title: "Avg Response Time",
      value: "0.8s",
      icon: Schedule,
      color: T.blue,
    },
    { title: "Success Rate", value: "99.2%", icon: CheckCircle, color: T.gold },
    { title: "Fraud Detected", value: "23", icon: Shield, color: T.amber },
  ];

  return (
    <Box sx={{ color: T.text }}>
      <PageHeader
        title="Verify Documents"
        description="AI-powered verification with real-time registry cross-checks and full audit trail"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Verify" }]}
        action={
          <Chip
            icon={
              <Bolt
                sx={{
                  fontSize: "14px !important",
                  color: `${T.emerald} !important`,
                }}
              />
            }
            label="Sub-60s Processing"
            size="small"
            sx={{
              background: `${T.emerald}12`,
              color: T.emerald,
              border: `1px solid ${T.emerald}28`,
              fontWeight: 700,
              fontSize: "0.72rem",
            }}
          />
        }
      />

      {/* Stats row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={6} md={3} key={stat.title}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Main layout */}
      <Grid container spacing={2.5}>
        {/* Form panel */}
        <Grid item xs={12} lg={4}>
          <VerificationForm onVerify={handleVerify} loading={verifying} />
        </Grid>

        {/* Results / empty panel */}
        <Grid item xs={12} lg={8}>
          {verifying ? (
            /* Loading state */
            <Box
              sx={{
                background: T.navy2,
                border: `1px solid ${T.border}`,
                borderRadius: "16px",
                py: 8,
                textAlign: "center",
              }}
            >
              {/* Animated rings */}
              <Box
                sx={{
                  position: "relative",
                  width: 72,
                  height: 72,
                  mx: "auto",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: `3px solid ${T.border}`,
                    borderTopColor: T.emerald,
                    animation: "spin 1s linear infinite",
                    "@keyframes spin": { to: { transform: "rotate(360deg)" } },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 8,
                    borderRadius: "50%",
                    background: `${T.emerald}10`,
                    border: `1px solid ${T.emerald}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Shield sx={{ fontSize: 22, color: T.emerald }} />
                </Box>
              </Box>
              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "white",
                  mb: 0.75,
                }}
              >
                Running Security Checks
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: T.muted, mb: 3 }}>
                Cross-referencing with KRA, NTSA, and NLC registries…
              </Typography>

              {/* Animated check list */}
              <Box
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  gap: 1,
                  textAlign: "left",
                }}
              >
                {[
                  "Government Database Validation",
                  "AI Fraud Detection Analysis",
                  "Document Integrity Check",
                  "Registry Cross-Reference",
                ].map((check, i) => (
                  <Box
                    key={i}
                    sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `2px solid ${T.border}`,
                        borderTopColor: T.emerald,
                        animation: `spin 0.8s linear infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                    <Typography sx={{ fontSize: "0.8rem", color: T.muted }}>
                      {check}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : result ? (
            <VerificationResults result={result} />
          ) : (
            <Box
              sx={{
                background: T.navy2,
                border: `1px solid ${T.border}`,
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(16,185,129,0.06), transparent)",
                }}
              />

              <Box
                sx={{
                  height: 3,
                  background: `linear-gradient(90deg, ${T.emerald}, ${T.gold}, ${T.blue})`,
                  opacity: 0.4,
                }}
              />

              <Box
                sx={{ py: 8, px: 4, textAlign: "center", position: "relative" }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "20px",
                    mx: "auto",
                    mb: 3,
                    background: `${T.emerald}10`,
                    border: `1px solid ${T.emerald}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 12px 30px ${T.emerald}10`,
                  }}
                >
                  <Shield sx={{ fontSize: 32, color: T.emerald }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "white",
                    mb: 1,
                  }}
                >
                  Ready to Verify
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: T.muted,
                    maxWidth: 380,
                    mx: "auto",
                    lineHeight: 1.7,
                    mb: 4,
                  }}
                >
                  Enter a document ID to perform instant AI security validation
                  with registry cross-checks and a full audit trail.
                </Typography>

                {/* Feature pills */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { label: "KRA Lookup", color: T.gold },
                    { label: "NTSA Registry", color: T.emerald },
                    { label: "NLC Cross-check", color: T.blue },
                    { label: "AI Fraud Scan", color: "#c084fc" },
                  ].map((pill) => (
                    <Chip
                      key={pill.label}
                      label={pill.label}
                      size="small"
                      sx={{
                        background: `${pill.color}10`,
                        color: pill.color,
                        border: `1px solid ${pill.color}28`,
                        fontWeight: 600,
                        fontSize: "0.72rem",
                        height: 24,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
