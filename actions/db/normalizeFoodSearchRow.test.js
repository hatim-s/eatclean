import { describe, expect, it } from "bun:test";

import { normalizeFoodSearchRow } from "./normalizeFoodSearchRow";

describe("normalizeFoodSearchRow", () => {
  it("maps snake_case nutrient columns into FoodItem camelCase fields", () => {
    const normalized = normalizeFoodSearchRow({
      id: 42,
      name: "Spinach",
      category: "Vegetables",
      data_source: "usda",
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      saturated_fat: 0.06,
      omega_3: 0.14,
      omega_6: 0.02,
      sodium: 79,
      potassium: 558,
      calcium: 99,
      iron: 2.71,
      magnesium: 79,
      zinc: 0.53,
      vitamin_a: 469,
      vitamin_c: 28.1,
      vitamin_d: 0,
      vitamin_e: 2.03,
      vitamin_k: 482.9,
      vitamin_b1: 0.08,
      vitamin_b2: 0.19,
      vitamin_b3: 0.72,
      vitamin_b5: 0.07,
      vitamin_b6: 0.2,
      vitamin_b9: 194,
      vitamin_b12: 0,
      embedding: null,
    });

    expect(normalized.dataSource).toBe("usda");
    expect(normalized.saturatedFat).toBe(0.06);
    expect(normalized.omega3).toBe(0.14);
    expect(normalized.omega6).toBe(0.02);
    expect(normalized.vitaminA).toBe(469);
    expect(normalized.vitaminC).toBe(28.1);
    expect(normalized.vitaminE).toBe(2.03);
    expect(normalized.vitaminK).toBe(482.9);
    expect(normalized.vitaminB1).toBe(0.08);
    expect(normalized.vitaminB9).toBe(194);
  });
});
