const VIEW_MONTH_REGEX = /^(\d{4})-(0[1-9]|1[0-2])$/;

export const VIEW_MONTH_QUERY_PARAM = "month";

export type ViewMonth = {
  year: number;
  month: number;
};

export function parseViewMonthParam(
  value: string | null | undefined
): ViewMonth | null {
  if (!value) {
    return null;
  }

  const match = VIEW_MONTH_REGEX.exec(value.trim());
  if (!match) {
    return null;
  }

  return {
    year: Number.parseInt(match[1], 10),
    month: Number.parseInt(match[2], 10) - 1,
  };
}

export function formatViewMonthParam(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export function resolveViewMonthDate(
  value: string | string[] | null | undefined,
  fallbackDate: Date = new Date()
) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = parseViewMonthParam(rawValue);

  if (!parsed) {
    return new Date(fallbackDate.getFullYear(), fallbackDate.getMonth(), 1);
  }

  return new Date(parsed.year, parsed.month, 1);
}
