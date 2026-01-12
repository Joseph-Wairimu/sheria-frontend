
'use client';

import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import {
  Psychology,
  QueryStats,
  Speed,
  DataUsage,
} from '@mui/icons-material';
import PageHeader from '@/src/components/common/PageHeader';
import StatCard from '@/src/components/common/StatCard';
import EmptyState from '@/src/components/common/EmptyState';
import PredictionChart from './PredictionChart';
import ModelBuilder from './ModelBuilder';
import InsightsDashboard from './InsightsDashboard';


export default function PredictPage() {
  const [training, setTraining] = useState(false);
  const [model, setModel] = useState<any>(null);

  const mockData = [
    { month: 'Jan', value: 65, predicted: 68 },
    { month: 'Feb', value: 70, predicted: 72 },
    { month: 'Mar', value: 75, predicted: 77 },
    { month: 'Apr', value: 80, predicted: 82 },
    { month: 'May', value: 85, predicted: 87 },
    { month: 'Jun', value: 90, predicted: 92 },
  ];

  const handleTrain = (domain: string) => {
    setTraining(true);
    setTimeout(() => {
      setModel({
        domain,
        accuracy: 0.94,
        lastTrained: new Date(),
        predictions: mockData,
        insights: [
          'Upward trend detected across all metrics',
          '94% confidence in 6-month forecast',
          'Resource allocation recommendations available',
          'Seasonal patterns identified for optimization',
        ],
      });
      setTraining(false);
    }, 2000);
  };

  const stats = [
    {
      title: 'Active Models',
      value: '12',
      icon: Psychology,
      color: 'primary' as const,
    },
    {
      title: 'Predictions Made',
      value: '8.3K',
      icon: QueryStats,
      color: 'secondary' as const,
    },
    {
      title: 'Avg Accuracy',
      value: '92.7%',
      icon: Speed,
      color: 'success' as const,
    },
    {
      title: 'Data Sources',
      value: '24',
      icon: DataUsage,
      color: 'info' as const,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Sheria Predict"
        description="Domain-driven predictive analytics and insights"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Predict' },
        ]}
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
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
        {/* Model Builder Sidebar */}
        <Grid item xs={12} md={4}>
          <ModelBuilder onTrain={handleTrain} loading={training} />
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
              <Grid item xs={12}>
                <PredictionChart data={model.predictions} />
              </Grid>
              <Grid item xs={12}>
                <InsightsDashboard
                  accuracy={model.accuracy}
                  insights={model.insights}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}