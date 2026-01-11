import { CalculatedNutrition } from "./calculateNutritionFromPortion";

/**
 * Accumulates nutrition from multiple items into a single total.
 */
export function accumulateNutrition(
    items: CalculatedNutrition[]
): CalculatedNutrition {
    const total: CalculatedNutrition = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        saturatedFat: 0,
        omega3: 0,
        omega6: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        zinc: 0,
        vitaminA: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0,
        vitaminK: 0,
        vitaminB1: 0,
        vitaminB2: 0,
        vitaminB3: 0,
        vitaminB5: 0,
        vitaminB6: 0,
        vitaminB9: 0,
        vitaminB12: 0,
    };

    for (const item of items) {
        total.calories += item.calories;
        total.protein += item.protein;
        total.carbs += item.carbs;
        total.fat += item.fat;
        total.fiber += item.fiber;
        total.saturatedFat += item.saturatedFat;
        total.omega3 += item.omega3;
        total.omega6 += item.omega6;
        total.sodium += item.sodium;
        total.potassium += item.potassium;
        total.calcium += item.calcium;
        total.iron += item.iron;
        total.magnesium += item.magnesium;
        total.zinc += item.zinc;
        total.vitaminA += item.vitaminA;
        total.vitaminC += item.vitaminC;
        total.vitaminD += item.vitaminD;
        total.vitaminE += item.vitaminE;
        total.vitaminK += item.vitaminK;
        total.vitaminB1 += item.vitaminB1;
        total.vitaminB2 += item.vitaminB2;
        total.vitaminB3 += item.vitaminB3;
        total.vitaminB5 += item.vitaminB5;
        total.vitaminB6 += item.vitaminB6;
        total.vitaminB9 += item.vitaminB9;
        total.vitaminB12 += item.vitaminB12;
    }

    return total;
}
