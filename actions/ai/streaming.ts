import Groq from "groq-sdk";
import { ChatCompletionCreateParamsBase } from "groq-sdk/resources/chat/completions.mjs";
import { getMessagesWithSystemPrompt } from "../lib/getMessagesWithSystemPrompt";
import { DEFAULT_MODEL } from "../constants";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatStream(
  messages: ChatCompletionCreateParamsBase["messages"],
  model: ChatCompletionCreateParamsBase["model"] = DEFAULT_MODEL,
  options?: Omit<ChatCompletionCreateParamsBase, "messages" | "model">
) {
  return groq.chat.completions.create({
    messages: getMessagesWithSystemPrompt(messages),
    model: model,
    ...options,
    // explicitly stream the response
    stream: true,
  });
}

export async function getGroqChatStreamFromPrompt(
  prompt: string,
  model: ChatCompletionCreateParamsBase["model"] = DEFAULT_MODEL,
  options?: Omit<ChatCompletionCreateParamsBase, "messages" | "model">
) {
  return getGroqChatStream(
    [
      {
        role: "user",
        content: prompt,
      },
    ],
    model,
    options
  );
}
