import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type HeroTrustItem = {
  label: string;
};

export type FeatureTone = "violet" | "emerald" | "amber" | "cyan" | "rose";

export type FeatureItem = {
  icon: LucideIcon;
  tone: FeatureTone;
  title: string;
  description: string;
};

export type StatItem = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

export type NutrientTone = "emerald" | "amber" | "rose" | "violet" | "cyan" | "orange";

export type NutrientItem = {
  label: string;
  value: number;
  max: number;
  unit: string;
  tone: NutrientTone;
};

export type NutrientGroup = {
  title: string;
  tone: NutrientTone;
  items: NutrientItem[];
};

export type DailySummary = {
  consumed: number;
  goal: number;
};

export type HowItWorksStep = {
  step: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type DemoParsedItem = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type CalendarLegendItem = {
  label: string;
  tone: NutrientTone;
};

export type MiniCalendarData = {
  monthLabel: string;
  weekdays: string[];
  weeks: (number | null)[][];
  filledCalories: Record<number, number>;
  goalCalories: number;
  highlightedDay: number;
  legend: CalendarLegendItem[];
};

export type SectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
};

export type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

export type NutrientBarProps = NutrientItem & {
  className?: string;
};

export type TypingDemoCardProps = {
  prompt: string;
  parsedItems: DemoParsedItem[];
  totalCalories: number;
  className?: string;
};
