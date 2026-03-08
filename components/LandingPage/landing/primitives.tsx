"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/components/base/card";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/ui/components/base/progress";
import { cn } from "@/ui/lib/utils";
import type {
  AnimatedCounterProps,
  FeatureItem,
  FeatureTone,
  HowItWorksStep,
  NutrientBarProps,
  NutrientTone,
  SectionHeaderProps,
} from "./types";
export { TypingDemoCard } from "@/ui/components/typing-demo-card";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreference);

      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);

    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return prefersReducedMotion;
}

const featureToneClasses: Record<FeatureTone, string> = {
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-300",
  emerald: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-300",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-300",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
  rose: "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-300",
};

const nutrientToneClasses: Record<NutrientTone, string> = {
  emerald: "bg-amber-400",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
};

const nutrientDotToneClasses: Record<NutrientTone, string> = {
  emerald: "bg-amber-400",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
};

export function SectionHeader({
  title,
  description,
  className,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function FeatureCard({ feature }: { feature: FeatureItem }) {
  const Icon = feature.icon;

  return (
    <Card className="border-border bg-card/60 transition-colors hover:border-border/80 hover:bg-card">
      <CardHeader className="space-y-3">
        <span
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-xl border",
            featureToneClasses[feature.tone],
          )}
        >
          <Icon className="size-5" />
        </span>
        <CardTitle className="text-lg text-card-foreground">{feature.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function StepCard({ step }: { step: HowItWorksStep }) {
  return (
    <div className="text-center">
      <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-sm font-semibold text-amber-600 dark:text-amber-300">
        {step.step}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {step.description}
      </p>
    </div>
  );
}

export function AnimatedCounter({
  value,
  prefix,
  suffix,
  durationMs = 2000,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      const reducedFrameId = window.requestAnimationFrame(() =>
        setCount(value),
      );

      return () => window.cancelAnimationFrame(reducedFrameId);
    }

    const resetFrameId = window.requestAnimationFrame(() => setCount(0));

    const element = rootRef.current;

    if (!element) {
      return () => window.cancelAnimationFrame(resetFrameId);
    }

    let frameId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        const startTime = performance.now();

        const tick = (timestamp: number) => {
          const progress = Math.min((timestamp - startTime) / durationMs, 1);
          setCount(Math.round(value * progress));

          if (progress < 1) {
            frameId = window.requestAnimationFrame(tick);
          }
        };

        frameId = window.requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(resetFrameId);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [durationMs, prefersReducedMotion, value]);

  return (
    <span className={className} ref={rootRef}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function NutrientProgressRow({
  label,
  value,
  max,
  tone,
  unit,
  className,
}: NutrientBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="w-20 text-right text-xs text-muted-foreground">{label}</span>
      <Progress
        className="flex-1 gap-0 [&>[data-slot=progress-track]:last-child]:hidden"
        value={percentage}
      >
        <ProgressTrack className="h-2 bg-muted">
          <ProgressIndicator className={nutrientToneClasses[tone]} />
        </ProgressTrack>
      </Progress>
      <span className="w-16 text-xs text-foreground">
        {value}
        {unit} <span className="text-muted-foreground">/ {max}</span>
      </span>
    </div>
  );
}

export function ToneDot({ tone }: { tone: NutrientTone }) {
  return (
    <span
      className={cn(
        "inline-block size-2 rounded-full",
        nutrientDotToneClasses[tone],
      )}
    />
  );
}
