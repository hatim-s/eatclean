import { LandingCalendar } from "./components/LandingCalendar";
import { getMonthlySummary, getWeeklySummary } from "@/actions/db/summary";
import { getRecentFoodLogs } from "@/actions/db/foodLog";
import { getSession } from "@/auth/session";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/ui/components/base/avatar";
import { Badge } from "@/ui/components/base/badge";
import { Leaf } from "lucide-react";

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
  const [session, summaries, weeklySummaries, recentMeals] = await Promise.all([
    getSession(),
    getMonthlySummary(new Date()),
    getWeeklySummary(new Date()),
    getRecentFoodLogs(4),
  ]);
  const user = session?.user;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 w-full max-w-350 items-center justify-between px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Leaf className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                EatClean
              </p>
              <p className="hidden truncate text-[11px] text-muted-foreground sm:block">
                Nutrition Dashboard
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2 rounded-lg border bg-card/60 px-2.5 py-1.5">
            <Avatar size="sm">
              <AvatarImage alt={user?.name || "User"} src={user?.image || undefined} />
              <AvatarFallback>{getUserInitials(user?.name, user?.email)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">
                {user?.name || "User"}
              </p>
              <p className="hidden max-w-44 truncate text-[11px] text-muted-foreground sm:block">
                {user?.email || ""}
              </p>
            </div>
            <Badge className="hidden text-[10px] md:inline-flex" variant="outline">
              Signed in
            </Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-350 flex-1 min-h-0 flex-col px-4 pb-4 pt-4 sm:px-6 sm:pb-6 lg:px-10">
        <LandingCalendar
          summaries={summaries}
          weeklySummaries={weeklySummaries}
          recentMeals={recentMeals}
        />
      </main>
    </div>
  );
}
