import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "@/ui/components/base/morphing-dialog";
import { useMemo } from "react";
import { Transition } from "motion/react";
import { Feature } from "@/ui/components/calendar";
import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  X,
} from "lucide-react";
import { ScrollArea } from "@/ui/components/base/scroll-area";

const goals = { calories: 2000, protein: 150, carbs: 250, fat: 65 };

function MacroBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function FoodLogDialog({
  foodLog,
  date,
  isToday,
}: {
  foodLog: Feature;
  date: Date;
  isToday: boolean;
}) {
  const transition = useMemo<Transition>(
    () => ({
      type: "spring",
      stiffness: 200,
      damping: 24,
    }),
    []
  );

  const day = date.getDate();
  const hasData = !!foodLog;
  // const calPct = hasData
  //   ? Math.round((foodLog.calories / goals.calories) * 100)
  //   : 0;

  const macros = [
    {
      label: "Protein",
      value: foodLog.protein,
      unit: "g",
      goal: goals.protein,
      color: "emerald",
      icon: Beef,
    },
    {
      label: "Carbs",
      value: foodLog.carbs,
      unit: "g",
      goal: goals.carbs,
      color: "amber",
      icon: Wheat,
    },
    {
      label: "Fat",
      value: foodLog.fat,
      unit: "g",
      goal: goals.fat,
      color: "rose",
      icon: Droplets,
    },
  ];

  const minerals = [
    { label: "Sodium", value: foodLog.sodium, unit: "mg" },
    { label: "Potassium", value: foodLog.potassium, unit: "mg" },
    { label: "Calcium", value: foodLog.calcium, unit: "mg" },
    { label: "Iron", value: foodLog.iron, unit: "mg" },
    { label: "Magnesium", value: foodLog.magnesium, unit: "mg" },
    { label: "Zinc", value: foodLog.zinc, unit: "mg" },
  ];

  const vitamins = [
    { label: "Vitamin A", value: foodLog.vitaminA, unit: "mcg" },
    { label: "Vitamin C", value: foodLog.vitaminC, unit: "mg" },
    { label: "Vitamin D", value: foodLog.vitaminD, unit: "mcg" },
    { label: "Vitamin E", value: foodLog.vitaminE, unit: "mg" },
    { label: "Vitamin K", value: foodLog.vitaminK, unit: "mcg" },
    { label: "B1 (Thiamin)", value: foodLog.vitaminB1, unit: "mg" },
    { label: "B2 (Riboflavin)", value: foodLog.vitaminB2, unit: "mg" },
    { label: "B3 (Niacin)", value: foodLog.vitaminB3, unit: "mg" },
    { label: "B6", value: foodLog.vitaminB6, unit: "mg" },
    { label: "B9 (Folate)", value: foodLog.vitaminB9, unit: "mcg" },
    { label: "B12", value: foodLog.vitaminB12, unit: "mcg" },
  ];

  const calPct = Math.round((foodLog.calories / goals.calories) * 100);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <MorphingDialog transition={transition}>
      <MorphingDialogTrigger className="w-full h-full">
        <div
          className={`h-32 overflow-hidden p-1.5 sm:p-2 rounded-xl border transition-all text-left flex flex-col h-full
        ${isToday
              ? "border-emerald-500/50 bg-emerald-500/10"
              : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/50"
            }
        ${hasData ? "hover:bg-zinc-800/50" : "hover:bg-zinc-900"}`}
        >
          <span
            className={`text-xs sm:text-sm font-medium ${isToday ? "text-emerald-400" : "text-zinc-400"
              }`}
          >
            {day}
          </span>
          {hasData && (
            <div className="flex-1 flex flex-col justify-end gap-1 mt-1">
              <div className="flex items-baseline gap-1">
                <span className="text-sm sm:text-lg font-semibold text-white">
                  {foodLog.calories}
                </span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">
                  kcal
                </span>
              </div>
              <div className="space-y-0.5 hidden sm:block">
                <MacroBar
                  value={foodLog.protein}
                  max={goals.protein}
                  color="bg-emerald-500"
                />
                <MacroBar
                  value={foodLog.carbs}
                  max={goals.carbs}
                  color="bg-amber-500"
                />
                <MacroBar
                  value={foodLog.fat}
                  max={goals.fat}
                  color="bg-rose-500"
                />
              </div>
              <div className="flex gap-0.5 sm:hidden">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </div>
            </div>
          )}
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                {formattedDate}
              </h2>
              <p className="text-sm text-zinc-500">Daily Summary</p>
            </div>
            <MorphingDialogClose className="p-2 hover:bg-zinc-800 rounded-lg transition-colors relative top-0 right-0">
              <X size={20} className="text-zinc-400" />
            </MorphingDialogClose>
          </div>

          <ScrollArea className="flex-1 min-h-0 max-h-162 [&>div]:max-h-162">
            <div className="p-5">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-xl p-4 mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Flame size={20} className="text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">
                        {foodLog.calories}
                      </span>
                      <span className="text-zinc-500">
                        / {goals.calories} kcal
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium px-2 py-1 rounded-full ${calPct >= 90 && calPct <= 110
                      ? "bg-emerald-500/20 text-emerald-400"
                      : calPct < 90
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-rose-500/20 text-rose-400"
                      }`}
                  >
                    {calPct}%
                  </div>
                </div>
                <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all"
                    style={{ width: `${Math.min(calPct, 100)}%` }}
                  />
                </div>
              </div>

              {/* Macronutrients */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {macros.map(({ label, value, unit, goal, color, icon: Icon }) => {
                  const pct = Math.round((value / goal) * 100);
                  const colors = {
                    emerald: {
                      bg: "bg-emerald-500/20",
                      text: "text-emerald-400",
                      bar: "bg-emerald-500",
                    },
                    amber: {
                      bg: "bg-amber-500/20",
                      text: "text-amber-400",
                      bar: "bg-amber-500",
                    },
                    rose: {
                      bg: "bg-rose-500/20",
                      text: "text-rose-400",
                      bar: "bg-rose-500",
                    },
                  }[color as "emerald" | "amber" | "rose"];
                  return (
                    <div key={label} className="bg-zinc-800/50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 ${colors.bg} rounded-md`}>
                          <Icon size={14} className={colors.text} />
                        </div>
                        <span className="text-xs text-zinc-400">{label}</span>
                      </div>
                      <div className="text-xl font-semibold text-white mb-1">
                        {value}
                        <span className="text-sm text-zinc-500 ml-0.5">
                          {unit}
                        </span>
                      </div>
                      <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors.bar} rounded-full`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {pct}% of {goal}
                        {unit}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Minerals */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">
                    Minerals
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {minerals.map(({ label, value, unit }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-1.5 px-3 bg-zinc-800/30 rounded-lg"
                      >
                        <span className="text-sm text-zinc-400">{label}</span>
                        <span className="text-sm font-medium text-white">
                          {value} <span className="text-zinc-500">{unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">
                    Vitamins
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {vitamins.map(({ label, value, unit }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-1.5 px-3 bg-zinc-800/30 rounded-lg"
                      >
                        <span className="text-sm text-zinc-400">{label}</span>
                        <span
                          className={`text-sm font-medium ${value > 0 ? "text-white" : "text-zinc-600"
                            }`}
                        >
                          {value} <span className="text-zinc-500">{unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
