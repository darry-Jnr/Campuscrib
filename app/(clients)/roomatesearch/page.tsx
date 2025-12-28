import Container from "@/app/components/Container";
import OnboardingBanner from "@/app/components/OnboardingBanner";
import Wrapper from "./Wrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import RoommateToggle from "@/app/components/RoommateToggle";
import CreditBadge from "@/app/components/CreditBadge";
import ProfileLockModal from "@/app/components/modals/ProfileLockModal";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ gender?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const resolvedParams = await searchParams;
  const currentGender = resolvedParams.gender;

  const userProfile = session?.user?.id
    ? await prisma.profile.findUnique({
        where: { userId: session.user.id },
      })
    : null;

  /**
   * NEW UPDATED LOGIC:
   * Only the essentials are required to dismiss the lock.
   * Bio, Dept, Location, etc., are now optional.
   */
  const isProfileComplete = !!(
    userProfile?.name &&
    userProfile?.phone &&
    userProfile?.level &&
    userProfile?.gender
  );

  // We only show the lock if they are LOGGED IN but INCOMPLETE
  const shouldShowLock = !!session && !isProfileComplete;

  const roommates = await prisma.profile.findMany({
    where: {
      isPublished: true,
      NOT: { userId: session?.user?.id || "" },
      ...(currentGender ? { gender: currentGender } : {}),
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      {/* Delayed Modal: Only triggers for logged-in users with missing essentials */}
      <ProfileLockModal isComplete={!shouldShowLock} />

      <div className="block md:hidden">
        <OnboardingBanner />
      </div>

      <Container>
        <div className="pt-24 pb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Find a Roommate</h1>
              <p className="text-gray-600">Connect with students near you</p>
            </div>
            {/* Show credits badge: Guests get 3, Users get their actual count */}
            <CreditBadge count={userProfile?.credits ?? 3} />
          </div>

          {/* DASHBOARD: Only visible when the "Big Four" are filled */}
          {userProfile && isProfileComplete && (
            <div className="bg-gray-50 rounded-3xl p-5 mb-10 border border-gray-100 animate-in fade-in zoom-in duration-500 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Your Status</h3>
                  <p className="text-xs text-gray-500">
                    {userProfile.isPublished ? "Visible to everyone" : "Hidden from search"}
                  </p>
                </div>
                <RoommateToggle initialIsPublished={userProfile.isPublished ?? false} />
              </div>
              <Link href="/profile" className="block text-center mt-2 text-xs font-bold text-green-600 hover:underline">
                Edit Profile Details →
              </Link>
            </div>
          )}

          <hr className="mb-10 border-gray-200" />

          {/* MAIN LISTING HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">Potential Matches</h2>
              <p className="text-sm text-gray-500 font-medium">
                {roommates.length} {roommates.length === 1 ? 'student' : 'students'} looking
              </p>
            </div>
          </div>

          {/* GENDER FILTERS (AGENT BLACK STYLE) */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {['All', 'Male', 'Female'].map((g) => (
              <Link 
                key={g}
                href={g === 'All' ? "/roomatesearch" : `/roomatesearch?gender=${g}`}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  (g === 'All' && !currentGender) || currentGender === g
                  ? "bg-slate-900 text-white shadow-lg active:scale-95" 
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {g === 'All' ? 'All' : g + 's'}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roommates.length > 0 ? (
              roommates.map((person) => (
                <Wrapper
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  level={person.level}
                  status={person.status ?? ""}
                  gender={person.gender ?? ""}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-4xl bg-gray-50/50">
                <p className="text-gray-400 font-medium">No students found matching your search.</p>
                <Link href="/roomatesearch" className="text-slate-900 font-bold text-sm mt-2 block underline">
                  Clear all filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}