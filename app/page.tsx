import { getSession } from "@/auth/session";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";

export default async function Page() {
  const session = await getSession();

  if (session?.user) {
    redirect("/home");
  }

  return <LandingPage />;
}
