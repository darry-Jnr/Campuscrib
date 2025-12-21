"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5"; // Importing from react-icons

interface NewsBannerProps {
  message: string;
}

const NewsBanner: React.FC<NewsBannerProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-green-50 border-b border-green-100 animate-in fade-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto py-2.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Centered Message Section */}
        <div className="flex items-center flex-1 justify-center">
          <span className="hidden sm:flex p-0.5 rounded-md bg-green-600 mr-3">
            <span className="text-white text-[10px] font-bold px-1.5 uppercase">News</span>
          </span>
          <p className="text-xs sm:text-sm font-medium text-green-800">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <div className="shrink-0">
          <button
            onClick={() => setIsVisible(false)}
            type="button"
            className="group flex p-1.5 rounded-full hover:bg-green-200 transition-colors"
            aria-label="Close banner"
          >
            <IoClose className="h-4 w-4 text-green-700 group-hover:text-green-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsBanner;