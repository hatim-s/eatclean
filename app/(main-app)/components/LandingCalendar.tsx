"use client";

import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
  Feature,
} from "@/ui/components/calendar";

const exampleFeatures = Array.from({ length: 31 })
  .fill(null)
  .map<Feature>((_, index) => ({
    id: index.toString(),
    calories: Math.floor((index + 1) * 1000) + 1,
    protein: Math.floor((index + 1) * 100) + 1,
    carbs: Math.floor((index + 1) * 100) + 1,
    fat: Math.floor((index + 1) * 100) + 1,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), index + 1),
  }));

// earliest year is the current year
const earliestYear = new Date().getFullYear();
const latestYear = new Date().getFullYear();

function LandingCalendar() {
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
        features={exampleFeatures}
        className="border rounded-3xl overflow-clip"
      >
        {({ feature }) => <CalendarItem feature={feature} key={feature.id} />}
      </CalendarBody>
    </CalendarProvider>
  );
}

export { LandingCalendar };
