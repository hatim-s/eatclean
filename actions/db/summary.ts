"use server";

import { db, dailySummary, foodLog } from "@/db";
import { getSession } from "@/auth/session";
import { eq, and, gte, lte, asc } from "drizzle-orm";
import { DailySummary } from "@/types/db";
import { sumNutritionFromLogItems } from "../lib/sumNutritionFromLogItems";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  parseISO,
} from "date-fns";

export async function getDailySummary(
  date: string
): Promise<DailySummary | null> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [summary] = await db
    .select()
    .from(dailySummary)
    .where(
      and(eq(dailySummary.userId, session.user.id), eq(dailySummary.date, date))
    )
    .limit(1);

  return summary || null;
}

export async function getWeeklySummary(
  weekStartDate: string | Date
): Promise<DailySummary[]> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const startDate =
    typeof weekStartDate === "string" ? parseISO(weekStartDate) : weekStartDate;
  const weekStart = format(
    startOfWeek(startDate, { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const weekEnd = format(
    endOfWeek(startDate, { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );

  return await db
    .select()
    .from(dailySummary)
    .where(
      and(
        eq(dailySummary.userId, session.user.id),
        gte(dailySummary.date, weekStart),
        lte(dailySummary.date, weekEnd)
      )
    )
    .orderBy(asc(dailySummary.date));
}

export async function getMonthlySummary(
  monthDate: string | Date
): Promise<DailySummary[]> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const date = typeof monthDate === "string" ? parseISO(monthDate) : monthDate;
  const monthStart = format(startOfMonth(date), "yyyy-MM-dd");
  const monthEnd = format(endOfMonth(date), "yyyy-MM-dd");

  return await db
    .select()
    .from(dailySummary)
    .where(
      and(
        eq(dailySummary.userId, session.user.id),
        gte(dailySummary.date, monthStart),
        lte(dailySummary.date, monthEnd)
      )
    )
    .orderBy(asc(dailySummary.date));
}

export async function getSummaryById(id: string): Promise<DailySummary | null> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [summary] = await db
    .select()
    .from(dailySummary)
    .where(
      and(eq(dailySummary.id, id), eq(dailySummary.userId, session.user.id))
    )
    .limit(1);

  return summary || null;
}

export async function recalculateDailySummary(
  date: string
): Promise<DailySummary | null> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Import here to avoid circular dependency

  return await db.transaction(async (tx) => {
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
          updatedAt: new Date(),
        })
        .returning();
      summary = inserted;
    }

    return summary;
  });
}
