import { FoodItem } from "@/types/db";

export type RawFoodSearchRow = Record<string, unknown>;

function coerceNumber(value: unknown): number {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function coerceNullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function coerceRequiredString(value: unknown, fallback: string = ""): string {
  return typeof value === "string" ? value : fallback;
}

function pickValue(
  row: RawFoodSearchRow,
  camelKey: string,
  snakeKey?: string
): unknown {
  if (row[camelKey] !== undefined) {
    return row[camelKey];
  }

  if (snakeKey) {
    return row[snakeKey];
  }

  return undefined;
}

export function normalizeFoodSearchRow(row: RawFoodSearchRow): FoodItem {
  return {
    id: coerceNumber(row.id),
    name: coerceRequiredString(row.name),
    category: coerceRequiredString(row.category),
    dataSource: coerceRequiredString(
      pickValue(row, "dataSource", "data_source"),
      "unknown"
    ),
    calories: coerceNumber(row.calories),
    protein: coerceNumber(row.protein),
    carbs: coerceNumber(row.carbs),
    fat: coerceNumber(row.fat),
    fiber: coerceNumber(row.fiber),
    saturatedFat: coerceNumber(pickValue(row, "saturatedFat", "saturated_fat")),
    omega3: coerceNumber(pickValue(row, "omega3", "omega_3")),
    omega6: coerceNumber(pickValue(row, "omega6", "omega_6")),
    sodium: coerceNumber(row.sodium),
    potassium: coerceNumber(row.potassium),
    calcium: coerceNumber(row.calcium),
    iron: coerceNumber(row.iron),
    magnesium: coerceNumber(row.magnesium),
    zinc: coerceNumber(row.zinc),
    vitaminA: coerceNumber(pickValue(row, "vitaminA", "vitamin_a")),
    vitaminC: coerceNumber(pickValue(row, "vitaminC", "vitamin_c")),
    vitaminD: coerceNumber(pickValue(row, "vitaminD", "vitamin_d")),
    vitaminE: coerceNumber(pickValue(row, "vitaminE", "vitamin_e")),
    vitaminK: coerceNumber(pickValue(row, "vitaminK", "vitamin_k")),
    vitaminB1: coerceNumber(pickValue(row, "vitaminB1", "vitamin_b1")),
    vitaminB2: coerceNumber(pickValue(row, "vitaminB2", "vitamin_b2")),
    vitaminB3: coerceNumber(pickValue(row, "vitaminB3", "vitamin_b3")),
    vitaminB5: coerceNumber(pickValue(row, "vitaminB5", "vitamin_b5")),
    vitaminB6: coerceNumber(pickValue(row, "vitaminB6", "vitamin_b6")),
    vitaminB9: coerceNumber(pickValue(row, "vitaminB9", "vitamin_b9")),
    vitaminB12: coerceNumber(pickValue(row, "vitaminB12", "vitamin_b12")),
    embedding: coerceNullableString(row.embedding),
  };
}
