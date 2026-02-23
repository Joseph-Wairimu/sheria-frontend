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
        content_type: 'application/pdf',
      }),
    }
  );
  console.log('Presigned URL response status:', response.json());

  if (!response.ok) throw new Error(`Failed to get presigned URL: ${response.statusText}`);
  return response.json();
}