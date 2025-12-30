"use server";
import { prisma } from "@/lib/prisma";

export async function incrementViews(id: string) {
  try {
    await prisma.listing.update({
      where: { id },
      data: { views: { increment: 1 } }
    });
    return { success: true };
  } catch (e) { return { success: false }; }
}
