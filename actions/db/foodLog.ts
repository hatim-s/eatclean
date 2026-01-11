"use server";

import { db, foodLog, dailySummary } from "@/db";
import { getSession } from "@/auth/session";
import { eq, and, asc } from "drizzle-orm";
import { NewFoodLog, FoodLog as FoodLogType } from "@/types/db";
import { sumNutritionFromLogItems } from "../lib/sumNutritionFromLogItems";

export async function createFoodLogEntry(
  data: Omit<NewFoodLog, "userId" | "id" | "createdAt">
): Promise<FoodLogType> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const logDate = data.logDate;

  try {
    return await db.transaction(async (tx) => {
      // Insert food log
      const [newLog] = await tx
        .insert(foodLog)
        .values({
          ...data,
          userId,
        })
        .returning();

      // Get all logs for this day
      const dayLogs = await tx
        .select()
        .from(foodLog)
        .where(and(eq(foodLog.userId, userId), eq(foodLog.logDate, logDate)));

      // Calculate totals from all items in all logs
      const totals = sumNutritionFromLogItems(dayLogs);

      // Upsert daily summary
      // Check if summary exists first, then update or insert
      const [existing] = await tx
        .select()
        .from(dailySummary)
        .where(
          and(eq(dailySummary.userId, userId), eq(dailySummary.date, logDate))
        )
        .limit(1);

      if (existing) {
        await tx
          .update(dailySummary)
          .set({
            ...totals,
            updatedAt: new Date(),
          })
          .where(
            and(eq(dailySummary.userId, userId), eq(dailySummary.date, logDate))
          );
      } else {
        await tx.insert(dailySummary).values({
          userId,
          date: logDate,
          ...totals,
          updatedAt: new Date(),
        });
      }

      return newLog;
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create food log entry", { cause: error });
  }
}

export async function getFoodLogById(id: string): Promise<FoodLogType | null> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [log] = await db
    .select()
    .from(foodLog)
    .where(and(eq(foodLog.id, id), eq(foodLog.userId, session.user.id)))
    .limit(1);

  return log || null;
}

export async function getFoodLogsByDate(
  // date is of the format "2025-01-15"
  date: string
): Promise<FoodLogType[]> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return await db
    .select()
    .from(foodLog)
    .where(and(eq(foodLog.userId, session.user.id), eq(foodLog.logDate, date)))
    .orderBy(asc(foodLog.createdAt));
}

export async function deleteFoodLog(id: string): Promise<void> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  await db.transaction(async (tx) => {
    // Get the log to find its date
    const [log] = await tx
      .select()
      .from(foodLog)
      .where(and(eq(foodLog.id, id), eq(foodLog.userId, userId)))
      .limit(1);

    if (!log) {
      throw new Error("Food log not found");
    }

    const logDate = log.logDate;

    // Delete the log
    await tx.delete(foodLog).where(eq(foodLog.id, id));

    // Recalculate summary for that day
    const dayLogs = await tx
      .select()
      .from(foodLog)
      .where(and(eq(foodLog.userId, userId), eq(foodLog.logDate, logDate)));

    if (dayLogs.length === 0) {
      // No logs left for this day, delete the summary
      await tx
        .delete(dailySummary)
        .where(
          and(eq(dailySummary.userId, userId), eq(dailySummary.date, logDate))
        );
    } else {
      // Recalculate totals
      const totals = sumNutritionFromLogItems(dayLogs);

      // Update summary - check if exists first
      const [existing] = await tx
        .select()
        .from(dailySummary)
        .where(
          and(eq(dailySummary.userId, userId), eq(dailySummary.date, logDate))
        )
        .limit(1);

      if (existing) {
        await tx
          .update(dailySummary)
          .set({
            ...totals,
            updatedAt: new Date(),
          })
          .where(
            and(eq(dailySummary.userId, userId), eq(dailySummary.date, logDate))
          );
      } else {
        await tx.insert(dailySummary).values({
          userId,
          date: logDate,
          ...totals,
          updatedAt: new Date(),
        });
      }
    }
  });
}
