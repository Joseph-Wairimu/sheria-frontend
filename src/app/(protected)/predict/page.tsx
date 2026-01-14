// pages/predict/page.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { Box, Grid } from '@mui/material';
import PageHeader from '@/src/components/common/PageHeader';
import StatCard from '@/src/components/common/StatCard';
import ModelBuilder from './components/ModelBuilder';
import PredictionChart from './components/PredictionChart';
import RiskDistribution from './components/RiskDistribution';
import ResourceUtilization from './components/ResourceUtilization';
import TrendAnalysis from './components/TrendAnalysis';
import KeyInsights from './components/KeyInsights';
import EmptyState from '@/src/components/common/EmptyState';
import { Timeline, WarningAmber, CheckCircle, Psychology } from '@mui/icons-material';

interface ModelState {
  domain: string;
  accuracy: number;
  lastTrained: Date;
}

const caseTimelineData = [
  { month: 'Jan', actual: 45, predicted: 48 },
  { month: 'Feb', actual: 52, predicted: 50 },
  { month: 'Mar', actual: 58, predicted: 61 },
  { month: 'Apr', actual: 68, predicted: 70 },
  { month: 'May', actual: 75, predicted: 78 },
  { month: 'Jun', actual: 82, predicted: 85 },
];

const resourceUtilization = [
  { court: 'Court A', utilization: 85, capacity: 100 },
  { court: 'Court B', utilization: 62, capacity: 100 },
  { court: 'Court C', utilization: 78, capacity: 100 },
  { court: 'Court D', utilization: 45, capacity: 100 },
  { court: 'Court E', utilization: 92, capacity: 100 },
];

const riskMetrics = [
  { name: 'Stalling Risk', value: 24 },
  { name: 'Dismissal Risk', value: 15 },
  { name: 'Delay Risk', value: 31 },
  { name: 'Low Risk', value: 30 },
];

const caseInsights: Array<{
  case: string;
  type: string;
  risk: 'High' | 'Medium' | 'Low';
  status: string;
}> = [
  { case: 'Land Fraud - Zone A', type: 'hotspot', risk: 'High', status: 'Critical' },
  { case: 'Commercial Default - Q2', type: 'trend', risk: 'Medium', status: 'Rising' },
  { case: 'Contract Disputes', type: 'emerging', risk: 'Medium', status: 'Monitoring' },
  { case: 'Property Rights Cases', type: 'trend', risk: 'Low', status: 'Stable' },
];

const insightsList = [
  '94% confidence in 6-month case duration forecasts across all complexity levels',
  'Court E is at 92% capacity - recommend load redistribution to Court B',
  'Land fraud cases in Zone A show 40% higher stalling risk - proactive intervention recommended',
  'Commercial default disputes trending upward Q2 - prepare resources for projected 25% increase',
];

export default function PredictPage() {
  const [isPending, startTransition] = useTransition();
  const [model, setModel] = useState<ModelState | null>(null);

  const handleTrain = (domain: string) => {
    startTransition(async () => {
      // Simulate async training with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setModel({
        domain,
        accuracy: 0.94,
        lastTrained: new Date(),
      });
    });
  };

  const stats = [
    {
      title: 'Forecasted Cases',
      value: '1,247',
      icon: Timeline,
      color: 'primary' as const,
    },
    {
      title: 'High-Risk Cases',
      value: '156',
      icon: WarningAmber,
      color: 'error' as const,
    },
    {
      title: 'Model Accuracy',
      value: '94%',
      icon: CheckCircle,
      color: 'success' as const,
    },
    {
      title: 'Active Models',
      value: '8',
      icon: Psychology,
      color: 'info' as const,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Sheria Predict"
        description="Analytics & Forecasting for Judicial Efficiency"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Predict' },
        ]}
      />

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Model Configuration */}
        <Grid item xs={12} md={4}>
          <ModelBuilder onTrain={handleTrain} loading={isPending} />
        </Grid>

        {/* Results Area */}
        <Grid item xs={12} md={8}>
          {!model ? (
            <EmptyState
              icon={Psychology}
              title="Configure and train a model"
              description="Select a domain and upload training data to generate predictions"
            />
          ) : (
            <Grid container spacing={3}>
              {/* Case Timeline */}
              <Grid item xs={12}>
                <PredictionChart data={caseTimelineData} />
              </Grid>

              {/* Risk & Resource */}
              <Grid item xs={12} md={6}>
                <RiskDistribution data={riskMetrics} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ResourceUtilization data={resourceUtilization} />
              </Grid>

              {/* Trends */}
              <Grid item xs={12}>
                <TrendAnalysis data={caseInsights} />
              </Grid>

              {/* Insights */}
              <Grid item xs={12}>
                <KeyInsights insights={insightsList} accuracy={model.accuracy} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}