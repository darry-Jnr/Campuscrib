import Container from "@/app/components/Container";
import OnboardingBanner from "@/app/components/OnboardingBanner";
import Wrapper from "./Wrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import ProfileModal from "@/app/components/modals/ProfileModal";
import Toast from "@/app/components/Toast";
import Link from "next/link";
import RoommateToggle from "@/app/components/RoommateToggle";
import NewsBanner from "@/app/components/NewsBanner";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userProfile = session?.user?.id
    ? await prisma.profile.findUnique({
        where: { userId: session.user.id },
      })
    : null;

  const roommates = await prisma.profile.findMany({
    where: {
      isPublished: true,
      NOT: { userId: session?.user?.id || "" },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <div className="block md:hidden">
        <OnboardingBanner />
      </div>
      <Container>
        <div className="pt-24 pb-20">
          <div className="mb-8">
            { userProfile && (
                <NewsBanner 
                message="make sure your phone number is your whatsapp number"
                />
            )}
          
            <h1 className="text-3xl font-bold text-gray-900">Find a Roommate</h1>
            <p className="text-gray-600">Browse students looking for accommodation</p>
          </div>

          {/* 1. GUEST BANNER: Only if user hasn't created a profile yet */}
          {!userProfile && (
            <div className="mb-10 bg-green-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">List yourself here!</h2>
                <p className="text-green-100 max-w-md">
                  Other students can't find you yet. Create your profile to appear in this list and start matching.
                </p>
              </div>
              {session ? (
                <ProfileModal initialData={null} />
              ) : (
                <Toast />
              )}
            </div>
          )}

          {/* 2. USER TOOLS: Toggle and Preview (Only if profile exists) */}
          {userProfile && (
            <div className="space-y-6 mb-12">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600">
                <span>
                  💡 <strong>Tip:</strong> To update your details, go to your{" "}
                  <Link href="/profile" className="font-bold text-green-600 hover:underline">
                    Profile Page
                  </Link>.
                </span>
              </div>

              {/* The Toggle Button Component */}
              <RoommateToggle initialIsPublished={userProfile.isPublished ?? false} />

              {/* Preview Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Your Public Preview
                </h3>
                <div className="max-w-sm border-2 border-green-500 rounded-xl overflow-hidden shadow-lg bg-white">
                  <Wrapper
                    name={userProfile.name}
                    level={userProfile.level}
                    status={userProfile.status || "Looking for roommate"}
                    gender={userProfile.gender || ""}
                  />
                </div>
                <p className="text-xs text-gray-500 italic">
                  {userProfile.isPublished 
                    ? "Visible to everyone" 
                    : "Currently hidden from the list"}
                </p>
              </div>
            </div>
          )}

          <hr className="mb-10 border-gray-200" />

          {/* 3. THE MAIN LIST: All public roommates */}
          <h2 className="text-xl font-bold mb-6 text-gray-800">Potential Matches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roommates.length > 0 ? (
              roommates.map((person) => (
                <Wrapper
                  key={person.id}
                  name={person.name}
                  level={person.level}
                  status={person.status ?? ""}
                  gender={person.gender ?? ""}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full py-10 text-center border-2 border-dashed border-gray-200 rounded-xl">
                There are currently no students listed as looking for roommates. 
                Be the first to list yourself and let others find you!
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}