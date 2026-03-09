"use server";

import { FoodsWithPortions, FoodWithPortionEntry } from "@/types/ai";
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
    },
  );
  const response = chatCompletion.choices[0]?.message?.content || "";
  let responseJson: FoodsWithPortions = [];
  try {
    const parsedResponse = JSON.parse(response);
    if (!Array.isArray(parsedResponse) || parsedResponse.length === 0) {
      if (typeof parsedResponse === "object" && parsedResponse !== null) {
        responseJson = [parsedResponse as unknown as FoodWithPortionEntry];
      } else {
        responseJson = [];
      }
    } else {
      responseJson = parsedResponse;
    }
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    throw new Error("Failed to parse JSON", { cause: error });
  }
  return responseJson;
}
