import { getSession } from "@/auth/session";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function MainAppLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return children;
}
