"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface RoommateToggleProps {
  initialIsPublished: boolean;
}

export default function RoommateToggle({ initialIsPublished }: RoommateToggleProps) {
  const [isPublished, setIsPublished] = useState(initialIsPublished);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile/publish", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });

      if (!res.ok) throw new Error();

      setIsPublished(!isPublished);
      toast.success(!isPublished ? "You are now live!" : "Profile hidden");
      
      // Refresh the server data to update the roommate list
      router.refresh(); 
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mb-4 items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-green-100">
      <div className="flex-1">
        <h3 className="font-bold text-gray-800">List yourself?</h3>
        <p className="text-xs text-gray-500">Toggle this to show your profile to others.</p>
      </div>
      
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          isPublished ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isPublished ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}