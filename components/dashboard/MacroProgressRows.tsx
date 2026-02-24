import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/ui/components/base/progress";
import { cn } from "@/ui/lib/utils";

export type MacroTone = "emerald" | "amber" | "rose";

export type MacroProgressItem = {
  label: string;
  value: number;
  goal: number;
  tone: MacroTone;
  unit?: string;
};

type MacroProgressRowsProps = {
  items: MacroProgressItem[];
  className?: string;
  compact?: boolean;
};

const toneToIndicatorClass: Record<MacroTone, string> = {
  emerald: "bg-emerald-500 dark:bg-emerald-400",
  amber: "bg-amber-500 dark:bg-amber-400",
  rose: "bg-rose-500 dark:bg-rose-400",
};

export function MacroProgressRows({
  items,
  className,
  compact = false,
}: MacroProgressRowsProps) {
  return (
    <div className={cn(compact ? "space-y-2" : "space-y-3", className)}>
      {items.map((item) => {
        const safeGoal = Math.max(item.goal, 1);
        const progress = Math.min((item.value / safeGoal) * 100, 100);
        const unit = item.unit ?? "g";

        return (
          <div key={item.label} className={compact ? "space-y-1" : "space-y-1.5"}>
            <div
              className={cn(
                "flex items-baseline justify-between gap-2",
                compact ? "text-sm" : "text-sm"
              )}
            >
              <span className="text-muted-foreground">{item.label}</span>
              <span className="tabular-nums font-medium text-foreground">
                {Math.round(item.value)}{unit}
                <span className="text-muted-foreground"> / {item.goal}{unit}</span>
              </span>
            </div>
            <Progress value={progress} className="gap-0">
              <ProgressTrack className={compact ? "h-1.5" : "h-2"}>
                <ProgressIndicator className={toneToIndicatorClass[item.tone]} />
              </ProgressTrack>
            </Progress>
          </div>
        );
      })}
    </div>
  );
}
