"use server";

import { FoodsWithPortions } from "@/types/ai";
import { getGroqChatCompletionFromPrompt } from "./completion";

export async function parseUserEntry(userEntry: string) {
  const chatCompletion = await getGroqChatCompletionFromPrompt(
    userEntry,
    undefined,
    {
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "food_log",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                food: { type: "string" },
                portion_size_gms: { type: "number" },
              },
              required: ["food", "portion_size_gms"],
            },
          },
        },
      },
    }
  );
  const response = chatCompletion.choices[0]?.message?.content || "";
  let responseJson: FoodsWithPortions = [];
  try {
    responseJson = JSON.parse(response);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    throw new Error("Failed to parse JSON", { cause: error });
  }
  return responseJson;
}
