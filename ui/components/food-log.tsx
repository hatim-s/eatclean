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
  calories: "bg-purple-400 text-purple-400",
  protein: "bg-green-400 text-green-400",
  carbs: "bg-yellow-400 text-yellow-400",
  fat: "bg-red-400 text-red-400",

  fiber: "bg-gray-400 text-gray-400",

  saturatedFat: "bg-pink-400 text-pink-400",
  omega3: "bg-blue-400 text-blue-400",
  omega6: "bg-indigo-400 text-indigo-400",

  sodium: "bg-blue-400 text-blue-400",
  potassium: "bg-indigo-400 text-indigo-400",
  calcium: "bg-slate-400 text-slate-400",
  iron: "bg-red-400 text-red-400",
  magnesium: "bg-orange-400 text-orange-400",
  zinc: "bg-teal-400 text-teal-400",

  vitaminA: "bg-amber-400 text-amber-400",
  vitaminC: "bg-yellow-400 text-yellow-400",
  vitaminD: "bg-lime-400 text-lime-400",
  vitaminE: "bg-emerald-400 text-emerald-400",
  vitaminK: "bg-green-400 text-green-400",
  vitaminB1: "bg-cyan-400 text-cyan-400",
  vitaminB2: "bg-sky-400 text-sky-400",
  vitaminB3: "bg-violet-400 text-violet-400",
  vitaminB5: "bg-fuchsia-400 text-fuchsia-400",
  vitaminB6: "bg-rose-400 text-rose-400",
  vitaminB9: "bg-pink-400 text-pink-400",
  vitaminB12: "bg-purple-400 text-purple-400",
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
          "font-light bg-transparent min-w-[200px]",
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
