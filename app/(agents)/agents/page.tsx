import NewsBanner from "@/app/components/NewsBanner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"; // Make sure prisma is imported
import Link from "next/link";

export default async function AgentHome() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 1. Check if user is signed in
  if (!session) {
    redirect("/login");
  }

  // 2. Get user from DB to check their role
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  // 3. Protection: If they aren't an AGENT or ADMIN, kick them to home
  // Note: 'AGENT' and 'ADMIN' must match your Prisma Enum exactly
  if (user?.role !== "AGENT" && user?.role !== "ADMIN") {
    console.log("Access Denied for role:", user?.role); // Add this to debug!
    redirect("/");
  }
  // 4. If they reach here, they ARE an Agent
  return (
    <div className="min-h-screen bg-gray-50">
      <NewsBanner message="Welcome to the Agent Portal. You can now manage your apartment listings." />
      
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-500 text-lg">
            Hello, {user.name}. Manage your properties and leads here.
          </p>
        </div>

        {/* Placeholder for Agent Stats or Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Listings</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Pending Views</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
             <Link href="/agents/upload" className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition">
                + Add New Property
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}