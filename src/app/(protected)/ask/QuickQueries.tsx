
'use client';

import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

interface QuickQueriesProps {
  onQuerySelect: (query: string) => void;
}

const queries = [
  'Show recent documents',
  'Verify ID status',
  'Education statistics for 2024',
  'Healthcare trends in Nairobi',
  'Governance insights',
  'Predict enrollment rates',
];

export default function QuickQueries({ onQuerySelect }: QuickQueriesProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Queries
        </Typography>
        <List>
          {queries.map((query) => (
            <ListItem key={query} disablePadding>
              <ListItemButton onClick={() => onQuerySelect(query)}>
                <ListItemText
                  primary={query}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
