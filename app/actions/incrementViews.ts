"use server";

import { prisma } from "@/lib/prisma";

export async function incrementViews(listingId: string) {
  try {
    await prisma.listing.update({
      where: { id: listingId },
      data: {
        views: {
          increment: 1, // This is a built-in Prisma function
        },
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}