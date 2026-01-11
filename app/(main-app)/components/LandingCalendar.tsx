"use client";

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
import { parseISO } from "date-fns";
import { useMemo } from "react";

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
        className="border rounded-3xl overflow-clip"
      >
        {({ feature }) => <FoodLogDialog foodLog={feature} key={feature.id} />}
      </CalendarBody>
    </CalendarProvider>
  );
}

export { LandingCalendar };
