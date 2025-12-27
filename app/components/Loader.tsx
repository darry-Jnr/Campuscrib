'use client';
import { RiLoader4Line } from "react-icons/ri";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[9999] flex flex-col items-center justify-center">
      <RiLoader4Line className="text-5xl text-green-600 animate-spin" />
      <p className="mt-4 text-sm font-bold text-gray-700 animate-pulse uppercase tracking-widest">
        CampusCrib
      </p>
    </div>
  );
}