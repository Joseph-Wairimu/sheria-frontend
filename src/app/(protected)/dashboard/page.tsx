
'use client';

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  alpha,
  Stack,
  Chip,
} from '@mui/material';
import {
  Scanner,
  Verified,
  Chat,
  Insights,
  Description,
  CheckCircle,
  People,
  Speed,
  ArrowForward,
  Bolt,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import StatCard from '@/src/components/common/StatCard';
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export default function HomePage() {
  const router = useRouter();

  const modules = [
    {
      id: 'digitize',
      title: 'Digitize Documents',
      description: 'Transform paper documents into digital assets with advanced OCR and AI-powered metadata extraction',
      icon: Scanner,
      color: '#8b5cf6',
      features: ['OCR Technology', 'Multi-language', 'Auto-classify', 'Entity Recognition'],
    },
    {
      id: 'verify',
      title: 'Verify & Validate',
      description: 'Real-time document verification with blockchain audit trails and fraud detection',
      icon: Verified,
      color: '#10b981',
      features: ['Real-time Check', 'Fraud Detection', 'Blockchain Trail', 'Sub-60s Speed'],
    },
    {
      id: 'ask',
      title: 'Ask Questions',
      description: 'Get instant answers from your data with our conversational AI assistant',
      icon: Chat,
      color: '#f59e0b',
      features: ['Natural Language', '3 Languages', 'Cited Sources', 'Smart Insights'],
    },
    {
      id: 'predict',
      title: 'Predict Trends',
      description: 'Forecast outcomes and optimize resources with no-code predictive analytics',
      icon: Insights,
      color: '#ec4899',
      features: ['No-code Models', 'Auto-forecast', 'Multi-domain', 'Live Learning'],
    },
  ];

  const stats = [
    { title: 'Documents Processed', value: '1.2M+', icon: Description, color: '#2563eb' },
    { title: 'Verifications Today', value: '3,847', icon: CheckCircle, color: '#10b981' },
    { title: 'Active Users', value: '12,459', icon: People, color: '#f59e0b' },
    { title: 'Avg Response Time', value: '0.8s', icon: Speed, color: '#ec4899' },
  ];
  const accessToken = cookies().get("access_token");
  console.log("accessToken", accessToken);

  if (!accessToken) {
    redirect("/login");
  }
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          mb: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
          <Chip
            icon={<Bolt sx={{ color: 'white !important' }} />}
            label="AI-Powered Platform"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 700,
              mb: 2,
              backdropFilter: 'blur(10px)',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '-0.02em',
            }}
          >
            Welcome to Sheria Platform
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.95,
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            Streamline governance with intelligent document management, verification, and predictive analytics
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => router.push('/digitize')}
              sx={{
                bgcolor: 'white',
                color: '#2563eb',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2.5,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2.5,
                borderWidth: 2,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 2,
                },
              }}
            >
              Watch Demo
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Stats Grid */}
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

      {/* Modules Grid */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}
        >
          Explore Our Features
        </Typography>
        <Grid container spacing={3}>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Grid item xs={12} md={6} key={module.id}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 16px 32px ${alpha(module.color, 0.2)}`,
                      borderColor: alpha(module.color, 0.5),
                      '& .module-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                      '& .arrow-icon': {
                        transform: 'translateX(4px)',
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                      <Box
                        className="module-icon"
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2.5,
                          bgcolor: alpha(module.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <Icon sx={{ color: module.color, fontSize: 30 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}
                        >
                          {module.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1.6 }}
                        >
                          {module.description}
                        </Typography>
                      </Box>
                    </Box>

                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2.5 }}>
                      {module.features.map((feature) => (
                        <Chip
                          key={feature}
                          label={feature}
                          size="small"
                          sx={{
                            bgcolor: alpha(module.color, 0.08),
                            color: module.color,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 24,
                            mb: 1,
                          }}
                        />
                      ))}
                    </Stack>

                    <Button
                      fullWidth
                      variant="outlined"
                      endIcon={<ArrowForward className="arrow-icon" />}
                      onClick={() => router.push(`/${module.id}`)}
                      sx={{
                        borderColor: alpha(module.color, 0.3),
                        color: module.color,
                        fontWeight: 700,
                        borderRadius: 2,
                        py: 1.2,
                        '&:hover': {
                          borderColor: module.color,
                          bgcolor: alpha(module.color, 0.05),
                        },
                        '& .arrow-icon': {
                          transition: 'transform 0.3s ease',
                        },
                      }}
                    >
                      Explore {module.title}
                    </Button>
                  </CardContent>

                  {/* Decorative gradient */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${module.color} 0%, ${alpha(module.color, 0.5)} 100%)`,
                    }}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Card
        sx={{
          background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <CardContent sx={{ p: { xs: 3, md: 5 }, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: 'white', fontWeight: 800, mb: 1 }}
              >
                🚀 Ready to transform your workflow?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, lineHeight: 1.7 }}
              >
                Join thousands of organizations using Sheria to streamline their document management and governance processes
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => router.push('/digitize')}
                sx={{
                  bgcolor: 'white',
                  color: '#1e40af',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2.5,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Upload Your First Document
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}