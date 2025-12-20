// app/profile/page.tsx
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileClient from "./ProfileClient";
import Avatar from "@/app/components/Avatar";
import ProfileModal from "@/app/components/modals/ProfileModal";
import LoginButton from "@/app/components/LoginButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in</p>
        <LoginButton />
      </div>
    );
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) return <div>No profile found</div>;

 
  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>

    {/* Profile header */}
<div className="flex bg-white mb-6 gap-4 items-center p-4 rounded-lg shadow">
  {/* Avatar */}
  <div>
    <Avatar />
  </div>

  {/* Name, Email, Modal */}
  <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
    {/* Name & Email */}
    <div className="flex flex-col">
      <input
        type="text"
        value={profile.name}
        readOnly
        className="text-xl font-bold text-green-600 focus:outline-none "
      />
      <span className="text-gray-500 text-sm">{session.user.email}</span>
    </div>

    {/* Profile Modal button */}
    <div>
      <ProfileModal />
    </div>
  </div>
</div>


        {/* Pass profile to client component for editable form */}
        <ProfileClient profile={profile} email={session.user.email} />;
      </div>
    </div>
  );
}
