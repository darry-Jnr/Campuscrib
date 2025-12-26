import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ApartmentDetail from "@/app/components/details/ApartmentDetails";

export default async function ApartmentPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Resolve the params
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. Fetch data from DB with the nested Agent Profile
  const apartment = await prisma.listing.findUnique({
    where: { id: id },
    include: {
      agent: {
        include: {
          agentprofile: true, 
        }
      },
    },
  });

  // 3. Handle 404
  if (!apartment) {
    notFound();
  }

  // 4. Extract Agent Details Safely
  const businessName = apartment.agent?.agentprofile?.businessName || "CampusCrib Agent";
  const whatsappNumber = apartment.agent?.agentprofile?.whatsappNumber;

  return (
    <ApartmentDetail
      id={apartment.id}
      videoUrl={apartment.videoUrl}
      mainLocation={apartment.mainLocation}
      location={apartment.streetName}
      price={`₦${Number(apartment.price).toLocaleString()}`}
      distance={apartment.distance}
      description={apartment.description || "No description provided."}
      
      // Agent Info for the WhatsApp Logic
      agentName={businessName}
      agentPhone={whatsappNumber} 
      
      // Amenities
      hasFence={apartment.hasFence}
      electricity={apartment.electricity}
      water={apartment.water}
      security={apartment.security}
      solar={apartment.solar}
    />
  );
}