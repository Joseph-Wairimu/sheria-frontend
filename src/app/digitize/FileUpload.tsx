
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
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  Delete,
  CheckCircle,
} from '@mui/icons-material';
import { formatFileSize } from '@/src/lib/utils/formatters';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
}

export default function FileUpload({ onFilesSelected, maxFiles = 10 }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      setFiles(droppedFiles);
      onFilesSelected(droppedFiles);
    },
    [maxFiles, onFilesSelected]
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
      setFiles(selectedFiles);
      onFilesSelected(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <Box>
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
        />
        <label htmlFor="file-upload-input">
          <Button
            variant="contained"
            component="span"
            size="large"
            sx={{ borderRadius: 2.5, px: 4, fontWeight: 700 }}
          >
            Choose Files
          </Button>
        </label>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
          <Chip
            label={`Max ${maxFiles} files`}
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="PDF, PNG, JPG"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
      </Paper>

      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {files.length} {files.length === 1 ? 'file' : 'files'} selected
            </Typography>
          </Box>
          <List sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 0 }}>
            {files.map((file, index) => (
              <ListItem
                key={index}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  mb: index < files.length - 1 ? 1 : 0,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: alpha('#f8fafc', 0.8),
                    borderColor: 'primary.main',
                  },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => removeFile(index)}
                    sx={{
                      '&:hover': {
                        bgcolor: alpha('#ef4444', 0.1),
                        color: 'error.main',
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                }
              >
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
                    <InsertDriveFile sx={{ color: '#8b5cf6' }} />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={formatFileSize(file.size)}
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
