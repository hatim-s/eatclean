import { cacheLife, cacheTag } from "next/cache";
import { and, asc, desc, eq, gte, lte } from "drizzle-orm";
import {
  endOfMonth,
  endOfWeek,
  format,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { dailySummary, db, foodLog } from "@/db";
import type { DailySummary, FoodLog } from "@/types/db";
import {
  getUserFoodLogsDayTag,
  getUserFoodLogsTag,
  getUserSummariesTag,
  getUserSummaryDayTag,
  getUserSummaryMonthTag,
} from "@/data/cache-tags";

const DASHBOARD_CACHE_PROFILE = "minutes" as const;

function toDate(value: string | Date) {
  return typeof value === "string" ? parseISO(value) : value;
}

export async function getCachedWeeklySummary(
  userId: string,
  weekReferenceDate: string
): Promise<DailySummary[]> {
  "use cache";

  cacheLife(DASHBOARD_CACHE_PROFILE);
  cacheTag(getUserSummariesTag(userId));

  const startDate = toDate(weekReferenceDate);
  const weekStart = format(
    startOfWeek(startDate, { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const weekEnd = format(endOfWeek(startDate, { weekStartsOn: 1 }), "yyyy-MM-dd");

  return db
    .select()
    .from(dailySummary)
    .where(
      and(
        eq(dailySummary.userId, userId),
        gte(dailySummary.date, weekStart),
        lte(dailySummary.date, weekEnd)
      )
    )
    .orderBy(asc(dailySummary.date));
}

export async function getCachedMonthlySummary(
  userId: string,
  monthReferenceDate: string
): Promise<DailySummary[]> {
  "use cache";

  cacheLife(DASHBOARD_CACHE_PROFILE);
  cacheTag(
    getUserSummariesTag(userId),
    getUserSummaryMonthTag(userId, monthReferenceDate)
  );

  const date = toDate(monthReferenceDate);
  const monthStart = format(startOfMonth(date), "yyyy-MM-dd");
  const monthEnd = format(endOfMonth(date), "yyyy-MM-dd");

  return db
    .select()
    .from(dailySummary)
    .where(
      and(
        eq(dailySummary.userId, userId),
        gte(dailySummary.date, monthStart),
        lte(dailySummary.date, monthEnd)
      )
    )
    .orderBy(asc(dailySummary.date));
}

export async function getCachedRecentFoodLogs(
  userId: string,
  limit = 5
): Promise<FoodLog[]> {
  "use cache";

  cacheLife(DASHBOARD_CACHE_PROFILE);
  cacheTag(getUserFoodLogsTag(userId));

  const safeLimit = Math.max(1, Math.min(50, Math.floor(limit)));

  return db
    .select()
    .from(foodLog)
    .where(eq(foodLog.userId, userId))
    .orderBy(desc(foodLog.createdAt))
    .limit(safeLimit);
}

export async function getCachedFoodLogsByDate(
  userId: string,
  date: string
): Promise<FoodLog[]> {
  "use cache";

  cacheLife(DASHBOARD_CACHE_PROFILE);
  cacheTag(getUserFoodLogsTag(userId), getUserFoodLogsDayTag(userId, date));

  return db
    .select()
    .from(foodLog)
    .where(and(eq(foodLog.userId, userId), eq(foodLog.logDate, date)))
    .orderBy(asc(foodLog.createdAt));
}

export async function getCachedDailySummary(
  userId: string,
  date: string
): Promise<DailySummary | null> {
  "use cache";

  cacheLife(DASHBOARD_CACHE_PROFILE);
  cacheTag(getUserSummariesTag(userId), getUserSummaryDayTag(userId, date));

  const [summary] = await db
    .select()
    .from(dailySummary)
    .where(and(eq(dailySummary.userId, userId), eq(dailySummary.date, date)))
    .limit(1);

  return summary ?? null;
}
