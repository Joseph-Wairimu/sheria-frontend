'use client';

import { useCallback, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  alpha,
  Stack,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  Delete,
  CheckCircle,
  Error as ErrorIcon,
  Upload,
} from '@mui/icons-material';
import { formatFileSize } from '@/src/lib/utils/formatters';
import { uploadFilesInBulk, UploadProgress } from '@/src/lib/services/s3-upload.service';

interface FileWithProgress extends File {
  id: string;
}

interface FileUploadState {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  error?: string;
}

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  onUploadComplete?: (results: { fileId: string; fileName: string; s3Key: string }[]) => void;
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
  const [uploadProgress, setUploadProgress] = useState<Record<string, FileUploadState>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      handleFilesSelected(droppedFiles);
    },
    [maxFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, maxFiles);
      handleFilesSelected(selectedFiles);
    }
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setUploadError(null);
    
    const newProgress: Record<string, FileUploadState> = {};
    selectedFiles.forEach((file) => {
      newProgress[file.name] = {
        fileId: '',
        fileName: file.name,
        progress: 0,
        status: 'pending',
      };
    });
    setUploadProgress(newProgress);
    onFilesSelected(selectedFiles);

    if (autoUpload) {
      handleUpload(selectedFiles);
    }
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
      const results = await uploadFilesInBulk(filesToUpload, (progress: UploadProgress) => {
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
      });

      if (onUploadComplete && results.successful.length > 0) {
        onUploadComplete(
          results.successful.map((r) => ({
            fileId: r.file_id,
            fileName: filesToUpload.find((f) => f.name)?.name || '',
            s3Key: r.s3_key,
          }))
        );
      }

      if (results.failed.length > 0) {
        setUploadError(
          `${results.failed.length} file(s) failed to upload: ${results.failed.map((f) => f.fileName).join(', ')}`
        );
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadError(errorMessage);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = (status: FileUploadState['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'failed':
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      case 'uploading':
        return <Upload sx={{ color: 'primary.main', animation: 'spin 1s linear infinite' }} />;
      default:
        return <InsertDriveFile sx={{ color: '#8b5cf6' }} />;
    }
  };

  const allFilesUploaded = files.length > 0 && 
    files.every((f) => uploadProgress[f.name]?.status === 'completed');

  return (
    <Box>
      {uploadError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setUploadError(null)}>
          {uploadError}
        </Alert>
      )}

      <Paper
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        elevation={0}
        sx={{
          p: 6,
          textAlign: 'center',
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : alpha('#cbd5e1', 0.6),
          bgcolor: isDragging ? alpha('#2563eb', 0.05) : alpha('#f8fafc', 0.8),
          borderRadius: 3,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: alpha('#2563eb', 0.03),
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: alpha('#2563eb', 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <CloudUpload sx={{ fontSize: 40, color: 'primary.main' }} />
        </Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
          Drop your files here
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
          or click to browse from your computer
        </Typography>
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="file-upload-input"
          disabled={isUploading}
        />
        <label htmlFor="file-upload-input">
          <Button
            variant="contained"
            component="span"
            size="large"
            disabled={isUploading}
            sx={{ borderRadius: 2.5, px: 4, fontWeight: 700 }}
          >
            Choose Files
          </Button>
        </label>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
          <Chip label={`Max ${maxFiles} files`} size="small" sx={{ fontWeight: 600 }} />
          <Chip label="PDF, PNG, JPG" size="small" sx={{ fontWeight: 600 }} />
        </Stack>
      </Paper>

      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {files.length} {files.length === 1 ? 'file' : 'files'} selected
              </Typography>
            </Box>
            {!allFilesUploaded && files.length > 0 && (
              <Button
                variant="contained"
                onClick={() => handleUpload(files)}
                disabled={isUploading}
                size="small"
                sx={{ borderRadius: 2.5 }}
              >
                {isUploading ? 'Uploading...' : 'Upload Files'}
              </Button>
            )}
          </Box>

          <List sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 0 }}>
            {files.map((file, index) => {
              const progress = uploadProgress[file.name];
              const isLast = index === files.length - 1;

              return (
                <ListItem
                  key={index}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    mb: isLast ? 0 : 1,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: alpha('#f8fafc', 0.8),
                      borderColor: 'primary.main',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                  secondaryAction={
                    progress?.status !== 'uploading' && (
                      <IconButton
                        edge="end"
                        onClick={() => removeFile(file.name)}
                        disabled={isUploading}
                        sx={{
                          '&:hover': {
                            bgcolor: alpha('#ef4444', 0.1),
                            color: 'error.main',
                          },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    )
                  }
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: progress ? 1 : 0 }}>
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1.5,
                          bgcolor: alpha('#8b5cf6', 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {getStatusIcon(progress?.status || 'pending')}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={formatFileSize(file.size)}
                      primaryTypographyProps={{ fontWeight: 600 }}
                      secondaryTypographyProps={{ fontWeight: 500 }}
                      sx={{ flex: 1 }}
                    />
                    {progress?.status === 'completed' && (
                      <Chip label="Done" size="small" color="success" />
                    )}
                    {progress?.status === 'failed' && (
                      <Chip label="Failed" size="small" color="error" />
                    )}
                  </Box>

                  {progress?.status === 'uploading' && (
                    <Box sx={{ width: '100%', pl: 7 }}>
                      <LinearProgress
                        variant="determinate"
                        value={progress.progress}
                        sx={{ borderRadius: 1, height: 6 }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {Math.round(progress.progress)}%
                      </Typography>
                    </Box>
                  )}

                  {progress?.error && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 1, pl: 7, fontWeight: 500 }}
                    >
                      Error: {progress.error}
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