"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function toggleListingStatus(id: string, currentStatus: boolean) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error("Unauthorized");

    await prisma.listing.update({
      where: { id, agentId: session.user.id },
      data: { isPublished: !currentStatus }
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}