// components/ResourceUtilization.tsx
'use client';

import { Card, CardContent, Typography, Box, Stack, LinearProgress } from '@mui/material';

interface ResourceUtilizationProps {
  data: Array<{
    court: string;
    utilization: number;
    capacity: number;
  }>;
}

export default function ResourceUtilization({ data }: ResourceUtilizationProps) {
  const getBarColor = (utilization: number) => {
    if (utilization > 80) return 'error';
    if (utilization > 60) return 'warning';
    return 'success';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Resource Utilization
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Court workload status and optimization opportunities
        </Typography>

        <Stack spacing={2}>
          {data.map((court) => (
            <Box key={court.court}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {court.court}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {court.utilization}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={court.utilization}
                color={getBarColor(court.utilization)}
                sx={{
                  height: 6,
                  borderRadius: 1,
                }}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}