"use client";

import { Plus } from "lucide-react";

import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
} from "@/ui/components/calendar";
import { FoodLogDialog } from "./FoodLogDialog";
import { DailySummary } from "@/types/db";
import { parseISO, isSameDay } from "date-fns";
import { useMemo } from "react";
import { cn } from "@/ui/lib/utils";

// earliest year is the current year
const earliestYear = new Date().getFullYear();
const latestYear = new Date().getFullYear();

function LandingCalendar({ summaries }: { summaries: DailySummary[] }) {
  const features = useMemo(
    () =>
      summaries.map((summary) => ({
        id: summary.id,
        calories: Math.round(summary.calories),
        protein: Math.round(summary.protein),
        carbs: Math.round(summary.carbs),
        fat: Math.round(summary.fat),
        date: parseISO(summary.date),

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
      })),
    [summaries]
  );

  return (
    <CalendarProvider className="flex-1 w-full">
      <CalendarDate>
        <CalendarDatePicker>
          <CalendarMonthPicker />
          <CalendarYearPicker end={latestYear} start={earliestYear} />
        </CalendarDatePicker>
        <CalendarDatePagination />
      </CalendarDate>
      <CalendarHeader className="border-b-0" />
      <CalendarBody
        features={features}
        className="border-none"
        renderDay={({ day, date, features, isToday }) => {
          const feature = features[0];
          if (feature) {
            return (
              <FoodLogDialog
                key={day}
                foodLog={feature}
                date={date}
                isToday={isToday}
              />
            );
          }

          return (
            <button
              key={day}
              className={cn(
                "size-full h-32 p-1.5 sm:p-2 rounded-xl border transition-all text-left flex flex-col",
                isToday
                  ? "border-emerald-500/50 bg-emerald-500/10"
                  : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/50"
              )}
            >
              <span
                className={cn(
                  "text-xs sm:text-sm font-medium",
                  isToday ? "text-emerald-400" : "text-zinc-400"
                )}
              >
                {day}
              </span>
              <div className="flex-1 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Plus size={16} className="text-zinc-600" />
              </div>
            </button>
          );
        }}
      >
        {({ feature }) => (
          <FoodLogDialog
            foodLog={feature}
            key={feature.id}
            date={feature.date}
            isToday={isSameDay(feature.date, new Date())}
          />
        )}
      </CalendarBody>

      <div className="flex items-center justify-center gap-6 mt-6 text-xs text-zinc-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1 bg-emerald-500 rounded-full" />
          <span>Protein</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1 bg-amber-500 rounded-full" />
          <span>Carbs</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1 bg-rose-500 rounded-full" />
          <span>Fat</span>
        </div>
      </div>
    </CalendarProvider>
  );
}

export { LandingCalendar };
