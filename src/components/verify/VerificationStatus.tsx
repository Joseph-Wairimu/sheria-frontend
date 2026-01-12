'use client';

import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface VerificationStatusProps {
  status: 'verified' | 'failed' | 'pending' | 'warning';
  confidence?: number;
  message?: string;
}

export function VerificationStatus({ status, confidence, message }: VerificationStatusProps) {
  const config = {
    verified: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      title: 'Verified',
    },
    failed: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      title: 'Verification Failed',
    },
    pending: {
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      title: 'Pending',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      title: 'Warning',
    },
  };

  const { icon: Icon, color, bg, border, title } = config[status];

  return (
    <div className={`p-6 rounded-lg border-2 ${bg} ${border}`}>
      <div className="flex items-center gap-3">
        <Icon className={`h-8 w-8 ${color}`} />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          {confidence !== undefined && (
            <p className="text-sm text-gray-600">
              Confidence: {(confidence * 100).toFixed(1)}%
            </p>
          )}
          {message && <p className="text-sm text-gray-700 mt-1">{message}</p>}
        </div>
      </div>
    </div>
  );
}