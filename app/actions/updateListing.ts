"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateListing(id: string, data: any) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session) throw new Error("Unauthorized");

    const existingListing = await prisma.listing.findUnique({
      where: { id },
      select: { agentId: true }
    });

    if (!existingListing || existingListing.agentId !== session.user.id) {
      return { success: false, error: "Unauthorized: You do not own this listing" };
    }

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        mainLocation: data.mainLocation,
        streetName: data.streetName,
        price: Number(data.price),
        distance: data.distance,
        description: data.description,
        videoUrl: data.videoUrl,
        imageUrls: data.imageUrls || [],
        hasFence: data.hasFence,
        electricity: data.electricity,
        water: data.water,
        security: data.security,
        solar: data.solar,
      },
    });

    // Clear caches so the user and agent see the new data immediately
    revalidatePath("/agents/history");
    revalidatePath("/");

    return { success: true, listingId: updatedListing.id };
  } catch (error) {
    console.error("UPDATE_DATABASE_ERROR", error);
    return { success: false, error: "Failed to update listing" };
  }
}