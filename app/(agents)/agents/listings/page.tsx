import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ListingsClient from "./ListingsClient";

export default async function HistoryPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const listings = await prisma.listing.findMany({
    where: {
      agentId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Format data to match UI expectations
  const formattedListings = listings.map((l) => ({
    ...l,
    isLive: l.isPublished, 
    // If no imageUrls, we use the videoUrl as the source for the video tag
    image: l.imageUrls?.[0] || "", 
    views: l.views || 0,
  }));

  return <ListingsClient initialListings={formattedListings} />;
}