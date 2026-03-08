"use client";

import { format, isSameDay, parseISO } from "date-fns";
import {
  Beef,
  Droplets,
  Flame,
  TrendingDown,
  TrendingUp,
  Wheat,
} from "lucide-react";
import { FoodLogDialogWrapper } from "@/components/FoodLogDialogWrapper";
import { FoodLog } from "@/types/db";
import { Badge } from "@/ui/components/base/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/components/base/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/ui/components/base/item";
import {
  Progress,
  ProgressIndicator,
  ProgressRoot,
  ProgressTrack,
} from "@/ui/components/base/progress";
import { Separator } from "@/ui/components/base/separator";
import { cn } from "@/ui/lib/utils";
import { CALORIE_GOAL, MACRO_GOALS } from "@/components/dashboard/constants";

export type WeeklyDayStat = {
  label: string;
  dateKey: string;
  calories: number;
  isElapsed: boolean;
};

export function formatMealType(mealType: string | null) {
  if (!mealType) {
    return "Meal";
  }

  return mealType.charAt(0).toUpperCase() + mealType.slice(1);
}

export function getRecentMealTitle(entry: FoodLog) {
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

export function WeeklyWidget({
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
  const progressValue = Math.min(
    (weeklyAverage / Math.max(weeklyTarget, 1)) * 100,
    100,
  );

  return (
    <Card size="sm">
      <CardHeader className="pb-1.5">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm">This Week</CardTitle>
          <Badge
            className="rounded-full px-2.5 py-1 font-semibold"
            variant={isWeeklyTargetMet ? "success" : "error"}
          >
            {isWeeklyTargetMet ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
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
                  : "border-border/60 border-dashed bg-transparent",
              )}
            >
              <p className="text-[10px] text-muted-foreground">{day.label}</p>
              <p className="text-[11px] font-medium tabular-nums">
                {day.isElapsed ? day.calories : "—"}
              </p>
            </div>
          ))}
        </div>

        <ProgressRoot value={progressValue}>
          <ProgressTrack className="h-3">
            <ProgressIndicator
              className={cn(
                isWeeklyTargetMet ? "bg-emerald-500" : "bg-red-500",
              )}
            />
          </ProgressTrack>
        </ProgressRoot>

        <Separator className="mt-0 mb-4" />

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Target</span>
          <span className="font-medium tabular-nums">{weeklyTarget} kcal</span>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Weekly avg</span>
          <span className="font-semibold tabular-nums">
            {weeklyAverage} kcal
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function GoalsWidget() {
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
                  goal.iconBg,
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

export function RecentMealsWidget({ recentMeals }: { recentMeals: FoodLog[] }) {
  const today = new Date();

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
              const logDate = parseISO(entry.logDate);
              const mealItem = (
                <Item
                  className="cursor-pointer rounded-md border-transparent px-2 py-1.5 transition-colors hover:bg-accent/70"
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

              return (
                <FoodLogDialogWrapper
                  key={entry.id}
                  date={logDate}
                  isToday={isSameDay(logDate, today)}
                  trigger={mealItem}
                  triggerClassName="w-full text-left"
                />
              );
            })}
          </ItemGroup>
        )}
      </CardContent>
    </Card>
  );
}
