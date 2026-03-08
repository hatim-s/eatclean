"use client";

import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarState,
  CalendarYearPicker,
  Feature,
  useCalendarActions,
  useCalendarMonth,
  useCalendarYear,
} from "@/ui/components/calendar";
import { FoodLogDialogWrapper } from "./FoodLogDialogWrapper";
import { AddFoodDialog } from "./AddFoodDialog";
import { DailySummary, FoodLog } from "@/types/db";
import {
  addDays,
  differenceInCalendarDays,
  format,
  startOfWeek,
  parseISO,
} from "date-fns";
import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/ui/lib/utils";
import { Button } from "@/ui/components/base/button";
import {
  DailySummaryCard,
} from "@/components/dashboard/DailySummaryCard";

import {
  GoalsWidget,
  RecentMealsWidget,
  WeeklyDayStat,
  WeeklyWidget,
} from "@/components/dashboard/DashboardWidgets";
import { CALORIE_GOAL, MACRO_GOALS } from "@/components/dashboard/constants";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useViewMonthUrlState } from "@/ui/hooks/use-view-month-url-state";

const earliestYear = new Date().getFullYear();
const latestYear = new Date().getFullYear();

type WeeklyMetrics = {
  days: WeeklyDayStat[];
  weeklyAverage: number;
  weeklyTarget: number;
  isWeeklyTargetMet: boolean;
};

type MacroSnapshot = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type LandingCalendarProps = {
  summaries: DailySummary[];
  weeklySummaries: DailySummary[];
  recentMeals: FoodLog[];
};

function getFeatureSnapshot(feature: Feature): MacroSnapshot {
  return {
    calories: Math.round(feature.calories),
    protein: Math.round(feature.protein),
    carbs: Math.round(feature.carbs),
    fat: Math.round(feature.fat),
  };
}

function getWeeklyMetrics(
  summaries: DailySummary[],
  today: Date = new Date()
): WeeklyMetrics {
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const elapsedDays = Math.max(differenceInCalendarDays(today, weekStart) + 1, 1);

  const summaryByDate = new Map(
    summaries.map((summary) => [summary.date, Math.round(summary.calories)])
  );

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart, index);
    const dateKey = format(date, "yyyy-MM-dd");
    const calories = summaryByDate.get(dateKey) ?? 0;

    return {
      label: format(date, "EEE"),
      dateKey,
      calories,
      isElapsed: index < elapsedDays,
    };
  });

  const weeklyTotal = days
    .filter((day) => day.isElapsed)
    .reduce((sum, day) => sum + day.calories, 0);
  const weeklyAverage = Math.round(weeklyTotal / elapsedDays);

  return {
    days,
    weeklyAverage,
    weeklyTarget: CALORIE_GOAL,
    isWeeklyTargetMet: weeklyAverage <= CALORIE_GOAL,
  };
}

function toFeature(summary: DailySummary): Feature {
  return {
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
    foodItems: summary.foodItems || [],
  };
}

function shiftMonth(year: number, month: number, delta: -1 | 1) {
  const nextMonth = month + delta;

  if (nextMonth < 0) {
    return { month: 11 as CalendarState["month"], year: year - 1 };
  }

  if (nextMonth > 11) {
    return { month: 0 as CalendarState["month"], year: year + 1 };
  }

  return {
    month: nextMonth as CalendarState["month"],
    year,
  };
}

function MobileCalendarControls() {
  const month = useCalendarMonth();
  const year = useCalendarYear();
  const { setViewMonth } = useCalendarActions();

  const monthLabel = format(new Date(year, month, 1), "MMMM yyyy");

  const goToPreviousMonth = () => {
    const next = shiftMonth(year, month, -1);
    setViewMonth(next.month, next.year);
  };

  const goToNextMonth = () => {
    const next = shiftMonth(year, month, 1);
    setViewMonth(next.month, next.year);
  };

  const goToToday = () => {
    const today = new Date();
    setViewMonth(today.getMonth() as CalendarState["month"], today.getFullYear());
  };

  return (
    <div className="flex items-center justify-between gap-2 p-3">
      <h3 className="text-xl font-semibold text-foreground">{monthLabel}</h3>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={goToPreviousMonth}
        >
          <ChevronLeft className="size-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={goToToday}>
          Today
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={goToNextMonth}
        >
          <ChevronRight className="size-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
    </div>
  );
}

