import VerticalCard from "@/app/components/cards/VerticalCard";
import Container from "@/app/components/Container";
import { FiMapPin } from "react-icons/fi";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function LocationPage({ 
  params 
}: { 
  params: Promise<{ mainLocation: string }> 
}) {
  // 1. Resolve the URL parameter (e.g., "south-gate")
  const resolvedParams = await params;
  const mainLocationParam = resolvedParams.mainLocation;

  // 2. Format "south-gate" -> "South Gate" to match your DB entries
  const mainLocation = mainLocationParam
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  // 3. Fetch from DB where mainLocation matches
  const houses = await prisma.listing.findMany({
    where: {
      mainLocation: mainLocation,
      // approved: true // Optional: only show approved houses
    },
    orderBy: { createdAt: 'desc' }
  });

  // 4. If no houses found in that location, you could show a 404 or an empty state
  if (!houses) {
    notFound();
  }

  return (
    <Container>
      <div className="pt-28 pb-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 px-2">
          Available at {mainLocation}
        </h1>

        {houses.length === 0 ? (
          <p className="text-gray-500 px-2">No houses listed in this area yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4">
            {houses.map((house) => {
              // Fix: Convert video to thumbnail image
              const thumbnailUrl = house.videoUrl 
                ? house.videoUrl.replace(/\.[^/.]+$/, ".jpg") 
                : "/images/test.webp";

              return (
                <VerticalCard
                  key={house.id}
                  id={house.id} // Pass the real DB ID
                  imageUrl={thumbnailUrl}
                  imageAlt={house.streetName}
                  location={house.streetName}
                  price={`₦${Number(house.price).toLocaleString()}`}
                  distance={house.distance}
                  icon={FiMapPin}
                  cta="View Details"
                />
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}