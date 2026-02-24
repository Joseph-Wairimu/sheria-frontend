"use server";
import { cookies } from "next/headers";
import { PresignedUrlResponse } from "./s3-upload.client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sheria-model-backend.greyteam.co.ke';

export async function getPresignedUrl(fileName: string): Promise<PresignedUrlResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) throw new Error("No access token found");

    const response = await fetch(
        `${API_BASE_URL}/api/v1/upload/generate-presigned-url`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                filename: fileName,
                content_type: getContentType(fileName),
            }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Presigned URL error:", response.status, errorText);
        throw new Error(`Failed to get presigned URL: ${errorText}`);
    }

    const data = await response.json();

    const userId = data.s3_key.split('/')[1];

    return {
        ...data,
        original_filename: fileName,
        user_id: userId,
    };
}

function getContentType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const types: Record<string, string> = {
        pdf: 'application/pdf',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
    };
    return types[ext || ''] || 'application/octet-stream';
}