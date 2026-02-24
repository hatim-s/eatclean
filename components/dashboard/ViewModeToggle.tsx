import { CalendarDays, Clock3 } from "lucide-react";
import { cn } from "@/ui/lib/utils";

export type MobileDashboardView = "timeline" | "calendar";

type ViewModeToggleProps = {
  value: MobileDashboardView;
  onChange: (view: MobileDashboardView) => void;
  className?: string;
};

const OPTIONS: Array<{ value: MobileDashboardView; label: string; icon: typeof Clock3 }> = [
  { value: "timeline", label: "Timeline", icon: Clock3 },
  { value: "calendar", label: "Calendar", icon: CalendarDays },
];

export function ViewModeToggle({ value, onChange, className }: ViewModeToggleProps) {
  return (
    <div className={cn("grid grid-cols-2 rounded-xl bg-muted p-1", className)}>
      {OPTIONS.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              selected
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <option.icon className="size-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
