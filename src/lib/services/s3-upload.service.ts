
export interface PresignedUrlResponse {
  upload_url: string;
  file_id: string;
  s3_key: string;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number; 
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sheria-model-backend.greyteam.co.ke';

function getAccessTokenFromCookies(): string | null {
  const match = document.cookie.match(/(^| )access_token=([^;]+)/);
  return match ? match[2] : null;
}
export async function getPresignedUrl(fileName: string): Promise<PresignedUrlResponse> {
    const token = getAccessTokenFromCookies();

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/upload/generate-presigned-url`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({
          filename: fileName,
          content_type: 'application/pdf', 
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get presigned URL: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    throw error;
  }
}

export async function uploadFileToS3(
  file: File,
  presignedUrl: string,
  onProgress?: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const url = new URL(presignedUrl);

    const contentType = url.searchParams.get('content-type');
    const originalFilename = url.searchParams.get('x-amz-meta-original_filename');
    const userId = url.searchParams.get('x-amz-meta-user_id');

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed: ${xhr.status} ${xhr.responseText}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    xhr.open('PUT', presignedUrl);

    if (contentType) {
      xhr.setRequestHeader('Content-Type', contentType);
    }

    if (originalFilename) {
      xhr.setRequestHeader('x-amz-meta-original_filename', originalFilename);
    }

    if (userId) {
      xhr.setRequestHeader('x-amz-meta-user_id', userId);
    }

    xhr.send(file);
  });
}
export async function uploadFilesInBulk(
  files: File[],
  onProgressUpdate?: (progress: UploadProgress) => void
): Promise<{ successful: PresignedUrlResponse[]; failed: { fileName: string; error: string }[] }> {
  const successful: PresignedUrlResponse[] = [];
  const failed: { fileName: string; error: string }[] = [];

  for (const file of files) {
    try {
      const presignedUrlResponse = await getPresignedUrl(file.name);

      onProgressUpdate?.({
        fileId: presignedUrlResponse.file_id,
        fileName: file.name,
        progress: 0,
        status: 'uploading',
      });

      await uploadFileToS3(file, presignedUrlResponse.upload_url, (progress) => {
        onProgressUpdate?.({
          fileId: presignedUrlResponse.file_id,
          fileName: file.name,
          progress,
          status: 'uploading',
        });
      });

      onProgressUpdate?.({
        fileId: presignedUrlResponse.file_id,
        fileName: file.name,
        progress: 100,
        status: 'completed',
      });

      successful.push(presignedUrlResponse);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      failed.push({
        fileName: file.name,
        error: errorMessage,
      });

      onProgressUpdate?.({
        fileId: '',
        fileName: file.name,
        progress: 0,
        status: 'failed',
        error: errorMessage,
      });
    }
  }

  return { successful, failed };
}


export async function uploadSingleFile(
  file: File,
  onProgress?: (progress: number) => void
): Promise<PresignedUrlResponse> {
  const presignedUrlResponse = await getPresignedUrl(file.name);
  await uploadFileToS3(file, presignedUrlResponse.upload_url, onProgress);
  return presignedUrlResponse;
}