import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { Language, Chat, Psychology, Speed } from '@mui/icons-material';
import PageHeader from '@/src/components/common/PageHeader';
import StatCard from '@/src/components/common/StatCard';
import { SUPPORTED_LANGUAGES } from '@/src/lib/constants';
import QuickQueries from './QuickQueries';
import AskPageClient from './AskPageClient';

async function getStats() {
  try {
    const response = await fetch(
      'https://sheria-backend.greyteam.co.ke/rag/stats',
      {
        headers: {
          'accept': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      queriestoday: '0',
      languages: '3',
      avgResponseTime: '0',
      accuracy: '0',
    };
  }
}

export default async function AskPage() {
  const statsData = await getStats();

  const stats = [
    {
      title: 'Queries Today',
      value: statsData.queriestoday || '--',
      icon: Chat,
      color: 'primary' as const,
    },
    {
      title: 'Languages',
      value: statsData.languages || '--',
      icon: Language,
      color: 'secondary' as const,
    },
    {
      title: 'Avg Response Time',
      value: statsData.avgResponseTime || '--',
      icon: Speed,
      color: 'info' as const,
    },
    {
      title: 'Accuracy',
      value: statsData.accuracy || '--',
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
        <Grid item xs={12} md={3}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Settings
              </Typography>
              <AskPageClient 
                supportedLanguages={SUPPORTED_LANGUAGES}
                settingsOnly
              />
            </CardContent>
          </Card>

          <QuickQueries />
        </Grid>

        <Grid item xs={12} md={9}>
          <Box sx={{ height: 700 }}>
            <AskPageClient supportedLanguages={SUPPORTED_LANGUAGES} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}