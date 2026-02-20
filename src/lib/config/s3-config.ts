// src/lib/config/s3-config.ts
// Configuration utilities for different S3 server setups

export interface S3Config {
  apiBaseUrl: string;
  presignedUrlEndpoint: string;
  processDocumentsEndpoint: string;
  maxFileSize: number;
  allowedFileTypes: string[];
  uploadTimeout: number;
  maxRetries: number;
  customHeaders?: Record<string, string>;
}

export const DEFAULT_S3_CONFIG: S3Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sheria-model-backend.greyteam.co.ke',
  presignedUrlEndpoint: '/api/v1/upload/generate-presigned-url',
  processDocumentsEndpoint: '/api/v1/process/documents',
  maxFileSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '104857600'),
  allowedFileTypes: ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'],
  uploadTimeout: 300000, 
  maxRetries: 3,
  customHeaders: {},
};

export const MINIO_S3_CONFIG: S3Config = {
  ...DEFAULT_S3_CONFIG,
  maxFileSize: 5 * 1024 * 1024 * 1024,
  uploadTimeout: 600000, 
  customHeaders: {
    'Cache-Control': 'max-age=3600',
  },
};

export const BACKBLAZE_S3_CONFIG: S3Config = {
  ...DEFAULT_S3_CONFIG,
  maxFileSize: 5 * 1024 * 1024 * 1024, 
  uploadTimeout: 600000, 
  maxRetries: 5, 
};

export const DIGITALOCEAN_SPACES_CONFIG: S3Config = {
  ...DEFAULT_S3_CONFIG,
  maxFileSize: 5 * 1024 * 1024 * 1024, 
  uploadTimeout: 600000, 
};

export const WASABI_S3_CONFIG: S3Config = {
  ...DEFAULT_S3_CONFIG,
  maxFileSize: 10 * 1024 * 1024 * 1024, // 10GB
  uploadTimeout: 600000, // 10 minutes
  maxRetries: 5,
};


export function getS3Config(provider?: 'minio' | 'backblaze' | 'digitalocean' | 'wasabi' | 'default'): S3Config {
  switch (provider) {
    case 'minio':
      return MINIO_S3_CONFIG;
    case 'backblaze':
      return BACKBLAZE_S3_CONFIG;
    case 'digitalocean':
      return DIGITALOCEAN_SPACES_CONFIG;
    case 'wasabi':
      return WASABI_S3_CONFIG;
    default:
      return DEFAULT_S3_CONFIG;
  }
}


export function mergeS3Config(customConfig: Partial<S3Config>): S3Config {
  return {
    ...DEFAULT_S3_CONFIG,
    ...customConfig,
  };
}


export function buildPresignedUrlEndpoint(config: S3Config): string {
  return `${config.apiBaseUrl}${config.presignedUrlEndpoint}`;
}


export function buildProcessDocumentsEndpoint(config: S3Config): string {
  return `${config.apiBaseUrl}${config.processDocumentsEndpoint}`;
}


export function getMimeType(fileName: string): string {
  const ext = fileName.toLowerCase().split('.').pop();
  
  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    txt: 'text/plain',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };

  return mimeTypes[ext || ''] || 'application/octet-stream';
}


export function isFileTypeAllowed(fileName: string, allowedTypes: string[]): boolean {
  const mimeType = getMimeType(fileName);
  return allowedTypes.includes(mimeType);
}


export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate file before upload
 */
export function validateFileForUpload(
  file: File,
  config: S3Config
): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > config.maxFileSize) {
    return {
      valid: false,
      error: `File size exceeds ${formatFileSize(config.maxFileSize)} limit`,
    };
  }

  // Check file type
  if (!isFileTypeAllowed(file.name, config.allowedFileTypes)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${config.allowedFileTypes.join(', ')}`,
    };
  }

  // Check file name
  if (!file.name || file.name.trim().length === 0) {
    return {
      valid: false,
      error: 'File name is required',
    };
  }

  return { valid: true };
}

/**
 * Create abort controller with timeout
 */
export function createAbortControllerWithTimeout(timeoutMs: number): {
  controller: AbortController;
  timeoutId: ReturnType<typeof setTimeout>;
} {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, timeoutId };
}

/**
 * Exponential backoff calculator
 */
export function calculateBackoffDelay(retryCount: number, baseDelay = 1000): number {
  // 1s, 2s, 4s, 8s, etc with random jitter
  const delay = baseDelay * Math.pow(2, retryCount);
  const jitter = Math.random() * 0.1 * delay; // 10% jitter
  return Math.min(delay + jitter, 32000); // Cap at 32s
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: unknown, statusCode?: number): boolean {
  // Network/timeout errors are always retryable
  if (error instanceof DOMException && error.name === 'AbortError') {
    return true;
  }

  // Retryable HTTP status codes
  const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
  if (statusCode && retryableStatusCodes.includes(statusCode)) {
    return true;
  }

  // Network errors
  if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
    return true;
  }

  return false;
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown, statusCode?: number): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (statusCode === 429) {
    return 'Too many requests. Please try again in a moment.';
  }

  if (statusCode === 403) {
    return 'Access denied. Check your credentials.';
  }

  if (statusCode === 404) {
    return 'Endpoint not found. Check configuration.';
  }

  if (statusCode && statusCode >= 500) {
    return 'Server error. Please try again later.';
  }

  if (statusCode === 0 || !statusCode) {
    return 'Network error. Check your connection.';
  }

  return 'Unknown error occurred. Please try again.';
}

/**
 * S3 Config for Cloudflare tunneled servers (recommended for your setup)
 */
export const CLOUDFLARE_TUNNELED_S3_CONFIG: S3Config = {
  ...DEFAULT_S3_CONFIG,
  uploadTimeout: 600000, // 10 minutes (recommended for Cloudflare)
  maxRetries: 5, // More retries for potentially unstable connections
  customHeaders: {
    'CF-Cache-Control': 'no-cache', // Don't cache uploads
  },
};


export function getCloudflareS3Config(apiUrl: string): S3Config {
  return {
    ...CLOUDFLARE_TUNNELED_S3_CONFIG,
    apiBaseUrl: apiUrl,
  };
}