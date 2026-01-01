import { config } from "dotenv";
import { db } from "../db/client";
import { foods } from "../db/schema";
import foundationData from "./foundation/output.json";
import srLegacyData from "./sr-legacy/output.json";

config({ path: ".env" });

async function seed() {
    console.log("Starting food data seed...");

    const allFoods = [...foundationData, ...srLegacyData];

    console.log(`Found ${allFoods.length} foods to insert`);
    console.log(`  - Foundation: ${foundationData.length}`);
    console.log(`  - SR Legacy: ${srLegacyData.length}`);

    // Insert in batches to avoid memory issues
    const batchSize = 500;
    let inserted = 0;

    for (let i = 0; i < allFoods.length; i += batchSize) {
        const batch = allFoods.slice(i, i + batchSize);
        
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
        console.log(`Inserted ${inserted}/${allFoods.length} foods...`);
    }

    console.log("✅ Food data seed completed!");
}

seed().catch((error) => {
    console.error("Error seeding foods:", error);
    process.exit(1);
});

