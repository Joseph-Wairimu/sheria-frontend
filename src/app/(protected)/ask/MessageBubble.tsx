
'use client';

import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  Stack,
} from '@mui/material';
import { SmartToy, Person } from '@mui/icons-material';
import { ChatMessage } from '@/src/types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          maxWidth: '70%',
          flexDirection: isUser ? 'row-reverse' : 'row',
        }}
      >
        <Avatar
          sx={{
            bgcolor: isUser ? 'grey.400' : 'primary.main',
            width: 32,
            height: 32,
          }}
        >
          {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
        </Avatar>

        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: isUser ? 'primary.main' : 'background.paper',
            color: isUser ? 'white' : 'text.primary',
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Typography>

          {message.sources && message.sources.length > 0 && (
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Typography
                variant="caption"
                sx={{ display: 'block', mb: 1, opacity: 0.7 }}
              >
                Sources:
              </Typography>
              <Stack spacing={0.5}>
                {message.sources.map((source, i) => (
                  <Typography
                    key={i}
                    variant="caption"
                    sx={{ display: 'block', opacity: 0.8 }}
                  >
                    • {source}
                  </Typography>
                ))}
              </Stack>
            </Box>
          )}

          <Typography
            variant="caption"
            sx={{ display: 'block', mt: 1, opacity: 0.7 }}
          >
            {message.timestamp.toLocaleTimeString()}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
