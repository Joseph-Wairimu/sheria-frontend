
import { apiClient } from './client';

export interface TrainModelRequest {
  domain: string;
  dataSource: string;
  features: string[];
  target: string;
}

export interface PredictionResponse {
  id: string;
  predictions: any[];
  accuracy: number;
  insights: string[];
  recommendations: string[];
}

export const predictAPI = {
  async trainModel(request: TrainModelRequest): Promise<any> {
    const response = await apiClient.post('/predict/train', request);
    return response.data;
  },

  async getPredictions(modelId: string, data: any): Promise<PredictionResponse> {
    const response = await apiClient.post(`/predict/${modelId}/predict`, data);
    return response.data;
  },

  async listModels(domain?: string): Promise<any[]> {
    const response = await apiClient.get('/predict/models', {
      params: { domain },
    });
    return response.data;
  },
};
