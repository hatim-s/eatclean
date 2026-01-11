"use client";

import { getDay, getDaysInMonth, isSameDay } from "date-fns";
import { create } from "zustand";
import {
  Check,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
} from "lucide-react";
import {
  createContext,
  memo,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Button } from "@/ui/components/base/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/components/base/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/components/base/popover";
import { cn } from "@/ui/lib/utils";
import clsx from "clsx";

type CalendarState = {
  month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  year: number;
};

interface CalendarStore extends CalendarState {
  actions: {
    setMonth: (month: CalendarState["month"]) => void;
    setYear: (year: CalendarState["year"]) => void;
  };
}

const useCalendarStore = create<CalendarStore>((set) => ({
  month: new Date().getMonth() as CalendarState["month"],
  year: new Date().getFullYear(),
  actions: {
    setMonth: (month) => set({ month }),
    setYear: (year) => set({ year }),
  },
}));

const useCalendarMonth = () => useCalendarStore((state) => state.month);
const useCalendarYear = () => useCalendarStore((state) => state.year);

const useCalendarActions = () => useCalendarStore((state) => state.actions);

type CalendarContextProps = {
  locale: Intl.LocalesArgument;
  startDay: number;
};

const CalendarContext = createContext<CalendarContextProps>({
  locale: "en-US",
  startDay: 0,
});

type Status = {
  id: string;
  name: string;
  color: string;
};

type Feature = {
  id: string;
  date: Date;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  saturatedFat: number;
  omega3: number;
  omega6: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  zinc: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  vitaminB1: number;
  vitaminB2: number;
  vitaminB3: number;
  vitaminB5: number;
  vitaminB6: number;
  vitaminB9: number;
  vitaminB12: number;
};

type ComboboxProps = {
  value: string;
  setValue: (value: string) => void;
  data: {
    value: string;
    label: string;
  }[];
  labels: {
    button: string;
    empty: string;
    search: string;
  };
  className?: string;
};

const monthsForLocale = (
  localeName: Intl.LocalesArgument,
  monthFormat: Intl.DateTimeFormatOptions["month"] = "long"
) => {
  const format = new Intl.DateTimeFormat(localeName, { month: monthFormat })
    .format;

  return [...new Array(12).keys()].map((m) =>
    format(new Date(Date.UTC(2021, m, 2)))
  );
};

const daysForLocale = (locale: Intl.LocalesArgument, startDay: number) => {
  const weekdays: string[] = [];
  const baseDate = new Date(2024, 0, startDay);

  for (let i = 0; i < 7; i++) {
    weekdays.push(
      new Intl.DateTimeFormat(locale, { weekday: "short" }).format(baseDate)
    );
    baseDate.setDate(baseDate.getDate() + 1);
  }

  return weekdays;
};

