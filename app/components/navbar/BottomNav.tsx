'use client';
import { FiHome, FiMessageCircle, FiUser, FiFileText, } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";

const BottomNavData = [
  { id: 1, label: "Home", icon: FiHome, type: "normal", url: "/" },
  { id: 2, label: "Chat", icon: FiMessageCircle, type: "normal", url: "/chats" },
  { id: 3, label: "Roommate", icon: FaUsers, type: "center", url:"roomatesearch" }, // action button
  { id: 4, label: "News", icon: FiFileText, type: "normal", url: "/news" },
  { id: 5, label: "Profile", icon: FiUser, type: "normal", url: "/profile" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white flex justify-between items-center px-6 py-2 shadow-lg">
      {BottomNavData.map((item) => {
        const Icon = item.icon;

        if (item.type === "center") {
          return (
            <Link
            href={item.url} // `!` because url is optional for center button
          
              key={item.id}
              className="bg-green-500 text-white p-4 rounded-full -mt-6 shadow-lg flex items-center justify-center"
            >
              <Icon size={28} />
            </Link>
          );
        }

        // Normal navigation link
        return (
          <Link
            href={item.url} // `!` because url is optional for center button
            key={item.id}
            className="flex flex-col items-center text-gray-700"
          >
            <Icon size={24} />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
