import Container from "@/app/components/Container";
import OnboardingBanner from "@/app/components/OnboardingBanner";
import Wrapper from "./Wrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link"; // Added back
import RoommateToggle from "@/app/components/RoommateToggle";
import CreditBadge from "@/app/components/CreditBadge";

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
      <div className="block md:hidden">
        <OnboardingBanner />
      </div>
      <Container>
        <div className="pt-24 pb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find a Roommate</h1>
              <p className="text-gray-600">Connect with students near you</p>
            </div>
            {userProfile && <CreditBadge count={userProfile.credits} />}
          </div>

          {userProfile && (
            <div className="bg-gray-50 rounded-3xl p-5 mb-10 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-black text-gray-900">Your Status</h3>
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
          <h2 className="text-xl font-bold mb-2 text-gray-800">Potential Matches</h2>
          <p className="text-sm text-gray-500 mb-4 font-medium">
            {roommates.length} {roommates.length === 1 ? 'student' : 'students'} looking for accommodation
          </p>

          {/* GENDER FILTER BUTTONS */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            <Link 
              href="/roomatesearch"
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                !currentGender 
                ? "bg-green-600 text-white shadow-md shadow-green-100" 
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              All
            </Link>
            <Link 
              href="/roomatesearch?gender=Male"
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                currentGender === "Male" 
                ? "bg-green-600 text-white shadow-md shadow-green-100" 
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              Males
            </Link>
            <Link 
              href="/roomatesearch?gender=Female"
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                currentGender === "Female" 
                ? "bg-green-600 text-white shadow-md shadow-green-100" 
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              Females
            </Link>
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
              <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
                <p className="text-gray-400 font-medium">No students found for this filter.</p>
                <Link href="/roomatesearch" className="text-green-600 font-bold text-sm mt-2 block underline">
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