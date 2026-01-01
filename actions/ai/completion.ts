import Groq from "groq-sdk";
import {
  ChatCompletionCreateParamsBase,
  ChatCompletionMessageParam,
} from "groq-sdk/resources/chat/completions.mjs";
import { getMessagesWithSystemPrompt } from "./prompt";
import { DEFAULT_MODEL } from "./constants";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(
  messages: Array<ChatCompletionMessageParam>,
  model: ChatCompletionCreateParamsBase["model"] = DEFAULT_MODEL,
  options?: Omit<ChatCompletionCreateParamsBase, "messages" | "model">
) {
  return groq.chat.completions.create({
    messages: getMessagesWithSystemPrompt(messages),
    model: model,

    // Controls randomness: lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic
    // and repetitive.
    // temperature: 0.5,

    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    // max_completion_tokens: 1024,

    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    // top_p: 1,

    // A stop sequence is a predefined or user-specified text string that
    // signals an AI to stop generating content, ensuring its responses
    // remain focused and concise. Examples include punctuation marks and
    // markers like "[end]".
    // stop: null,

    ...options,

    stream: false,
  });
}

export async function getGroqChatCompletionFromPrompt(
  prompt: string,
  model: ChatCompletionCreateParamsBase["model"] = DEFAULT_MODEL,
  options?: Omit<ChatCompletionCreateParamsBase, "messages" | "model">
) {
  return getGroqChatCompletion(
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
