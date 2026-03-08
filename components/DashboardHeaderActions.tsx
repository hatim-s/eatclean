"use client";

import { AddFoodDialog } from "@/components/AddFoodDialog";
import { UserMenu } from "@/components/UserMenu";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { ThemeToggle } from "@/ui/components/theme-toggle";

type DashboardHeaderActionsProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  initials: string;
};

export function DashboardHeaderActions({
  name,
  email,
  image,
  initials,
}: DashboardHeaderActionsProps) {
  const todayDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <AddFoodDialog
        date={todayDate}
        hideTrigger
        trigger={
          <>
            <Plus className="size-4" />
            <span className="sr-only">Log Food</span>
          </>
        }
        triggerClassName="inline-flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 md:hidden"
      />

      <div className="md:hidden">
        <UserMenu
          email={email}
          image={image}
          initials={initials}
          name={name}
          variant="compact"
        />
      </div>

      <div className="hidden md:block">
        <UserMenu email={email} image={image} initials={initials} name={name} />
      </div>
    </div>
  );
}
