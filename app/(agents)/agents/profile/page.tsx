import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const profile = await prisma.agentProfile.findUnique({
    where: { userId: session.user.id },
    include: { user: true }
  });

  return (
    <div className="md:p-10 p-4 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">My Profile</h1>
        <p className="text-gray-500 text-sm font-medium">Update your business details and identity</p>
      </header>
      <ProfileClient initialData={profile} user={session.user} />
    </div>
  );
}
