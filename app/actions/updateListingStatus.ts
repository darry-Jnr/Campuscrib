"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateListingStatus(id: string, status: boolean) {
  try {
    await prisma.listing.update({ where: { id }, data: { isPublished: status } });
    revalidatePath("/agents/history");
    return { success: true };
  } catch (e) { return { success: false }; }
}
