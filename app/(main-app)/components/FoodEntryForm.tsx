"use client";

import { useState } from "react";
import { Button } from "@/ui/components/base/button";
import { Textarea } from "@/ui/components/base/textarea";
import { createFoodLog } from "@/actions/createFoodLog";

export function FoodEntryForm() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setResponse("");
    try {
      const matchesMap = await createFoodLog(input);
      console.log(matchesMap);

      const { foodVsNutrition } = matchesMap;
      setResponse(JSON.stringify(foodVsNutrition, null, 2));
    } catch (error) {
      setResponse(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your food entry..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </form>
      {response && (
        <pre className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 whitespace-pre-wrap wrap-break-word">
          {response}
        </pre>
      )}
    </div>
  );
}
