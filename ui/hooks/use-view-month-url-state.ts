"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  formatViewMonthParam,
  parseViewMonthParam,
  VIEW_MONTH_QUERY_PARAM,
} from "@/ui/lib/view-month";
import type { CalendarState } from "@/ui/components/calendar";

function normalizeMonth(month: number) {
  return Math.min(11, Math.max(0, month)) as CalendarState["month"];
}

function normalizeYear(year: number, fallbackYear: number) {
  return Number.isFinite(year) ? Math.trunc(year) : fallbackYear;
}

export function useViewMonthUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fallbackViewMonth = useMemo(() => {
    const now = new Date();
    return {
      month: now.getMonth() as CalendarState["month"],
      year: now.getFullYear(),
    };
  }, []);

  const viewMonth = useMemo(() => {
    const parsed = parseViewMonthParam(searchParams.get(VIEW_MONTH_QUERY_PARAM));
    if (!parsed) {
      return fallbackViewMonth;
    }

    return {
      month: normalizeMonth(parsed.month),
      year: normalizeYear(parsed.year, fallbackViewMonth.year),
    };
  }, [fallbackViewMonth, searchParams]);

  const setViewMonth = useCallback(
    (next: { month: number; year: number }) => {
      const normalizedMonth = normalizeMonth(next.month);
      const normalizedYear = normalizeYear(next.year, fallbackViewMonth.year);
      const nextParamValue = formatViewMonthParam(normalizedYear, normalizedMonth);
      const currentParamValue = searchParams.get(VIEW_MONTH_QUERY_PARAM);

      if (currentParamValue === nextParamValue) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set(VIEW_MONTH_QUERY_PARAM, nextParamValue);

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [fallbackViewMonth.year, pathname, router, searchParams]
  );

  const setMonth = useCallback(
    (month: CalendarState["month"]) => {
      setViewMonth({ month, year: viewMonth.year });
    },
    [setViewMonth, viewMonth.year]
  );

  const setYear = useCallback(
    (year: number) => {
      setViewMonth({ month: viewMonth.month, year });
    },
    [setViewMonth, viewMonth.month]
  );

  return {
    month: viewMonth.month,
    year: viewMonth.year,
    setMonth,
    setYear,
    setViewMonth,
  };
}
