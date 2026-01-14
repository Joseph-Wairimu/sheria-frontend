// components/TrendAnalysis.tsx
'use client';

import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Chip,
} from '@mui/material';

interface TrendAnalysisProps {
  data: Array<{
    case: string;
    type: string;
    risk: 'High' | 'Medium' | 'Low';
    status: string;
  }>;
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'High':
      return 'error';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'success';
    default:
      return 'default';
  }
};

export default function TrendAnalysis({ data }: TrendAnalysisProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Emerging Legal Trends
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Hotspots and emerging dispute categories
        </Typography>

        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f1f5f9' }}>
                <TableCell sx={{ fontWeight: 600 }}>Dispute Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Risk Level</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{row.case}</TableCell>
                  <TableCell>
                    <Chip label={row.type} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.risk}
                      size="small"
                      color={getRiskColor(row.risk)}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}