'use client';

import { useEffect } from "react";
import { FiMapPin, FiZap, FiDroplet, FiShield, FiSun, FiHome } from "react-icons/fi";
import BackButton from "../BackButton";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { incrementViews } from "@/app/actions/incrementViews";

interface ApartmentDetailProps {
  id: string | number;
  videoUrl: string;
  mainLocation: string;
  location: string;
  price: string;
  distance: string;
  agentName: string;
  agentPhone?: string; 
  description: string;
  hasFence?: boolean | null;
  electricity?: boolean | null;
  water?: boolean | null;
  security?: boolean | null;
  solar?: boolean | null;
  currentUser?: any; 
}

const ApartmentDetail = ({
  id,
  videoUrl,
  mainLocation,
  location,
  price,
  distance,
  agentName,
  agentPhone,
  description,
  hasFence,
  electricity,
  water,
  security,
  solar,
  currentUser, 
}: ApartmentDetailProps) => {
  const router = useRouter();

  // --- VIEW TRACKING LOGIC ---
  useEffect(() => {
    const trackView = async () => {
      try {
        // Prevent incrementing if the viewer is an AGENT (optional check)
        // or specifically the owner if you pass agentId down.
        if (currentUser?.role === "ADMIN") return;

        if (id) {
          await incrementViews(id.toString());
        }
      } catch (error) {
        console.error("Failed to track view");
      }
    };

    trackView();
  }, [id, currentUser]);

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      toast.error("Please login to contact the agent", {
        icon: '🔒',
        id: "auth-contact-guard"
      });
      return router.push("/auth/login");
    }

    if (agentPhone) {
      let cleanedNumber = agentPhone.replace(/\D/g, '');

      if (cleanedNumber.startsWith('0')) {
        cleanedNumber = '234' + cleanedNumber.substring(1);
      }

      const pageUrl = window.location.href;
      const message = `Hello ${agentName}, I am interested in this apartment on CampusCrib: ${location} (${mainLocation}).\n\nCheck it out here: ${pageUrl}`;

      const whatsappUrl = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;

      toast.success("Opening WhatsApp...");
      window.location.href = whatsappUrl;
    } else {
      toast.error("This agent hasn't provided a WhatsApp number yet.");
    }
  };

  return (
    <div className="pt-22">
      <BackButton />
      <div className="max-w-4xl mx-auto p-4 md:p-8 pb-32">
        
        {/* VIDEO PLAYER */}
        <div className="w-full h-72 md:h-[500px] rounded-3xl overflow-hidden mb-6 relative bg-black shadow-2xl">
          <video 
            src={videoUrl} 
            controls 
            className="w-full h-full object-contain"
            playsInline
          />
        </div>

        {/* HEADER INFO */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{location}</h1>
          </div>
          <p className="text-slate-600 flex items-center gap-2">
            <FiMapPin className="text-green-500" /> 
            {mainLocation} • {distance} from gate
          </p>
        </div>

        <hr className="border-slate-100 my-8" />

        {/* AMENITIES SECTION */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-tight italic">What this place offers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {electricity && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-yellow-50 text-yellow-700 border border-yellow-100">
                <FiZap /> <span className="text-sm font-bold uppercase tracking-tighter">Electricity</span>
              </div>
            )}
            {water && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
                <FiDroplet /> <span className="text-sm font-bold uppercase tracking-tighter">Water</span>
              </div>
            )}
            {security && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-green-50 text-green-600 border border-green-100">
                <FiShield /> <span className="text-sm font-bold uppercase tracking-tighter">Security</span>
              </div>
            )}
            {solar && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 text-slate-700 border border-slate-100">
                <FiSun /> <span className="text-sm font-bold uppercase tracking-tighter">Solar</span>
              </div>
            )}
            {hasFence && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 text-slate-700 border border-slate-200">
                <FiHome /> <span className="text-sm font-bold uppercase tracking-tighter">Fenced</span>
              </div>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-tight italic">Description</h2>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-[2rem] italic border border-slate-100">
            "{description}"
          </p>
        </div>

        {/* AGENT CARD */}
        <div className="flex items-center gap-4 p-5 border border-slate-100 rounded-[2rem] mb-10 bg-white shadow-sm">
          <Avatar />
          <div>
            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Verified Agent</p>
            <p className="font-black text-slate-900 uppercase tracking-tighter">{agentName}</p>
          </div>
        </div>

        {/* STICKY FOOTER */}
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
          <div className="max-w-4xl mx-auto flex justify-between items-center p-5 md:p-6">
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Total Rent</p>
              <p className="text-3xl font-black text-green-600 tracking-tighter italic">₦{price}</p>
            </div>
            <button 
              type="button"
              onClick={handleContact} 
              className="bg-black text-white px-8 md:px-12 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              {currentUser ? "Contact Agent" : "Login to Contact"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetail;