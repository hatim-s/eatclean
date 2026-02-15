"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/ui/components/base/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/ui/components/base/tabs";
import { Feature } from "@/ui/components/calendar";
import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  X,
  Plus,
} from "lucide-react";

import { FoodLogEntryCard } from "./FoodLogEntryCard";
import { AddFoodDialog } from "./AddFoodDialog";
import { FoodLog } from "@/types/db";
import { Button } from "@/ui/components/base/button";

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
    <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
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
  entries,
  onRefresh,
}: {
  foodLog: Feature & {
    foodItems?: Array<{ food_id: number; food_name: string; quantity_gms: number }>;
  };
  date: Date;
  isToday: boolean;
  entries?: FoodLog[];
  onRefresh?: () => void;
}) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const day = date.getDate();
  const hasData = !!foodLog;

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

  const handleEntryAdded = () => {
    setRefreshKey(prev => prev + 1);
    setShowAddDialog(false);
    if (onRefresh) onRefresh();
  };

  const handleEntryDeleted = () => {
    setRefreshKey(prev => prev + 1);
    if (onRefresh) onRefresh();
  };

  const dateStr = date.toISOString().split('T')[0];

  return (
    <Dialog>
      <DialogTrigger
        className={`w-full h-full overflow-hidden p-1.5 sm:p-2 rounded-xl border transition-all text-left flex flex-col aspect-square
        ${isToday
            ? "border-emerald-500/50 dark:border-emerald-400/50 bg-emerald-500/10 dark:bg-emerald-400/10"
            : "border-border hover:border-primary/50 bg-card/50"
          }
        ${hasData ? "hover:bg-accent/10" : "hover:bg-card"}`}
      >
        <span
          className={`text-xs sm:text-sm font-medium ${isToday ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
            }`}
        >
          {day}
        </span>
        {hasData && (
          <div className="flex-1 flex flex-col justify-end gap-1 mt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-lg font-semibold text-foreground">
                {foodLog.calories}
              </span>
              <span className="text-[10px] text-muted-foreground hidden sm:inline">
                kcal
              </span>
            </div>
            <div className="space-y-0.5 hidden sm:block">
              <MacroBar
                value={foodLog.protein}
                max={goals.protein}
                color="bg-emerald-500 dark:bg-emerald-400"
              />
              <MacroBar
                value={foodLog.carbs}
                max={goals.carbs}
                color="bg-amber-500 dark:bg-amber-400"
              />
              <MacroBar
                value={foodLog.fat}
                max={goals.fat}
                color="bg-rose-500 dark:bg-rose-400"
              />
            </div>
            <div className="flex gap-0.5 sm:hidden">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-rose-400" />
            </div>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="bg-card border border-border rounded-2xl w-xl max-w-xl! max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0" showCloseButton={false}>
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <DialogTitle className="text-lg font-semibold text-foreground">
              {formattedDate}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {entries && entries.length > 0 ? `${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}` : 'No entries'}
            </p>
          </div>
          <DialogClose className="p-2 hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 rounded-lg transition-colors relative top-0 right-0">
            <X size={20} className="text-muted-foreground" />
          </DialogClose>
        </div>

        <Tabs defaultValue="entries" className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex border-b border-border">
            <TabsList className="w-full" variant="line">
              <TabsTrigger value="entries" className="flex-1 py-2.5">
                Entries
              </TabsTrigger>
              <TabsTrigger value="summary" className="flex-1 py-2.5">
                Summary
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="entries" className="flex-1 flex flex-col min-h-0 outline-none p-0 gap-0 data-[state=inactive]:hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-3 m-5">
                {entries && entries.length > 0 ? (
                  entries.map((entry) => (
                    <FoodLogEntryCard
                      key={`${entry.id}-${refreshKey}`}
                      entry={entry}
                      onDeleted={handleEntryDeleted}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm">
                      No food entries for this day
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-5 flex flex-row justify-end">
              <Button
                onClick={() => setShowAddDialog(true)}
              // className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Entry
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="flex-1 overflow-y-auto outline-none p-0 mt-0 data-[state=inactive]:hidden">
            <div className="m-5">
              <div className="bg-linear-to-br from-card/50 to-card/30 rounded-xl p-4 mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-500/20 dark:bg-orange-400/20 rounded-lg">
                    <Flame
                      size={20}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">
                        {foodLog.calories}
                      </span>
                      <span className="text-muted-foreground">
                        / {goals.calories} kcal
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium px-2 py-1 rounded-full ${calPct >= 90 && calPct <= 110
                      ? "bg-emerald-500/20 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400"
                      : calPct < 90
                        ? "bg-amber-500/20 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400"
                        : "bg-rose-500/20 dark:bg-rose-400/20 text-rose-600 dark:text-rose-400"
                      }`}
                  >
                    {calPct}%
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-orange-500 to-orange-400 rounded-full transition-all"
                    style={{ width: `${Math.min(calPct, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {macros.map(
                  ({ label, value, unit, goal, color, icon: Icon }) => {
                    const pct = Math.round((value / goal) * 100);
                    const colors = {
                      emerald: {
                        bg: "bg-emerald-500/20 dark:bg-emerald-400/20",
                        text: "text-emerald-600 dark:text-emerald-400",
                        bar: "bg-emerald-500 dark:bg-emerald-400",
                      },
                      amber: {
                        bg: "bg-amber-500/20 dark:bg-amber-400/20",
                        text: "text-amber-600 dark:text-amber-400",
                        bar: "bg-amber-500 dark:bg-amber-400",
                      },
                      rose: {
                        bg: "bg-rose-500/20 dark:bg-rose-400/20",
                        text: "text-rose-600 dark:text-rose-400",
                        bar: "bg-rose-500 dark:bg-rose-400",
                      },
                    }[color as "emerald" | "amber" | "rose"];
                    return (
                      <div key={label} className="bg-card/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-1.5 ${colors.bg} rounded-md`}>
                            <Icon size={14} className={colors.text} />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {label}
                          </span>
                        </div>
                        <div className="text-xl font-semibold text-foreground mb-1">
                          {value}
                          <span className="text-sm text-muted-foreground ml-0.5">
                            {unit}
                          </span>
                        </div>
                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors.bar} rounded-full`}
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {pct}% of {goal}
                          {unit}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Minerals
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {minerals.map(({ label, value, unit }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-1.5 px-3 bg-secondary/30 rounded-lg"
                      >
                        <span className="text-sm text-muted-foreground">
                          {label}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {value}{" "}
                          <span className="text-muted-foreground">{unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Vitamins
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {vitamins.map(({ label, value, unit }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-1.5 px-3 bg-secondary/30 rounded-lg"
                      >
                        <span className="text-sm text-muted-foreground">
                          {label}
                        </span>
                        <span
                          className={`text-sm font-medium ${value > 0
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                            }`}
                        >
                          {value}{" "}
                          <span className="text-muted-foreground">{unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {foodLog.foodItems && foodLog.foodItems.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Foods Consumed
                    </h3>
                    <div className="space-y-1">
                      {foodLog.foodItems.map((item, index) => (
                        <div
                          key={`${item.food_id}-${index}`}
                          className="flex justify-between items-center py-1.5 px-3 bg-secondary/30 rounded-lg"
                        >
                          <span className="text-sm text-foreground">
                            {item.food_name.charAt(0).toUpperCase() +
                              item.food_name.slice(1)}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">
                            {item.quantity_gms}g
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>

      {showAddDialog && (
        <AddFoodDialog
          date={dateStr}
          hideTrigger
          onSuccess={handleEntryAdded}
          open={true}
          onOpenChange={setShowAddDialog}
        />
      )}
    </Dialog>
  );
}
