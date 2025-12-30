'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiPhone, FiCheckCircle } from "react-icons/fi";
import { updateAgentProfile } from "@/app/actions/updateAgentProfile";

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
        toast.success("Profile updated!");
        setTimeout(() => window.location.reload(), 800);
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-20 relative">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center rounded-[2.5rem]">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className={`p-6 rounded-[2rem] border flex items-center justify-between ${initialData?.isVerified ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
        <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${initialData?.isVerified ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                <FiCheckCircle size={24} />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-gray-500">Account Status</p>
                <h3 className="font-black text-lg uppercase italic">{initialData?.isVerified ? 'Verified Agent' : 'Pending Verification'}</h3>
            </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-widest"><FiBriefcase /> Identity</div>
            <input {...register("businessName")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 outline-none font-bold" placeholder="Business Name" />
            <select {...register("agentType")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 outline-none font-bold">
                <option value="student">Student Agent</option>
                <option value="professional">Professional Realtor</option>
                <option value="landlord">Direct Landlord</option>
            </select>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-widest"><FiPhone /> Contact</div>
            <input {...register("whatsappNumber")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 outline-none font-bold" placeholder="WhatsApp Number" />
            <select {...register("responseTime")} className="w-full px-4 py-4 rounded-2xl bg-gray-50 outline-none font-bold">
                <option value="Within 1 hour">Within 1 hour</option>
                <option value="Same day">Same day</option>
            </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">
          Save Changes
        </button>
      </div>
    </form>
  );
}
