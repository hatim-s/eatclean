"use server";

import { FoodLog as FoodLogType } from "@/types/db";
import { accumulateNutrition } from "./accumulateNutrition";
import { CalculatedNutrition } from "./calculateNutritionFromPortion";

export function sumNutritionFromLogItems(
  logs: FoodLogType[]
): CalculatedNutrition {
  const allItems = logs.flatMap((log) => log.items);
  return accumulateNutrition(
    allItems.map((item) => ({
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      fiber: item.fiber,
      saturatedFat: item.saturatedFat,
      omega3: item.omega3,
      omega6: item.omega6,
      sodium: item.sodium,
      potassium: item.potassium,
      calcium: item.calcium,
      iron: item.iron,
      magnesium: item.magnesium,
      zinc: item.zinc,
      vitaminA: item.vitaminA,
      vitaminC: item.vitaminC,
      vitaminD: item.vitaminD,
      vitaminE: item.vitaminE,
      vitaminK: item.vitaminK,
      vitaminB1: item.vitaminB1,
      vitaminB2: item.vitaminB2,
      vitaminB3: item.vitaminB3,
      vitaminB5: item.vitaminB5,
      vitaminB6: item.vitaminB6,
      vitaminB9: item.vitaminB9,
      vitaminB12: item.vitaminB12,
    }))
  );
}
