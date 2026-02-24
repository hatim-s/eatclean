"use client";

import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";
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

export function FoodLogDialogWrapper({
  foodLog,
  date,
  isToday,
  trigger,
  triggerClassName,
}: FoodLogDialogWrapperProps) {
  const [entries, setEntries] = useState<FoodLog[]>([]);
  const dateStr = format(date, "yyyy-MM-dd");

  const fetchEntries = useCallback(async () => {
    try {
      const data = await getFoodLogsByDate(dateStr);
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch food logs:", error);
    }
  }, [dateStr]);

  useEffect(() => {
    let isMounted = true;

    const loadEntries = async () => {
      try {
        const data = await getFoodLogsByDate(dateStr);
        if (isMounted) {
          setEntries(data);
        }
      } catch (error) {
        console.error("Failed to fetch food logs:", error);
      }
    };

    void loadEntries();

    return () => {
      isMounted = false;
    };
  }, [dateStr]);

  return (
    <FoodLogDialog
      foodLog={foodLog}
      date={date}
      isToday={isToday}
      entries={entries}
      onRefresh={fetchEntries}
      trigger={trigger}
      triggerClassName={triggerClassName}
    />
  );
}
