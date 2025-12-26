import HorizontalCard from "./HorizontalCard";
import { FiMapPin } from 'react-icons/fi';
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { prisma } from "@/lib/prisma"; 

export default async function Card() {
  const cardData = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const locations = Array.from(new Set(cardData.map(h => h.mainLocation)));

  if (cardData.length === 0) {
    return <div className="p-4 text-slate-500 text-center">No listings found.</div>;
  }

  return (
    <>
      {locations.map((mainLocation) => {
        const houses = cardData.filter(h => h.mainLocation === mainLocation);
    
        return (
          <section key={mainLocation} className="mb-8">
            <Link 
              href={`/locations/${mainLocation.toLowerCase().replace(" ", "-")}`} 
              className="font-bold flex items-center text-lg md:text-xl lg:text-2xl mb-4"
            >
              Available Houses at {mainLocation}
              <FiArrowRight className="ml-1" size={16} />
            </Link>
    
            <div className="flex gap-4 overflow-x-auto lg:overflow-x-visible w-full pb-2 snap-x snap-mandatory scrollbar-hide">
              {houses.map((house) => {
                // THE FIX: Convert .mp4 URL to .jpg for the thumbnail
                // This replaces the file extension at the end of the string
                const thumbnailUrl = house.videoUrl 
                  ? house.videoUrl.replace(/\.[^/.]+$/, ".jpg") 
                  : "/images/test.webp";

                return (
                  <HorizontalCard
                    key={house.id}
                    id={house.id}
                    className="snap-start"
                    imageUrl={thumbnailUrl} 
                    imageAlt={`Preview of ${house.streetName}`}
                    location={house.streetName}
                    price={`₦${Number(house.price).toLocaleString()}`}
                    distance={house.distance}
                    icon={FiMapPin}
                    cta="View Details"
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}