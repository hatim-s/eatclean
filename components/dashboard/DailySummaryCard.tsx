import { ReactNode } from "react";
import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/base/card";
import { cn } from "@/ui/lib/utils";
import { CalorieRing } from "@/components/dashboard/CalorieRing";
import { MacroProgressRows } from "@/components/dashboard/MacroProgressRows";

type DailySummaryCardProps = {
  title: string;
  subtitle?: string;
  calories: number;
  goalCalories: number;
  protein: number;
  goalProtein: number;
  carbs: number;
  goalCarbs: number;
  fat: number;
  goalFat: number;
  className?: string;
  action?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
  showRemainingText?: boolean;
};

export function DailySummaryCard({
  title,
  subtitle,
  calories,
  goalCalories,
  protein,
  goalProtein,
  carbs,
  goalCarbs,
  fat,
  goalFat,
  className,
  action,
  children,
  compact = false,
  showRemainingText = true,
}: DailySummaryCardProps) {
  const remainingCalories = Math.max(goalCalories - Math.round(calories), 0);

  return (
    <Card size={compact ? "sm" : "default"} className={cn("border-border/80", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="size-4 text-muted-foreground" />
              {title}
            </CardTitle>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {action}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <CalorieRing
            calories={calories}
            goal={goalCalories}
            size={compact ? 92 : 108}
            strokeWidth={compact ? 7 : 8}
          />

          <MacroProgressRows
            className="flex-1"
            compact={compact}
            items={[
              { label: "Protein", value: protein, goal: goalProtein, tone: "emerald" },
              { label: "Carbs", value: carbs, goal: goalCarbs, tone: "amber" },
              { label: "Fat", value: fat, goal: goalFat, tone: "rose" },
            ]}
          />
        </div>

        {showRemainingText && (
          <p className="text-center text-sm text-muted-foreground">
            {remainingCalories} kcal remaining
          </p>
        )}

        {children}
      </CardContent>
    </Card>
  );
}
