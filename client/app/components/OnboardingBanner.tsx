
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingBanner({
  steps = null,
  storageKey = "app_onboarding_seen",
  onFinishRedirect = "/dashboard",
}) {
  const router = useRouter();

  const defaultSteps = [
    {
      title: "Welcome to RoommateMatch",
      subtitle: "Find Your Perfect Roommate",
      desc: "Search and discover compatible roommates nearby. Start your student housing journey today!",
      bgcolor: "bg-emerald-600", // Tailwind color, or use hex like "#10B981"
      imageUrl: "/images/twod1.png"
    },
    {
      title: "Set Your Preferences",
      subtitle: "Customize Your Roommate Search",
      desc: "Add your habits, schedules, and lifestyle preferences so you can find a roommate that truly matches you.",
      bgcolor: "bg-teal-500", // Tailwind or hex color
        imageUrl: "/images/twod3.png"
    },
    {
      title: "Start Matching & Chat Safely",
      subtitle: "Connect with Your Future Roommate",
      desc: "Browse profiles, send messages, and chat safely to get to know potential roommates before moving in.",
      bgcolor: "bg-emerald-600", // Tailwind or hex color
        imageUrl: "/images/2d2.png"
    },
  ];
  

  const slideSteps = steps || defaultSteps;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(storageKey);
      if (!seen) setVisible(true);
    } catch (e) {
      setVisible(true);
    }
  }, [storageKey]);

 
  function saveSeen() {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {}
  }

  function finish() {
    saveSeen();
    setVisible(false);
    router.push(onFinishRedirect);
  }

  function skip() {
    saveSeen();
    setVisible(false);
  }

  function next() {
    if (index < slideSteps.length - 1) setIndex((s) => s + 1);
    else finish();
  }

  function prev() {
    if (index > 0) setIndex((s) => s - 1);
  }

  if (!visible) return null;

  return (
<div className={`w-full h-screen relative flex flex-col justify-center items-center text-white ${slideSteps[index].bgcolor} p-4`}>

{/* Top navigation */}
<div className="absolute mt-20 top-4 w-full flex justify-between px-4">
  <button
    onClick={prev}
    disabled={index === 0}
    className={`px-3 py-1 rounded-md border ${
      index === 0
        ? "text-gray-300 border-gray-200 cursor-not-allowed"
        : "text-white border-white hover:bg-white/20"
    }`}
  >
    Back
  </button>

  <button
    onClick={skip}
    className="px-3 py-1  rounded-md border border-white text-white hover:bg-white/20"
  >
    Skip
  </button>
</div>

{/* Image */}
<img
  src={slideSteps[index].imageUrl}
  alt="slide image"
  className="w-4/5 max-h-64 object-contain mb-4 mt-12"
/>

{/* Text */}
<div className="flex flex-col justify-center items-center text-center max-w-xl px-4">
  <h2 className="text-xl font-bold mb-2">{slideSteps[index].title}</h2>
  <p className="text-lg mb-2">{slideSteps[index].subtitle}</p>
  <p className="text-sm">{slideSteps[index].desc}</p>
</div>

{/* Bottom navigation */}
<div className="absolute bottom-6 mb-10 right-4">
  <button
    onClick={next}
    className="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200"
  >
    {index === slideSteps.length - 1 ? "Finish" : "Next"}
  </button>
</div>
</div>

  
  );
}