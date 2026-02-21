"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import { Search, Shield } from "@mui/icons-material";
import { useState } from "react";
import { DOCUMENT_TYPES } from "@/src/lib/constants";

const T = {
  navy: "#070b14",
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  goldLt: "#f0c96a",
  emerald: "#10b981",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    background: T.navy3,
    color: T.text,
    borderRadius: "12px",
    "& fieldset": { borderColor: T.border },
    "&:hover fieldset": { borderColor: `${T.emerald}50` },
    "&.Mui-focused fieldset": { borderColor: `${T.emerald}80` },
    "& input::placeholder": { color: T.muted, opacity: 1 },
  },
  "& .MuiInputLabel-root": { color: T.muted },
  "& .MuiInputLabel-root.Mui-focused": { color: T.emerald },
  "& .MuiSelect-icon": { color: T.muted },
};

const menuPaperSx = {
  background: T.navy2,
  border: `1px solid ${T.border}`,
  borderRadius: "12px",
  color: T.text,
  "& .MuiMenuItem-root": {
    fontSize: "0.88rem",
    "&:hover": { background: "rgba(255,255,255,0.05)" },
    "&.Mui-selected": { background: `${T.emerald}14`, color: T.emerald },
  },
};

interface VerificationFormProps {
  onVerify: (documentId: string, documentType: string) => void;
  loading: boolean;
}

export default function VerificationForm({
  onVerify,
  loading,
}: VerificationFormProps) {
  const [documentId, setDocumentId] = useState("");
  const [documentType, setDocumentType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(documentId, documentType);
  };

  return (
    <Box
      sx={{
        background: T.navy2,
        border: `1px solid ${T.border}`,
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Emerald glow header */}
      <Box
        sx={{
          position: "relative",
          px: 3,
          pt: 4,
          pb: 3,
          textAlign: "center",
          borderBottom: `1px solid ${T.border}`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(16,185,129,0.1), transparent)",
          }}
        />

        {/* Shield icon */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "16px",
            mx: "auto",
            mb: 2,
            background: `${T.emerald}15`,
            border: `1px solid ${T.emerald}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: `0 8px 25px ${T.emerald}15`,
          }}
        >
          <Shield sx={{ fontSize: 28, color: T.emerald }} />
        </Box>

        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "white",
            mb: 0.5,
          }}
        >
          Verify Document
        </Typography>
        <Typography sx={{ fontSize: "0.82rem", color: T.muted }}>
          Fast & secure verification in seconds
        </Typography>
      </Box>

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ px: 3, py: 3 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Document ID or Number"
            placeholder="e.g., 12345678"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            required
            size="small"
            sx={inputSx}
          />
          <TextField
            select
            fullWidth
            label="Document Type"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            size="small"
            sx={inputSx}
            SelectProps={{
              MenuProps: { PaperProps: { elevation: 0, sx: menuPaperSx } },
            }}
          >
            <MenuItem value="">All Types (Auto-detect)</MenuItem>
            {DOCUMENT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            size="large"
            startIcon={
              loading ? (
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: `2px solid ${T.navy}40`,
                    borderTopColor: T.navy,
                    animation: "spin 0.8s linear infinite",
                    "@keyframes spin": { to: { transform: "rotate(360deg)" } },
                  }}
                />
              ) : (
                <Search sx={{ fontSize: "18px !important" }} />
              )
            }
            disabled={!documentId || loading}
            sx={{
              background:
                documentId && !loading ? T.emerald : "rgba(255,255,255,0.04)",
              color: documentId && !loading ? T.navy : T.muted,
              fontWeight: 700,
              fontSize: "0.95rem",
              borderRadius: "12px",
              py: 1.5,
              textTransform: "none",
              boxShadow:
                documentId && !loading ? `0 8px 25px ${T.emerald}30` : "none",
              border: `1px solid ${documentId && !loading ? `${T.emerald}50` : T.border}`,
              transition: "all 0.25s ease",
              "&:hover":
                documentId && !loading
                  ? {
                      background: "#0ea472",
                      transform: "translateY(-1px)",
                      boxShadow: `0 10px 30px ${T.emerald}35`,
                    }
                  : {},
              "&:disabled": {
                background: "rgba(255,255,255,0.04)",
                color: T.muted,
                border: `1px solid ${T.border}`,
              },
            }}
          >
            {loading ? "Verifying…" : "Verify Now"}
          </Button>
        </Stack>
      </Box>

      {/* Speed badge */}
      <Box
        sx={{
          mx: 3,
          mb: 3,
          px: 2,
          py: 1.5,
          background: "rgba(16,185,129,0.06)",
          border: `1px solid ${T.emerald}20`,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: T.emerald,
            boxShadow: `0 0 6px ${T.emerald}80`,
          }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: "0.72rem",
              color: T.emerald,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Lightning Fast
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: T.muted }}>
            Average verification:{" "}
            <Box component="span" sx={{ color: T.text, fontWeight: 700 }}>
              0.8 seconds
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
