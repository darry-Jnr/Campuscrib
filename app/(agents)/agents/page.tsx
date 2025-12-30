import NewsBanner from "@/app/components/NewsBanner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiPlus, FiList, FiUser, FiTrendingUp, FiEye } from "react-icons/fi";

export default async function AgentHome() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      agentprofile: true, 
      listings: {
        select: {
          views: true,
          isPublished: true,
        }
      }
    },
  });

  if (user?.role !== "AGENT" && user?.role !== "ADMIN") redirect("/");
  if (!user?.agentprofile || user.agentprofile.isVerified === false) {
    redirect("/agents/pending");
  }

  // --- CALCULATE REAL STATS ---
  const totalListings = user.listings.length;
  const liveListings = user.listings.filter(l => l.isPublished).length;
  const totalViews = user.listings.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <NewsBanner message="Verification Complete. You now have full access to the Agent Portal." />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Welcome back, <span className="text-black font-bold">{user.agentprofile.businessName}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl w-fit shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.15em]">
              {user.agentprofile.status}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Properties</h3>
                <FiList className="text-slate-300" size={20} />
            </div>
            <p className="text-6xl font-black text-slate-900 mt-2 tracking-tighter">{totalListings}</p>
            <p className="text-[10px] font-bold text-green-500 mt-2 uppercase tracking-wide">
              {liveListings} Currently Live on Site
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Views</h3>
                <FiEye className="text-blue-400" size={20} />
            </div>
            <p className="text-6xl font-black text-blue-600 mt-2 tracking-tighter">{totalViews}</p>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">Across all listings</p>
          </div>

          <Link 
            href="/agents/upload" 
            className="group relative overflow-hidden bg-black p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all flex flex-col justify-center"
          >
            <div className="relative z-10">
              <span className="text-white font-black text-2xl block tracking-tight italic uppercase">Add Property</span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1 group-hover:text-white transition-colors">Start new upload</span>
            </div>
            <FiPlus className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 group-hover:text-white/20 transition-all" size={100} />
          </Link>
        </div>

        {/* Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Quick Management */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-lg font-black tracking-tight mb-6 uppercase italic">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/agents/listings" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl hover:bg-slate-900 hover:text-white transition-all group">
                        <FiList size={24} className="mb-2 text-slate-400 group-hover:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Manage All</span>
                    </Link>
                    <Link href="/agents/profile" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl hover:bg-slate-900 hover:text-white transition-all group">
                        <FiUser size={24} className="mb-2 text-slate-400 group-hover:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Edit Profile</span>
                    </Link>
                </div>
            </div>

            {/* Profile Completion / Status */}
            <div className="bg-green-500 p-8 rounded-[2.5rem] shadow-sm text-white flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-black tracking-tight mb-2 uppercase italic">Profile Health</h2>
                    <p className="text-green-100 text-sm font-medium">Your WhatsApp is connected and students can reach you directly.</p>
                </div>
                <div className="mt-6 flex items-center justify-between bg-black/10 p-4 rounded-2xl">
                    <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp Leads</span>
                    <span className="font-black text-xl">{user.agentprofile.whatsappNumber ? 'ACTIVE' : 'NONE'}</span>
                </div>
            </div>

        </div>

        {/* Empty State Footer (Show if no listings) */}
        {totalListings === 0 && (
          <div className="mt-10 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-300 mb-4">
                <FiTrendingUp size={30} />
            </div>
            <h3 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">Grow your business</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2 text-sm font-medium">
              Upload your properties to start appearing in student searches.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}