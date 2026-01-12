
import { apiClient } from './client';

export interface DigitizeRequest {
  files: File[];
  language?: string;
  documentType?: string;
}

export interface DigitizeResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  text?: string;
  metadata?: {
    documentType: string;
    language: string;
    confidence: number;
    entities: string[];
  };
}

export const digitizeAPI = {
  async uploadDocuments(request: DigitizeRequest): Promise<DigitizeResponse[]> {
    const formData = new FormData();
    request.files.forEach((file) => formData.append('files', file));
    if (request.language) formData.append('language', request.language);
    if (request.documentType) formData.append('documentType', request.documentType);

    const response = await apiClient.post('/digitize/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async getStatus(id: string): Promise<DigitizeResponse> {
    const response = await apiClient.get(`/digitize/status/${id}`);
    return response.data;
  },
};