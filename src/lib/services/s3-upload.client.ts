export interface PresignedUrlResponse {
    upload_url: string;
    file_id: string;
    s3_key: string;
    original_filename: string;  
    user_id: string;           
}

export interface UploadProgress {
    fileId: string;
    fileName: string;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'failed';
    error?: string;
}

export async function uploadFileToS3(
    file: File,
    presignedData: PresignedUrlResponse,  
    onProgress?: (progress: number) => void
): Promise<void> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable && onProgress) {
                onProgress((event.loaded / event.total) * 100);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
            } else {
                reject(new Error(`Upload failed: ${xhr.status} ${xhr.responseText}`));
            }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error during upload')));

        xhr.open('PUT', presignedData.upload_url);

        xhr.setRequestHeader('Content-Type', file.type);
        xhr.setRequestHeader('x-amz-meta-original_filename', presignedData.original_filename);
        xhr.setRequestHeader('x-amz-meta-user_id', presignedData.user_id);

        xhr.send(file);
    });
}

export async function uploadFilesInBulk(
    files: File[],
    onProgressUpdate: ((progress: UploadProgress) => void) | undefined,
    getPresignedUrlFn: (fileName: string) => Promise<PresignedUrlResponse>
): Promise<{ successful: PresignedUrlResponse[]; failed: { fileName: string; error: string }[] }> {
    const successful: PresignedUrlResponse[] = [];
    const failed: { fileName: string; error: string }[] = [];

    for (const file of files) {
        try {
            const presignedUrlResponse = await getPresignedUrlFn(file.name);

            onProgressUpdate?.({ fileId: presignedUrlResponse.file_id, fileName: file.name, progress: 0, status: 'uploading' });

            await uploadFileToS3(file, presignedUrlResponse, (progress) => {  
                onProgressUpdate?.({ fileId: presignedUrlResponse.file_id, fileName: file.name, progress, status: 'uploading' });
            });

            onProgressUpdate?.({ fileId: presignedUrlResponse.file_id, fileName: file.name, progress: 100, status: 'completed' });
            successful.push(presignedUrlResponse);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            failed.push({ fileName: file.name, error: errorMessage });
            onProgressUpdate?.({ fileId: '', fileName: file.name, progress: 0, status: 'failed', error: errorMessage });
        }
    }

    return { successful, failed };
}

export async function uploadSingleFile(
    file: File,
    onProgress: ((progress: number) => void) | undefined,
    getPresignedUrlFn: (fileName: string) => Promise<PresignedUrlResponse>
): Promise<PresignedUrlResponse> {
    const presignedUrlResponse = await getPresignedUrlFn(file.name);
    await uploadFileToS3(file, presignedUrlResponse, onProgress);  
    return presignedUrlResponse;
}