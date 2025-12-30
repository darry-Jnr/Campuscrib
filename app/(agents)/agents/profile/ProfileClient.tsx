'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiPhone, FiMapPin, FiCheckCircle, FiClock, FiUser } from "react-icons/fi";
import updateAgentProfile from "@/app/actions/updateAgentProfile";

export default function ProfileClient({ initialData, user }: { initialData: any, user: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {
      businessName: "",
      agentType: "professional",
      yearsOfExperience: 0,
      whatsappNumber: "",
      officeAddress: "",
      responseTime: "Within 1 hour"
    }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const result = await updateAgentProfile(data);
      if (result.success) {
        toast.success("Profile updated successfully!");
        router.refresh();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-20">
      
      {/* VERIFICATION CARD */}
      <div className={`p-6 rounded-[2rem] border flex items-center justify-between ${initialData?.isVerified ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
        <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${initialData?.isVerified ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                <FiCheckCircle size={24} />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Account Status</p>
                <h3 className="font-black text-lg">{initialData?.isVerified ? 'Verified Agent' : 'Pending Verification'}</h3>
            </div>
        </div>
        {!initialData?.isVerified && (
            <span className="text-[10px] font-black bg-white/50 px-3 py-1 rounded-full text-orange-600 uppercase">Registered</span>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* BUSINESS IDENTITY */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-green-500 font-black text-xs uppercase tracking-widest">
                <FiBriefcase /> Business Identity
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Business Name</label>
                    <input {...register("businessName")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" placeholder="e.g. Campus Haven Realty" />
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Agent Type</label>
                    <select {...register("agentType")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold">
                        <option value="student">Student Agent</option>
                        <option value="professional">Professional Realtor</option>
                        <option value="landlord">Direct Landlord</option>
                    </select>
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Experience (Years)</label>
                    <input type="number" {...register("yearsOfExperience")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
                </div>
            </div>
        </div>

        {/* CONTACT DETAILS */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-widest">
                <FiPhone /> Contact Details
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">WhatsApp Number</label>
                    <input {...register("whatsappNumber")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" placeholder="+234..." />
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Response Time</label>
                    <select {...register("responseTime")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold">
                        <option value="Within 1 hour">Within 1 hour</option>
                        <option value="2-5 hours">2-5 hours</option>
                        <option value="Same day">Same day</option>
                    </select>
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Office Address</label>
                    <input {...register("officeAddress")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" placeholder="Street, City" />
                </div>
            </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:scale-105 transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
}