"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
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
  TypingDemoCardProps,
} from "./types";

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
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-300",
  emerald: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  rose: "border-rose-500/20 bg-rose-500/10 text-rose-300",
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
      <h2 className="text-3xl font-semibold text-zinc-50 sm:text-4xl">{title}</h2>
      {description ? (
        <p className={cn("mt-4 text-zinc-400", descriptionClassName)}>{description}</p>
      ) : null}
    </div>
  );
}

export function FeatureCard({ feature }: { feature: FeatureItem }) {
  const Icon = feature.icon;

  return (
    <Card className="border-zinc-800 bg-zinc-900/60 transition-colors hover:border-zinc-700 hover:bg-zinc-900">
      <CardHeader className="space-y-3">
        <span
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-xl border",
            featureToneClasses[feature.tone]
          )}
        >
          <Icon className="size-5" />
        </span>
        <CardTitle className="text-lg text-zinc-100">{feature.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed text-zinc-400">
          {feature.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function StepCard({ step }: { step: HowItWorksStep }) {
  return (
    <div className="text-center">
      <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-sm font-semibold text-amber-300">
        {step.step}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-zinc-100">{step.title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{step.description}</p>
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
      const reducedFrameId = window.requestAnimationFrame(() => setCount(value));

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
      { threshold: 0.45 }
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
      <span className="w-20 text-right text-xs text-zinc-400">{label}</span>
      <Progress
        className="flex-1 gap-0 [&>[data-slot=progress-track]:last-child]:hidden"
        value={percentage}
      >
        <ProgressTrack className="h-2 bg-zinc-800">
          <ProgressIndicator className={nutrientToneClasses[tone]} />
        </ProgressTrack>
      </Progress>
      <span className="w-16 text-xs text-zinc-300">
        {value}
        {unit} <span className="text-zinc-600">/ {max}</span>
      </span>
    </div>
  );
}

type TypingPhase = "typing" | "processing" | "result";

export function TypingDemoCard({
  prompt,
  parsedItems,
  totalCalories,
  className,
}: TypingDemoCardProps) {
  const [typedText, setTypedText] = useState("");
  const [phase, setPhase] = useState<TypingPhase>("typing");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (phase === "typing") {
      if (typedText.length < prompt.length) {
        timeoutId = setTimeout(() => {
          setTypedText(prompt.slice(0, typedText.length + 1));
        }, 36);
      } else {
        timeoutId = setTimeout(() => setPhase("processing"), 700);
      }
    } else if (phase === "processing") {
      timeoutId = setTimeout(() => setPhase("result"), 1300);
    } else {
      timeoutId = setTimeout(() => {
        setTypedText("");
        setPhase("typing");
      }, 3800);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [phase, prefersReducedMotion, prompt, typedText]);

  const displayedPrompt = prefersReducedMotion ? prompt : typedText;
  const showingProcessing = !prefersReducedMotion && phase === "processing";
  const showingResults = prefersReducedMotion || phase === "result";
  const shouldExpand = prefersReducedMotion || phase !== "typing";

  return (
    <Card
      className={cn(
        "w-full max-w-sm overflow-hidden border-zinc-800 bg-zinc-900/95 py-0 shadow-2xl",
        className
      )}
    >
      <CardHeader className="gap-3 border-b border-zinc-800 px-4 py-4">
        <CardTitle className="flex items-center gap-2 text-xs font-medium text-zinc-300">
          <span className="inline-flex items-center justify-center rounded-md bg-violet-500/20 p-1.5">
            <Sparkles className="size-3.5 text-violet-300" />
          </span>
          AI Food Logger
        </CardTitle>
        <CardDescription className="rounded-xl bg-zinc-800 px-3 py-3 font-mono text-sm leading-relaxed text-zinc-300">
          {displayedPrompt}
          <span
            aria-hidden
            className={cn(
              "ml-0.5 inline-block h-4 w-0.5 align-middle",
              phase === "typing" && !prefersReducedMotion
                ? "animate-pulse bg-amber-400"
                : "bg-transparent"
            )}
          />
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          "overflow-hidden px-4 transition-all duration-500",
          shouldExpand ? "max-h-72 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        )}
      >
        {showingProcessing ? (
          <div className="flex items-center justify-center gap-2 py-4">
            <span className="size-4 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
            <span className="text-xs text-zinc-400">Analyzing nutrition...</span>
          </div>
        ) : null}

        {showingResults ? (
          <div className="space-y-2">
            {parsedItems.map((item, index) => (
              <div
                className={cn(
                  "flex items-center justify-between rounded-lg bg-zinc-800/70 px-3 py-2",
                  !prefersReducedMotion ? "landing-v2-animate-fade-slide" : ""
                )}
                key={item.name}
                style={
                  !prefersReducedMotion
                    ? { animationDelay: `${index * 80}ms` }
                    : undefined
                }
              >
                <div>
                  <div className="text-xs font-medium text-zinc-200">{item.name}</div>
                  <div className="text-[10px] text-zinc-500">{item.calories} kcal</div>
                </div>
                <div className="flex gap-2 text-[10px]">
                  <span className="text-amber-300">{item.protein}P</span>
                  <span className="text-amber-300">{item.carbs}C</span>
                  <span className="text-rose-300">{item.fat}F</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-zinc-800 pt-2">
              <span className="text-xs text-zinc-400">Total</span>
              <span className="text-sm font-semibold text-zinc-100">{totalCalories} kcal</span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function ToneDot({ tone }: { tone: NutrientTone }) {
  return <span className={cn("inline-block size-2 rounded-full", nutrientDotToneClasses[tone])} />;
}
