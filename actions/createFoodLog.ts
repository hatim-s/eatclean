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
import { accumulateNutrition } from "./lib/accumulateNutrition";

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
      // foodVsMatches: {} as Record<string, FoodItem>,
      // foodVsAllMatches: {} as Record<string, FoodItem[]>,
      foodVsNutrition: {} as Record<string, CalculatedNutrition>,
      accumulatedNutrition: {} as CalculatedNutrition,
      foodVsDbItem: {} as Record<string, FoodItem>,
    };
  }

  // Step 2: FTS5 search to find candidates for each food name (no embeddings needed)
  const foodNames = foodLog.map((f) => f.food);
  const foodVsCandidates: Record<string, FoodItem[]> = {};

  // FTS5 search - O(log n) vs O(n) for vector search
  const searchPromises = foodNames.map((foodName) => ftsFoodSearch(foodName));
  const searchResults = await Promise.allSettled(searchPromises);

  searchResults.forEach((result, index) => {
    const foodName = foodNames[index];
    if (result.status === "fulfilled") {
      foodVsCandidates[foodName] = result.value;
    } else {
      console.warn(`FTS search failed for "${foodName}":`, result.reason);
      foodVsCandidates[foodName] = [];
    }
  });

  // Step 3: AI-based best match selection for each food name
  // currently pick the first item
  const foodVsMatches: Record<string, FoodItem> = {};
  // const foodVsAllMatches: Record<string, FoodItem[]> = {};
  const candidateEntries = Object.entries(foodVsCandidates);
  const matchPromises = candidateEntries.map(([foodName, candidates]) =>
    selectBestMatch(foodName, candidates).then((bestCandidateId) => ({
      foodName,
      candidates,
      bestCandidateId,
    }))
  );
  const matchResults = await Promise.allSettled(matchPromises);

  matchResults.forEach((result) => {
    if (result.status === "fulfilled") {
      const { foodName, candidates, bestCandidateId } = result.value;
      if (bestCandidateId) {
        const bestCandidate = candidates.find((c) => c.id === bestCandidateId);
        if (bestCandidate) {
          foodVsMatches[foodName] = bestCandidate;
        } else {
          console.warn(`Best candidate not found for food name: ${foodName}`);
        }
      }
      // foodVsAllMatches[foodName] = candidates;
    } else {
      console.warn(`Best match selection failed:`, result.reason);
    }
  });

  // Step 4: Calculate the nutrition for each food name
  const foodVsNutrition: Record<string, CalculatedNutrition> = {};
  for (const [foodName, match] of Object.entries(foodVsMatches)) {
    const nutrition = calculateNutritionFromPortion(
      match,
      foodLog.find((f) => f.food === foodName)?.portion_size_gms || 0
    );
    foodVsNutrition[foodName] = nutrition;
  }

  const accumulatedNutrition = accumulateNutrition(
    Object.values(foodVsNutrition)
  );

  // Step 5: Return the results
  return {
    // foodVsMatches,
    // foodVsAllMatches,
    foodVsNutrition,
    accumulatedNutrition,
    foodVsDbItem: Object.fromEntries(
      Object.entries(foodVsMatches).map(([foodName, match]) => [
        foodName,
        {
          id: match.id,
          name: match.name,
          category: match.category,
        },
      ])
    ),
  };
}