const Combobox = ({
  value,
  setValue,
  data,
  labels,
  className,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button
            aria-expanded={open}
            className={cn("w-40 justify-between capitalize", className)}
            variant="outline"
          />
        }
      >
        {value
          ? data.find((item) => item.value === value)?.label
          : labels.button}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0">
        <Command
          filter={(value, search) => {
            const label = data.find((item) => item.value === value)?.label;

            return label?.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
          }}
        >
          <CommandInput placeholder={labels.search} />
          <CommandList>
            <CommandEmpty>{labels.empty}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  className="capitalize"
                  key={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  value={item.value}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

type OutOfBoundsDayProps = {
  day: number;
};

const OutOfBoundsDay = ({ day }: OutOfBoundsDayProps) => (
  <div
    className={clsx(
      // "relative h-full w-full bg-secondary p-1 text-muted-foreground text-xs",
      "hidden"
    )}
  >
    {day}
  </div>
);

type CalendarBodyProps = {
  features: Feature[];
  className?: string;
  children: (props: { feature: Feature }) => ReactNode;
};

const CalendarBody = memo(
  ({ features, children, className }: CalendarBodyProps) => {
    const month = useCalendarMonth();
    const year = useCalendarYear();
    const { startDay } = useContext(CalendarContext);

    // Memoize expensive date calculations
    const currentMonthDate = useMemo(
      () => new Date(year, month, 1),
      [year, month]
    );
    const daysInMonth = useMemo(
      () => getDaysInMonth(currentMonthDate),
      [currentMonthDate]
    );
    const firstDay = useMemo(
      () => (getDay(currentMonthDate) - startDay + 7) % 7,
      [currentMonthDate, startDay]
    );

    // Memoize previous month calculations
    const prevMonthData = useMemo(() => {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthYear = month === 0 ? year - 1 : year;
      const prevMonthDays = getDaysInMonth(
        new Date(prevMonthYear, prevMonth, 1)
      );
      const prevMonthDaysArray = Array.from(
        { length: prevMonthDays },
        (_, i) => i + 1
      );
      return { prevMonthDays, prevMonthDaysArray };
    }, [month, year]);

    // Memoize next month calculations
    const nextMonthData = useMemo(() => {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextMonthYear = month === 11 ? year + 1 : year;
      const nextMonthDays = getDaysInMonth(
        new Date(nextMonthYear, nextMonth, 1)
      );
      const nextMonthDaysArray = Array.from(
        { length: nextMonthDays },
        (_, i) => i + 1
      );
      return { nextMonthDaysArray };
    }, [month, year]);

    // Memoize features filtering by day to avoid recalculating on every render
    const featuresByDay = useMemo(() => {
      const result: Record<number, Feature[]> = {};
      for (let day = 1; day <= daysInMonth; day++) {
        result[day] = features.filter((feature) => {
          return isSameDay(feature.date, new Date(year, month, day));
        });
      }
      return result;
    }, [features, daysInMonth, year, month]);

    const days: ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      const day =
        prevMonthData.prevMonthDaysArray[
          prevMonthData.prevMonthDays - firstDay + i
        ];

      if (day) {
        days.push(<OutOfBoundsDay day={day} key={`prev-${i}`} />);
      }
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const featuresForDay = featuresByDay[day] || [];

      days.push(
        <div
          className="relative flex h-full w-full flex-col gap-1 p-1"
          key={day}
        >
          <span className="text-xs font-bold ms-4 mt-2">{day}</span>
          <div className="text-sm">
            {featuresForDay.slice(0, 3).map((feature) => children({ feature }))}
          </div>
          {featuresForDay.length > 3 && (
            <span className="block text-muted-foreground text-xs">
              +{featuresForDay.length - 3} more
            </span>
          )}
        </div>
      );
    }

    const remainingDays = 7 - ((firstDay + daysInMonth) % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        const day = nextMonthData.nextMonthDaysArray[i];

        if (day) {
          days.push(<OutOfBoundsDay day={day} key={`next-${i}`} />);
        }
      }
    }

    return (
      <div className={cn("grid grow grid-cols-7", className)}>
        {days.map((day, index) => (
          <div
            className={cn(
              "relative overflow-hidden border-r",
              // do not show top border on the first row
              { "border-t": index >= 7 },
              // do not show right border on the last column
              { "border-r-0": index % 7 === 6 }
            )}
            key={index}
          >
            {day}
          </div>
        ))}
      </div>
    );
  }
);

CalendarBody.displayName = "CalendarBody";

type CalendarDatePickerProps = {
  className?: string;
  children: ReactNode;
};

const CalendarDatePicker = ({
  className,
  children,
}: CalendarDatePickerProps) => (
  <div className={cn("flex items-center gap-1", className)}>{children}</div>
);

type CalendarMonthPickerProps = {
  className?: string;
};

const CalendarMonthPicker = ({ className }: CalendarMonthPickerProps) => {
  const month = useCalendarMonth();
  const { setMonth } = useCalendarActions();
  const { locale } = useContext(CalendarContext);

  // Memoize month data to avoid recalculating date formatting
  const monthData = useMemo(() => {
    return monthsForLocale(locale).map((month, index) => ({
      value: index.toString(),
      label: month,
    }));
  }, [locale]);

  return (
    <Combobox
      className={className}
      data={monthData}
      labels={{
        button: "Select month",
        empty: "No month found",
        search: "Search month",
      }}
      setValue={(value) =>
        setMonth(Number.parseInt(value, 10) as CalendarState["month"])
      }
      value={month.toString()}
    />
  );
};

type CalendarYearPickerProps = {
  className?: string;
  start: number;
  end: number;
};

