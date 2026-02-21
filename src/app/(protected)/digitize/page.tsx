"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Typography,
  LinearProgress,
} from "@mui/material";
import {
  PlayArrow,
  Refresh,
  Scanner,
  Language,
  Speed,
  Description,
  Bolt,
} from "@mui/icons-material";
import PageHeader from "@/src/components/common/PageHeader";
import StatCard from "@/src/components/common/StatCard";
import EmptyState from "@/src/components/common/EmptyState";
import LoadingSpinner from "@/src/components/common/LoadingSpinner";
import ProcessingResults from "./ProcessingResults";
import FileUpload from "./FileUpload";

const T = {
  navy: "#070b14",
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  goldLt: "#f0c96a",
  emerald: "#10b981",
  blue: "#60a5fa",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
  red: "#f87171",
};

interface UploadedFile {
  fileId: string;
  fileName: string;
  s3Key: string;
}

interface ProcessingResult {
  name: string;
  status: "completed" | "failed" | "processing";
  fileId: string;
  text?: string;
  metadata?: {
    documentType: string;
    language: string;
    confidence: number;
    entities: string[];
  };
}

export default function DigitizePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ProcessingResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = (uploadedData: UploadedFile[]) => {
    setUploadedFiles(uploadedData);
    setError(null);
  };

  const handleProcess = async () => {
    if (uploadedFiles.length === 0) {
      setError("Please upload files first");
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/process/documents`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            files: uploadedFiles.map((f) => ({
              file_id: f.fileId,
              s3_key: f.s3Key,
              filename: f.fileName,
            })),
          }),
        },
      );
      if (!response.ok)
        throw new Error(`Processing failed: ${response.statusText}`);
      const data = await response.json();
      setResults(
        data.results.map((result: any) => ({
          name: result.filename || result.name,
          status: result.status || "completed",
          fileId: result.file_id,
          text: result.text || result.extracted_text,
          metadata: result.metadata || {
            documentType: result.document_type || "Document",
            language: result.language || "English",
            confidence: result.confidence || 0.95,
            entities: result.entities || [],
          },
        })),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setUploadedFiles([]);
    setResults([]);
    setError(null);
  };

  const stats = [
    { title: "OCR Accuracy", value: "98.5%", icon: Speed, color: T.gold },
    {
      title: "Languages Supported",
      value: "3",
      icon: Language,
      color: T.emerald,
    },
    { title: "Avg Processing Time", value: "3.2s", icon: Speed, color: T.blue },
    {
      title: "Documents Today",
      value: "1,247",
      icon: Description,
      color: "#c084fc",
    },
  ];

  const canProcess = uploadedFiles.length > 0 && !processing;
  const hasResults = results.length > 0;

  return (
    <Box sx={{ color: T.text }}>
      <PageHeader
        title="Digitize Documents"
        description="Transform paper documents into digital assets with AI-powered OCR"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Digitize" }]}
        action={
          <Chip
            icon={
              <Bolt
                sx={{
                  fontSize: "14px !important",
                  color: `${T.gold} !important`,
                }}
              />
            }
            label="AI Powered"
            size="small"
            sx={{
              background: `${T.gold}12`,
              color: T.gold,
              border: `1px solid ${T.gold}28`,
              fontWeight: 700,
              fontSize: "0.72rem",
            }}
          />
        }
      />

      {/* Error banner */}
      {error && (
        <Box
          sx={{
            mb: 3,
            px: 2.5,
            py: 1.75,
            background: "rgba(248,113,113,0.08)",
            border: `1px solid ${T.red}28`,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontSize: "0.85rem", color: T.red, fontWeight: 500 }}
          >
            {error}
          </Typography>
          <Button
            size="small"
            onClick={() => setError(null)}
            sx={{
              color: T.red,
              minWidth: 0,
              p: 0.5,
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "none",
            }}
          >
            Dismiss
          </Button>
        </Box>
      )}

      {/* Stat row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={6} md={3} key={stat.title}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Main two-column layout */}
      <Grid container spacing={2.5}>
        {/* Upload panel */}
        <Grid item xs={12} lg={6}>
          <Card
            elevation={0}
            sx={{
              background: T.navy2,
              border: `1px solid ${T.border}`,
              borderRadius: "16px",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Panel label */}
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: T.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  mb: 2.5,
                  "&::before": { content: '"— "', opacity: 0.5 },
                }}
              >
                Upload Files
              </Typography>

              <FileUpload
                onFilesSelected={setFiles}
                onUploadComplete={handleUploadComplete}
                maxFiles={10}
              />

              {uploadedFiles.length > 0 && (
                <Box sx={{ mt: 3, display: "flex", gap: 1.5 }}>
                  <Button
                    fullWidth
                    size="large"
                    startIcon={
                      <PlayArrow sx={{ fontSize: "20px !important" }} />
                    }
                    onClick={handleProcess}
                    disabled={!canProcess}
                    sx={{
                      background: canProcess
                        ? T.gold
                        : "rgba(255,255,255,0.05)",
                      color: canProcess ? T.navy : T.muted,
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      borderRadius: "12px",
                      py: 1.5,
                      textTransform: "none",
                      boxShadow: canProcess
                        ? "0 8px 25px rgba(212,168,67,0.25)"
                        : "none",
                      "&:hover": canProcess
                        ? {
                            background: T.goldLt,
                            transform: "translateY(-1px)",
                            boxShadow: "0 10px 30px rgba(212,168,67,0.35)",
                          }
                        : {},
                      transition: "all 0.25s ease",
                      "&:disabled": {
                        background: "rgba(255,255,255,0.04)",
                        color: T.muted,
                      },
                    }}
                  >
                    {processing ? "Processing…" : "Start Processing"}
                  </Button>

                  {hasResults && (
                    <Button
                      size="large"
                      startIcon={
                        <Refresh sx={{ fontSize: "18px !important" }} />
                      }
                      onClick={handleReset}
                      disabled={processing}
                      sx={{
                        background: "transparent",
                        color: T.muted,
                        border: `1px solid ${T.border}`,
                        borderRadius: "12px",
                        py: 1.5,
                        px: 2.5,
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        flexShrink: 0,
                        "&:hover": {
                          color: "white",
                          borderColor: "rgba(255,255,255,0.2)",
                          background: "rgba(255,255,255,0.04)",
                        },
                      }}
                    >
                      Reset
                    </Button>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Results panel */}
        <Grid item xs={12} lg={6}>
          <Card
            elevation={0}
            sx={{
              background: T.navy2,
              border: `1px solid ${T.border}`,
              borderRadius: "16px",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: T.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  mb: 2.5,
                  "&::before": { content: '"— "', opacity: 0.5 },
                }}
              >
                Extraction Results
              </Typography>

              {processing ? (
                <Box sx={{ py: 6, textAlign: "center" }}>
                  {/* Custom dark spinner */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      mx: "auto",
                      mb: 3,
                      border: `3px solid ${T.border}`,
                      borderTopColor: T.gold,
                      animation: "spin 0.9s linear infinite",
                      "@keyframes spin": {
                        to: { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                  <Typography sx={{ color: T.muted, fontSize: "0.9rem" }}>
                    Analysing documents with AI…
                  </Typography>
                  <LinearProgress
                    sx={{
                      mt: 2.5,
                      mx: "auto",
                      maxWidth: 200,
                      height: 3,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      "& .MuiLinearProgress-bar": {
                        background: T.gold,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ) : results.length === 0 ? (
                <Box sx={{ py: 6, textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "16px",
                      mx: "auto",
                      mb: 2.5,
                      background: `${T.gold}10`,
                      border: `1px solid ${T.gold}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Scanner sx={{ color: T.gold, fontSize: 28 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "Georgia, serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "white",
                      mb: 0.75,
                    }}
                  >
                    Ready to digitize
                  </Typography>
                  <Typography
                    sx={{
                      color: T.muted,
                      fontSize: "0.85rem",
                      maxWidth: 280,
                      mx: "auto",
                      lineHeight: 1.6,
                    }}
                  >
                    Upload documents and click Start Processing to see
                    AI-powered extraction results
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    maxHeight: 580,
                    overflowY: "auto",
                    pr: 0.5,
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255,255,255,0.08) transparent",
                    "&::-webkit-scrollbar": { width: 4 },
                    "&::-webkit-scrollbar-thumb": {
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: 4,
                    },
                  }}
                >
                  <ProcessingResults results={results} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
