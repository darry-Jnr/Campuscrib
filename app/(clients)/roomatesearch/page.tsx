import Container from "@/app/components/Container";
import OnboardingBanner from "@/app/components/OnboardingBanner";
import Wrapper from "./Wrapper"; // This should be your simple version
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-gray-900">Your Status</h3>
                  <p className="text-xs text-gray-500">
                    {userProfile.isPublished ? "Visible to everyone" : "Hidden from search"}
                  </p>
                </div>
                <RoommateToggle initialIsPublished={userProfile.isPublished ?? false} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roommates.map((person) => (
              <Wrapper
                key={person.id}
                id={person.id}
                name={person.name}
                level={person.level}
                status={person.status ?? ""}
                gender={person.gender ?? ""}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}