'use server';

import { cookies } from 'next/headers';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updated_at: string;
}

async function getAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  return token;
}

export async function fetchConversations(): Promise<Conversation[]> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      'https://sheria-backend.greyteam.co.ke/rag/conversations/list',
      {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    return [];
  }
}

export async function fetchConversationMessages(
  conversationId: string
): Promise<ChatMessage[]> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://sheria-backend.greyteam.co.ke/rag/conversations/${conversationId}`,
      {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error('Failed to load conversation:', error);
    return [];
  }
}

export async function sendChatMessage(
  query: string,
  conversationId: string | null
): Promise<ReadableStream<Uint8Array>> {
  try {
    const accessToken = await getAccessToken();

    const endpoint = conversationId
      ? `https://sheria-backend.greyteam.co.ke/rag/conversations/chat/${conversationId}`
      : 'https://sheria-backend.greyteam.co.ke/rag/conversations/chat/new';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: query,
        conversation_id: conversationId || 'string',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is not readable');
    }

    return response.body;
  } catch (error) {
    console.error('Streaming error:', error);
    throw error;
  }
}