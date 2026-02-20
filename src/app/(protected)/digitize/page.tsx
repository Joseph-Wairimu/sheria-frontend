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
  Alert,
} from '@mui/material';
import { PlayArrow, Bolt, Refresh } from '@mui/icons-material';
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

interface UploadedFile {
  fileId: string;
  fileName: string;
  s3Key: string;
}

interface ProcessingResult {
  name: string;
  status: 'completed' | 'failed' | 'processing';
  fileId: string;
  text?: string;
  metadata?: {
    documentType: string;
    language: string;
    confidence: number;
    entities: string[];
  };
}

export default function DigitizePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ProcessingResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = (uploadedData: UploadedFile[]) => {
    setUploadedFiles(uploadedData);
    setError(null);
    console.log('Files uploaded successfully:', uploadedData);
  };

  const handleProcess = async () => {
    if (uploadedFiles.length === 0) {
      setError('Please upload files first');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/process/documents`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            files: uploadedFiles.map((f) => ({
              file_id: f.fileId,
              s3_key: f.s3Key,
              filename: f.fileName,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Processing failed: ${response.statusText}`);
      }

      const data = await response.json();

      const processedResults: ProcessingResult[] = data.results.map(
        (result: any) => ({
          name: result.filename || result.name,
          status: result.status || 'completed',
          fileId: result.file_id,
          text: result.text || result.extracted_text,
          metadata: result.metadata || {
            documentType: result.document_type || 'Document',
            language: result.language || 'English',
            confidence: result.confidence || 0.95,
            entities: result.entities || [],
          },
        })
      );

      setResults(processedResults);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Processing failed';
      setError(errorMessage);
      console.error('Processing error:', err);
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setUploadedFiles([]);
    setResults([]);
    setError(null);
  };

  const stats = [
    { title: 'OCR Accuracy', value: '98.5%', icon: Speed, color: '#8b5cf6' },
    { title: 'Languages Supported', value: '3', icon: Language, color: '#10b981' },
    { title: 'Avg Processing Time', value: '3.2s', icon: Speed, color: '#f59e0b' },
    { title: 'Documents Today', value: '1,247', icon: Description, color: '#2563eb' },
  ];

  const canProcess = uploadedFiles.length > 0 && !processing;
  const hasResults = results.length > 0;

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

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

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
              <FileUpload
                onFilesSelected={setFiles}
                onUploadComplete={handleUploadComplete}
                maxFiles={10}
              />

              {uploadedFiles.length > 0 && (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<PlayArrow />}
                    onClick={handleProcess}
                    disabled={!canProcess}
                    sx={{
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
                      '&:disabled': {
                        background: 'linear-gradient(135deg, #d4d4d8 0%, #a1a1a1 100%)',
                      },
                    }}
                  >
                    {processing ? 'Processing Documents...' : 'Start Processing'}
                  </Button>

                  {hasResults && (
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Refresh />}
                      onClick={handleReset}
                      disabled={processing}
                      sx={{
                        borderRadius: 2.5,
                        fontWeight: 700,
                      }}
                    >
                      New Upload
                    </Button>
                  )}
                </Box>
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
                  description="Upload documents and click 'Start Processing' to see AI-powered extraction results with metadata and entities"
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