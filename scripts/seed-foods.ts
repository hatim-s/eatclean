import { config } from "dotenv";
import { db } from "../db/client";
import { foods } from "../db/schema";
import foundationData from "./foundation/output.json";
import srLegacyData from "./sr-legacy/output.json";

type ProcessedFood = {
  id: number;
  name: string;
  category: string;
  data_source: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  saturated_fat: number;
  omega_3: number;
  omega_6: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  zinc: number;
  vitamin_a: number;
  vitamin_c: number;
  vitamin_d: number;
  vitamin_e: number;
  vitamin_k: number;
  vitamin_b1: number;
  vitamin_b2: number;
  vitamin_b3: number;
  vitamin_b5: number;
  vitamin_b6: number;
  vitamin_b9: number;
  vitamin_b12: number;
};

config({ path: ".env" });

async function seed() {
  console.log("Starting food data seed...");

  const allFoods = [
    ...(foundationData as ProcessedFood[]),
    ...(srLegacyData as ProcessedFood[]),
  ];

  const foundationFoods = foundationData as ProcessedFood[];
  const srLegacyFoods = srLegacyData as ProcessedFood[];

  console.log(`Found ${allFoods.length} total foods in JSON files`);
  console.log(`  - Foundation: ${foundationFoods.length}`);
  console.log(`  - SR Legacy: ${srLegacyFoods.length}`);

  // Get existing food IDs from database
  console.log("\n📊 Checking existing foods in database...");
  const existingFoods = await db.select({ id: foods.id }).from(foods);
  const existingIds = new Set(existingFoods.map((f) => f.id));
  console.log(`Found ${existingIds.size} existing foods in database`);

  // Filter out foods that already exist
  const newFoods = allFoods.filter((food) => !existingIds.has(food.id));
  console.log(`\n✨ Found ${newFoods.length} new foods to insert`);

  if (newFoods.length === 0) {
    console.log("✅ No new foods to insert. Database is up to date!");
    return;
  }

  // Insert in batches to avoid memory issues
  const batchSize = 500;
  let inserted = 0;

  for (let i = 0; i < newFoods.length; i += batchSize) {
    const batch = newFoods.slice(i, i + batchSize);

    await db.insert(foods).values(
      batch.map((food) => ({
        id: food.id,
        name: food.name,
        category: food.category,
        dataSource: food.data_source,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        fiber: food.fiber,
        saturatedFat: food.saturated_fat,
        omega3: food.omega_3,
        omega6: food.omega_6,
        sodium: food.sodium,
        potassium: food.potassium,
        calcium: food.calcium,
        iron: food.iron,
        magnesium: food.magnesium,
        zinc: food.zinc,
        vitaminA: food.vitamin_a,
        vitaminC: food.vitamin_c,
        vitaminD: food.vitamin_d,
        vitaminE: food.vitamin_e,
        vitaminK: food.vitamin_k,
        vitaminB1: food.vitamin_b1,
        vitaminB2: food.vitamin_b2,
        vitaminB3: food.vitamin_b3,
        vitaminB5: food.vitamin_b5,
        vitaminB6: food.vitamin_b6,
        vitaminB9: food.vitamin_b9,
        vitaminB12: food.vitamin_b12,
      }))
    );

    inserted += batch.length;
    console.log(`Inserted ${inserted}/${newFoods.length} new foods...`);
  }

  console.log(`\n✅ Food data seed completed! Inserted ${inserted} new foods.`);
}

seed().catch((error) => {
  console.error("Error seeding foods:", error);
  process.exit(1);
});
