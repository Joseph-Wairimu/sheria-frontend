
'use client';

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  alpha,
  Stack,
  Paper,
} from '@mui/material';
import { Search, Shield } from '@mui/icons-material';
import { useState } from 'react';
import { DOCUMENT_TYPES } from '@/src/lib/constants';

interface VerificationFormProps {
  onVerify: (documentId: string, documentType: string) => void;
  loading: boolean;
}

export default function VerificationForm({ onVerify, loading }: VerificationFormProps) {
  const [documentId, setDocumentId] = useState('');
  const [documentType, setDocumentType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(documentId, documentType);
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: alpha('#10b981', 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
            }}
          >
            <Shield sx={{ fontSize: 32, color: '#10b981' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            Verify Document
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            Fast & secure verification in seconds
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Document ID or Number"
              placeholder="e.g., 12345678"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: alpha('#f8fafc', 0.8),
                },
              }}
            />
            <TextField
              select
              fullWidth
              label="Document Type"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: alpha('#f8fafc', 0.8),
                },
              }}
            >
              <MenuItem value="">All Types (Auto-detect)</MenuItem>
              {DOCUMENT_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Search />}
              disabled={!documentId || loading}
              sx={{
                py: 1.5,
                borderRadius: 2.5,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 24px ${alpha('#10b981', 0.3)}`,
                },
                '&:disabled': {
                  background: alpha('#cbd5e1', 0.3),
                },
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? 'Verifying...' : 'Verify Now'}
            </Button>
          </Stack>
        </Box>

        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: 2,
            bgcolor: alpha('#06b6d4', 0.05),
            borderRadius: 2,
            border: '1px solid',
            borderColor: alpha('#06b6d4', 0.2),
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#0891b2', display: 'block', mb: 0.5 }}>
            ⚡ Lightning Fast
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            Average verification time: <strong>0.8 seconds</strong>
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
}
