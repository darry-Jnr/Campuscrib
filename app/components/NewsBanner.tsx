"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface NewsBannerProps {
  message: string;
}

const NewsBanner: React.FC<NewsBannerProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false); // Default to false to avoid flickering

  // 1. On mount, check if user has already dismissed THIS specific message
  useEffect(() => {
    const isDismissed = localStorage.getItem("news_banner_dismissed");
    const savedMessage = localStorage.getItem("news_banner_message");

    // If message is different or hasn't been dismissed, show it
    if (isDismissed !== "true" || savedMessage !== message) {
      setIsVisible(true);
    }
  }, [message]);

  const handleClose = () => {
    setIsVisible(false);
    // 2. Save the preference in the browser
    localStorage.setItem("news_banner_dismissed", "true");
    localStorage.setItem("news_banner_message", message); // Store message so it reappears if news changes
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-green-50 border-b border-green-100 animate-in fade-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto py-2.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center flex-1 justify-center">
          <span className="hidden sm:flex p-0.5 rounded-md bg-green-600 mr-3">
            <span className="text-white text-[10px] font-bold px-1.5 uppercase tracking-tighter">News</span>
          </span>
          <p className="text-[11px] sm:text-sm font-medium text-green-800">
            {message}
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={handleClose}
            type="button"
            className="group flex p-1.5 rounded-full hover:bg-green-200 transition-colors"
          >
            <IoClose className="h-4 w-4 text-green-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsBanner;