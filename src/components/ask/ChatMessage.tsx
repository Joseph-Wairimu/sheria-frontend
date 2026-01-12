
'use client';

import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

export function ChatMessage({ role, content, timestamp, sources }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {role === 'assistant' && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 ${
          role === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        {sources && sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-300">
            <p className="text-xs opacity-75 mb-1">Sources:</p>
            <div className="space-y-1">
              {sources.map((source, i) => (
                <p key={i} className="text-xs opacity-75">• {source}</p>
              ))}
            </div>
          </div>
        )}
        <p className="text-xs opacity-75 mt-1">
          {timestamp.toLocaleTimeString()}
        </p>
      </div>
      {role === 'user' && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
}