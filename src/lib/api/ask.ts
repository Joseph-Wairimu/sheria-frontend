
import { apiClient } from './client';
import { ChatMessage } from '@/src/types';

export interface AskRequest {
  query: string;
  language?: string;
  context?: string[];
}

export interface AskResponse {
  id: string;
  response: string;
  sources: string[];
  confidence: number;
  timestamp: Date;
}

export const askAPI = {
  async sendQuery(request: AskRequest): Promise<AskResponse> {
    const response = await apiClient.post('/ask/query', request);
    return response.data;
  },

  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    const response = await apiClient.get(`/ask/history/${sessionId}`);
    return response.data;
  },
};