import { LandingCalendar } from "./components/LandingCalendar";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center font-sans dark">
      <main className="flex h-screen w-full flex-col items-center justify-between bg-background p-16">
        <LandingCalendar />
      </main>
    </div>
  );
}
