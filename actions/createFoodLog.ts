"use server";

import { FoodWithPortionEntry } from "@/types/ai";
import { FoodItem } from "@/types/db";
import { ftsFoodSearch } from "./db/semanticSearch";
import { MatchCandidate, selectBestMatch } from "@/actions/ai/selectBestMatch";
import { parseUserEntry } from "./ai/parseUserEntry";
import {
  CalculatedNutrition,
  calculateNutritionFromPortion,
} from "./lib/calculateNutritionFromPortion";

export type FoodLogResult = {
  entry: FoodWithPortionEntry;
  match: FoodItem | null;
  candidates: MatchCandidate[];
  calculatedNutrition: CalculatedNutrition | null;
};

// Pipeline to process user input to food log
export async function createFoodLog(userInput: string) {
  // Step 1: Parse user input to FoodLog JSON
  const foodLog = await parseUserEntry(userInput);

  if (!Array.isArray(foodLog) || foodLog.length === 0) {
    return {
      foodVsMatches: new Map<string, FoodItem>(),
      foodVsAllMatches: new Map<string, FoodItem[]>(),
      foodVsNutrition: {},
    };
  }

  // Step 2: FTS5 search to find candidates for each food name (no embeddings needed)
  const foodNames = foodLog.map((f) => f.food);
  const foodVsCandidates = new Map<string, FoodItem[]>();

  for (const foodName of foodNames) {
    // FTS5 search - O(log n) vs O(n) for vector search
    const candidates = await ftsFoodSearch(foodName);
    foodVsCandidates.set(foodName, candidates);
  }

  // Step 3: AI-based best match selection for each food name
  // currently pick the first item
  const foodVsMatches = new Map<string, FoodItem>();
  const foodVsAllMatches = new Map<string, FoodItem[]>();
  for (const [foodName, candidates] of foodVsCandidates) {
    const bestCandidateId = await selectBestMatch(foodName, candidates);
    if (bestCandidateId) {
      const bestCandidate = candidates.find((c) => c.id === bestCandidateId);
      if (bestCandidate) {
        foodVsMatches.set(foodName, bestCandidate);
      } else {
        console.warn(`Best candidate not found for food name: ${foodName}`);
      }
    }
    foodVsAllMatches.set(foodName, candidates);
  }

  // Step 4: Calculate the nutrition for each food name
  const foodVsNutrition: Record<string, CalculatedNutrition> = {};
  for (const [foodName, match] of foodVsMatches) {
    const nutrition = calculateNutritionFromPortion(
      match,
      foodLog.find((f) => f.food === foodName)?.portion_size_gms || 0
    );
    foodVsNutrition[foodName] = nutrition;
  }

  // Step 5: Return the results
  return {
    foodVsMatches,
    foodVsAllMatches,
    foodVsNutrition,
  };
}
