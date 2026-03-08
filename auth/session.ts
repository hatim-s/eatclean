import { auth } from "./config";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
});

export async function requireSession() {
    const session = await getSession();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    return session;
}

export async function requireUserId() {
    const session = await requireSession();
    return session.user.id;
}
