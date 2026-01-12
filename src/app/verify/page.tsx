
'use client';

import { useState } from 'react';
import { Box, Grid, Chip, alpha } from '@mui/material';
import { Shield, TrendingUp, Schedule, CheckCircle, Bolt } from '@mui/icons-material';
import PageHeader from '@/src/components/common/PageHeader';
import StatCard from '@/src/components/common/StatCard';
import EmptyState from '@/src/components/common/EmptyState';

import { VerificationResult } from '@/src/types';
import VerificationForm from './VerificationForm';
import VerificationResults from './VerificationResults';

export default function VerifyPage() {
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async (documentId: string, documentType: string) => {
    setVerifying(true);
    setTimeout(() => {
      setResult({
        id: '1',
        documentId,
        status: 'verified',
        confidence: 0.96,
        timestamp: new Date(),
        blockchainHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4',
        checks: [
          { name: 'Government Database Validation', status: 'passed', time: '0.3s' },
          { name: 'ML Fraud Detection Analysis', status: 'passed', time: '0.5s' },
          { name: 'Document Integrity Check', status: 'passed', time: '0.2s' },
          { name: 'Historical Records Verification', status: 'passed', time: '0.4s' },
        ],
        metadata: {
          issuer: 'Kenya National ID Authority',
          issueDate: '2020-03-15',
          expiryDate: '2030-03-15',
          holderName: 'John Doe',
          documentStatus: 'Valid',
        },
      });
      setVerifying(false);
    }, 1500);
  };

  const stats = [
    {
      title: 'Verifications Today',
      value: '3,847',
      icon: TrendingUp,
      color: '#10b981',
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Avg Response Time',
      value: '0.8s',
      icon: Schedule,
      color: '#06b6d4',
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      icon: CheckCircle,
      color: '#2563eb',
      trend: { value: 2, isPositive: true },
    },
    {
      title: 'Fraud Detected',
      value: '23',
      icon: Shield,
      color: '#f59e0b',
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Verify Documents"
        description="Lightning-fast verification with blockchain-certified security"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Verify' }]}
        action={
          <Chip
            icon={<Bolt />}
            label="Sub-60s Processing"
            sx={{
              bgcolor: alpha('#10b981', 0.1),
              color: '#10b981',
              fontWeight: 700,
              px: 1,
            }}
          />
        }
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <VerificationForm onVerify={handleVerify} loading={verifying} />
        </Grid>

        <Grid item xs={12} lg={8}>
          {result ? (
            <VerificationResults result={result} />
          ) : (
            <EmptyState
              icon={Shield}
              title="Ready to Verify"
              description="Enter a document ID to perform instant security validation with blockchain certification"
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}