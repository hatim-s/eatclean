import { LandingCalendar } from "@/components/LandingCalendar";
import { getMonthlySummary, getWeeklySummary } from "@/actions/db/summary";
import { getFoodLogsByMonth, getRecentFoodLogs } from "@/actions/db/foodLog";
import { getSession } from "@/auth/session";
import { Leaf } from "lucide-react";
import { DashboardHeaderActions } from "@/components/DashboardHeaderActions";

function getUserInitials(
  name: string | null | undefined,
  email: string | null | undefined
) {
  if (name?.trim()) {
    const parts = name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
  }

  if (email?.trim()) {
    return email[0].toUpperCase();
  }

  return "U";
}

export default async function Home() {
  const [session, summaries, weeklySummaries, recentMeals, monthlyLogs] = await Promise.all([
    getSession(),
    getMonthlySummary(new Date()),
    getWeeklySummary(new Date()),
    getRecentFoodLogs(4),
    getFoodLogsByMonth(new Date()),
  ]);
  const user = session?.user;

  return (
    <div className="flex h-full w-full flex-col bg-background font-sans">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="mx-auto flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Leaf className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-md font-bold text-foreground">
                EatClean
              </p>
            </div>
          </div>

          <DashboardHeaderActions
            email={user?.email}
            image={user?.image}
            initials={getUserInitials(user?.name, user?.email)}
            name={user?.name}
          />
        </div>
      </header>

      <main className="mx-auto flex w-full flex-1 min-h-0 flex-col px-4 pb-4 pt-4 sm:px-6 sm:pb-6 lg:px-10 overflow-auto">
        <LandingCalendar
          monthlyLogs={monthlyLogs}
          summaries={summaries}
          weeklySummaries={weeklySummaries}
          recentMeals={recentMeals}
        />
      </main>
    </div>
  );
}
