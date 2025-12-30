import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // Fetch the agent profile and the basic user data (for name/email/image)
  const profile = await prisma.agentProfile.findUnique({
    where: { userId: session.user.id },
    include: { user: true }
  });

  // If they don't have a profile yet, we'll pass null and handle it in the client
  return (
    <div className="md:p-10 p-4 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tighter">My Profile</h1>
        <p className="text-gray-500 text-sm">Manage your business identity and contact details</p>
      </header>
      
      <ProfileClient initialData={profile} user={session.user} />
    </div>
  );
}