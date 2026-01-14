'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  IconButton,
  Paper,
  CircularProgress,
  Avatar,
  Typography,
} from '@mui/material';
import { Send, SmartToy, Person } from '@mui/icons-material';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
  sources?: string[];
  isStreaming?: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Jambo! I\'m Sheria Ask, your AI assistant. How can I help you today?',
      timestamp: new Date(),
      language: 'en',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      language: 'en',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    abortControllerRef.current = new AbortController();

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      language: 'en',
      isStreaming: true,
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('access_token='))
        ?.split('=')[1];
        
      if (!accessToken) {
        throw new Error('No access token found');
      }
      const response = await fetch(
        'https://sheria-backend.greyteam.co.ke/rag/conversations/chat/new',
        {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
             "Authorization": `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            query: input,
            conversation_id: 'string',
          }),
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, isStreaming: false }
                : msg
            )
          );
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: fullContent }
              : msg
          )
        );

        scrollToBottom();
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was cancelled');
      } else {
        console.error('Streaming error:', error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content:
                    'I encountered an error processing your request. Please try again.',
                  isStreaming: false,
                }
              : msg
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isStreaming ? { ...msg, isStreaming: false } : msg
        )
      );
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
            bgcolor: 'grey.50',
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  maxWidth: '70%',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: message.role === 'user' ? 'grey.400' : 'primary.main',
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                  }}
                >
                  {message.role === 'user' ? (
                    <Person fontSize="small" />
                  ) : (
                    <SmartToy fontSize="small" />
                  )}
                </Avatar>

                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: message.role === 'user' ? 'primary.main' : 'background.paper',
                    color: message.role === 'user' ? 'white' : 'text.primary',
                    position: 'relative',
                    minHeight: 44,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {message.content}
                      {message.isStreaming && (
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-block',
                            ml: 0.5,
                            animation: 'blink 1s infinite',
                            '@keyframes blink': {
                              '0%, 49%': { opacity: 1 },
                              '50%, 100%': { opacity: 0 },
                            },
                          }}
                        >
                          ▌
                        </Box>
                      )}
                    </Typography>

                    {message.sources && message.sources.length > 0 && (
                      <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                        <Typography
                          variant="caption"
                          sx={{ display: 'block', mb: 1, opacity: 0.7 }}
                        >
                          Sources:
                        </Typography>
                        {message.sources.map((source, i) => (
                          <Typography
                            key={i}
                            variant="caption"
                            sx={{ display: 'block', opacity: 0.8 }}
                          >
                            • {source}
                          </Typography>
                        ))}
                      </Box>
                    )}

                    <Typography
                      variant="caption"
                      sx={{ display: 'block', mt: 1, opacity: 0.7 }}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            display: 'flex',
            gap: 1,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            disabled={isLoading}
          />
          {isLoading ? (
            <IconButton
              color="error"
              onClick={handleCancel}
              sx={{
                bgcolor: 'error.main',
                color: 'white',
                '&:hover': { bgcolor: 'error.dark' },
              }}
              title="Cancel request"
            >
              ✕
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!input.trim()}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
                '&.Mui-disabled': { bgcolor: 'action.disabledBackground' },
              }}
            >
              <Send />
            </IconButton>
          )}
        </Paper>
      </CardContent>
    </Card>
  );
}