"use server";
import { env } from "next-runtime-env";
import { cookies } from "next/headers";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
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

export async function getAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("No access token found");
  }

  return token;
}
const AUTH_BASE_URL = env("MODEL_BASE_URL");
export async function fetchConversations(): Promise<Conversation[]> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${AUTH_BASE_URL}/rag/conversations/list`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    return [];
  }
}

export async function fetchConversationMessages(
  conversationId: string
): Promise<ChatMessage[]> {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(
      `${AUTH_BASE_URL}/rag/conversations/${conversationId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched conversation messages:", data);
    return data.data || [];
  } catch (error) {
    console.error("Failed to load conversation:", error);
    return [];
  }
}



