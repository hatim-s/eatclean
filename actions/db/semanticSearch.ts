"use server";

import { db, client } from "@/db/client";
import { foods } from "@/db/schema";
import { FoodItem } from "@/types/db";

export type FoodWithDistance = FoodItem & { distance: number };

/**
 * FTS5 full-text search on food names (O(log n) vs O(n) for vector search)
 * Uses FTS5 virtual table with MATCH query and prefix wildcard
 */
export async function ftsFoodSearch(
  foodName: string,
  limit: number = 10
): Promise<FoodItem[]> {
  // Sanitize input for FTS5 query - escape special characters and add prefix wildcard
  const sanitized = foodName
    .replace(/['"]/g, "") // Remove quotes
    .replace(/[^\w\s]/g, " ") // Replace special chars with spaces
    .trim();

  if (!sanitized) {
    return [];
  }

  // Build FTS5 query with prefix matching for each word
  const terms = sanitized.split(/\s+/).filter(Boolean);

  // @todo: add sanitization to prevent sql injection ?
  const ftsQuery = terms.map((term) => `${term}*`).join(" ");

  try {
    // Use libSQL client directly for FTS5 raw SQL query
    const result = await client.execute({
      sql: `SELECT 
              foods.id, foods.name, foods.category,
              foods.calories, foods.protein, foods.carbs, foods.fat, foods.fiber,
              foods.saturated_fat, foods.omega_3, foods.omega_6,
              foods.sodium, foods.potassium, foods.calcium, foods.iron, foods.magnesium, foods.zinc,
              foods.vitamin_a, foods.vitamin_c, foods.vitamin_d, foods.vitamin_e, foods.vitamin_k,
              foods.vitamin_b1, foods.vitamin_b2, foods.vitamin_b3, foods.vitamin_b5, foods.vitamin_b6, foods.vitamin_b9, foods.vitamin_b12
            FROM foods_fts 
            JOIN foods ON foods_fts.rowid = foods.id 
            WHERE foods_fts MATCH ?
            ORDER BY rank 
            LIMIT ?`,
      args: [ftsQuery, limit],
    });
    return result.rows as unknown as FoodItem[];
  } catch (error) {
    console.warn("FTS search failed, falling back to lexical search:", error);
    return fallbackLexicalSearch(foodName, limit);
  }
}

// /**
//  * @deprecated
//  */
// export async function semanticFoodSearch(
//   serializedEmbedding: string,
//   limit: number = 20
// ): Promise<FoodWithDistance[]> {
//   // Use Turso's vector_distance_cos for cosine similarity search
//   // Lower distance = more similar
//   const results = await db
//     .select({
//       id: foods.id,
//       name: foods.name,
//       category: foods.category,
//       dataSource: foods.dataSource,
//       calories: foods.calories,
//       protein: foods.protein,
//       carbs: foods.carbs,
//       fat: foods.fat,
//       fiber: foods.fiber,
//       saturatedFat: foods.saturatedFat,
//       omega3: foods.omega3,
//       omega6: foods.omega6,
//       sodium: foods.sodium,
//       potassium: foods.potassium,
//       calcium: foods.calcium,
//       iron: foods.iron,
//       magnesium: foods.magnesium,
//       zinc: foods.zinc,
//       vitaminA: foods.vitaminA,
//       vitaminC: foods.vitaminC,
//       vitaminD: foods.vitaminD,
//       vitaminE: foods.vitaminE,
//       vitaminK: foods.vitaminK,
//       vitaminB1: foods.vitaminB1,
//       vitaminB2: foods.vitaminB2,
//       vitaminB3: foods.vitaminB3,
//       vitaminB5: foods.vitaminB5,
//       vitaminB6: foods.vitaminB6,
//       vitaminB9: foods.vitaminB9,
//       vitaminB12: foods.vitaminB12,
//       embedding: foods.embedding,
//       distance:
//         sql<number>`vector_distance_cos(${foods.embedding}, ${serializedEmbedding})`.as(
//           "distance"
//         ),
//     })
//     .from(foods)
//     .where(isNotNull(foods.embedding))
//     .orderBy(sql`distance`)
//     .limit(limit);

//   return results as FoodWithDistance[];
// }

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
// export async function hybridFoodSearch(
//   foodName: string,
//   limit: number = 10
// ): Promise<FoodItem[]> {
//   try {
//     const semanticResults = await semanticFoodSearch(foodName, limit);

//     // If we got good semantic results, return them
//     if (semanticResults.length > 0) {
//       return semanticResults;
//     }
//   } catch (error) {
//     console.warn("Semantic search failed, falling back to lexical:", error);
//   }

//   // Fall back to lexical search
//   return fallbackLexicalSearch(foodName, limit);
// }
