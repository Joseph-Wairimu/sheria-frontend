
'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material';
import { Language, Chat, Psychology, Speed } from '@mui/icons-material';
import PageHeader from '@/src/components/common/PageHeader';
import StatCard from '@/src/components/common/StatCard';

import { SUPPORTED_LANGUAGES } from '@/src/lib/constants';
import QuickQueries from './QuickQueries';
import ChatInterface from './ChatInterface';

export default function AskPage() {
  const [language, setLanguage] = useState('en');

  const stats = [
    {
      title: 'Queries Today',
      value: '2,847',
      icon: Chat,
      color: 'primary' as const,
    },
    {
      title: 'Languages',
      value: '3',
      icon: Language,
      color: 'secondary' as const,
    },
    {
      title: 'Avg Response Time',
      value: '0.4s',
      icon: Speed,
      color: 'info' as const,
    },
    {
      title: 'Accuracy',
      value: '96.5%',
      icon: Psychology,
      color: 'success' as const,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Sheria Ask"
        description="Conversational AI agent for data access and insights"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Ask' },
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
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Settings
              </Typography>
              <TextField
                select
                fullWidth
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.label}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
          </Card>

          <QuickQueries onQuerySelect={() => {}} />
        </Grid>

        {/* Chat Interface */}
        <Grid item xs={12} md={9}>
          <Box sx={{ height: 700 }}>
            <ChatInterface />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}