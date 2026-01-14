"use client";

import { env } from "next-runtime-env";
import { getAccessToken } from "./actions";

export async function sendChatMessage(
  query: string,
  conversationId: string | null
): Promise<{
  stream: ReadableStream<string>;
  conversationId: string;
}> {
  const accessToken = await getAccessToken();
  const AUTH_BASE_URL = env("NEXT_PUBLIC_API_URL");
  const endpoint = conversationId
    ? `${AUTH_BASE_URL}/rag/conversations/chat/${conversationId}`
    : `${AUTH_BASE_URL}/rag/conversations/chat/new`;
  console.log("Sending request to endpoint:", endpoint);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query,
      ...(conversationId ? { conversation_id: conversationId } : {}),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "(no body)");
    throw new Error(`Backend error ${response.status}: ${errorText}`);
  }

  if (!response.body) {
    throw new Error("No readable body in response");
  }

  const newConversationId =
    response.headers.get("x-conversation-id") || conversationId || "";

  const contentEncoding = response.headers.get("content-encoding");

  let byteStream: ReadableStream<Uint8Array> = response.body;

  if (contentEncoding === "gzip") {
    byteStream = response.body.pipeThrough(new DecompressionStream("gzip"));
  } else if (contentEncoding === "deflate") {
    byteStream = response.body.pipeThrough(new DecompressionStream("deflate"));
  }
  const textStream = byteStream.pipeThrough(
    new TextDecoderStream("utf-8", { fatal: false }) as ReadableWritablePair<
      string,
      Uint8Array
    >
  );

  return {
    stream: textStream,
    conversationId: newConversationId,
  };
}
