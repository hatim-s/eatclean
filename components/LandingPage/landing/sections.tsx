"use client";

import Link from "next/link";
import { ThemeToggle } from "@/ui/components/theme-toggle";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Github,
  Leaf,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/components/base/accordion";
import { Badge } from "@/ui/components/base/badge";
import { Button, buttonVariants } from "@/ui/components/base/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/components/base/card";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/ui/components/base/progress";
import { cn } from "@/ui/lib/utils";
import {
  AnimatedCounter,
  FeatureCard,
  NutrientProgressRow,
  SectionHeader,
  StepCard,
  ToneDot,
  TypingDemoCard,
} from "./primitives";
import type {
  DailySummary,
  FaqItem,
  FeatureItem,
  HeroTrustItem,
  HowItWorksStep,
  MiniCalendarData,
  NavItem,
  NutrientGroup,
  StatItem,
} from "./types";

const legendToneClassName = {
  emerald: "bg-amber-400",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
} as const;

function MiniCalendarCard({ data }: { data: MiniCalendarData }) {
  return (
    <Card className="w-full max-w-sm border-zinc-800 bg-zinc-900/95 py-5 shadow-2xl">
      <CardHeader className="space-y-4 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-zinc-100">
            {data.monthLabel}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              aria-label="Previous month"
              className="size-6 rounded-md border-zinc-700 bg-zinc-800/90 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
              size="icon-xs"
              variant="outline"
            >
              <ChevronLeft className="size-3" />
            </Button>
            <Button
              aria-label="Next month"
              className="size-6 rounded-md border-zinc-700 bg-zinc-800/90 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
              size="icon-xs"
              variant="outline"
            >
              <ChevronRight className="size-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 px-5">
        <div className="grid grid-cols-7 gap-1">
          {data.weekdays.map((day) => (
            <span
              className="py-1 text-center text-[10px] font-medium text-zinc-500"
              key={day}
            >
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {data.weeks.flat().map((day, index) => {
            if (!day) {
              return <div className="aspect-square" key={`empty-${index}`} />;
            }

            const calories = data.filledCalories[day];
            const dayProgress = calories
              ? Math.min((calories / data.goalCalories) * 100, 100)
              : 0;
            const isCurrentDay = day === data.highlightedDay;

            return (
              <div
                className={cn(
                  "flex aspect-square flex-col items-center justify-center gap-0.5 rounded-lg text-xs transition-colors",
                  isCurrentDay
                    ? "bg-amber-500/10 ring-1 ring-amber-500"
                    : calories
                      ? "bg-zinc-800/70 hover:bg-zinc-800"
                      : "bg-zinc-800/20",
                )}
                key={`day-${day}`}
              >
                <span
                  className={cn(
                    "font-medium",
                    isCurrentDay
                      ? "text-amber-300"
                      : calories
                        ? "text-zinc-300"
                        : "text-zinc-600",
                  )}
                >
                  {day}
                </span>
                {calories ? (
                  <span className="h-[3px] w-4/5 overflow-hidden rounded-full bg-zinc-700">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-300"
                      style={{ width: `${dayProgress}%` }}
                    />
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-zinc-500">
          {data.legend.map((item) => (
            <span className="inline-flex items-center gap-1" key={item.label}>
              <span
                className={cn(
                  "inline-block h-0.5 w-2 rounded-full",
                  legendToneClassName[item.tone],
                )}
              />
              {item.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type LandingNavigationProps = {
  items: NavItem[];
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
};

export function LandingNavigation({
  items,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}: LandingNavigationProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link className="flex items-center gap-2" href="/">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300">
            <Leaf className="size-4" />
          </span>
          <span className="bg-linear-to-r from-amber-400 to-yellow-200 bg-clip-text text-lg font-semibold text-transparent">
            EatClean
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          {items.map((item) => (
            <a
              className="transition-colors hover:text-zinc-100"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            className={buttonVariants({
              size: "sm",
              className:
                "hidden sm:inline-flex border-white bg-white text-zinc-900 hover:bg-zinc-100",
            })}
            href="/sign-in"
          >
            <Github className="size-3.5" />
            Sign in with GitHub
          </Link>
          <Button
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 md:hidden"
            onClick={onToggleMobileMenu}
            size="icon-sm"
            variant="ghost"
          >
            {isMobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-zinc-800 bg-zinc-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3">
            {items.map((item) => (
              <a
                className="py-2 text-sm text-zinc-300 transition-colors hover:text-zinc-100"
                href={item.href}
                key={`mobile-${item.href}`}
                onClick={onCloseMobileMenu}
              >
                {item.label}
              </a>
            ))}
            <Link
              className={buttonVariants({
                size: "default",
                className:
                  "mt-1 justify-center border-white bg-white text-zinc-900 hover:bg-zinc-100",
              })}
              href="/sign-in"
              onClick={onCloseMobileMenu}
            >
              <Github className="size-4" />
              Sign in with GitHub
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

type HeroSectionProps = {
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  trustItems: HeroTrustItem[];
  calendarData: MiniCalendarData;
};

export function HeroSection({
  badgeText,
  titlePrefix,
  titleHighlight,
  description,
  primaryCtaLabel,
  secondaryCtaLabel,
  trustItems,
  calendarData,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/60 pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="landing-v2-glow absolute left-1/4 top-20 size-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div
          className="landing-v2-glow absolute bottom-0 right-1/4 size-80 rounded-full bg-violet-500/10 blur-3xl"
          style={{ animationDelay: "1.6s" }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <Badge
              className="border-amber-500/30 bg-amber-500/10 px-3 py-1 text-amber-300"
              variant="outline"
            >
              <Sparkles className="size-3.5" />
              {badgeText}
            </Badge>

            <h1 className="mt-6 text-4xl font-semibold leading-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              {titlePrefix}{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                {titleHighlight}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 lg:mx-0">
              {description}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className:
                    "w-full sm:w-auto border-amber-500 bg-amber-500 text-zinc-950 hover:bg-amber-400",
                })}
                href="/sign-in"
              >
                {primaryCtaLabel}
                <ArrowRight className="size-4" />
              </Link>

              <a
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "w-full sm:w-auto border-zinc-700 bg-zinc-800/90 text-zinc-200 hover:bg-zinc-700",
                })}
                href="#demo"
              >
                {secondaryCtaLabel}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 lg:justify-start">
              {trustItems.map((item) => (
                <span
                  className="inline-flex items-center gap-1.5"
                  key={item.label}
                >
                  <Check className="size-3.5 text-amber-400" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="landing-v2-float shrink-0">
            <MiniCalendarCard data={calendarData} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection({ items }: { items: StatItem[] }) {
  return (
    <section className="border-y border-zinc-800/60 bg-zinc-900/35">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {items.map((item) => (
            <div key={item.label}>
              <div className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
                <AnimatedCounter
                  className="tabular-nums"
                  prefix={item.prefix}
                  suffix={item.suffix}
                  value={item.value}
                />
              </div>
              <p className="mt-1 text-xs text-zinc-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type FeaturesSectionProps = {
  title: string;
  description: string;
  items: FeatureItem[];
};

export function FeaturesSection({
  title,
  description,
  items,
}: FeaturesSectionProps) {
  return (
    <section className="py-20 sm:py-28" id="features">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader description={description} title={title} />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

type DemoSectionProps = {
  title: string;
  description: string;
  steps: string[];
  prompt: string;
  totalCalories: number;
  parsedItems: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }[];
};

export function DemoSection({
  title,
  description,
  steps,
  prompt,
  totalCalories,
  parsedItems,
}: DemoSectionProps) {
  return (
    <section
      className="border-y border-zinc-800/60 bg-zinc-900/35 py-20 sm:py-28"
      id="demo"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:gap-16">
        <div className="order-2 flex w-full flex-1 justify-center lg:order-1">
          <TypingDemoCard
            className="landing-v2-float-delay"
            parsedItems={parsedItems}
            prompt={prompt}
            totalCalories={totalCalories}
          />
        </div>

        <div className="order-1 flex-1 text-center lg:order-2 lg:text-left">
          <h2 className="text-3xl font-semibold text-zinc-50 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">{description}</p>

          <div className="mt-8 space-y-4 text-left">
            {steps.map((step) => (
              <div className="flex items-start gap-3" key={step}>
                <span className="mt-0.5 inline-flex items-center justify-center rounded-full bg-amber-500/20 p-1">
                  <Check className="size-3 text-amber-300" />
                </span>
                <span className="text-sm text-zinc-300">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type NutritionSectionProps = {
  title: string;
  description: string;
  groups: NutrientGroup[];
  dailySummary: DailySummary;
};

export function NutritionSection({
  title,
  description,
  groups,
  dailySummary,
}: NutritionSectionProps) {
  const dailyProgress = Math.min(
    Math.round((dailySummary.consumed / dailySummary.goal) * 100),
    100,
  );
  const remainingCalories = Math.max(
    dailySummary.goal - dailySummary.consumed,
    0,
  );

  return (
    <section className="py-20 sm:py-28" id="nutrition">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader description={description} title={title} />

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {groups.map((group) => (
            <Card className="border-zinc-800 bg-zinc-900/60" key={group.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
                  <ToneDot tone={group.tone} />
                  {group.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.items.map((item) => (
                  <NutrientProgressRow
                    key={item.label}
                    label={item.label}
                    max={item.max}
                    tone={item.tone}
                    unit={item.unit}
                    value={item.value}
                  />
                ))}
              </CardContent>
            </Card>
          ))}

          <Card className="border-zinc-800 bg-zinc-900/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
                <ToneDot tone="amber" />
                Daily Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-4 text-center">
                <div className="text-4xl font-semibold text-zinc-50">
                  {dailySummary.consumed.toLocaleString()}
                </div>
                <p className="mb-4 mt-1 text-sm text-zinc-500">
                  of {dailySummary.goal.toLocaleString()} kcal goal
                </p>
                <Progress
                  className="gap-0 [&>[data-slot=progress-track]:last-child]:hidden"
                  value={dailyProgress}
                >
                  <ProgressTrack className="h-3 bg-zinc-800">
                    <ProgressIndicator className="bg-gradient-to-r from-orange-500 to-amber-400" />
                  </ProgressTrack>
                </Progress>
                <p className="mt-2 text-xs text-zinc-500">
                  {remainingCalories.toLocaleString()} kcal remaining
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection({
  title,
  steps,
}: {
  title: string;
  steps: HowItWorksStep[];
}) {
  return (
    <section className="border-y border-zinc-800/60 bg-zinc-900/35 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader title={title} />
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.step} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  return (
    <section className="py-20 sm:py-28" id="faq">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <SectionHeader title={title} />

        <Card className="mt-12 border-zinc-800 bg-zinc-900/60">
          <CardContent className="pt-3">
            <Accordion defaultValue={["faq-0"]}>
              {items.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-zinc-200 hover:no-underline data-[open]:text-zinc-100">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function CtaSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="border-t border-zinc-800/60 bg-zinc-900/35 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
        <span className="mb-6 inline-flex rounded-2xl bg-amber-500/10 p-3 text-amber-300">
          <Leaf className="size-8" />
        </span>
        <h2 className="text-3xl font-semibold text-zinc-50 sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-zinc-400">{description}</p>

        <Link
          className={buttonVariants({
            size: "lg",
            className:
              "mt-8 border-amber-500 bg-amber-500 text-zinc-950 hover:bg-amber-400",
          })}
          href="/sign-in"
        >
          <Github className="size-4" />
          Sign in with GitHub
        </Link>
      </div>
    </section>
  );
}

export function LandingFooter({ note }: { note: string }) {
  return (
    <footer className="border-t border-zinc-800/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex size-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-300">
            <Leaf className="size-3.5" />
          </span>
          <span className="text-sm font-semibold text-zinc-400">EatClean</span>
        </div>
        <p className="text-center text-xs text-zinc-600 sm:text-right">
          {note}
        </p>
      </div>
    </footer>
  );
}
