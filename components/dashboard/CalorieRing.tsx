import { cn } from "@/ui/lib/utils";

type CalorieRingProps = {
  calories: number;
  goal: number;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export function CalorieRing({
  calories,
  goal,
  className,
  size = 96,
  strokeWidth = 8,
}: CalorieRingProps) {
  const safeGoal = Math.max(goal, 1);
  const progress = Math.min(calories / safeGoal, 1);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ height: size, width: size }}
    >
      <svg
        className="-rotate-90"
        height={size}
        width={size}
        role="img"
        aria-label="Calorie progress"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          className="text-primary transition-[stroke-dashoffset] duration-300"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-semibold leading-none tabular-nums text-foreground">
          {Math.round(calories)}
        </span>
        <span className="mt-1 text-sm text-muted-foreground">/ {goal}</span>
      </div>
    </div>
  );
}
