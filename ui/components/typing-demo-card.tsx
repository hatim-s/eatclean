"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/components/base/card";
import { cn } from "@/ui/lib/utils";

export type TypingDemoParsedItem = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type TypingDemoCardProps = {
  prompt: string;
  parsedItems: TypingDemoParsedItem[];
  totalCalories: number;
  className?: string;
};

type TypingPhase = "typing" | "processing" | "result";

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
        "w-full max-w-sm overflow-hidden border-border bg-card/95 py-0 shadow-2xl",
        className
      )}
    >
      <CardHeader className="gap-3 border-b border-border px-4 py-4">
        <CardTitle className="flex items-center gap-2 text-xs font-medium text-foreground">
          <span className="inline-flex items-center justify-center rounded-md bg-violet-500/20 p-1.5">
            <Sparkles className="size-3.5 text-violet-600 dark:text-violet-300" />
          </span>
          AI Food Logger
        </CardTitle>
        <CardDescription className="rounded-xl bg-muted px-3 py-3 font-mono text-sm leading-relaxed text-muted-foreground">
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
            <span className="text-xs text-muted-foreground">Analyzing nutrition...</span>
          </div>
        ) : null}

        {showingResults ? (
          <div className="space-y-2">
            {parsedItems.map((item, index) => (
              <div
                className={cn(
                  "flex items-center justify-between rounded-lg bg-muted/70 px-3 py-2",
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
                  <div className="text-xs font-medium text-foreground">{item.name}</div>
                  <div className="text-[10px] text-muted-foreground">{item.calories} kcal</div>
                </div>
                <div className="flex gap-2 text-[10px]">
                  <span className="text-amber-600 dark:text-amber-300">{item.protein}P</span>
                  <span className="text-amber-600 dark:text-amber-300">{item.carbs}C</span>
                  <span className="text-rose-500 dark:text-rose-300">{item.fat}F</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border pt-2">
              <span className="text-xs text-muted-foreground">Total</span>
              <span className="text-sm font-semibold text-foreground">{totalCalories} kcal</span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
