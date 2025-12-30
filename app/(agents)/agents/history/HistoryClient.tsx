'use client';

import { useState } from "react";
import { FiEye, FiEdit3, FiTrash2, FiVideo, FiActivity } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { updateListingStatus } from "@/app/actions/updateListingStatus";
import { deleteListing } from "@/app/actions/deleteListing";

export default function HistoryClient({ initialListings }: { initialListings: any[] }) {
  const [listings, setListings] = useState(initialListings);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const res = await updateListingStatus(id, !currentStatus);
    if (res.success) {
      toast.success(!currentStatus ? "Listing is now Live!" : "Listing taken Offline");
      setTimeout(() => window.location.reload(), 600);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    const res = await deleteListing(id);
    if (res.success) {
      toast.success("Listing deleted");
      setListings(listings.filter(l => l.id !== id));
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {listings.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed">
          <p className="font-black text-slate-400 uppercase tracking-widest">No listings found</p>
        </div>
      )}

      {listings.map((item) => (
        <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
          {/* Video Preview */}
          <div className="w-full md:w-48 h-32 bg-black rounded-3xl overflow-hidden relative">
            <video src={item.videoUrl} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FiVideo className="text-white" size={24} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.isPublished ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                {item.isPublished ? 'Live' : 'Offline'}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <FiEye /> {item.views || 0} Views
              </span>
            </div>
            <h3 className="font-black text-xl text-slate-900 tracking-tight">{item.location}</h3>
            <p className="text-slate-500 text-sm font-medium">{item.mainLocation} • ₦{item.price}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleToggleStatus(item.id, item.isPublished)}
              className={`p-4 rounded-2xl transition-all ${item.isPublished ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
              title={item.isPublished ? "Take Offline" : "Go Live"}
            >
              <FiActivity size={20} />
            </button>
            <button onClick={() => handleDelete(item.id)} className="p-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-all">
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
