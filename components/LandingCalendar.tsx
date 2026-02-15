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
import { FoodLogDialogWrapper } from "./FoodLogDialogWrapper";
import { AddFoodDialog } from "./AddFoodDialog";
import { DailySummary, FoodLog } from "@/types/db";
import {
  addDays,
  differenceInCalendarDays,
  format,
  isSameDay,
  parseISO,
  startOfWeek,
} from "date-fns";
import { useMemo } from "react";
import { cn } from "@/ui/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/components/base/card";
import { Badge } from "@/ui/components/base/badge";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/ui/components/base/progress";
import { Separator } from "@/ui/components/base/separator";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/ui/components/base/item";
import { Beef, Droplets, Flame, TrendingUp, Wheat } from "lucide-react";

// earliest year is the current year
const earliestYear = new Date().getFullYear();
const latestYear = new Date().getFullYear();

const CALORIE_GOAL = 2000;
const MACRO_GOALS = {
  protein: 150,
  carbs: 250,
  fat: 65,
} as const;

type WeeklyDayStat = {
  label: string;
  dateKey: string;
  calories: number;
  isElapsed: boolean;
};

type WeeklyMetrics = {
  days: WeeklyDayStat[];
  weeklyAverage: number;
  weeklyTarget: number;
  isWeeklyTargetMet: boolean;
};

type LandingCalendarProps = {
  summaries: DailySummary[];
  weeklySummaries: DailySummary[];
  recentMeals: FoodLog[];
};

function formatMealType(mealType: string | null) {
  if (!mealType) {
    return "Meal";
  }

  return mealType.charAt(0).toUpperCase() + mealType.slice(1);
}

