
import { apiClient } from './client';
import { VerificationResult } from '@/src/types';

export interface VerifyRequest {
  documentId: string;
  documentType?: string;
}

export const verifyAPI = {
  async verifyDocument(request: VerifyRequest): Promise<VerificationResult> {
    const response = await apiClient.post('/verify', request);
    return response.data;
  },

  async getVerificationHistory(documentId: string): Promise<VerificationResult[]> {
    const response = await apiClient.get(`/verify/history/${documentId}`);
    return response.data;
  },
};