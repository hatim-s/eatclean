"use server";

import { db } from "@/db/client";
import { foods } from "@/db/schema";
import { sql, isNotNull } from "drizzle-orm";
import { FoodItem } from "@/types/db";

export type FoodWithDistance = FoodItem & { distance: number };

export async function semanticFoodSearch(
  serializedEmbedding: string,
  limit: number = 20
): Promise<FoodWithDistance[]> {
  // Use Turso's vector_distance_cos for cosine similarity search
  // Lower distance = more similar
  const results = await db
    .select({
      id: foods.id,
      name: foods.name,
      category: foods.category,
      dataSource: foods.dataSource,
      calories: foods.calories,
      protein: foods.protein,
      carbs: foods.carbs,
      fat: foods.fat,
      fiber: foods.fiber,
      saturatedFat: foods.saturatedFat,
      omega3: foods.omega3,
      omega6: foods.omega6,
      sodium: foods.sodium,
      potassium: foods.potassium,
      calcium: foods.calcium,
      iron: foods.iron,
      magnesium: foods.magnesium,
      zinc: foods.zinc,
      vitaminA: foods.vitaminA,
      vitaminC: foods.vitaminC,
      vitaminD: foods.vitaminD,
      vitaminE: foods.vitaminE,
      vitaminK: foods.vitaminK,
      vitaminB1: foods.vitaminB1,
      vitaminB2: foods.vitaminB2,
      vitaminB3: foods.vitaminB3,
      vitaminB5: foods.vitaminB5,
      vitaminB6: foods.vitaminB6,
      vitaminB9: foods.vitaminB9,
      vitaminB12: foods.vitaminB12,
      embedding: foods.embedding,
      distance:
        sql<number>`vector_distance_cos(${foods.embedding}, ${serializedEmbedding})`.as(
          "distance"
        ),
    })
    .from(foods)
    .where(isNotNull(foods.embedding))
    .orderBy(sql`distance`)
    .limit(limit);

  return results as FoodWithDistance[];
}

// Fallback to lexical search if embeddings aren't available
export async function fallbackLexicalSearch(
  foodName: string,
  limit: number = 10
): Promise<FoodItem[]> {
  const { like } = await import("drizzle-orm");
  const searchPattern = `%${foodName}%`;

  const results = await db
    .select()
    .from(foods)
    .where(like(foods.name, searchPattern))
    .limit(limit);

  return results;
}

// Hybrid search: try semantic first, fall back to lexical
export async function hybridFoodSearch(
  foodName: string,
  limit: number = 10
): Promise<FoodItem[]> {
  try {
    const semanticResults = await semanticFoodSearch(foodName, limit);

    // If we got good semantic results, return them
    if (semanticResults.length > 0) {
      return semanticResults;
    }
  } catch (error) {
    console.warn("Semantic search failed, falling back to lexical:", error);
  }

  // Fall back to lexical search
  return fallbackLexicalSearch(foodName, limit);
}
