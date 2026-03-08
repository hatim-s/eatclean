import { format, parseISO } from "date-fns";

function toDate(value: string | Date) {
  return typeof value === "string" ? parseISO(value) : value;
}

export function toDateKey(value: string | Date) {
  return format(toDate(value), "yyyy-MM-dd");
}

export function toMonthKey(value: string | Date) {
  return format(toDate(value), "yyyy-MM");
}

export function getUserSummariesTag(userId: string) {
  return `user:${userId}:summaries`;
}

export function getUserSummaryDayTag(userId: string, date: string | Date) {
  return `user:${userId}:summary:${toDateKey(date)}`;
}

export function getUserSummaryMonthTag(userId: string, date: string | Date) {
  return `user:${userId}:summary-month:${toMonthKey(date)}`;
}

export function getUserFoodLogsTag(userId: string) {
  return `user:${userId}:foodlogs`;
}

export function getUserFoodLogsDayTag(userId: string, date: string | Date) {
  return `user:${userId}:foodlogs:${toDateKey(date)}`;
}

export function getSummaryInvalidationTags(userId: string, date: string | Date) {
  return [
    getUserSummariesTag(userId),
    getUserSummaryMonthTag(userId, date),
    getUserSummaryDayTag(userId, date),
  ];
}

export function getFoodLogInvalidationTags(userId: string, date: string | Date) {
  return [getUserFoodLogsTag(userId), getUserFoodLogsDayTag(userId, date)];
}

export function getFoodTrackingInvalidationTags(
  userId: string,
  date: string | Date
) {
  return [
    ...getSummaryInvalidationTags(userId, date),
    ...getFoodLogInvalidationTags(userId, date),
  ];
}
