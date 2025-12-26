'use client';

import { FiMapPin, FiZap, FiDroplet, FiShield, FiSun, FiHome } from "react-icons/fi";
import BackButton from "../BackButton";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";

interface ApartmentDetailProps {
  id: string | number;
  videoUrl: string;
  mainLocation: string;
  location: string;
  price: string;
  distance: string;
  agentName: string;
  agentPhone?: string; // Added this prop
  description: string;
  // Amenity Props
  hasFence?: boolean | null;
  electricity?: boolean | null;
  water?: boolean | null;
  security?: boolean | null;
  solar?: boolean | null;
}

const ApartmentDetail = ({
  videoUrl,
  mainLocation,
  location,
  price,
  distance,
  agentName,
  agentPhone, // Destructured here
  description,
  hasFence,
  electricity,
  water,
  security,
  solar,
}: ApartmentDetailProps) => {
  const router = useRouter();

  const handleContact = () => {
    // 1. Check Login Status
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    // 2. WhatsApp Logic
    if (agentPhone) {
      // Clean the string (remove spaces, dashes, etc.)
      let cleanedNumber = agentPhone.replace(/\D/g, '');

      // Convert local Nigerian format (080...) to international (23480...)
      if (cleanedNumber.startsWith('0')) {
        cleanedNumber = '234' + cleanedNumber.substring(1);
      }

      // Create a nice message
      const message = `Hello ${agentName}, I am interested in the apartment at ${location} (${mainLocation}) I saw on CampusCrib. Is it still available?`;
      
      // Open WhatsApp in a new tab
      window.open(`https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      alert("This agent hasn't provided a WhatsApp number yet.");
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
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{location}</h1>
          <p className="text-slate-600 flex items-center gap-2">
            <FiMapPin className="text-green-500" /> 
            {mainLocation} • {distance} from gate
          </p>
        </div>

        <hr className="border-slate-100 my-8" />

        {/* AMENITIES SECTION */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">What this place offers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {electricity && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-yellow-50 text-yellow-700 border border-yellow-100">
                <FiZap /> <span className="text-sm font-semibold">Electricity</span>
              </div>
            )}
            {water && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
                <FiDroplet /> <span className="text-sm font-semibold">Water</span>
              </div>
            )}
            {security && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-green-50 text-green-500 border border-green-100">
                <FiShield /> <span className="text-sm font-semibold">Security</span>
              </div>
            )}
            {solar && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 text-slate-700 border border-slate-100">
                <FiSun /> <span className="text-sm font-semibold">Solar</span>
              </div>
            )}
            {hasFence && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 text-slate-700 border border-slate-200">
                <FiHome /> <span className="text-sm font-semibold">Fenced</span>
              </div>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Description</h2>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl italic border border-slate-100">
            "{description}"
          </p>
        </div>

        {/* AGENT CARD */}
        <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-3xl mb-10">
          <Avatar />
          <div>
            <p className="text-xs font-bold text-green-600 uppercase">Verified Agent</p>
            <p className="font-bold text-slate-900">{agentName}</p>
          </div>
        </div>

        {/* STICKY FOOTER */}
        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 z-50">
          <div className="max-w-4xl mx-auto flex justify-between items-center p-5 md:p-6">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Rent</p>
              <p className="text-2xl font-black text-green-500">{price}</p>
            </div>
            <button 
              onClick={handleContact} 
              className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-xl shadow-green-100 active:scale-95"
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetail;