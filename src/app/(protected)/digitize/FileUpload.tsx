"use client";

import { useCallback, useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  CloudUpload,
  InsertDriveFile,
  Delete,
  CheckCircle,
  Error as ErrorIcon,
  Upload,
} from "@mui/icons-material";
import { formatFileSize } from "@/src/lib/utils/formatters";
import {
  uploadFilesInBulk,
  UploadProgress,
} from "@/src/lib/services/s3-upload.service";

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

interface FileUploadState {
  fileId: string;
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "failed";
  error?: string;
}

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  onUploadComplete?: (
    results: { fileId: string; fileName: string; s3Key: string }[],
  ) => void;
  maxFiles?: number;
  autoUpload?: boolean;
}

export default function FileUpload({
  onFilesSelected,
  onUploadComplete,
  maxFiles = 10,
  autoUpload = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<
    Record<string, FileUploadState>
  >({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      handleFilesSelected(droppedFiles);
    },
    [maxFiles],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFilesSelected(Array.from(e.target.files).slice(0, maxFiles));
    }
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setUploadError(null);
    const newProgress: Record<string, FileUploadState> = {};
    selectedFiles.forEach((file) => {
      newProgress[file.name] = {
        fileId: "",
        fileName: file.name,
        progress: 0,
        status: "pending",
      };
    });
    setUploadProgress(newProgress);
    onFilesSelected(selectedFiles);
    if (autoUpload) handleUpload(selectedFiles);
  };

  const removeFile = (fileName: string) => {
    const newFiles = files.filter((f) => f.name !== fileName);
    setFiles(newFiles);
    const newProgress = { ...uploadProgress };
    delete newProgress[fileName];
    setUploadProgress(newProgress);
    onFilesSelected(newFiles);
  };

  const handleUpload = async (filesToUpload: File[]) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const results = await uploadFilesInBulk(
        filesToUpload,
        (progress: UploadProgress) => {
          setUploadProgress((prev) => ({
            ...prev,
            [progress.fileName]: {
              fileId: progress.fileId,
              fileName: progress.fileName,
              progress: progress.progress,
              status: progress.status,
              error: progress.error,
            },
          }));
        },
      );
      if (onUploadComplete && results.successful.length > 0) {
        onUploadComplete(
          results.successful.map((r) => ({
            fileId: r.file_id,
            fileName: filesToUpload.find((f) => f.name)?.name || "",
            s3Key: r.s3_key,
          })),
        );
      }
      if (results.failed.length > 0) {
        setUploadError(
          `${results.failed.length} file(s) failed: ${results.failed.map((f) => f.fileName).join(", ")}`,
        );
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = (status: FileUploadState["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle sx={{ color: T.emerald, fontSize: 18 }} />;
      case "failed":
        return <ErrorIcon sx={{ color: T.red, fontSize: 18 }} />;
      case "uploading":
        return (
          <Upload
            sx={{
              color: T.gold,
              fontSize: 18,
              animation: "spin 1s linear infinite",
            }}
          />
        );
      default:
        return <InsertDriveFile sx={{ color: T.muted, fontSize: 18 }} />;
    }
  };

  const allFilesUploaded =
    files.length > 0 &&
    files.every((f) => uploadProgress[f.name]?.status === "completed");

  return (
    <Box>
      {/* Error alert */}
      {uploadError && (
        <Box
          sx={{
            mb: 2.5,
            px: 2,
            py: 1.5,
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.25)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            sx={{ fontSize: "0.85rem", color: T.red, fontWeight: 500 }}
          >
            {uploadError}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setUploadError(null)}
            sx={{ color: T.red, p: 0.5 }}
          >
            <ErrorIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}

      {/* Drop zone */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          p: { xs: 4, md: 5 },
          textAlign: "center",
          border: `2px dashed`,
          borderColor: isDragging ? T.gold : T.border,
          background: isDragging
            ? "rgba(212,168,67,0.06)"
            : "rgba(255,255,255,0.02)",
          borderRadius: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            borderColor: `${T.gold}60`,
            background: "rgba(212,168,67,0.03)",
            transform: "translateY(-2px)",
          },
        }}
      >
        {/* Glow on drag */}
        {isDragging && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,168,67,0.1), transparent)",
            }}
          />
        )}

        {/* Icon */}
        <Box
          sx={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            mx: "auto",
            mb: 2,
            background: isDragging
              ? "rgba(212,168,67,0.15)"
              : "rgba(255,255,255,0.05)",
            border: `1px solid ${isDragging ? T.gold + "40" : T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
        >
          <CloudUpload
            sx={{ fontSize: 32, color: isDragging ? T.gold : T.muted }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "white",
            mb: 0.75,
          }}
        >
          Drop your files here
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", color: T.muted, mb: 3 }}>
          or click to browse from your computer
        </Typography>

        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: "none" }}
          id="file-upload-input"
          disabled={isUploading}
        />
        <label htmlFor="file-upload-input">
          <Button
            variant="contained"
            component="span"
            disabled={isUploading}
            sx={{
              background: T.gold,
              color: T.navy,
              fontWeight: 700,
              fontSize: "0.9rem",
              borderRadius: "10px",
              px: 3.5,
              py: 1.25,
              textTransform: "none",
              boxShadow: "0 6px 20px rgba(212,168,67,0.25)",
              "&:hover": {
                background: T.goldLt,
                transform: "translateY(-1px)",
                boxShadow: "0 8px 24px rgba(212,168,67,0.35)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Choose Files
          </Button>
        </label>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 2.5 }}
        >
          {[`Max ${maxFiles} files`, "PDF, PNG, JPG"].map((label) => (
            <Chip
              key={label}
              label={label}
              size="small"
              sx={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${T.border}`,
                color: T.muted,
                fontWeight: 600,
                fontSize: "0.7rem",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* File list */}
      {files.length > 0 && (
        <Box sx={{ mt: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: T.emerald,
                  boxShadow: `0 0 6px ${T.emerald}80`,
                }}
              />
              <Typography
                sx={{ fontSize: "0.82rem", fontWeight: 600, color: T.text }}
              >
                {files.length} {files.length === 1 ? "file" : "files"} selected
              </Typography>
            </Box>
            {!allFilesUploaded && (
              <Button
                size="small"
                onClick={() => handleUpload(files)}
                disabled={isUploading}
                sx={{
                  background: `${T.gold}15`,
                  color: T.gold,
                  border: `1px solid ${T.gold}30`,
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  textTransform: "none",
                  px: 2,
                  "&:hover": {
                    background: `${T.gold}25`,
                    borderColor: `${T.gold}50`,
                  },
                  "&:disabled": {
                    color: T.muted,
                    borderColor: T.border,
                    background: "transparent",
                  },
                }}
              >
                {isUploading ? "Uploading…" : "Upload Files"}
              </Button>
            )}
          </Box>

          <List sx={{ p: 0 }}>
            {files.map((file, index) => {
              const progress = uploadProgress[file.name];
              const isLast = index === files.length - 1;

              return (
                <ListItem
                  key={index}
                  sx={{
                    background: T.navy2,
                    border: `1px solid ${
                      progress?.status === "completed"
                        ? `${T.emerald}30`
                        : progress?.status === "failed"
                          ? `${T.red}30`
                          : T.border
                    }`,
                    borderRadius: "12px",
                    mb: isLast ? 0 : 1,
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    px: 2,
                    py: 1.5,
                    "&:hover": {
                      background: T.navy3,
                      borderColor: `${T.gold}25`,
                    },
                  }}
                  secondaryAction={
                    progress?.status !== "uploading" && (
                      <IconButton
                        edge="end"
                        onClick={() => removeFile(file.name)}
                        disabled={isUploading}
                        size="small"
                        sx={{
                          color: T.muted,
                          "&:hover": {
                            color: T.red,
                            background: "rgba(248,113,113,0.1)",
                          },
                        }}
                      >
                        <Delete sx={{ fontSize: 17 }} />
                      </IconButton>
                    )
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      pr: 4,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: "9px",
                          background:
                            progress?.status === "completed"
                              ? `${T.emerald}15`
                              : progress?.status === "failed"
                                ? `${T.red}15`
                                : "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {getStatusIcon(progress?.status || "pending")}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={formatFileSize(file.size)}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: T.text,
                      }}
                      secondaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: "0.72rem",
                        color: T.muted,
                      }}
                      sx={{
                        flex: 1,
                        mr: 1,
                        overflow: "hidden",
                        "& .MuiListItemText-primary": {
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        },
                      }}
                    />
                    {progress?.status === "completed" && (
                      <Chip
                        label="Done"
                        size="small"
                        sx={{
                          background: `${T.emerald}15`,
                          color: T.emerald,
                          border: `1px solid ${T.emerald}30`,
                          fontWeight: 700,
                          fontSize: "0.68rem",
                          height: 20,
                        }}
                      />
                    )}
                    {progress?.status === "failed" && (
                      <Chip
                        label="Failed"
                        size="small"
                        sx={{
                          background: `${T.red}15`,
                          color: T.red,
                          border: `1px solid ${T.red}30`,
                          fontWeight: 700,
                          fontSize: "0.68rem",
                          height: 20,
                        }}
                      />
                    )}
                  </Box>

                  {progress?.status === "uploading" && (
                    <Box sx={{ width: "100%", pl: 5, mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={progress.progress}
                        sx={{
                          height: 3,
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.06)",
                          "& .MuiLinearProgress-bar": {
                            background: T.gold,
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          color: T.muted,
                          mt: 0.5,
                          fontFamily: "monospace",
                        }}
                      >
                        {Math.round(progress.progress)}%
                      </Typography>
                    </Box>
                  )}

                  {progress?.error && (
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        color: T.red,
                        mt: 0.75,
                        pl: 5,
                        fontWeight: 500,
                      }}
                    >
                      {progress.error}
                    </Typography>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </Box>
  );
}
