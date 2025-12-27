import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth"; // Import your server auth
import { headers } from "next/headers";
import ApartmentDetail from "@/app/components/details/ApartmentDetails";

export default async function ApartmentPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Resolve params and Get Session
  const [resolvedParams, session] = await Promise.all([
    params,
    auth.api.getSession({
      headers: await headers(),
    }),
  ]);

  const id = resolvedParams.id;

  // 2. Fetch data from DB
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

  if (!apartment) {
    notFound();
  }

  // 3. Extract Agent Details Safely
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
      
      // Pass the session user to the client component
      currentUser={session?.user || null}
      
      // Agent Info
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