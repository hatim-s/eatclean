"use server";

import { getGroqChatStreamFromPrompt } from "./streaming";

export async function parseUserEntry(userEntry: string) {
  const chatCompletion = await getGroqChatStreamFromPrompt(userEntry);
  // Print the completion returned by the LLM.
  for await (const chunk of chatCompletion) {
    console.log(chunk.choices[0]?.delta?.content || "");
  }
}
