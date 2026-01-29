import { DailySummary } from "@/types/db";
import { cn } from "../lib/utils";
import { memo } from "react";

type NutritionType = keyof Omit<
  DailySummary,
  "id" | "userId" | "date" | "updatedAt"
>;
type FoodLogItemProps = {
  size: "sm" | "md";
  nutritionalValue: number;
  nutritionType: NutritionType;
};

const nutritionTypeToColor: Record<NutritionType, string> = {
  calories: "bg-purple-500 dark:bg-purple-400 text-purple-600 dark:text-purple-400",
  protein: "bg-green-500 dark:bg-green-400 text-green-600 dark:text-green-400",
  carbs: "bg-yellow-500 dark:bg-yellow-400 text-yellow-600 dark:text-yellow-400",
  fat: "bg-red-500 dark:bg-red-400 text-red-600 dark:text-red-400",

  fiber: "bg-gray-500 dark:bg-gray-400 text-gray-600 dark:text-gray-400",

  saturatedFat: "bg-pink-500 dark:bg-pink-400 text-pink-600 dark:text-pink-400",
  omega3: "bg-blue-500 dark:bg-blue-400 text-blue-600 dark:text-blue-400",
  omega6: "bg-indigo-500 dark:bg-indigo-400 text-indigo-600 dark:text-indigo-400",

  sodium: "bg-blue-500 dark:bg-blue-400 text-blue-600 dark:text-blue-400",
  potassium: "bg-indigo-500 dark:bg-indigo-400 text-indigo-600 dark:text-indigo-400",
  calcium: "bg-slate-500 dark:bg-slate-400 text-slate-600 dark:text-slate-400",
  iron: "bg-red-500 dark:bg-red-400 text-red-600 dark:text-red-400",
  magnesium: "bg-orange-500 dark:bg-orange-400 text-orange-600 dark:text-orange-400",
  zinc: "bg-teal-500 dark:bg-teal-400 text-teal-600 dark:text-teal-400",

  vitaminA: "bg-amber-500 dark:bg-amber-400 text-amber-600 dark:text-amber-400",
  vitaminC: "bg-yellow-500 dark:bg-yellow-400 text-yellow-600 dark:text-yellow-400",
  vitaminD: "bg-lime-500 dark:bg-lime-400 text-lime-600 dark:text-lime-400",
  vitaminE: "bg-emerald-500 dark:bg-emerald-400 text-emerald-600 dark:text-emerald-400",
  vitaminK: "bg-green-500 dark:bg-green-400 text-green-600 dark:text-green-400",
  vitaminB1: "bg-cyan-500 dark:bg-cyan-400 text-cyan-600 dark:text-cyan-400",
  vitaminB2: "bg-sky-500 dark:bg-sky-400 text-sky-600 dark:text-sky-400",
  vitaminB3: "bg-violet-500 dark:bg-violet-400 text-violet-600 dark:text-violet-400",
  vitaminB5: "bg-fuchsia-500 dark:bg-fuchsia-400 text-fuchsia-600 dark:text-fuchsia-400",
  vitaminB6: "bg-rose-500 dark:bg-rose-400 text-rose-600 dark:text-rose-400",
  vitaminB9: "bg-pink-500 dark:bg-pink-400 text-pink-600 dark:text-pink-400",
  vitaminB12: "bg-purple-500 dark:bg-purple-400 text-purple-600 dark:text-purple-400",
};

const nutritionTypeToLabel: Record<NutritionType, string> = {
  calories: "Calories",
  protein: "Protein",
  carbs: "Carbs",
  fat: "Fat",
  fiber: "Fiber",
  saturatedFat: "Saturated Fat",
  omega3: "Omega-3",
  omega6: "Omega-6",
  sodium: "Sodium",
  potassium: "Potassium",
  calcium: "Calcium",
  iron: "Iron",
  magnesium: "Magnesium",
  zinc: "Zinc",
  vitaminA: "Vitamin A",
  vitaminC: "Vitamin C",
  vitaminD: "Vitamin D",
  vitaminE: "Vitamin E",
  vitaminK: "Vitamin K",
  vitaminB1: "Vitamin B1",
  vitaminB2: "Vitamin B2",
  vitaminB3: "Vitamin B3",
  vitaminB5: "Vitamin B5",
  vitaminB6: "Vitamin B6",
  vitaminB9: "Vitamin B9",
  vitaminB12: "Vitamin B12",
};

const nutritionTypeToMacroMicro: Record<
  NutritionType,
  "CALORIES" | "MACRO" | "micro"
> = {
  calories: "CALORIES",

  protein: "MACRO",
  carbs: "MACRO",
  fat: "MACRO",

  fiber: "micro",
  saturatedFat: "micro",
  omega3: "micro",
  omega6: "micro",

  sodium: "micro",
  potassium: "micro",
  calcium: "micro",
  iron: "micro",
  magnesium: "micro",
  zinc: "micro",
  vitaminA: "micro",
  vitaminC: "micro",
  vitaminD: "micro",
  vitaminE: "micro",
  vitaminK: "micro",
  vitaminB1: "micro",
  vitaminB2: "micro",
  vitaminB3: "micro",
  vitaminB5: "micro",
  vitaminB6: "micro",
  vitaminB9: "micro",
  vitaminB12: "micro",
};

const FoodLogItem = memo(function FoodLogItem({
  size,
  nutritionalValue,
  nutritionType,
}: FoodLogItemProps) {
  if (size === "sm") {
    return (
      <div className="flex flex-row gap-2 items-center">
        <div
          className={cn(
            nutritionTypeToColor[nutritionType],
            "w-2 h-2 rounded-full"
          )}
        />
        <span className="text-sm font-medium">{nutritionalValue}</span>
      </div>
    );
  }

  const macroMicro = nutritionTypeToMacroMicro[nutritionType];

  return (
    <div
      className={cn("flex flex-row gap-2 items-center", {
        "pb-2": macroMicro === "CALORIES",
        "pb-1": macroMicro === "MACRO",
        "pb-0": macroMicro === "micro",
      })}
    >
      <span
        className={cn(
          nutritionTypeToColor[nutritionType],
          "font-light bg-transparent min-w-50",
          {
            "text-2xl": macroMicro === "CALORIES",
            "text-xl": macroMicro === "MACRO",
            "text-base": macroMicro === "micro",
          }
        )}
      >
        {nutritionTypeToLabel[nutritionType]}
      </span>
      <span
        className={cn("font-medium", {
          "text-2xl": macroMicro === "CALORIES",
          "text-xl": macroMicro === "MACRO",
          "text-base": macroMicro === "micro",
        })}
      >
        {nutritionalValue}
      </span>
    </div>
  );
});

FoodLogItem.displayName = "FoodLogItem";

export { FoodLogItem };
