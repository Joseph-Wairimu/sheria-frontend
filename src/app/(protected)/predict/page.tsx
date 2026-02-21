"use client";

import React, { useState, useTransition } from "react";
import { Box, Grid, Chip, Typography } from "@mui/material";
import {
  Timeline,
  WarningAmber,
  CheckCircle,
  Psychology,
  Bolt,
} from "@mui/icons-material";
import PageHeader from "@/src/components/common/PageHeader";
import StatCard from "@/src/components/common/StatCard";
import ModelBuilder from "./components/ModelBuilder";
import PredictionChart from "./components/PredictionChart";
import RiskDistribution from "./components/RiskDistribution";
import ResourceUtilization from "./components/ResourceUtilization";
import TrendAnalysis from "./components/TrendAnalysis";
import KeyInsights from "./components/KeyInsights";

const T = {
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  purple: "#c084fc",
  emerald: "#10b981",
  amber: "#f59e0b",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

interface ModelState {
  domain: string;
  accuracy: number;
  lastTrained: Date;
}

const caseTimelineData = [
  { month: "Jan", actual: 45, predicted: 48 },
  { month: "Feb", actual: 52, predicted: 50 },
  { month: "Mar", actual: 58, predicted: 61 },
  { month: "Apr", actual: 68, predicted: 70 },
  { month: "May", actual: 75, predicted: 78 },
  { month: "Jun", actual: 82, predicted: 85 },
];

const resourceUtilization = [
  { court: "Court A", utilization: 85, capacity: 100 },
  { court: "Court B", utilization: 62, capacity: 100 },
  { court: "Court C", utilization: 78, capacity: 100 },
  { court: "Court D", utilization: 45, capacity: 100 },
  { court: "Court E", utilization: 92, capacity: 100 },
];

const riskMetrics = [
  { name: "Stalling Risk", value: 24 },
  { name: "Dismissal Risk", value: 15 },
  { name: "Delay Risk", value: 31 },
  { name: "Low Risk", value: 30 },
];

const caseInsights: Array<{
  case: string;
  type: string;
  risk: "High" | "Medium" | "Low";
  status: string;
}> = [
  {
    case: "Land Fraud - Zone A",
    type: "hotspot",
    risk: "High",
    status: "Critical",
  },
  {
    case: "Commercial Default - Q2",
    type: "trend",
    risk: "Medium",
    status: "Rising",
  },
  {
    case: "Contract Disputes",
    type: "emerging",
    risk: "Medium",
    status: "Monitoring",
  },
  {
    case: "Property Rights Cases",
    type: "trend",
    risk: "Low",
    status: "Stable",
  },
];

const insightsList = [
  "94% confidence in 6-month case duration forecasts across all complexity levels",
  "Court E is at 92% capacity — recommend load redistribution to Court B",
  "Land fraud cases in Zone A show 40% higher stalling risk — proactive intervention recommended",
  "Commercial default disputes trending upward Q2 — prepare resources for projected 25% increase",
];

export default function PredictPage() {
  const [isPending, startTransition] = useTransition();
  const [model, setModel] = useState<ModelState | null>(null);

  const handleTrain = (domain: string) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setModel({ domain, accuracy: 0.94, lastTrained: new Date() });
    });
  };

  const stats = [
    {
      title: "Forecasted Cases",
      value: "1,247",
      icon: Timeline,
      color: T.purple,
    },
    {
      title: "High-Risk Cases",
      value: "156",
      icon: WarningAmber,
      color: T.amber,
    },
    {
      title: "Model Accuracy",
      value: "94%",
      icon: CheckCircle,
      color: T.emerald,
    },
    { title: "Active Models", value: "8", icon: Psychology, color: T.gold },
  ];

  return (
    <Box sx={{ color: T.text }}>
      <PageHeader
        title="Sheria Predict"
        description="ML-powered analytics and forecasting for judicial efficiency"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Predict" }]}
        action={
          <Chip
            icon={
              <Bolt
                sx={{
                  fontSize: "14px !important",
                  color: `${T.purple} !important`,
                }}
              />
            }
            label="ML Powered"
            size="small"
            sx={{
              background: `${T.purple}12`,
              color: T.purple,
              border: `1px solid ${T.purple}28`,
              fontWeight: 700,
              fontSize: "0.72rem",
            }}
          />
        }
      />

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

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <ModelBuilder onTrain={handleTrain} loading={isPending} />
        </Grid>

        <Grid item xs={12} md={8}>
          {!model ? (
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
                  height: 3,
                  background: `linear-gradient(90deg, ${T.purple}, ${T.gold}, ${T.emerald})`,
                  opacity: 0.5,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(192,132,252,0.07), transparent)",
                }}
              />

              <Box
                sx={{
                  py: 10,
                  px: 4,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "20px",
                    mx: "auto",
                    mb: 3,
                    background: `${T.purple}12`,
                    border: `1px solid ${T.purple}28`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 12px 30px ${T.purple}12`,
                  }}
                >
                  <Psychology sx={{ fontSize: 34, color: T.purple }} />
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
                  Configure Your Model
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
                  Select a prediction domain and upload training data to
                  generate AI-powered forecasts and judicial insights.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { label: "Case Timelines", color: T.gold },
                    { label: "Risk Analysis", color: T.amber },
                    { label: "Resource Planning", color: T.emerald },
                    { label: "Trend Detection", color: T.purple },
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
          ) : isPending ? (
            <Box
              sx={{
                background: T.navy2,
                border: `1px solid ${T.border}`,
                borderRadius: "16px",
                py: 10,
                textAlign: "center",
              }}
            >
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
                    borderTopColor: T.purple,
                    animation: "spin 1s linear infinite",
                    "@keyframes spin": { to: { transform: "rotate(360deg)" } },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 8,
                    borderRadius: "50%",
                    background: `${T.purple}10`,
                    border: `1px solid ${T.purple}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Psychology sx={{ fontSize: 22, color: T.purple }} />
                </Box>
              </Box>
              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "white",
                  mb: 0.75,
                }}
              >
                Training Model…
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: T.muted }}>
                Analysing patterns across historical judicial data
              </Typography>
            </Box>
          ) : (
            /* Results */
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <PredictionChart data={caseTimelineData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <RiskDistribution data={riskMetrics} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ResourceUtilization data={resourceUtilization} />
              </Grid>
              <Grid item xs={12}>
                <TrendAnalysis data={caseInsights} />
              </Grid>
              <Grid item xs={12}>
                <KeyInsights
                  insights={insightsList}
                  accuracy={model.accuracy}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
