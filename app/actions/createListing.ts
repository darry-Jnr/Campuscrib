"use server";

import { prisma } from "@/lib/prisma"; // Adjust this to where your prisma client is
import { auth } from "@/lib/auth";   // Adjust to your auth (Better Auth/NextAuth)
import { headers } from "next/headers";
export async function createListing(data: any) {
  try {
    // 1. Check if the user is logged in (Security first!)
    const session = await auth.api.getSession({
        headers: await headers(),
      });
    if (!session) throw new Error("Unauthorized");

    // 2. Save to the Database using Prisma
    const listing = await prisma.listing.create({
      data: {
        mainLocation: data.mainLocation,
        streetName: data.streetName,
        price: Number(data.price), // Ensure price is a number
        distance: data.distance,
        description: data.description,
        videoUrl: data.videoUrl, // THIS IS THE CLOUDINARY URL
        imageUrls: data.imageUrls || [], // Your array of photo URLs
        hasFence: data.hasFence,
        electricity: data.electricity,
        water: data.water,
        security: data.security,
        solar: data.solar,
        agentId: session.user.id, // Link the listing to the Agent
      },
    });

    return { success: true, listingId: listing.id };
  } catch (error) {
    console.error("DATABASE_ERROR", error);
    return { success: false, error: "Failed to create listing" };
  }
}