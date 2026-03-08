import { getSession } from "@/auth/session";
import { redirect } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";

async function AuthenticatedLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return children;
}

export default function MainAppLayout({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={null}>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </Suspense>
  );
}