function getRecentMealTitle(entry: FoodLog) {
  const items = Array.isArray(entry.items)
    ? (entry.items as Array<{ name?: string }>)
    : [];

  if (items.length === 0 || !items[0]?.name) {
    return `${formatMealType(entry.mealType)} entry`;
  }

  const firstName =
    items[0].name.charAt(0).toUpperCase() + items[0].name.slice(1);

  return items.length > 1 ? `${firstName} +${items.length - 1}` : firstName;
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

function WeeklyWidget({
  days,
  weeklyAverage,
  weeklyTarget,
  isWeeklyTargetMet,
}: {
  days: WeeklyDayStat[];
  weeklyAverage: number;
  weeklyTarget: number;
  isWeeklyTargetMet: boolean;
}) {
  const progressValue = Math.min((weeklyAverage / weeklyTarget) * 100, 100);

  return (
    <Card size="sm">
      <CardHeader className="pb-1.5">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm">This Week</CardTitle>
          <Badge
            className={cn(
              "h-5 gap-1 px-1.5 text-[10px]",
              isWeeklyTargetMet
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
            )}
            variant="secondary"
          >
            <TrendingUp className="size-3" />
            {isWeeklyTargetMet ? "On track" : "Off track"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <div className="grid grid-cols-7 gap-0.5">
          {days.map((day) => (
            <div
              key={day.dateKey}
              className={cn(
                "rounded-md border px-0.5 py-1 text-center",
                day.isElapsed
                  ? "border-border bg-muted/40"
                  : "border-border/60 border-dashed bg-transparent"
              )}
            >
              <p className="text-[10px] text-muted-foreground">{day.label}</p>
              <p className="text-[11px] font-medium tabular-nums">
                {day.isElapsed ? day.calories : "—"}
              </p>
            </div>
          ))}
        </div>

        <Progress className="gap-1" value={progressValue}>
          <ProgressTrack className="h-1">
            <ProgressIndicator
              className={cn(
                isWeeklyTargetMet ? "bg-emerald-500" : "bg-amber-500"
              )}
            />
          </ProgressTrack>
        </Progress>

        <Separator className="my-0" />

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Target</span>
          <span className="font-medium tabular-nums">{weeklyTarget} kcal</span>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Weekly avg</span>
          <span className="font-semibold tabular-nums">{weeklyAverage} kcal</span>
        </div>
      </CardContent>
    </Card>
  );
}

function GoalsWidget() {
  const goals = [
    {
      label: "Calories",
      value: `${CALORIE_GOAL} kcal`,
      icon: Flame,
      iconBg: "bg-orange-500/15",
      iconText: "text-orange-600 dark:text-orange-300",
    },
    {
      label: "Protein",
      value: `${MACRO_GOALS.protein}g`,
      icon: Beef,
      iconBg: "bg-emerald-500/15",
      iconText: "text-emerald-600 dark:text-emerald-300",
    },
    {
      label: "Carbs",
      value: `${MACRO_GOALS.carbs}g`,
      icon: Wheat,
      iconBg: "bg-amber-500/15",
      iconText: "text-amber-600 dark:text-amber-300",
    },
    {
      label: "Fat",
      value: `${MACRO_GOALS.fat}g`,
      icon: Droplets,
      iconBg: "bg-rose-500/15",
      iconText: "text-rose-600 dark:text-rose-300",
    },
  ];

  return (
    <Card size="sm">
      <CardHeader className="pb-1.5">
        <CardTitle className="text-sm">Daily Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-1">
          {goals.map((goal) => (
            <Item
              key={goal.label}
              className="items-center rounded-md border-transparent px-2 py-1.5"
              size="xs"
              variant="muted"
            >
              <ItemMedia
                className={cn(
                  "size-4 rounded-sm flex items-center justify-center",
                  goal.iconBg
                )}
              >
                <goal.icon className={cn("size-3", goal.iconText)} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-[11px] font-medium">
                  {goal.label}
                </ItemTitle>
              </ItemContent>
              <ItemActions className="ml-auto text-[11px] font-semibold tabular-nums">
                {goal.value}
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}

function RecentMealsWidget({ recentMeals }: { recentMeals: FoodLog[] }) {
  return (
    <Card size="sm">
      <CardHeader className="pb-1.5">
        <CardTitle className="text-sm">Recent Meals</CardTitle>
      </CardHeader>
      <CardContent>
        {recentMeals.length === 0 ? (
          <p className="py-2 text-xs text-muted-foreground">
            No recent meals yet.
          </p>
        ) : (
          <ItemGroup className="gap-1">
            {recentMeals.map((entry) => {
              const createdAt =
                entry.createdAt instanceof Date
                  ? entry.createdAt
                  : new Date(entry.createdAt);

              return (
                <Item
                  key={entry.id}
                  className="rounded-md border-transparent px-2 py-1.5"
                  size="xs"
                  variant="muted"
                >
                  <ItemContent>
                    <ItemTitle className="text-[11px] font-medium">
                      {getRecentMealTitle(entry)}
                    </ItemTitle>
                    <ItemDescription className="text-[10px]">
                      {formatMealType(entry.mealType)} ·{" "}
                      {format(createdAt, "MMM d, p")}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions className="ml-auto text-[11px] font-semibold tabular-nums">
                    {Math.round(entry.calories)} kcal
                  </ItemActions>
                </Item>
              );
            })}
          </ItemGroup>
        )}
      </CardContent>
    </Card>
  );
}

function LandingCalendar({
  summaries,
  weeklySummaries,
  recentMeals,
}: LandingCalendarProps) {
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
        foodItems: summary.foodItems || [],
      })),
    [summaries]
  );

  const weeklyMetrics = useMemo(() => {
    return getWeeklyMetrics(weeklySummaries);
  }, [weeklySummaries]);

  const recentMealsForWidget = useMemo(
    () => recentMeals.slice(0, 3),
    [recentMeals]
  );

  return (
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
          {({ feature }) => (
            <FoodLogDialogWrapper
              foodLog={feature}
              key={feature.id}
              date={feature.date}
              isToday={isSameDay(feature.date, new Date())}
            />
          )}
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

        <div className="mt-3 grid gap-2 md:grid-cols-2 xl:hidden">
          <WeeklyWidget
            days={weeklyMetrics.days}
            weeklyAverage={weeklyMetrics.weeklyAverage}
            weeklyTarget={weeklyMetrics.weeklyTarget}
            isWeeklyTargetMet={weeklyMetrics.isWeeklyTargetMet}
          />
          <GoalsWidget />
          <div className="md:col-span-2">
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
    </CalendarProvider >
  );
}

export { LandingCalendar };
