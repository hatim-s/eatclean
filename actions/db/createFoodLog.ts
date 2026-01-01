"use server";

import { FoodLog, FoodLogEntry } from "@/types/ai";
import { db } from "@/db/client";
import { foods } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Food } from "@/types/db";
import { hybridFoodSearch } from "./semanticSearch";
import { selectBestMatch, MatchCandidate } from "@/actions/ai/selectBestMatch";

export type FoodLogResult = {
  entry: FoodLogEntry;
  match: Food | null;
  candidates: MatchCandidate[];
  calculatedNutrition: CalculatedNutrition | null;
};

export type CalculatedNutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
};

function calculateNutrition(
  food: Food,
  portionGrams: number
): CalculatedNutrition {
  const multiplier = portionGrams / 100; // Nutrients are per 100g
  return {
    calories: food.calories * multiplier,
    protein: food.protein * multiplier,
    carbs: food.carbs * multiplier,
    fat: food.fat * multiplier,
    fiber: food.fiber * multiplier,
  };
}

export async function createFoodLog(
  foodLog: FoodLog
): Promise<FoodLogResult[]> {
  console.log("Processing food log:", foodLog);

  const results: FoodLogResult[] = [];

  for (const entry of foodLog) {
    console.log(`\nProcessing: "${entry.food}" (${entry.portion_size_gms}g)`);

    // Step 2: Semantic search to find candidates
    const candidates = await hybridFoodSearch(entry.food, 5);

    console.log(`  Found ${candidates.length} candidates:`);
    candidates.forEach((c, i) => {
      console.log(`    ${i + 1}. ${c.name} (${c.category})`);
    });

    if (candidates.length === 0) {
      console.log(`  ✗ No matches found`);
      results.push({
        entry,
        match: null,
        candidates: [],
        calculatedNutrition: null,
      });
      continue;
    }

    // Step 3: AI-based best match selection
    const matchCandidates: MatchCandidate[] = candidates.map((c) => ({
      id: c.id,
      name: c.name,
      category: c.category,
    }));

    const bestMatchId = await selectBestMatch(entry.food, matchCandidates);
    console.log(`  AI selected match ID: ${bestMatchId}`);

    let match: Food | null = null;
    let calculatedNutrition: CalculatedNutrition | null = null;

    if (bestMatchId !== null) {
      // Fetch the full food record
      const [foodRecord] = await db
        .select()
        .from(foods)
        .where(eq(foods.id, bestMatchId))
        .limit(1);

      if (foodRecord) {
        match = foodRecord;
        calculatedNutrition = calculateNutrition(
          foodRecord,
          entry.portion_size_gms
        );

        console.log(`  ✓ Matched to: "${match.name}"`);
        console.log(`    Category: ${match.category}`);
        console.log(
          `    Estimated calories: ${calculatedNutrition.calories.toFixed(
            1
          )} kcal`
        );
        console.log(`    Protein: ${calculatedNutrition.protein.toFixed(1)}g`);
        console.log(`    Carbs: ${calculatedNutrition.carbs.toFixed(1)}g`);
        console.log(`    Fat: ${calculatedNutrition.fat.toFixed(1)}g`);
      }
    } else {
      console.log(`  ✗ AI determined no good match`);
    }

    results.push({
      entry,
      match,
      candidates: matchCandidates,
      calculatedNutrition,
    });
  }

  // Summary
  console.log("\n=== Food Log Processing Summary ===");
  const matched = results.filter((r) => r.match !== null).length;
  console.log(`Matched: ${matched}/${results.length}`);

  if (matched > 0) {
    const totalCalories = results.reduce(
      (sum, r) => sum + (r.calculatedNutrition?.calories || 0),
      0
    );
    const totalProtein = results.reduce(
      (sum, r) => sum + (r.calculatedNutrition?.protein || 0),
      0
    );
    console.log(`Total estimated calories: ${totalCalories.toFixed(1)} kcal`);
    console.log(`Total estimated protein: ${totalProtein.toFixed(1)}g`);
  }

  return results;
}

// Convenience function to process raw user input through the full pipeline
export async function processUserFoodEntry(
  userInput: string
): Promise<FoodLogResult[]> {
  const { parseUserEntry } = await import("@/actions/ai/parseUserEntry");

  // Step 1: Parse user input to FoodLog JSON
  const parsedResponse = await parseUserEntry(userInput);

  let foodLog: FoodLog;
  try {
    foodLog = JSON.parse(parsedResponse);
  } catch {
    console.error("Failed to parse AI response:", parsedResponse);
    throw new Error("Failed to parse food entry");
  }

  if (!Array.isArray(foodLog) || foodLog.length === 0) {
    return [];
  }

  // Steps 2 & 3: Semantic search + AI matching
  return createFoodLog(foodLog);
}
