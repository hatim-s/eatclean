import { FoodItem } from "@/types/db";

export type CalculatedNutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
};

export function calculateNutritionFromPortion(
  food: FoodItem,
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
