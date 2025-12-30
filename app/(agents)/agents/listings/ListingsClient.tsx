'use client';

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiTrash2, FiEdit3, FiMapPin, FiClock, FiFilter, FiShare2, FiCheck, FiZap, FiZapOff } from "react-icons/fi";
import { MdClose, MdVideoLibrary } from "react-icons/md";
import ListingUploadForm from "../../components/agents/ListingUploadForm";
import { deleteListing } from "@/app/actions/deleteListing";
import { toggleListingStatus } from "@/app/actions/toggleListingStatus";

interface ListingsClientProps {
  initialListings: any[];
}

const ListingsClient = ({ initialListings }: ListingsClientProps) => {
  const router = useRouter();
  const [listings, setListings] = useState(initialListings);
  const [locationFilter, setLocationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingListing, setEditingListing] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const locations = ["All", "South Gate", "North Gate", "West Gate"];

  const filteredListings = useMemo(() => {
    return listings.filter((house) => {
      const matchesLocation = locationFilter === "All" || house.mainLocation === locationFilter;
      const matchesStatus = 
        statusFilter === "All" || 
        (statusFilter === "Live" && house.isLive) || 
        (statusFilter === "Offline" && !house.isLive);
      return matchesLocation && matchesStatus;
    });
  }, [listings, locationFilter, statusFilter]);

  // --- IMPROVED TOGGLE LOGIC ---
  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    // 1. Optimistic Update (Switch UI immediately)
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isLive: !currentStatus } : l))
    );

    // 2. Update Database
    const result = await toggleListingStatus(id, currentStatus);
    
    if (result.success) {
      router.refresh(); // Sync server state
    } else {
      // 3. Rollback if database fails
      alert("Failed to update status. Please try again.");
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, isLive: currentStatus } : l))
      );
    }
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/listings/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this listing?")) return;
    const result = await deleteListing(id);
    if (result.success) {
      setListings((prev) => prev.filter((l) => l.id !== id));
      router.refresh();
    }
  };

  return (
    <div className="md:p-10 max-w-5xl mx-auto p-4 relative min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Listing Manager</h1>
        <p className="text-gray-500 text-sm font-medium">Click "Go Live" to show on the main site</p>
      </div>

      {/* FILTERS */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-2 border-r pr-4 mr-2">
            {["All", "Live", "Offline"].map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`flex-shrink-0 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === s ? "bg-black text-white" : "bg-white text-gray-400 border"}`}>{s}</button>
            ))}
        </div>
        <div className="flex gap-2">
            {locations.map((loc) => (
                <button key={loc} onClick={() => setLocationFilter(loc)} className={`flex-shrink-0 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${locationFilter === loc ? "bg-green-500 text-white" : "bg-white text-gray-400 border"}`}>{loc}</button>
            ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredListings.map((house) => (
          <div key={house.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-4 flex flex-col md:flex-row items-center gap-6 shadow-sm">
            
            {/* MEDIA PREVIEW */}
            <div className="relative w-full md:w-48 h-44 rounded-[2rem] overflow-hidden bg-black flex-shrink-0">
                {house.videoUrl ? (
                    <video 
                        src={house.videoUrl} 
                        className={`w-full h-full object-cover transition-all duration-500 ${!house.isLive ? 'opacity-30 grayscale' : 'opacity-100'}`}
                        muted loop playsInline
                        onMouseOver={(e) => e.currentTarget.play()}
                        onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                    />
                ) : (
                    <img src={house.image} className={`w-full h-full object-cover ${!house.isLive && 'opacity-30 grayscale'}`} alt="" />
                )}
                
                {/* STATUS BADGE */}
                <div className="absolute top-4 left-4">
                    {house.isLive ? (
                        <span className="bg-green-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5 shadow-xl">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live
                        </span>
                    ) : (
                        <span className="bg-gray-900/80 backdrop-blur-md text-gray-300 text-[9px] font-black px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5">
                            Offline
                        </span>
                    )}
                </div>
            </div>

            {/* INFO */}
            <div className="flex-1 w-full space-y-1">
              <h3 className="font-black text-gray-900 text-2xl tracking-tight leading-tight">{house.streetName}</h3>
              <p className="text-gray-500 text-xs font-bold uppercase flex items-center gap-1.5 tracking-wide">
                <FiMapPin className="text-green-500"/> {house.mainLocation} • {house.distance}
              </p>
              <div className="flex items-center gap-4 mt-3">
                 <p className="text-gray-900 text-2xl font-black">₦{Number(house.price).toLocaleString()}</p>
                 <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <FiEye className="text-green-400"/> {house.views} views
                 </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
              
              <button 
                onClick={() => handleToggleStatus(house.id, house.isLive)}
                className={`flex-1 md:flex-none px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    house.isLive 
                    ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white" 
                    : "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                }`}
              >
                {house.isLive ? (
                    <><FiZapOff size={14} /> Remove from Live</>
                ) : (
                    <><FiZap size={14} /> Go Live Now</>
                )}
              </button>

              <button onClick={() => handleCopyLink(house.id)} className={`p-4 rounded-2xl transition-all ${copiedId === house.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                {copiedId === house.id ? <FiCheck size={20} /> : <FiShare2 size={20} />}
              </button>
              
              <button onClick={() => setEditingListing(house)} className="p-4 bg-gray-100 text-gray-600 rounded-2xl"><FiEdit3 size={20} /></button>
              <button onClick={() => handleDelete(house.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl"><FiTrash2 size={20} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingListing && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b p-4 flex justify-between items-center px-8">
            <h2 className="font-black text-xl italic uppercase">Edit {editingListing.streetName}</h2>
            <button onClick={() => setEditingListing(null)} className="p-3 bg-slate-100 rounded-full"><MdClose size={24} /></button>
          </div>
          <div className="pb-20">
            <ListingUploadForm initialData={editingListing} onSuccess={() => { setEditingListing(null); router.refresh(); }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsClient;