"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiUser, FiLock, FiArrowRight } from "react-icons/fi";

export default function ProfileLockModal({ isComplete }: { isComplete: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only trigger if the profile is NOT complete
    if (!isComplete) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // 2 Seconds delay

      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <FiUser size={35} />
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 leading-tight">
          Complete Your <br/> Profile
        </h2>
        
        <p className="text-slate-500 mt-4 text-sm leading-relaxed">
          To connect with roommates and list yourself, you need to finish your setup. It takes less than 1 minute!
        </p>

        <div className="mt-8 space-y-3">
          <Link href="/profile" className="block w-full">
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg">
              Update Profile <FiArrowRight />
            </button>
          </Link>
          
          <div className="flex items-center justify-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-4">
            <FiLock /> Secure & Private
          </div>
        </div>
      </div>
    </div>
  );
}