import NewsBanner from "@/app/components/NewsBanner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AgentHome() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 1. Redirect if not logged in
  if (!session) {
    redirect("/auth/login");
  }

  // 2. Fetch User and include 'agentprofile' (matching your schema exactly)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      agentprofile: true, 
    },
  });

  // 3. SECURE LOCK: Check Role
  if (user?.role !== "AGENT" && user?.role !== "ADMIN") {
    redirect("/");
  }

  // 4. SECURE LOCK: Check Verification Status
  // If the profile doesn't exist OR isVerified is false, send them back to pending
  if (!user?.agentprofile || user.agentprofile.isVerified === false) {
    redirect("/agents/pending");
  }

  // 5. If they passed all checks, show the Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <NewsBanner message="Verification Complete. You now have full access to the Agent Portal." />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Agent Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Welcome back, <span className="font-semibold text-slate-700">{user.agentprofile.businessName}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Verified Agent
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Your Listings</h3>
            <p className="text-5xl font-black text-slate-900 mt-2">0</p>
            <p className="text-xs text-slate-400 mt-2">Active properties at FUTA</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Interest</h3>
            <p className="text-5xl font-black text-blue-600 mt-2">0</p>
            <p className="text-xs text-slate-400 mt-2">Students viewing your contact</p>
          </div>

          <Link 
            href="/agents/upload" 
            className="group relative overflow-hidden bg-slate-900 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all flex flex-col justify-center"
          >
            <div className="relative z-10">
              <span className="text-white font-bold text-xl block">+ Add Property</span>
              <span className="text-slate-400 text-xs mt-1">Upload a new hostel listing</span>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute -right-4 -bottom-4 text-slate-800 opacity-20 group-hover:scale-110 transition-transform">
              <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 11a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Empty State for Listings */}
        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-400 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">No properties yet</h3>
          <p className="text-slate-500 max-w-xs mx-auto mt-2 text-sm">
            Once you upload your first apartment, it will appear here for students to see.
          </p>
        </div>
      </div>
    </div>
  );
}