import {
  Card,
  CardContent,
  Typography,
  List
} from '@mui/material';
import QuickQueriesClient from './QuickQueriesClient';

const queries = [
  'Show recent documents',
  'Verify ID status',
  'Education statistics for 2024',
  'Healthcare trends in Nairobi',
  'Governance insights',
  'Predict enrollment rates',
];

export default function QuickQueries() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Queries
        </Typography>
        <List>
          {queries.map((query) => (
            <QuickQueriesClient key={query} query={query} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}