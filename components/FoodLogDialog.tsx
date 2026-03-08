"use client";

import { ReactNode, useState } from "react";
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
import { Flame, Beef, Wheat, Droplets, X, Plus } from "lucide-react";

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
  isEntriesLoading,
  entriesError,
  summaryError,
  onRefresh,
  open,
  onOpenChange,
  trigger,
  triggerClassName,
}: {
  foodLog?:
  | (Feature & {
    foodItems?: Array<{
      food_id: number;
      food_name: string;
      quantity_gms: number;
    }>;
  })
  | null;
  date: Date;
  isToday: boolean;
  entries?: FoodLog[];
  isEntriesLoading?: boolean;
  entriesError?: string | null;
  summaryError?: string | null;
  onRefresh?: () => void | Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  triggerClassName?: string;
}) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const day = date.getDate();
  const hasData = !!foodLog;
  const summary: Feature & {
    foodItems: Array<{
      food_id: number;
      food_name: string;
      quantity_gms: number;
    }>;
  } = foodLog
      ? {
        ...foodLog,
        foodItems: foodLog.foodItems ?? [],
      }
      : {
        id: "unavailable",
        date,
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
        foodItems: [],
      };

  const macros = [
    {
      label: "Protein",
      value: summary.protein,
      unit: "g",
      goal: goals.protein,
      color: "emerald",
      icon: Beef,
    },
    {
      label: "Carbs",
      value: summary.carbs,
      unit: "g",
      goal: goals.carbs,
      color: "amber",
      icon: Wheat,
    },
    {
      label: "Fat",
      value: summary.fat,
      unit: "g",
      goal: goals.fat,
      color: "rose",
      icon: Droplets,
    },
  ];

  const minerals = [
    { label: "Sodium", value: summary.sodium, unit: "mg" },
    { label: "Potassium", value: summary.potassium, unit: "mg" },
    { label: "Calcium", value: summary.calcium, unit: "mg" },
    { label: "Iron", value: summary.iron, unit: "mg" },
    { label: "Magnesium", value: summary.magnesium, unit: "mg" },
    { label: "Zinc", value: summary.zinc, unit: "mg" },
  ];

  const vitamins = [
    { label: "Vitamin A", value: summary.vitaminA, unit: "mcg" },
    { label: "Vitamin C", value: summary.vitaminC, unit: "mg" },
    { label: "Vitamin D", value: summary.vitaminD, unit: "mcg" },
    { label: "Vitamin E", value: summary.vitaminE, unit: "mg" },
    { label: "Vitamin K", value: summary.vitaminK, unit: "mcg" },
    { label: "B1 (Thiamin)", value: summary.vitaminB1, unit: "mg" },
    { label: "B2 (Riboflavin)", value: summary.vitaminB2, unit: "mg" },
    { label: "B3 (Niacin)", value: summary.vitaminB3, unit: "mg" },
    { label: "B6", value: summary.vitaminB6, unit: "mg" },
    { label: "B9 (Folate)", value: summary.vitaminB9, unit: "mcg" },
    { label: "B12", value: summary.vitaminB12, unit: "mcg" },
  ];

  const calPct = Math.round((summary.calories / goals.calories) * 100);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleEntryAdded = () => {
    setRefreshKey((prev) => prev + 1);
    setShowAddDialog(false);
    if (onRefresh) onRefresh();
  };

  const handleEntryDeleted = () => {
    setRefreshKey((prev) => prev + 1);
    if (onRefresh) onRefresh();
  };

  const dateStr = date.toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? (
        <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger
          className={`w-full h-full overflow-hidden p-1.5 sm:p-2 rounded-xl border transition-all text-left flex flex-col aspect-square
          ${isToday
              ? "border-emerald-500/50 dark:border-emerald-400/50 bg-emerald-500/10 dark:bg-emerald-400/10"
              : "border-border hover:border-primary/50 bg-card/50"
            }
          ${hasData ? "hover:bg-accent/10" : "hover:bg-card"}`}
        >
          <span
            className={`text-xs sm:text-sm font-medium ${isToday
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-muted-foreground"
              }`}
          >
            {day}
          </span>
          {hasData && (
            <div className="flex-1 flex flex-col justify-end gap-1 mt-1">
              <div className="flex items-baseline gap-1">
                <span className="text-sm sm:text-lg font-semibold text-foreground">
                  {summary.calories}
                </span>
                <span className="text-[10px] text-muted-foreground hidden sm:inline">
                  kcal
                </span>
              </div>
              <div className="space-y-0.5 hidden sm:block">
                <MacroBar
                  value={summary.protein}
                  max={goals.protein}
                  color="bg-emerald-500 dark:bg-emerald-400"
                />
                <MacroBar
                  value={summary.carbs}
                  max={goals.carbs}
                  color="bg-amber-500 dark:bg-amber-400"
                />
                <MacroBar
                  value={summary.fat}
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
      )}
      <DialogContent
        variant="responsive"
        className="bg-card border border-border"
        showCloseButton={false}
      >
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <DialogTitle className="text-lg text-foreground">
              {formattedDate}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {isEntriesLoading
                ? "Loading entries..."
                : entriesError
                  ? "Unable to load entries"
                  : entries && entries.length > 0
                    ? `${entries.length} entr${entries.length === 1 ? "y" : "ies"}`
                    : "No entries"}
            </p>
          </div>
          <DialogClose className="p-2 hover:bg-muted dark:hover:bg-muted/50 rounded-lg transition-colors relative top-0 right-0">
            <X size={20} className="text-muted-foreground" />
          </DialogClose>
        </div>

        <Tabs
          defaultValue="entries"
          className="flex-1 flex flex-col min-h-0 overflow-hidden"
        >
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

          <TabsContent
            value="entries"
            className="flex-1 flex flex-col min-h-0 outline-none p-0 gap-0 data-[state=inactive]:hidden"
          >
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-3 m-5">
                {isEntriesLoading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm">
                      Loading entries...
                    </p>
                  </div>
                ) : entriesError ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-destructive text-sm">{entriesError}</p>
                    {onRefresh && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => void onRefresh()}
                      >
                        Try again
                      </Button>
                    )}
                  </div>
                ) : entries && entries.length > 0 ? (
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
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus size={18} />
                Add Entry
              </Button>
            </div>
          </TabsContent>

          <TabsContent
            value="summary"
            className="flex-1 overflow-y-auto outline-none p-0 mt-0 data-[state=inactive]:hidden"
          >
            <div className="m-5">
              {hasData ? (
                <>
                  <div className="bg-linear-to-br from-card/50 to-card/30 rounded-xl mb-5">
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
                            {summary.calories}
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
                      },
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

                    {summary.foodItems.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Foods Consumed
                        </h3>
                        <div className="space-y-1">
                          {summary.foodItems.map((item, index) => (
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
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                  {summaryError
                    ? summaryError
                    : isEntriesLoading
                      ? "Loading summary..."
                      : "Summary unavailable for this day."}
                </div>
              )}
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
