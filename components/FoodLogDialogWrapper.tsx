"use client";

import { format } from "date-fns";
import { useState, useCallback } from "react";
import { FoodLogDialog } from "./FoodLogDialog";
import { getFoodLogsByDate } from "@/actions/db/foodLog";
import { getDailySummary } from "@/actions/db/summary";
import { Feature } from "@/ui/components/calendar";
import { DailySummary, FoodLog } from "@/types/db";
import { ReactNode } from "react";

interface FoodLogDialogWrapperProps {
  foodLog?: Feature & {
    foodItems?: Array<{
      food_id: number;
      food_name: string;
      quantity_gms: number;
    }>;
  };
  date: Date;
  isToday: boolean;
  trigger?: ReactNode;
  triggerClassName?: string;
}

const inFlightRequestsByDate = new Map<string, Promise<FoodLog[]>>();
const inFlightSummaryRequestsByDate = new Map<
  string,
  Promise<FoodLogDialogWrapperProps["foodLog"] | null>
>();

function toFeature(
  summary: DailySummary,
): NonNullable<FoodLogDialogWrapperProps["foodLog"]> {
  return {
    id: summary.id,
    calories: Math.round(summary.calories),
    protein: Math.round(summary.protein),
    carbs: Math.round(summary.carbs),
    fat: Math.round(summary.fat),
    date: new Date(`${summary.date}T00:00:00`),
    fiber: Math.round(summary.fiber),
    saturatedFat: Math.round(summary.saturatedFat),
    omega3: Math.round(summary.omega3),
    omega6: Math.round(summary.omega6),
    sodium: Math.round(summary.sodium),
    potassium: Math.round(summary.potassium),
    calcium: Math.round(summary.calcium),
    iron: Math.round(summary.iron),
    magnesium: Math.round(summary.magnesium),
    zinc: Math.round(summary.zinc),
    vitaminA: Math.round(summary.vitaminA),
    vitaminC: Math.round(summary.vitaminC),
    vitaminD: Math.round(summary.vitaminD),
    vitaminE: Math.round(summary.vitaminE),
    vitaminK: Math.round(summary.vitaminK),
    vitaminB1: Math.round(summary.vitaminB1),
    vitaminB2: Math.round(summary.vitaminB2),
    vitaminB3: Math.round(summary.vitaminB3),
    vitaminB5: Math.round(summary.vitaminB5),
    vitaminB6: Math.round(summary.vitaminB6),
    vitaminB9: Math.round(summary.vitaminB9),
    vitaminB12: Math.round(summary.vitaminB12),
    foodItems: summary.foodItems || [],
  };
}

async function fetchFoodLogsByDateWithDedupe(
  dateStr: string,
): Promise<FoodLog[]> {
  const existingRequest = inFlightRequestsByDate.get(dateStr);
  if (existingRequest) {
    return existingRequest;
  }

  const nextRequest = getFoodLogsByDate(dateStr);
  inFlightRequestsByDate.set(dateStr, nextRequest);

  try {
    return await nextRequest;
  } finally {
    if (inFlightRequestsByDate.get(dateStr) === nextRequest) {
      inFlightRequestsByDate.delete(dateStr);
    }
  }
}

async function fetchDailySummaryWithDedupe(
  dateStr: string,
): Promise<FoodLogDialogWrapperProps["foodLog"] | null> {
  const existingRequest = inFlightSummaryRequestsByDate.get(dateStr);
  if (existingRequest) {
    return existingRequest;
  }

  const nextRequest = getDailySummary(dateStr).then((summary) =>
    summary ? toFeature(summary) : null,
  );
  inFlightSummaryRequestsByDate.set(dateStr, nextRequest);

  try {
    return await nextRequest;
  } finally {
    if (inFlightSummaryRequestsByDate.get(dateStr) === nextRequest) {
      inFlightSummaryRequestsByDate.delete(dateStr);
    }
  }
}

export function FoodLogDialogWrapper({
  foodLog,
  date,
  isToday,
  trigger,
  triggerClassName,
}: FoodLogDialogWrapperProps) {
  const [entries, setEntries] = useState<FoodLog[]>([]);
  const [resolvedFoodLog, setResolvedFoodLog] = useState<
    FoodLogDialogWrapperProps["foodLog"] | null
  >(foodLog ?? null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isEntriesLoading, setIsEntriesLoading] = useState(false);
  const [entriesError, setEntriesError] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const dateStr = format(date, "yyyy-MM-dd");

  const loadEntries = useCallback(
    async (force = false) => {
      if (!force && hasLoaded) {
        return;
      }

      setIsEntriesLoading(true);
      setEntriesError(null);
      setSummaryError(null);

      try {
        const shouldFetchSummary = force || !foodLog || !resolvedFoodLog;
        const [data, summary] = await Promise.all([
          fetchFoodLogsByDateWithDedupe(dateStr),
          shouldFetchSummary
            ? fetchDailySummaryWithDedupe(dateStr)
            : Promise.resolve(resolvedFoodLog ?? foodLog ?? null),
        ]);

        setEntries(data);
        setResolvedFoodLog(summary);
        setHasLoaded(true);
      } catch (error) {
        console.error("Failed to fetch food log dialog data:", error);
        setEntriesError("Could not load entries for this day.");
        if (!foodLog || force) {
          setSummaryError("Could not load summary for this day.");
        }
      } finally {
        setIsEntriesLoading(false);
      }
    },
    [dateStr, foodLog, hasLoaded, resolvedFoodLog],
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setIsOpen(nextOpen);
      if (nextOpen) {
        void loadEntries(false);
      }
    },
    [loadEntries],
  );

  const refreshEntries = useCallback(() => {
    setHasLoaded(false);
    void loadEntries(true);
  }, [loadEntries]);

  return (
    <FoodLogDialog
      foodLog={resolvedFoodLog}
      date={date}
      isToday={isToday}
      entries={entries}
      isEntriesLoading={isEntriesLoading}
      entriesError={entriesError}
      summaryError={summaryError}
      onRefresh={refreshEntries}
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={trigger}
      triggerClassName={triggerClassName}
    />
  );
}
