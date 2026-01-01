"use server";

import { FoodLog } from "@/types/ai";
import { db } from "@/db/client";
import { foods } from "@/db/schema";
import { like } from "drizzle-orm";
import { Food } from "@/types/db";

function lexicalMatch(query: string, candidate: string): number {
  const queryLower = query.toLowerCase().trim();
  const candidateLower = candidate.toLowerCase().trim();

  // Exact match gets highest score
  if (candidateLower === queryLower) {
    return 100;
  }

  // Starts with match
  if (candidateLower.startsWith(queryLower)) {
    return 80;
  }

  // Contains match
  if (candidateLower.includes(queryLower)) {
    return 60;
  }

  // Word boundary match (starts with word)
  const words = candidateLower.split(/\s+/);
  if (words.some((word) => word.startsWith(queryLower))) {
    return 50;
  }

  // Partial word match
  if (words.some((word) => word.includes(queryLower))) {
    return 30;
  }

  return 0;
}

function pickBestMatch(query: string, candidates: Food[]): Food | null {
  if (candidates.length === 0) return null;

  const scored = candidates.map((food) => ({
    food,
    score: lexicalMatch(query, food.name),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored[0].score > 0 ? scored[0].food : null;
}

export async function createFoodLog(foodLog: FoodLog) {
  console.log("Processing food log:", foodLog);

  // Extract unique food names
  const foodNames = [...new Set(foodLog.map((entry) => entry.food))];
  console.log(`Found ${foodNames.length} unique food names`);

  // Query for matches for each food name
  const matchesMap = new Map<string, Food[]>();

  for (const foodName of foodNames) {
    const searchPattern = `%${foodName}%`;

    const results = await db
      .select()
      .from(foods)
      .where(like(foods.name, searchPattern))
      .limit(3);

    matchesMap.set(foodName, results);
    console.log(`\n"${foodName}": Found ${results.length} matches`);
    results.forEach((food, idx) => {
      console.log(`  ${idx + 1}. ${food.name} (ID: ${food.id})`);
    });
  }

  // Process and pick best matches
  console.log("\n=== Best Matches (Lexical) ===");
  const bestMatches = new Map<string, Food | null>();

  for (const [foodName, candidates] of matchesMap.entries()) {
    const best = pickBestMatch(foodName, candidates);
    bestMatches.set(foodName, best);

    if (best) {
      console.log(`"${foodName}" → "${best.name}" (ID: ${best.id})`);
    } else {
      console.log(`"${foodName}" → No match found`);
    }
  }

  // Log full details for each food log entry
  console.log("\n=== Food Log Processing Summary ===");
  for (const entry of foodLog) {
    const bestMatch = bestMatches.get(entry.food);
    console.log(`\nEntry: ${entry.food} (${entry.portion_size_gms}g)`);
    if (bestMatch) {
      console.log(`  Matched to: ${bestMatch.name}`);
      console.log(`  Category: ${bestMatch.category}`);
      console.log(`  Calories per 100g: ${bestMatch.calories}`);
      console.log(
        `  Estimated calories: ${
          (bestMatch.calories * entry.portion_size_gms) / 100
        }`
      );
    } else {
      console.log(`  No match found`);
    }
  }

  return {
    matchesMap,
  };
}
