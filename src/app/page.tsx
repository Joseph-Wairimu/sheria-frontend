'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AutoAwesome,
  VerifiedUser,
  SearchOutlined,
  TrendingUpOutlined,
  ArrowForwardOutlined,
} from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
}

function getCookie(name: string): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  } catch (err) {
    console.error('Invalid JWT format:', err);
    return true;
  }
}

export default function LandingPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    const token = getCookie('access_token');
    if (token && !isTokenExpired(token)) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  const features = [
    {
      icon: <AutoAwesome sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Digitize Documents',
      description: 'Transform paper documents into digital assets with advanced OCR and AI-powered metadata extraction',
      tags: ['OCR Technology', 'Multi-language', 'Auto-classify'],
      color: '#f3e8ff',
      borderColor: theme.palette.primary.light,
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Verify & Validate',
      description: 'Real-time document authentication with blockchain audit trails and fraud detection',
      tags: ['Real-time Check', 'Fraud Detection', 'Blockchain Trail'],
      color: '#ecfdf5',
      borderColor: theme.palette.secondary.light,
    },
    {
      icon: <SearchOutlined sx={{ fontSize: 40, color: '#f59e0b' }} />,
      title: 'Ask Questions',
      description: 'Conversational AI assistant for instant answers from your judicial data and legal records',
      tags: ['Natural Language', 'Instant Answers', 'Smart Search'],
      color: '#fffbeb',
      borderColor: '#fcd34d',
    },
    {
      icon: <TrendingUpOutlined sx={{ fontSize: 40, color: theme.palette.info.main }} />,
      title: 'Predict Trends',
      description: 'Forecast case timelines, assess resource needs, and identify emerging legal patterns',
      tags: ['Analytics', 'Forecasting', 'Resource Planning'],
      color: '#ecf0ff',
      borderColor: theme.palette.info.light,
    },
  ];

  const stats = [
    { number: '1.2M+', label: 'Documents Processed', icon: '📄' },
    { number: '500K+', label: 'Cases Tracked', icon: '⚖️' },
    { number: '0.8s', label: 'Avg Verification Time', icon: '⚡' },
    { number: '99.2%', label: 'Verification Success', icon: '✅' },
  ];

  const benefits = [
    {
      title: 'Faster Justice',
      description: 'Reduce case processing from years to months with intelligent automation',
      icon: '⏱️',
    },
    {
      title: 'Verified Trust',
      description: 'Blockchain-certified documents eliminate fraud and strengthen judicial integrity',
      icon: '🔐',
    },
    {
      title: 'Data Intelligence',
      description: 'Predictive analytics guide resource allocation and identify emerging legal trends',
      icon: '📊',
    },
    {
      title: 'Unified Access',
      description: 'Consolidated platform breaks down data silos across judicial institutions',
      icon: '🔗',
    },
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Navigation Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                }}
              >
                S
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Sheria
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="text"
                sx={{
                  color: theme.palette.text.primary,
                  '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.05)' },
                }}
              >
                Features
              </Button>
              <Button
                variant="text"
                sx={{
                  color: theme.palette.text.primary,
                  '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.05)' },
                }}
              >
                About
              </Button>
              <Button
                variant="contained"
                onClick={handleGetStarted}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            top: '-100px',
            right: '-100px',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.03)',
            bottom: '-50px',
            left: '10%',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Chip
                  label="🚀 AI-Powered Governance"
                  sx={{
                    width: 'fit-content',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Modernizing Kenya's Justice System
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    opacity: 0.95,
                  }}
                >
                  Intelligent document management, real-time verification, and predictive analytics for faster, fairer justice
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGetStarted}
                    sx={{
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#f0f4ff',
                      },
                    }}
                    endIcon={<ArrowForwardOutlined />}
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
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Watch Demo
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 300, md: 400 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '90%',
                    height: '90%',
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <AutoAwesome sx={{ fontSize: 60, opacity: 0.8 }} />
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, textAlign: 'center' }}>
                    AI-Powered Judicial Intelligence
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ py: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  border: `2px solid ${theme.palette.divider}`,
                  background: theme.palette.background.paper,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Typography sx={{ fontSize: '2rem', mb: 1 }}>{stat.icon}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 10 }}>
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ mb: 8, textAlign: 'center' }}>
            <Chip
              label="✨ Powerful Features"
              sx={{
                width: 'fit-content',
                mx: 'auto',
                backgroundColor: theme.palette.primary.light,
                color: 'white',
              }}
            />
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Transforming Judicial Operations
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.125rem' }}
            >
              Four integrated modules working together to modernize Kenya's justice system
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    border: `2px solid ${feature.borderColor}`,
                    backgroundColor: feature.color,
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${feature.borderColor}40`,
                      borderColor: feature.borderColor,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="textSecondary" sx={{ mb: 3, flex: 1, lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {feature.tags.map((tag, i) => (
                        <Chip
                          key={i}
                          label={tag}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: feature.borderColor,
                            color: theme.palette.text.secondary,
                          }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Stack spacing={3} sx={{ mb: 8, textAlign: 'center' }}>
          <Chip
            label="💡 Why Sheria"
            sx={{
              width: 'fit-content',
              mx: 'auto',
              backgroundColor: theme.palette.secondary.light,
              color: 'white',
            }}
          />
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Real Impact on Kenya's Justice System
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: `linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(37, 99, 235, 0.05))`,
                  border: `1px solid ${theme.palette.divider}`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>{benefit.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {benefit.title}
                  </Typography>
                  <Typography color="textSecondary" sx={{ lineHeight: 1.6 }}>
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Technology Stack Section */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 10 }}>
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ mb: 8, textAlign: 'center' }}>
            <Chip
              label="⚙️ Technology Stack"
              sx={{
                width: 'fit-content',
                mx: 'auto',
                backgroundColor: theme.palette.primary.light,
                color: 'white',
              }}
            />
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Built on Modern Technology
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {[
              { category: 'Frontend', tech: 'Next.js, TypeScript, Material-UI' },
              { category: 'Backend', tech: 'Python, FastAPI, LangChain' },
              { category: 'Database', tech: 'PostgreSQL, ChromaDB (Vector)' },
              { category: 'ML/AI', tech: 'Qwen LLM, Scikit-Learn, Ollama' },
              { category: 'Infrastructure', tech: 'Docker, Nginx, MinIO, Redis' },
              { category: 'Processing', tech: 'Tesseract OCR, Celery Task Queue' },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}>
                    {item.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.tech}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Paper
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
            p: { xs: 4, md: 8 },
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              Ready to Transform Kenya's Justice System?
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '1.125rem', opacity: 0.95 }}>
              Join us in building a faster, fairer, and more transparent judicial system powered by AI
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', pt: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 4,
                }}
                endIcon={<ArrowForwardOutlined />}
              >
                Get Started Today
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 4,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Schedule a Demo
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 800,
                    }}
                  >
                    S
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.125rem' }}>Sheria</Typography>
                </Stack>
                <Typography variant="body2" color="textSecondary">
                  Smart governance for Kenya's justice system
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                Product
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Digitize
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Verify
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Ask
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Predict
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                Company
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  About Us
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Blog
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Careers
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Contact
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Privacy Policy
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Terms of Service
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                  Security
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              pt: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              © 2025 Sheria Platform. All rights reserved. Modernizing justice in Kenya.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}