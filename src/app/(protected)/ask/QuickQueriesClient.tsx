'use client';

import {
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

interface QuickQueriesClientProps {
  query: string;
}

export default function QuickQueriesClient({ query }: QuickQueriesClientProps) {
  const handleQuerySelect = () => {
    window.dispatchEvent(
      new CustomEvent('quickQuerySelected', {
        detail: { query },
      })
    );
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleQuerySelect}>
        <ListItemText
          primary={query}
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItemButton>
    </ListItem>
  );
}