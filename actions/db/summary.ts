"use server";

import { db, dailySummary, foodLog } from "@/db";
import { requireUserId } from "@/auth/session";
import { eq, and } from "drizzle-orm";
import { DailySummary, FoodItem } from "@/types/db";
import { sumNutritionFromLogItems } from "../lib/sumNutritionFromLogItems";
import {
  getCachedDailySummary,
  getCachedMonthlySummary,
  getCachedWeeklySummary,
} from "@/data/dashboard";
import { getSummaryInvalidationTags } from "@/data/cache-tags";
import { updateTag } from "next/cache";
import { format } from "date-fns";

type FoodLogItemWithQuantity = Omit<FoodItem, "embedding" | "dataSource"> & {
  quantity_gms: number;
};

export async function getDailySummary(
  date: string
): Promise<DailySummary | null> {
  const userId = await requireUserId();
  return getCachedDailySummary(userId, date);
}

export async function getWeeklySummary(
  weekStartDate: string | Date
): Promise<DailySummary[]> {
  const userId = await requireUserId();
  const date =
    typeof weekStartDate === "string"
      ? weekStartDate
      : format(weekStartDate, "yyyy-MM-dd");

  return getCachedWeeklySummary(userId, date);
}

export async function getMonthlySummary(
  monthDate: string | Date
): Promise<DailySummary[]> {
  const userId = await requireUserId();
  const date =
    typeof monthDate === "string" ? monthDate : format(monthDate, "yyyy-MM-dd");

  return getCachedMonthlySummary(userId, date);
}

export async function getSummaryById(id: string): Promise<DailySummary | null> {
  const userId = await requireUserId();

  const [summary] = await db
    .select()
    .from(dailySummary)
    .where(and(eq(dailySummary.id, id), eq(dailySummary.userId, userId)))
    .limit(1);

  return summary || null;
}

export async function recalculateDailySummary(
  date: string
): Promise<DailySummary | null> {
  const userId = await requireUserId();
  const summary = await db.transaction(async (tx) => {
    // Get all logs for this day
    const dayLogs = await tx
      .select()
      .from(foodLog)
      .where(and(eq(foodLog.userId, userId), eq(foodLog.logDate, date)));

    if (dayLogs.length === 0) {
      // No logs, delete summary if it exists
      await tx
        .delete(dailySummary)
        .where(
          and(eq(dailySummary.userId, userId), eq(dailySummary.date, date))
        );
      return null;
    }

    // Calculate totals from all items
    const totals = sumNutritionFromLogItems(dayLogs);

    // Extract food items with name and quantity
    const foodItems = dayLogs.flatMap((log) =>
      (log.items as FoodLogItemWithQuantity[]).map((item) => ({
        food_id: item.id,
        food_name: item.name,
        quantity_gms: Math.round(item.quantity_gms || 0),
      }))
    );

    // Upsert summary - check if exists first
    const [existing] = await tx
      .select()
      .from(dailySummary)
      .where(and(eq(dailySummary.userId, userId), eq(dailySummary.date, date)))
      .limit(1);

    let summary: DailySummary;
    if (existing) {
      const [updated] = await tx
        .update(dailySummary)
        .set({
          ...totals,
          foodItems,
          updatedAt: new Date(),
        })
        .where(
          and(eq(dailySummary.userId, userId), eq(dailySummary.date, date))
        )
        .returning();
      summary = updated;
    } else {
      const [inserted] = await tx
        .insert(dailySummary)
        .values({
          userId,
          date,
          ...totals,
          foodItems,
          updatedAt: new Date(),
        })
        .returning();
      summary = inserted;
    }

    return summary;
  });

  for (const tag of getSummaryInvalidationTags(userId, date)) {
    updateTag(tag);
  }

  return summary;
}
