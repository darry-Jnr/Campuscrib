'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUpload, FiClock, FiUser, FiLogOut, FiX, FiRepeat } from "react-icons/fi";
import { type IconType } from "react-icons";

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const navItems: { label: string; icon: IconType; url: string }[] = [
  { label: "Dashboard", icon: FiHome, url: "/agents" },
  { label: "Upload House", icon: FiUpload, url: "/agents/upload" },
  { label: "My Listings", icon: FiClock, url: "/agents/listings" }, 
// Updated Sidebar Link
{ label: "Profile", icon: FiUser, url: "/agents/profile" },
];

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-50 bg-white shadow-2xl p-6 transition-all duration-300 ease-in-out
        w-64 border-r border-gray-100
        ${isVisible ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* HEADER & CLOSE */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-black text-xl tracking-tighter">
          <span className="text-black">CAMPUS</span>
          <span className="text-green-400">CRIB</span>
          <span className="block text-[10px] text-gray-400 font-bold tracking-widest uppercase">Agent Dashboard</span>
        </h1>
        <button onClick={onClose} className="p-2 bg-gray-50 rounded-xl text-gray-900 md:hidden">
          <FiX size={20} />
        </button>
      </div>

      {/* NAV LINKS */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.url;
          return (
            <Link
              key={item.label}
              href={item.url}
              onClick={onClose}
              className={`flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm ${
                isActive 
                  ? "bg-black text-white shadow-lg shadow-gray-200 scale-[1.02]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM ACTIONS */}
      <div className="absolute bottom-8 left-6 right-6 space-y-3">
        {/* SWITCH MODE BUTTON */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 p-4 w-full rounded-2xl bg-green-50 text-green-600 font-black text-xs uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all border border-green-100"
        >
          <FiRepeat size={16} />
          Switch to User
        </Link>

        {/* LOGOUT */}
        <button className="flex items-center gap-3 p-4 w-full rounded-2xl text-gray-400 font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-all">
          <FiLogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;