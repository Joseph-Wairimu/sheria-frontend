"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import {
  Box,
  TextField,
  IconButton,
  Avatar,
  Typography,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  MenuItem,
} from "@mui/material";
import { Send, SmartToy, Person, Menu, Add } from "@mui/icons-material";
import { fetchConversations, fetchConversationMessages } from "./actions";
import { sendChatMessage } from "./chat-client";

const T = {
  navy: "#070b14",
  navy2: "#0d1424",
  navy3: "#111827",
  navy4: "#1a2235",
  gold: "#d4a843",
  goldLt: "#f0c96a",
  emerald: "#10b981",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
  red: "#f87171",
};

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  language?: string;
  sources?: string[];
  isStreaming?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updated_at: string;
}

interface SupportedLanguage {
  code: string;
  label: string;
  flag: string;
}

interface AskPageClientProps {
  supportedLanguages: SupportedLanguage[];
  settingsOnly?: boolean;
}

export default function AskPageClient({
  supportedLanguages,
  settingsOnly = false,
}: AskPageClientProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Jambo! I'm Sheria Ask, your AI assistant. Ask me anything about judicial records, cases, or legal documents.",
      timestamp: new Date(),
      language: "en",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationsLoading, setConversationsLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for quick query events
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setInput(e.detail.query);
      inputRef.current?.focus();
    };
    window.addEventListener("quickQuerySelected", handler as EventListener);
    return () =>
      window.removeEventListener(
        "quickQuerySelected",
        handler as EventListener,
      );
  }, []);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    setConversationsLoading(true);
    startTransition(async () => {
      const convs = await fetchConversations();
      setConversations(convs);
      setConversationsLoading(false);
    });
  };

  const handleSelectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    setDrawerOpen(false);
    startTransition(async () => {
      const msgs = await fetchConversationMessages(conversationId);
      setMessages(
        msgs.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.created_at),
          sources: msg.sources || [],
        })),
      );
    });
  };

  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Jambo! I'm Sheria Ask, your AI assistant. Ask me anything about judicial records, cases, or legal documents.",
        timestamp: new Date(),
        language: "en",
      },
    ]);
    setDrawerOpen(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      language,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    abortControllerRef.current = new AbortController();
    const assistantMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        language,
        isStreaming: true,
      },
    ]);
    try {
      const { stream, conversationId: newConversationId } =
        await sendChatMessage(input, currentConversationId);
      if (newConversationId && !currentConversationId)
        setCurrentConversationId(newConversationId);
      const reader = stream.getReader();
      let fullContent = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullContent += value;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: fullContent }
              : msg,
          ),
        );
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg,
        ),
      );
    } catch (error) {
      if (!(error instanceof Error && error.name === "AbortError")) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: "Error processing your request. Please try again.",
                  isStreaming: false,
                }
              : msg,
          ),
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.isStreaming ? { ...msg, isStreaming: false } : msg,
      ),
    );
  };

  // Settings-only mode (language picker)
  if (settingsOnly) {
    return (
      <TextField
        select
        fullWidth
        label="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            background: T.navy3,
            color: T.text,
            borderRadius: "10px",
            "& fieldset": { borderColor: T.border },
            "&:hover fieldset": { borderColor: `${T.gold}50` },
            "&.Mui-focused fieldset": { borderColor: T.gold },
          },
          "& .MuiInputLabel-root": { color: T.muted },
          "& .MuiInputLabel-root.Mui-focused": { color: T.gold },
          "& .MuiSelect-icon": { color: T.muted },
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                background: T.navy2,
                border: `1px solid ${T.border}`,
                borderRadius: "12px",
                color: T.text,
                "& .MuiMenuItem-root": {
                  fontSize: "0.88rem",
                  "&:hover": { background: "rgba(255,255,255,0.05)" },
                  "&.Mui-selected": {
                    background: `${T.gold}14`,
                    color: T.gold,
                  },
                },
              },
            },
          },
        }}
      >
        {supportedLanguages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  return (
    <>
      {/* ── CHAT CONTAINER ─────────────────────────────────── */}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: T.navy2,
          border: `1px solid ${T.border}`,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2.5,
            py: 1.75,
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            background: T.navy,
            flexShrink: 0,
          }}
        >
          <IconButton
            size="small"
            onClick={handleDrawerOpen}
            sx={{
              color: T.muted,
              "&:hover": {
                color: "white",
                background: "rgba(255,255,255,0.06)",
              },
              borderRadius: "8px",
            }}
          >
            <Menu sx={{ fontSize: 19 }} />
          </IconButton>
          <Button
            startIcon={<Add sx={{ fontSize: "16px !important" }} />}
            size="small"
            onClick={handleNewConversation}
            sx={{
              color: T.muted,
              fontWeight: 600,
              fontSize: "0.8rem",
              textTransform: "none",
              borderRadius: "8px",
              border: `1px solid ${T.border}`,
              background: "transparent",
              "&:hover": {
                color: "white",
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            New Chat
          </Button>

          <Box sx={{ flex: 1 }} />

          {/* Online indicator */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: T.emerald,
                boxShadow: `0 0 6px ${T.emerald}80`,
                animation: "lpPulse 2s ease-in-out infinite",
              }}
            />
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: T.muted,
                fontFamily: "monospace",
              }}
            >
              Sheria AI online
            </Typography>
          </Box>
        </Box>

        {/* Messages area */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            scrollbarWidth: "thin",
            scrollbarColor: `rgba(255,255,255,0.08) transparent`,
            "&::-webkit-scrollbar": { width: 4 },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.08)",
              borderRadius: 4,
            },
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                justifyContent:
                  message.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1.25,
                  maxWidth: "78%",
                  flexDirection:
                    message.role === "user" ? "row-reverse" : "row",
                  alignItems: "flex-end",
                }}
              >
                {/* Avatar */}
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    background:
                      message.role === "user"
                        ? "linear-gradient(135deg, #d4a843, #b8860b)"
                        : `${T.emerald}20`,
                    border: `1px solid ${message.role === "user" ? `${T.gold}40` : `${T.emerald}30`}`,
                  }}
                >
                  {message.role === "user" ? (
                    <Person sx={{ fontSize: 15, color: T.navy }} />
                  ) : (
                    <SmartToy sx={{ fontSize: 15, color: T.emerald }} />
                  )}
                </Avatar>

                {/* Bubble */}
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius:
                      message.role === "user"
                        ? "16px 4px 16px 16px"
                        : "4px 16px 16px 16px",
                    background:
                      message.role === "user"
                        ? `linear-gradient(135deg, ${T.gold}, #b8860b)`
                        : T.navy3,
                    border: `1px solid ${message.role === "user" ? `${T.gold}40` : T.border}`,
                    minWidth: 60,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: message.role === "user" ? T.navy : T.text,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontWeight: message.role === "user" ? 600 : 400,
                      lineHeight: 1.6,
                    }}
                  >
                    {message.content}
                    {message.isStreaming && (
                      <Box
                        component="span"
                        sx={{
                          display: "inline-block",
                          ml: 0.5,
                          color: T.gold,
                          animation: "blink 1s infinite",
                          "@keyframes blink": {
                            "0%,49%": { opacity: 1 },
                            "50%,100%": { opacity: 0 },
                          },
                        }}
                      >
                        ▌
                      </Box>
                    )}
                  </Typography>

                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <Box
                      sx={{
                        mt: 1.5,
                        pt: 1.5,
                        borderTop: `1px solid ${T.border}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          color: T.muted,
                          mb: 0.5,
                          fontFamily: "monospace",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Sources
                      </Typography>
                      {message.sources.map((source, i) => (
                        <Typography
                          key={i}
                          sx={{
                            fontSize: "0.75rem",
                            color: T.muted,
                            display: "block",
                          }}
                        >
                          · {source}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {/* Timestamp */}
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      mt: 0.75,
                      color: message.role === "user" ? `${T.navy}80` : T.muted,
                      fontFamily: "monospace",
                    }}
                  >
                    {isHydrated
                      ? message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}

          {/* Loading skeleton */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-end" }}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  background: `${T.emerald}20`,
                  border: `1px solid ${T.emerald}30`,
                }}
              >
                <SmartToy sx={{ fontSize: 15, color: T.emerald }} />
              </Avatar>
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: "4px 16px 16px 16px",
                  background: T.navy3,
                  border: `1px solid ${T.border}`,
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                {[0, 0.2, 0.4].map((delay, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: T.muted,
                      animation: "bounce 1.2s ease-in-out infinite",
                      animationDelay: `${delay}s`,
                      "@keyframes bounce": {
                        "0%,80%,100%": {
                          transform: "scale(0.8)",
                          opacity: 0.4,
                        },
                        "40%": { transform: "scale(1.2)", opacity: 1 },
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input bar */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            borderTop: `1px solid ${T.border}`,
            display: "flex",
            gap: 1.5,
            alignItems: "flex-end",
            background: T.navy,
            flexShrink: 0,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Ask me anything about judicial records, cases, or laws…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || isPending}
            inputRef={inputRef}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: T.navy2,
                color: T.text,
                borderRadius: "12px",
                fontSize: "0.9rem",
                "& fieldset": { borderColor: T.border },
                "&:hover fieldset": { borderColor: `${T.gold}40` },
                "&.Mui-focused fieldset": { borderColor: `${T.gold}70` },
                "& textarea::placeholder": { color: T.muted, opacity: 1 },
              },
            }}
          />
          {isLoading || isPending ? (
            <IconButton
              onClick={handleCancel}
              sx={{
                background: "rgba(248,113,113,0.15)",
                color: T.red,
                border: `1px solid ${T.red}30`,
                borderRadius: "12px",
                width: 44,
                height: 44,
                flexShrink: 0,
                "&:hover": { background: "rgba(248,113,113,0.25)" },
              }}
            >
              ✕
            </IconButton>
          ) : (
            <IconButton
              onClick={handleSend}
              disabled={!input.trim()}
              sx={{
                background: input.trim() ? T.gold : "rgba(255,255,255,0.04)",
                color: input.trim() ? T.navy : T.muted,
                border: `1px solid ${input.trim() ? `${T.gold}60` : T.border}`,
                borderRadius: "12px",
                width: 44,
                height: 44,
                flexShrink: 0,
                boxShadow: input.trim()
                  ? "0 4px 15px rgba(212,168,67,0.25)"
                  : "none",
                transition: "all 0.2s ease",
                "&:hover": input.trim()
                  ? { background: T.goldLt, transform: "translateY(-1px)" }
                  : {},
                "&.Mui-disabled": {
                  background: "rgba(255,255,255,0.03)",
                  color: T.muted,
                  borderColor: T.border,
                },
              }}
            >
              <Send sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* ── CONVERSATIONS DRAWER ────────────────────────────── */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            mt: "64px",
            height: "calc(100% - 64px)",
            background: T.navy,
            borderRight: `1px solid ${T.border}`,
          },
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(4px)",
            background: "rgba(7,11,20,0.6)",
          },
        }}
      >
        <Box sx={{ p: 2.5 }}>
          <Typography
            sx={{
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: "1.05rem",
              color: "white",
              mb: 2,
            }}
          >
            Conversations
          </Typography>
          <Button
            fullWidth
            startIcon={<Add sx={{ fontSize: "16px !important" }} />}
            onClick={handleNewConversation}
            sx={{
              background: T.gold,
              color: T.navy,
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "none",
              borderRadius: "10px",
              py: 1.25,
              boxShadow: "0 4px 15px rgba(212,168,67,0.2)",
              "&:hover": { background: T.goldLt },
              mb: 0.5,
            }}
          >
            New Conversation
          </Button>
        </Box>

        <Divider sx={{ borderColor: T.border }} />

        {conversationsLoading ? (
          <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1 }}>
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                sx={{
                  height: 52,
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)",
                  animation: "pulse 1.5s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%,100%": { opacity: 0.4 },
                    "50%": { opacity: 0.8 },
                  },
                }}
              />
            ))}
          </Box>
        ) : (
          <List sx={{ px: 1.5, pt: 1.5 }}>
            {conversations.length === 0 ? (
              <Box sx={{ px: 1, py: 3, textAlign: "center" }}>
                <Typography sx={{ fontSize: "0.85rem", color: T.muted }}>
                  No conversations yet
                </Typography>
              </Box>
            ) : (
              conversations.map((conv) => {
                const isActive = currentConversationId === conv.id;
                return (
                  <ListItem key={conv.id} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => handleSelectConversation(conv.id)}
                      sx={{
                        borderRadius: "10px",
                        background: isActive ? `${T.gold}14` : "transparent",
                        border: `1px solid ${isActive ? `${T.gold}28` : "transparent"}`,
                        "&:hover": {
                          background: isActive
                            ? `${T.gold}18`
                            : "rgba(255,255,255,0.04)",
                          borderColor: T.border,
                        },
                      }}
                    >
                      <ListItemText
                        primary={conv.title}
                        secondary={new Date(
                          conv.updated_at,
                        ).toLocaleDateString()}
                        primaryTypographyProps={{
                          fontSize: "0.85rem",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? T.gold : T.text,
                          noWrap: true,
                        }}
                        secondaryTypographyProps={{
                          fontSize: "0.68rem",
                          color: T.muted,
                          fontFamily: "monospace",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })
            )}
          </List>
        )}
      </Drawer>
    </>
  );
}
