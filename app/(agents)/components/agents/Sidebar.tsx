'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiPlusCircle, FiList, FiUser, FiLogOut } from "react-icons/fi";

const navLinks = [
  { label: "Dashboard", icon: FiGrid, href: "/agents/dashboard" },
  { label: "Upload", icon: FiPlusCircle, href: "/agents/upload" },
  { label: "History", icon: FiList, href: "/agents/history" },
  { label: "Profile", icon: FiUser, href: "/agents/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 z-50">
      <div className="mb-12 px-4">
        <h2 className="text-2xl font-black italic tracking-tighter uppercase">Campus<span className="text-green-500">Crib</span></h2>
      </div>

      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                isActive ? 'bg-black text-white shadow-xl shadow-slate-200 scale-105' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-red-500 hover:bg-red-50 transition-all">
        <FiLogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
