'use client';

import Link from "next/link";
import { FiHome, FiUpload, FiClock, FiSettings, FiLogOut } from "react-icons/fi";
import { type IconType } from "react-icons";
import { FiX } from "react-icons/fi";


interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const navItems: { label: string; icon: IconType; url: string }[] = [
  { label: "Dashboard", icon: FiHome, url: "/agents" },
  { label: "Upload House", icon: FiUpload, url: "/agents/upload" },
  { label: "History", icon: FiClock, url: "/agents/history" },
  { label: "Settings", icon: FiSettings, url: "/agents/settings" },
  { label: "Logout", icon: FiLogOut, url: "/agents/logout" },
];



const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-40 bg-white shadow-xl p-4 transition-all duration-300 ease-in-out
        w-52  md:w-64
        ${isVisible ? 'md:translate-x-0 ' : 'md:-translate-x-full '}
         ${isVisible ? 'translate-x-0 ' : '-translate-x-full '}
      `}
    >

      <nav className="flex flex-col gap-3 pt-8">

      <FiX size={24} onClick={onClose} className="text-gray-700 cursor-pointer" />
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.url}
            onClick={onClose}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <item.icon size={20} />
            <span className="text-gray-700 font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
