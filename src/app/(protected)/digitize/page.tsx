
'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  alpha,
  Chip,
} from '@mui/material';
import { PlayArrow, Bolt } from '@mui/icons-material';
import PageHeader from '@/src/components/common/PageHeader';
import StatCard from '@/src/components/common/StatCard';
import EmptyState from '@/src/components/common/EmptyState';

import {
  Scanner,
  Language,
  Speed,
  Description,
} from '@mui/icons-material';
import LoadingSpinner from '@/src/components/common/LoadingSpinner';
import ProcessingResults from './ProcessingResults';
import FileUpload from './FileUpload';

export default function DigitizePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleProcess = async () => {
    setProcessing(true);
    setTimeout(() => {
      setResults(
        files.map((file) => ({
          name: file.name,
          status: 'completed',
          text: 'Sample extracted text from document...',
          metadata: {
            documentType: 'National ID',
            language: 'English',
            confidence: 0.95,
            entities: ['John Doe', 'ID: 12345678', 'Kenya', 'Nairobi'],
          },
        }))
      );
      setProcessing(false);
    }, 2000);
  };

  const stats = [
    { title: 'OCR Accuracy', value: '98.5%', icon: Speed, color: '#8b5cf6' },
    { title: 'Languages Supported', value: '3', icon: Language, color: '#10b981' },
    { title: 'Avg Processing Time', value: '3.2s', icon: Speed, color: '#f59e0b' },
    { title: 'Documents Today', value: '1,247', icon: Description, color: '#2563eb' },
  ];

  return (
    <Box>
      <PageHeader
        title="Digitize Documents"
        description="Transform paper documents into digital assets with AI-powered OCR"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Digitize' }]}
        action={
          <Chip
            icon={<Bolt />}
            label="AI Powered"
            sx={{
              bgcolor: alpha('#8b5cf6', 0.1),
              color: '#8b5cf6',
              fontWeight: 700,
              px: 1,
            }}
          />
        }
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <FileUpload onFilesSelected={setFiles} />
              {files.length > 0 && (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={handleProcess}
                  disabled={processing}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${alpha('#8b5cf6', 0.3)}`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {processing ? 'Processing Documents...' : 'Start Processing'}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {processing ? (
                <LoadingSpinner message="Analyzing your documents with AI..." />
              ) : results.length === 0 ? (
                <EmptyState
                  icon={Scanner}
                  title="Ready to digitize"
                  description="Upload documents to see AI-powered extraction results with metadata and entities"
                />
              ) : (
                <Box sx={{ maxHeight: 600, overflow: 'auto', pr: 1 }}>
                  <ProcessingResults results={results} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}