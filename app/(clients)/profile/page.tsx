import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Avatar from "@/app/components/Avatar";
import ProfileModal from "@/app/components/modals/ProfileModal";
import LoginButton from "@/app/components/LoginButton";

export default async function ProfilePage() {
  // 1. Get the session securely on the server
  const session = await auth.api.getSession({ 
    headers: await headers() 
  });

  // 2. Fetch the profile ONLY if a user is logged in
  // We use findUnique to search by the userId linked to the session
  const profile = session?.user?.id 
    ? await prisma.profile.findUnique({ 
        where: { userId: session.user.id } 
      })
    : null;

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>

        {/* Profile header */}
        <div className="flex bg-white mb-6 gap-4 items-center p-4 rounded-lg shadow">
          <Avatar />
          <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex flex-col">
              {/* Display name or Guest */}
              <p className="text-xl font-bold text-green-600">
                {profile?.name || "Guest User"}
              </p>
              <span className="text-gray-500 text-sm">
                {session?.user?.email || "Sign in to manage profile"}
              </span>
            </div>

            {/* If logged in, show Edit Modal. If not, show Login. */}
            <div>
              {session ? (
                <ProfileModal initialData={profile ? { ...profile, phone: profile.phone ? parseInt(profile.phone, 10) : null } : null} />
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>

        {/* Information Display Sections */}
        <div className="space-y-6">
          <ProfileSection title="Personal Information">
            <InfoField label="Name" value={profile?.name} />
            <InfoField label="Phone" value={profile?.phone} />
            <InfoField label="Email" value={session?.user?.email} />
            <InfoField label="Gender" value={profile?.gender} />
          </ProfileSection>

          <ProfileSection title="Academic Info">
            <InfoField label="Department" value={profile?.dept} />
            <InfoField label="School" value={profile?.school} />
            <InfoField label="Level" value={profile?.level} />
            <InfoField label="Status" value={profile?.status} />
          </ProfileSection>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS (Keeps the main code clean) ---

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-500 text-sm uppercase tracking-wider">{label}</label>
      <span className="font-medium text-gray-800">
        {value || "—"} 
      </span>
    </div>
  );
}