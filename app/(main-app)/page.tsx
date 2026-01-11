import { LandingCalendar } from "./components/LandingCalendar";
import { getMonthlySummary } from "@/actions/db/summary";

export default async function Home() {
  const summaries = await getMonthlySummary(new Date());

  return (
    <div className="flex h-screen items-center justify-center font-sans dark">
      <main className="flex h-screen w-full flex-col items-center justify-between bg-background p-16">
        <LandingCalendar summaries={summaries} />
      </main>
    </div>
  );
}
