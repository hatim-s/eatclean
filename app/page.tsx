import { getSession } from "@/auth/session";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { Suspense } from "react";

async function SessionAwareLandingPage() {
  const session = await getSession();

  if (session?.user) {
    redirect("/home");
  }

  return <LandingPage />;
}

export default function Page() {
  return (
    <Suspense fallback={<LandingPage />}>
      <SessionAwareLandingPage />
    </Suspense>
  );
}
