"use client";

import { format } from "date-fns";
import { useState, useCallback } from "react";
import { FoodLogDialog } from "./FoodLogDialog";
import { getFoodLogsByDate } from "@/actions/db/foodLog";
import { Feature } from "@/ui/components/calendar";
import { FoodLog } from "@/types/db";
import { ReactNode } from "react";

interface FoodLogDialogWrapperProps {
  foodLog: Feature & {
    foodItems?: Array<{ food_id: number; food_name: string; quantity_gms: number }>;
  };
  date: Date;
  isToday: boolean;
  trigger?: ReactNode;
  triggerClassName?: string;
}

const inFlightRequestsByDate = new Map<string, Promise<FoodLog[]>>();

async function fetchFoodLogsByDateWithDedupe(dateStr: string): Promise<FoodLog[]> {
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

export function FoodLogDialogWrapper({
  foodLog,
  date,
  isToday,
  trigger,
  triggerClassName,
}: FoodLogDialogWrapperProps) {
  const [entries, setEntries] = useState<FoodLog[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isEntriesLoading, setIsEntriesLoading] = useState(false);
  const [entriesError, setEntriesError] = useState<string | null>(null);
  const dateStr = format(date, "yyyy-MM-dd");

  const loadEntries = useCallback(async (force = false) => {
    if (!force && hasLoaded) {
      return;
    }

    setIsEntriesLoading(true);
    setEntriesError(null);

    try {
      const data = await fetchFoodLogsByDateWithDedupe(dateStr);
      setEntries(data);
      setHasLoaded(true);
    } catch (error) {
      console.error("Failed to fetch food logs:", error);
      setEntriesError("Could not load entries for this day.");
    } finally {
      setIsEntriesLoading(false);
    }
  }, [dateStr, hasLoaded]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setIsOpen(nextOpen);
    if (nextOpen) {
      void loadEntries(false);
    }
  }, [loadEntries]);

  const refreshEntries = useCallback(() => {
    setHasLoaded(false);
    void loadEntries(true);
  }, [loadEntries]);

  return (
    <FoodLogDialog
      foodLog={foodLog}
      date={date}
      isToday={isToday}
      entries={entries}
      isEntriesLoading={isEntriesLoading}
      entriesError={entriesError}
      onRefresh={refreshEntries}
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={trigger}
      triggerClassName={triggerClassName}
    />
  );
}
