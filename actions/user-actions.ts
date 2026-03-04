"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/user";

export async function syncUserAction(): Promise<void> {
  try {
    const { userId } = await auth();
    if (!userId) return;
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? null;
    await syncUser(userId, email);
  } catch {
    // Non-critical side-effect; swallow to never break the layout render
  }
}
