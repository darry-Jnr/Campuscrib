'use client';

import Avatar from '@/app/components/Avatar';
import { FiBell, FiMenu } from 'react-icons/fi';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 bg-white shadow-md p-4 w-full">
      <FiMenu 
        onClick={onMenuClick} 
        size={24} 
        className="cursor-pointer" 
        aria-label="Toggle Sidebar"
      />
      
      <div className="relative flex gap-3 items-center border border-gray-400 rounded-full p-2">
        <FiBell size={24} className="text-gray-700" />
        <Avatar />
      </div>
    </header>
  );
};

export default Topbar;
