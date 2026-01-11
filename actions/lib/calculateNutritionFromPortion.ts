import { FoodItem } from "@/types/db";

export type CalculatedNutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  saturatedFat: number;
  omega3: number;
  omega6: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  zinc: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  vitaminB1: number;
  vitaminB2: number;
  vitaminB3: number;
  vitaminB5: number;
  vitaminB6: number;
  vitaminB9: number;
  vitaminB12: number;
};

function assertTypeNumberOrZero<T extends Record<string, unknown>>(
  obj: T
): Record<keyof T, number> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const valueAsNumber = Number(value);
      if (isNaN(valueAsNumber)) {
        return [key, 0];
      }
      return [key, valueAsNumber];
    })
  ) as Record<keyof T, number>;
}

export function calculateNutritionFromPortion(
  food: FoodItem,
  portionGrams: number
): CalculatedNutrition {
  const multiplier = portionGrams / 100; // Nutrients are per 100g
  return assertTypeNumberOrZero({
    calories: food.calories * multiplier,
    protein: food.protein * multiplier,
    carbs: food.carbs * multiplier,
    fat: food.fat * multiplier,
    fiber: food.fiber * multiplier,
    saturatedFat: food.saturatedFat * multiplier,
    omega3: food.omega3 * multiplier,
    omega6: food.omega6 * multiplier,
    sodium: food.sodium * multiplier,
    potassium: food.potassium * multiplier,
    calcium: food.calcium * multiplier,
    iron: food.iron * multiplier,
    magnesium: food.magnesium * multiplier,
    zinc: food.zinc * multiplier,
    vitaminA: food.vitaminA * multiplier,
    vitaminC: food.vitaminC * multiplier,
    vitaminD: food.vitaminD * multiplier,
    vitaminE: food.vitaminE * multiplier,
    vitaminK: food.vitaminK * multiplier,
    vitaminB1: food.vitaminB1 * multiplier,
    vitaminB2: food.vitaminB2 * multiplier,
    vitaminB3: food.vitaminB3 * multiplier,
    vitaminB5: food.vitaminB5 * multiplier,
    vitaminB6: food.vitaminB6 * multiplier,
    vitaminB9: food.vitaminB9 * multiplier,
    vitaminB12: food.vitaminB12 * multiplier,
  });
}
