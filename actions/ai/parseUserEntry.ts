"use server";

import { getGroqChatStreamFromPrompt } from "./streaming";

export async function parseUserEntry(userEntry: string) {
  const chatCompletion = await getGroqChatStreamFromPrompt(userEntry);
  let response = "";
  // Accumulate the completion returned by the LLM.
  for await (const chunk of chatCompletion) {
    const content = chunk.choices[0]?.delta?.content || "";
    response += content;
  }
  return response;
}
