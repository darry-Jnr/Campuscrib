import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Container from "@/app/components/Container";
import BackButton from "@/app/components/BackButton";
import { FiMapPin, FiBook, FiInfo } from "react-icons/fi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ContactButton from "@/app/components/ContactButton"; // Import our new component

export default async function RoommateDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 1. Fetch the roommate profile
  const person = await prisma.profile.findUnique({
    where: { id: id },
  });

  if (!person) return notFound();

  // 2. Fetch the logged-in user to check credits and unlocked list
  const userProfile = session?.user?.id 
    ? await prisma.profile.findUnique({
        where: { userId: session.user.id },
      })
    : null;

  // 3. Check if this profile is already in the user's unlocked list
  const hasUnlocked = userProfile?.profilesViewed.includes(person.id) || false;

  return (
    <Container>
      <div className="pt-10 pb-32 max-w-2xl mx-auto">
        <div className="pt-16 absolute">
          <BackButton />
        </div>
       
        {/* HERO SECTION */}
        <div className="mt-8 pt-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-4xl mb-4 border-4 border-white shadow-md">
            {person.gender === "Female" ? "👩‍🎓" : "👨‍🎓"}
          </div>
          <h1 className="text-2xl font-black text-gray-900">{person.name}</h1>
          <div className="flex items-center gap-2 mt-1">
             <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
               {person.status || "Looking"}
             </span>
             <span className="text-gray-400 text-sm">•</span>
             <span className="text-gray-500 text-sm font-medium">{person.level}L - {person.school || 'FUTA'}</span>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="mt-10 space-y-4">
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <h3 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              <FiInfo /> Bio
            </h3>
            <p className="text-gray-700 leading-relaxed italic">
              {person.bio || "This student hasn't added a bio yet, but they're looking for a roommate!"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 px-2">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <FiBook />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Department</p>
                <p className="text-sm font-bold text-gray-800">{person.dept}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <FiMapPin />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Preferred Area</p>
                <p className="text-sm font-bold text-gray-800">{person.location || "Not specified"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* STICKY CONNECT BUTTON - LOGIC REPLACED HERE */}
        <div className="fixed bottom-0 left-0 w-full p-5 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-100">
          <div className="max-w-2xl mx-auto">
            {session ? (
              <ContactButton 
                targetId={person.id}
                phone={hasUnlocked ? person.phone : null}
                hasUnlocked={hasUnlocked}
                credits={userProfile?.credits || 0}
                userEmail={session.user.email}
              />
            ) : (
              <a 
                href="/auth/login"
                className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center"
              >
                Login to Connect
              </a>
            )}
            <p className="text-center text-[10px] text-gray-400 mt-2">
               Connect with {person.name} directly on WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}