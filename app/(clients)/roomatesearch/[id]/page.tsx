import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Container from "@/app/components/Container";
import BackButton from "@/app/components/BackButton";
import { FiMapPin, FiBook, FiInfo } from "react-icons/fi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ContactButton from "@/app/components/ContactButton";
import Link from "next/link";

export default async function RoommateDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const person = await prisma.profile.findUnique({
    where: { id: id },
  });

  if (!person) return notFound();

  const userProfile = session?.user?.id 
    ? await prisma.profile.findUnique({
        where: { userId: session.user.id },
      })
    : null;

  // Check if this user has already spent a credit on this person
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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{person.name}</h1>
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
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
              <FiInfo /> About Me
            </h3>
            <p className="text-gray-700 leading-relaxed italic text-sm">
              "{person.bio || "This student is looking for a roommate but hasn't written a bio yet!"}"
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 px-2">
            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
                <FiBook size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Department</p>
                <p className="text-sm font-bold text-gray-800">{person.dept || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm">
                <FiMapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Preferred Area</p>
                <p className="text-sm font-bold text-gray-800">{person.location || "Not specified"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* STICKY CONNECT BUTTON - THE MAGIC HAPPENS HERE */}
        <div className="fixed bottom-0 left-0 w-full p-5 bg-white/80 backdrop-blur-2xl border-t border-gray-100 z-50">
          <div className="max-w-2xl mx-auto">
            {session ? (
              /* IF LOGGED IN: Use the credit/unlock logic */
              <div className="space-y-3">
                <ContactButton 
                  targetId={person.id}
                  phone={hasUnlocked ? person.phone : null}
                  hasUnlocked={hasUnlocked}
                  credits={userProfile?.credits ?? 0}
                  userEmail={session.user.email}
                />
                {!hasUnlocked && (
                  <p className="text-center text-[10px] text-gray-400 font-medium">
                    Unlocking uses 1 of your 3 free connects.
                  </p>
                )}
              </div>
            ) : (
              /* IF GUEST: Show Agent Black Login Button */
              <div className="space-y-3">
                <Link 
                  href="/auth/login"
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center shadow-xl active:scale-95 transition-all"
                >
                  Login to Connect
                </Link>
                <p className="text-center text-[10px] text-gray-500 font-medium italic">
                  Sign in to get 3 free connects immediately 🎁
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}