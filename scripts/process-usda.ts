import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

type NutrientField =
  | "protein"
  | "fat"
  | "carbs"
  | "fiber"
  | "calories"
  | "saturated_fat"
  | "omega_3_ala"
  | "omega_3_epa"
  | "omega_3_dha"
  | "omega_6_la"
  | "sodium"
  | "potassium"
  | "calcium"
  | "iron"
  | "magnesium"
  | "zinc"
  | "vitamin_a"
  | "vitamin_c"
  | "vitamin_d"
  | "vitamin_e"
  | "vitamin_k"
  | "vitamin_b1"
  | "vitamin_b2"
  | "vitamin_b3"
  | "vitamin_b5"
  | "vitamin_b6"
  | "vitamin_b9"
  | "vitamin_b12";

type DatasetType = "foundation" | "sr_legacy";

interface FoodRow {
  fdc_id: string;
  description: string;
  food_category_id: string;
  data_type: string;
}

interface NutrientRow {
  fdc_id: string;
  nutrient_id: string;
  amount: string;
}

interface CategoryRow {
  id: string;
  description: string;
}

interface ProcessedFood {
  id: number;
  name: string;
  category: string;
  data_source: DatasetType;
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
}

// USDA Nutrient ID mapping
// Reference: https://fdc.nal.usda.gov/fdc-app.html#/?query=
const NUTRIENT_MAP: Record<number, NutrientField> = {
  // Macronutrients
  1003: "protein", // Protein (g)
  1004: "fat", // Total lipid (fat) (g)
  1005: "carbs", // Carbohydrate, by difference (g)
  1079: "fiber", // Fiber, total dietary (g)
  1008: "calories", // Energy (kcal)

  // Fats breakdown
  1258: "saturated_fat", // Fatty acids, total saturated (g)
  1292: "omega_3_ala", // ALA (18:3 n-3) (g)
  1404: "omega_3_epa", // EPA (20:5 n-3) (g)
  1405: "omega_3_dha", // DHA (22:6 n-3) (g)
  1269: "omega_6_la", // LA (18:2 n-6) (g)

  // Minerals
  1093: "sodium", // Sodium, Na (mg)
  1092: "potassium", // Potassium, K (mg)
  1087: "calcium", // Calcium, Ca (mg)
  1089: "iron", // Iron, Fe (mg)
  1090: "magnesium", // Magnesium, Mg (mg)
  1095: "zinc", // Zinc, Zn (mg)

  // Vitamins
  1106: "vitamin_a", // Vitamin A, RAE (mcg)
  1162: "vitamin_c", // Vitamin C (mg)
  1114: "vitamin_d", // Vitamin D (D2 + D3) (mcg)
  1109: "vitamin_e", // Vitamin E (alpha-tocopherol) (mg)
  1183: "vitamin_k", // Vitamin K (phylloquinone) (mcg)
  1165: "vitamin_b1", // Thiamin (mg)
  1166: "vitamin_b2", // Riboflavin (mg)
  1167: "vitamin_b3", // Niacin (mg)
  1170: "vitamin_b5", // Pantothenic acid (mg)
  1175: "vitamin_b6", // Vitamin B-6 (mg)
  1177: "vitamin_b9", // Folate, total (mcg)
  1178: "vitamin_b12", // Vitamin B-12 (mcg)
};

// Categories to include (raw foods only)
const VALID_CATEGORIES = [
  "Dairy and Egg Products",
  "Fats and Oils",
  "Fruits and Fruit Juices",
  "Vegetables and Vegetable Products",
  "Legumes and Legume Products",
  "Nut and Seed Products",
  "Spices and Herbs",
  "Finfish and Shellfish Products",
  "Poultry Products",
  "Beef Products",
  "Pork Products",
  "Lamb, Veal, and Game Products",
];

// Keywords to exclude (cooked/processed foods)
const EXCLUDE_KEYWORDS = [
  "cooked",
  "baked",
  "fried",
  "roasted",
  "boiled",
  "steamed",
  "canned",
  "frozen",
  "dried",
  "pickled",
  "salted",
  "prepared",
  "processed",
  "with added",
  "fortified",
  "enriched",
  "reduced fat",
  "low sodium",
  "no salt",
];

function parseCSV<T>(content: string): T[] {
  const lines = content.split("\n");
  const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim());

  return lines
    .slice(1)
    .map((line) => {
      // Handle quoted values with commas
      const values: string[] = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] ? values[i].replace(/"/g, "") : "";
      });
      return obj as T;
    })
    .filter((row) => (row as Record<string, string>)[headers[0]]); // Remove empty rows
}

function isRawFood(description: string): boolean {
  return true;

  const lower = description.toLowerCase();
  return !EXCLUDE_KEYWORDS.some((keyword) => lower.includes(keyword));
}

