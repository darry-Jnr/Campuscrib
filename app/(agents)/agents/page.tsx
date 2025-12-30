import NewsBanner from "@/app/components/NewsBanner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiPlus, FiList, FiUser, FiEye, FiTrendingUp } from "react-icons/fi";

export default async function AgentHome() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      agentprofile: true, 
      listings: { select: { views: true, isPublished: true } }
    },
  });

  if (user?.role !== "AGENT" && user?.role !== "ADMIN") redirect("/");
  if (!user?.agentprofile || !user.agentprofile.isVerified) redirect("/agents/pending");

  const totalListings = user.listings.length;
  const liveListings = user.listings.filter(l => l.isPublished).length;
  const totalViews = user.listings.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <NewsBanner message="Verification Complete. You now have full access to the Agent Portal." />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back, <span className="text-black font-bold">{user.agentprofile.businessName}</span></p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{user.agentprofile.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Properties</h3>
            <p className="text-6xl font-black text-slate-900 mt-2 tracking-tighter">{totalListings}</p>
            <p className="text-[10px] font-bold text-green-500 mt-2 uppercase">{liveListings} Live Now</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Views</h3>
            <p className="text-6xl font-black text-blue-600 mt-2 tracking-tighter">{totalViews}</p>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">Across all time</p>
          </div>
          <Link href="/agents/upload" className="group relative overflow-hidden bg-black p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all flex flex-col justify-center text-white">
            <span className="font-black text-2xl uppercase italic">Add Property</span>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Start upload</span>
            <FiPlus className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 group-hover:text-white/20" size={80} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-lg font-black mb-6 uppercase italic">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/agents/history" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl hover:bg-black hover:text-white transition-all">
                        <FiList size={24} className="mb-2" />
                        <span className="text-[10px] font-black uppercase">Manage All</span>
                    </Link>
                    <Link href="/agents/profile" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl hover:bg-black hover:text-white transition-all">
                        <FiUser size={24} className="mb-2" />
                        <span className="text-[10px] font-black uppercase">Edit Profile</span>
                    </Link>
                </div>
            </div>
            <div className="bg-green-600 p-8 rounded-[2.5rem] shadow-sm text-white">
                <h2 className="text-lg font-black mb-2 uppercase italic">Profile Health</h2>
                <p className="text-green-100 text-sm font-medium">Your WhatsApp is connected.</p>
                <div className="mt-6 flex items-center justify-between bg-black/10 p-4 rounded-2xl">
                    <span className="text-[10px] font-black uppercase tracking-widest">Status</span>
                    <span className="font-black text-xl italic">{user.agentprofile.whatsappNumber ? 'ACTIVE' : 'MISSING'}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
