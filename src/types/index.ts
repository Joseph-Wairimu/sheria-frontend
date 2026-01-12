
export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'processing' | 'completed' | 'failed';
  uploadDate: Date;
  metadata?: Record<string, any>;
}

export interface VerificationResult {
  id: string;
  documentId: string;
  status: 'verified' | 'fraudulent' | 'pending' | 'warning';
  confidence: number;
  timestamp: Date;
  blockchainHash?: string;
  checks: Array<{
    name: string;
    status: 'passed' | 'failed';
    time: string;
  }>;
  metadata: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  language: 'en' | 'sw' | 'sh';
}

export interface PredictionModel {
  id: string;
  name: string;
  domain: 'education' | 'healthcare' | 'governance' | 'infrastructure';
  accuracy: number;
  lastTrained: Date;
}