function processFoundationFoods(
  dataDir: string,
  datasetType: DatasetType = "foundation"
): ProcessedFood[] {
  console.log(
    `📂 Reading ${
      datasetType === "foundation" ? "Foundation Foods" : "SR Legacy"
    } data...`
  );

  // Read files
  const foodPath = join(dataDir, "food.csv");
  const nutrientPath = join(dataDir, "food_nutrient.csv");
  const categoryPath = join(dataDir, "food_category.csv");

  const foods = parseCSV<FoodRow>(readFileSync(foodPath, "utf-8"));
  const nutrients = parseCSV<NutrientRow>(readFileSync(nutrientPath, "utf-8"));
  const categories = parseCSV<CategoryRow>(readFileSync(categoryPath, "utf-8"));

  console.log(`✓ Found ${foods.length} foods`);
  console.log(`✓ Found ${nutrients.length} nutrient entries`);

  // Build category lookup
  const categoryMap: Record<string, string> = {};
  categories.forEach((cat) => {
    categoryMap[cat.id] = cat.description;
  });

  // Group nutrients by food ID
  const nutrientsByFood: Record<
    string,
    Partial<Record<NutrientField, number>>
  > = {};
  nutrients.forEach((n) => {
    const foodId = n.fdc_id;
    if (!nutrientsByFood[foodId]) {
      nutrientsByFood[foodId] = {};
    }

    const nutrientId = parseInt(n.nutrient_id);
    const fieldName = NUTRIENT_MAP[nutrientId];

    if (fieldName) {
      nutrientsByFood[foodId][fieldName] = parseFloat(n.amount) || 0;
    }
  });

  // Process foods
  const processedFoods: ProcessedFood[] = [];

  foods.forEach((food) => {
    const category = categoryMap[food.food_category_id];

    // Filter: check data type based on dataset
    if (datasetType === "foundation" && food.data_type !== "foundation_food")
      return;
    if (datasetType === "sr_legacy" && food.data_type !== "sr_legacy_food")
      return;

    // Filter: valid categories
    // if (!VALID_CATEGORIES.includes(category)) return;

    // Filter: raw foods only
    // if (!isRawFood(food.description)) return;

    const foodNutrients = nutrientsByFood[food.fdc_id] || {};

    // Calculate total omega-3 and omega-6
    const omega_3_total =
      (foodNutrients.omega_3_ala || 0) +
      (foodNutrients.omega_3_epa || 0) +
      (foodNutrients.omega_3_dha || 0);

    const omega_6_total = foodNutrients.omega_6_la || 0;

    // Create flat object
    const flatFood = {
      id: parseInt(food.fdc_id),
      name: food.description,
      category: category,
      data_source: datasetType, // Track which dataset this came from

      // Macros (per 100g)
      calories:
        foodNutrients.calories ||
        (foodNutrients.protein || 0) * 4 +
          (foodNutrients.carbs || 0) * 4 +
          (foodNutrients.fat || 0) * 9 ||
        0,
      protein: foodNutrients.protein || 0,
      carbs: foodNutrients.carbs || 0,
      fat: foodNutrients.fat || 0,
      fiber: foodNutrients.fiber || 0,

      // Fats
      saturated_fat: foodNutrients.saturated_fat || 0,
      omega_3: omega_3_total,
      omega_6: omega_6_total,

      // Minerals (mg)
      sodium: foodNutrients.sodium || 0,
      potassium: foodNutrients.potassium || 0,
      calcium: foodNutrients.calcium || 0,
      iron: foodNutrients.iron || 0,
      magnesium: foodNutrients.magnesium || 0,
      zinc: foodNutrients.zinc || 0,

      // Vitamins
      vitamin_a: foodNutrients.vitamin_a || 0, // mcg
      vitamin_c: foodNutrients.vitamin_c || 0, // mg
      vitamin_d: foodNutrients.vitamin_d || 0, // mcg
      vitamin_e: foodNutrients.vitamin_e || 0, // mg
      vitamin_k: foodNutrients.vitamin_k || 0, // mcg
      vitamin_b1: foodNutrients.vitamin_b1 || 0, // mg
      vitamin_b2: foodNutrients.vitamin_b2 || 0, // mg
      vitamin_b3: foodNutrients.vitamin_b3 || 0, // mg
      vitamin_b5: foodNutrients.vitamin_b5 || 0, // mg
      vitamin_b6: foodNutrients.vitamin_b6 || 0, // mg
      vitamin_b9: foodNutrients.vitamin_b9 || 0, // mcg
      vitamin_b12: foodNutrients.vitamin_b12 || 0, // mcg
    };

    processedFoods.push(flatFood);
  });

  console.log(`\n✅ Processed ${processedFoods.length} raw foods`);

  // Print sample
  console.log("\n📋 Sample entries:");
  processedFoods.slice(0, 3).forEach((food) => {
    console.log(`  - ${food.name} (${food.category})`);
    console.log(
      `    Protein: ${food.protein}g | Fat: ${food.fat}g | Carbs: ${food.carbs}g`
    );
  });

  return processedFoods;
}

// Main execution
const datasetType = (process.argv[2] || "foundation") as DatasetType;
const dataDir = "./scripts/" + datasetType + "/input";
const outputFile = "./scripts/" + datasetType + "/output.json";

try {
  const foods = processFoundationFoods(dataDir, datasetType);

  writeFileSync(outputFile, JSON.stringify(foods, null, 2), "utf-8");

  console.log(`\n💾 Saved to: ${outputFile}`);
  console.log(`📊 Total entries: ${foods.length}`);
  console.log(
    `📦 File size: ${(Buffer.byteLength(JSON.stringify(foods)) / 1024).toFixed(
      2
    )} KB`
  );
} catch (error) {
  console.error("❌ Error:", error instanceof Error ? error.message : error);
  console.log(
    "\nUsage: node parse-usda.js [data-directory] [output-file] [dataset-type]"
  );
  console.log(
    "Example (Foundation): node parse-usda.js ./FoodData_Central_foundation_food_csv_2024-10-31 ./foundation.json foundation"
  );
  console.log(
    "Example (SR Legacy): node parse-usda.js ./FoodData_Central_sr_legacy_food_csv_2024-10-31 ./sr-legacy.json sr_legacy"
  );
  process.exit(1);
}