const CalendarYearPicker = ({
  className,
  start,
  end,
}: CalendarYearPickerProps) => {
  const year = useCalendarYear();
  const { setYear } = useCalendarActions();

  return (
    <Combobox
      className={className}
      data={Array.from({ length: end - start + 1 }, (_, i) => ({
        value: (start + i).toString(),
        label: (start + i).toString(),
      }))}
      labels={{
        button: "Select year",
        empty: "No year found",
        search: "Search year",
      }}
      setValue={(value) => setYear(Number.parseInt(value, 10))}
      value={year.toString()}
    />
  );
};

type CalendarDatePaginationProps = {
  className?: string;
};

const CalendarDatePagination = ({ className }: CalendarDatePaginationProps) => {
  const month = useCalendarMonth();
  const year = useCalendarYear();
  const { setMonth, setYear } = useCalendarActions();

  const handlePreviousMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth((month - 1) as CalendarState["month"]);
    }
  }, [month, year, setMonth, setYear]);

  const handleNextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth((month + 1) as CalendarState["month"]);
    }
  }, [month, year, setMonth, setYear]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button onClick={handlePreviousMonth} size="icon" variant="ghost">
        <ChevronLeftIcon size={16} />
      </Button>
      <Button onClick={handleNextMonth} size="icon" variant="ghost">
        <ChevronRightIcon size={16} />
      </Button>
    </div>
  );
};

type CalendarDateProps = {
  children: ReactNode;
};

const CalendarDate = ({ children }: CalendarDateProps) => (
  <div className="flex items-center justify-between p-3">{children}</div>
);

type CalendarHeaderProps = {
  className?: string;
};

const CalendarHeader = memo(({ className }: CalendarHeaderProps) => {
  const { locale, startDay } = useContext(CalendarContext);

  // Memoize days data to avoid recalculating date formatting
  const daysData = useMemo(() => {
    return daysForLocale(locale, startDay);
  }, [locale, startDay]);

  return (
    <div className={cn("grid grid-cols-7 h-fit", className)}>
      {daysData.map((day) => (
        <div className="p-3 text-right text-sm font-bold h-fit me-2" key={day}>
          {day}
        </div>
      ))}
    </div>
  );
});

CalendarHeader.displayName = "CalendarHeader";

type CalendarItemProps = {
  feature: Feature;
  className?: string;
};

const CalendarItem = memo(({ feature, className }: CalendarItemProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5 px-4 py-2", className)}>
      <div className="flex flex-row gap-2 items-center">
        <div className="h-2 w-2 shrink-0 rounded-full bg-purple-400" />
        <span className="truncate">{feature.calories}</span>
      </div>

      <div className="flex flex-row gap-2 items-center flex-wrap">
        <span className="flex flex-row gap-2 items-center">
          <div className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
          {feature.protein}
        </span>

        <span className="flex flex-row gap-2 items-center">
          <div className="h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
          {feature.carbs}
        </span>

        <span className="flex flex-row gap-2 items-center">
          <div className="h-2 w-2 shrink-0 rounded-full bg-red-400" />
          {feature.fat}
        </span>
      </div>
    </div>
  );
});

CalendarItem.displayName = "CalendarItem";

type CalendarProviderProps = {
  locale?: Intl.LocalesArgument;
  startDay?: number;
  children: ReactNode;
  className?: string;
};

const CalendarProvider = ({
  locale = "en-US",
  startDay = 0,
  children,
  className,
}: CalendarProviderProps) => {
  const contextValue = useMemo(
    () => ({ locale, startDay }),
    [locale, startDay]
  );
  return (
    <CalendarContext.Provider value={contextValue}>
      <div className={cn("relative flex flex-col flex-1", className)}>
        {children}
      </div>
    </CalendarContext.Provider>
  );
};

export {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
  daysForLocale,
  monthsForLocale,
  useCalendarMonth,
  useCalendarYear,
  type CalendarBodyProps,
  type CalendarDatePaginationProps,
  type CalendarDatePickerProps,
  type CalendarDateProps,
  type CalendarHeaderProps,
  type CalendarItemProps,
  type CalendarMonthPickerProps,
  type CalendarProviderProps,
  type CalendarState,
  type CalendarYearPickerProps,
  type Feature,
  type Status,
};