function MobileCalendarDayTrigger({
  day,
  isToday,
  feature,
}: {
  day: number;
  isToday: boolean;
  feature?: Feature;
}) {
  return (
    <div
      className={cn(
        "size-full rounded-xl border p-1.5 text-left transition-colors",
        isToday
          ? "border-primary/60 bg-primary/10"
          : "border-border bg-card/30 hover:border-primary/40"
      )}
    >
      <span
        className={cn(
          "text-sm font-medium",
          isToday ? "text-primary" : "text-muted-foreground"
        )}
      >
        {day}
      </span>
      {feature && (
        <div className="mt-2 flex gap-0.5">
          <div className="h-1.5 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          <div className="h-1.5 w-2 rounded-full bg-amber-500 dark:bg-amber-400" />
          <div className="h-1.5 w-2 rounded-full bg-rose-500 dark:bg-rose-400" />
        </div>
      )}
    </div>
  );
}

function LandingCalendar({
  summaries,
  weeklySummaries,
  recentMeals,
}: LandingCalendarProps) {
  const pendingUrlSyncRef = useRef<CalendarState | null>(null);
  const calendarMonth = useCalendarMonth();
  const calendarYear = useCalendarYear();
  const { setOnViewMonthChange, setViewMonth: setCalendarViewMonth } =
    useCalendarActions();
  const {
    month: urlMonth,
    year: urlYear,
    setViewMonth: setUrlViewMonth,
  } = useViewMonthUrlState();

  useEffect(() => {
    setOnViewMonthChange(({ month, year }) => {
      pendingUrlSyncRef.current = { month, year };
      setUrlViewMonth({ month, year });
    });

    return () => {
      setOnViewMonthChange(undefined);
    };
  }, [setOnViewMonthChange, setUrlViewMonth]);

  useEffect(() => {
    const pending = pendingUrlSyncRef.current;
    if (pending && pending.month === urlMonth && pending.year === urlYear) {
      pendingUrlSyncRef.current = null;
      return;
    }

    if (pending) {
      return;
    }

    if (calendarMonth === urlMonth && calendarYear === urlYear) {
      return;
    }

    setCalendarViewMonth(urlMonth, urlYear);
  }, [calendarMonth, calendarYear, setCalendarViewMonth, urlMonth, urlYear]);

  const features = useMemo(() => summaries.map(toFeature), [summaries]);

  const featureByDate = useMemo(
    () =>
      new Map(features.map((feature) => [format(feature.date, "yyyy-MM-dd"), feature])),
    [features]
  );

  const weeklyMetrics = useMemo(() => getWeeklyMetrics(weeklySummaries), [weeklySummaries]);
  const recentMealsForWidget = useMemo(() => recentMeals.slice(0, 3), [recentMeals]);

  const todayDate = new Date();
  const todayDateKey = format(todayDate, "yyyy-MM-dd");
  const todayFeature = featureByDate.get(todayDateKey);
  const todaySummary = todayFeature
    ? getFeatureSnapshot(todayFeature)
    : { calories: 0, protein: 0, carbs: 0, fat: 0 };

  return (
    <>
      <section className="md:hidden space-y-3">
        <DailySummaryCard
          title="Today's Summary"
          calories={todaySummary.calories}
          goalCalories={CALORIE_GOAL}
          protein={todaySummary.protein}
          goalProtein={MACRO_GOALS.protein}
          carbs={todaySummary.carbs}
          goalCarbs={MACRO_GOALS.carbs}
          fat={todaySummary.fat}
          goalFat={MACRO_GOALS.fat}
          compact
          action={
            <AddFoodDialog
              date={todayDateKey}
              hideTrigger
              trigger={
                <>
                  <Plus className="size-4" />
                  <span>Log Food</span>
                </>
              }
              triggerClassName="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            />
          }
        />

        <div className="space-y-3">
          <CalendarProvider className="w-full gap-2">
            <div className="rounded-xl border border-border bg-card/60">
              <MobileCalendarControls />

              <div className="grid grid-cols-7 px-3 pb-1 text-center text-xs font-medium text-muted-foreground">
                {["S", "M", "T", "W", "T", "F", "S"].map((label, index) => (
                  <span key={`${label}-${index}`}>{label}</span>
                ))}
              </div>

              <CalendarBody
                features={features}
                className="border-none px-3 pb-3 auto-rows-[minmax(3.25rem,1fr)]"
                renderDay={({ day, date, features: dayFeatures, isToday }) => {
                  const dateStr = format(date, "yyyy-MM-dd");
                  const feature = dayFeatures[0];
                  const trigger = (
                    <MobileCalendarDayTrigger
                      day={day}
                      isToday={isToday}
                      feature={feature}
                    />
                  );

                  if (feature) {
                    return (
                      <FoodLogDialogWrapper
                        key={dateStr}
                        foodLog={feature}
                        date={date}
                        isToday={isToday}
                        trigger={trigger}
                        triggerClassName="size-full"
                      />
                    );
                  }

                  return (
                    <AddFoodDialog
                      key={dateStr}
                      date={dateStr}
                      hideTrigger
                      trigger={trigger}
                      triggerClassName="size-full"
                    />
                  );
                }}
              >
                {() => null}
              </CalendarBody>

              <div className="flex items-center justify-center gap-6 px-3 pb-3 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-1 w-3 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  Protein
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1 w-3 rounded-full bg-amber-500 dark:bg-amber-400" />
                  Carbs
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1 w-3 rounded-full bg-rose-500 dark:bg-rose-400" />
                  Fat
                </span>
              </div>
            </div>
          </CalendarProvider>

          <WeeklyWidget
            days={weeklyMetrics.days}
            weeklyAverage={weeklyMetrics.weeklyAverage}
            weeklyTarget={weeklyMetrics.weeklyTarget}
            isWeeklyTargetMet={weeklyMetrics.isWeeklyTargetMet}
          />
          <GoalsWidget />
          <RecentMealsWidget recentMeals={recentMealsForWidget} />
        </div>
      </section>

      <div className="hidden md:flex h-full">
        <CalendarProvider className="w-full min-h-0 gap-10 flex-col xl:flex-row">
          <section className="flex min-w-0 flex-1 flex-col">
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
              className="border-none h-[calc(100%-140px)]"
              renderDay={({ day, date, features: dayFeatures, isToday }) => {
                const feature = dayFeatures[0];
                const dateStr = format(date, "yyyy-MM-dd");

                if (feature) {
                  return (
                    <FoodLogDialogWrapper
                      key={dateStr}
                      foodLog={feature}
                      date={date}
                      isToday={isToday}
                    />
                  );
                }

                return (
                  <div
                    key={dateStr}
                    className={cn(
                      "size-full p-1.5 sm:p-2 rounded-xl border transition-all text-left flex flex-col",
                      isToday
                        ? "border-emerald-500/50 dark:border-emerald-400/50 bg-emerald-500/10 dark:bg-emerald-400/10"
                        : "border-border hover:border-primary/50 bg-card/10"
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-medium",
                        isToday
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {day}
                    </span>
                    <AddFoodDialog date={dateStr} />
                  </div>
                );
              }}
            >
              {() => null}
            </CalendarBody>

            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                <span>Protein</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1 bg-amber-500 dark:bg-amber-400 rounded-full" />
                <span>Carbs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1 bg-rose-500 dark:bg-rose-400 rounded-full" />
                <span>Fat</span>
              </div>
            </div>

            <div className="mt-3 grid gap-2 lg:grid-cols-2 xl:hidden">
              <WeeklyWidget
                days={weeklyMetrics.days}
                weeklyAverage={weeklyMetrics.weeklyAverage}
                weeklyTarget={weeklyMetrics.weeklyTarget}
                isWeeklyTargetMet={weeklyMetrics.isWeeklyTargetMet}
              />
              <GoalsWidget />
              <div className="lg:col-span-2">
                <RecentMealsWidget recentMeals={recentMealsForWidget} />
              </div>
            </div>
          </section>

          <aside className="hidden w-64 shrink-0 xl:flex xl:flex-col gap-4 xl:gap-8 mt-10">
            <WeeklyWidget
              days={weeklyMetrics.days}
              weeklyAverage={weeklyMetrics.weeklyAverage}
              weeklyTarget={weeklyMetrics.weeklyTarget}
              isWeeklyTargetMet={weeklyMetrics.isWeeklyTargetMet}
            />
            <GoalsWidget />
            <RecentMealsWidget recentMeals={recentMealsForWidget} />
          </aside>
        </CalendarProvider>
      </div>
    </>
  );
}

export { LandingCalendar };
