"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function deleteListing(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error("Unauthorized");

    // Verify ownership
    const listing = await prisma.listing.findUnique({
      where: { id },
      select: { agentId: true }
    });

    if (!listing || listing.agentId !== session.user.id) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.listing.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    console.error("DELETE_ERROR", error);
    return { success: false, error: "Failed to delete listing" };
  }
}