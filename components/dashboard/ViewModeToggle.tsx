import { CalendarDays, Clock3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/ui/components/base/tabs";

export type MobileDashboardView = "timeline" | "calendar";

type ViewModeToggleProps = {
  value: MobileDashboardView;
  onChange: (view: MobileDashboardView) => void;
  className?: string;
};

const OPTIONS: Array<{
  value: MobileDashboardView;
  label: string;
  icon: typeof Clock3;
}> = [
  { value: "timeline", label: "Timeline", icon: Clock3 },
  { value: "calendar", label: "Calendar", icon: CalendarDays },
];

export function ViewModeToggle({
  value,
  onChange,
  className,
}: ViewModeToggleProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(val) => onChange(val as MobileDashboardView)}
      className={className}
    >
      <TabsList className="grid w-full grid-cols-2 h-9 p-1">
        {OPTIONS.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className="gap-2 text-sm font-medium"
          >
            <option.icon className="size-4" />
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
