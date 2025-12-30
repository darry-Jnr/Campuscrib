"use server";
import { prisma } from "@/lib/prisma";

export async function deleteListing(id: string) {
  try {
    await prisma.listing.delete({ where: { id } });
    return { success: true };
  } catch (e) { return { success: false }; }
}
