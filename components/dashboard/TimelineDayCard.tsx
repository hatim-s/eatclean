import { ChevronRight } from "lucide-react";
import { ProgressIndicator, ProgressRoot, ProgressTrack } from "@/ui/components/base/progress";
import { cn } from "@/ui/lib/utils";

type TimelineDayCardProps = {
  label: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  calorieGoal: number;
  className?: string;
};

export function TimelineDayCard({
  label,
  calories,
  protein,
  carbs,
  fat,
  calorieGoal,
  className,
}: TimelineDayCardProps) {
  const progress = Math.min((calories / Math.max(calorieGoal, 1)) * 100, 100);

  return (
    <div
      className={cn(
        "space-y-2 rounded-xl border border-border bg-card/60 px-4 py-3 text-left transition-colors hover:border-primary/40",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-foreground">{label}</p>
        </div>
        <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-semibold text-primary tabular-nums">{Math.round(calories)} kcal</span>
        <span>
          <span className="text-emerald-500">P</span> {Math.round(protein)}g
        </span>
        <span>
          <span className="text-amber-500">C</span> {Math.round(carbs)}g
        </span>
        <span>
          <span className="text-rose-500">F</span> {Math.round(fat)}g
        </span>
      </div>

      <ProgressRoot value={progress} className="gap-0">
        <ProgressTrack className="h-1.5">
          <ProgressIndicator className="bg-primary/70" />
        </ProgressTrack>
      </ProgressRoot>
    </div>
  );
}
