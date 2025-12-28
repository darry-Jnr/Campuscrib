"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Button from "../Button";
import Input from "../inputs/Input";
import toast from "react-hot-toast";

interface ProfileModalProps {
  initialData: any | null; // Simplified for brevity
}

const ProfileModal = ({ initialData }: ProfileModalProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dept: "",
    school: "FUTA",
    level: "",
    status: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone?.toString() || "",
        gender: initialData.gender || "",
        dept: initialData.dept || "",
        school: initialData.school || "FUTA",
        level: initialData.level || "",
        status: initialData.status || "",
        location: initialData.location || "",
        bio: initialData.bio || "",
      });
    }
  }, [initialData, isOpen]);

  // Validation Check: Required fields for Step 1 & Step 2
  const isStep1Valid = formData.name.trim() !== "" && formData.phone.trim() !== "" && formData.gender !== "";
  const isStep2Valid = formData.level !== "";
  const canSave = isStep1Valid && isStep2Valid;

  const nextStep = () => {
    if (step === 1 && !isStep1Valid) {
      return toast.error("Please fill Name, Phone, and Gender");
    }
    setStep((prev) => prev + 1);
  };

  const backStep = () => setStep((prev) => prev - 1);

  const saveProfile = async () => {
    if (!canSave) return toast.error("Please complete the required fields");
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      toast.success("Profile fully unlocked!");
      setIsOpen(false);
      window.location.reload();
    } catch (err) {
      toast.error("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  const body = (
    <div className="flex flex-col gap-4">
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <Input
            label="Full Name *"
            disabled={isLoading}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Phone Number *"
            disabled={isLoading}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <div>
            <label className="mb-2 block font-bold text-slate-800 text-xs uppercase tracking-widest">Gender *</label>
            <select
              disabled={isLoading}
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="border border-gray-200 p-4 w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-gray-50"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
           <div>
            <label className="mb-2 block font-bold text-slate-800 text-xs uppercase tracking-widest">Level *</label>
            <select
              disabled={isLoading}
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="border border-gray-200 p-4 w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 bg-gray-50"
            >
              <option value="">Select Level</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
            </select>
          </div>
          <Input
            label="Department (Optional)"
            disabled={isLoading}
            onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
            value={formData.dept}
          />
          <div>
            <label className="mb-2 block font-bold text-slate-800 text-xs uppercase tracking-widest">Status (Optional)</label>
            <select
              disabled={isLoading}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="border border-gray-200 p-4 w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 bg-gray-50"
            >
              <option value="">Set Status</option>
              <option value="Looking">Looking for Apartment & Roomate</option>
              <option value="HasApartment">In an Apartment Needs a Roomate</option>
              <option value="FoundOne">Seen an Apartment but Needs a Roomate</option>
            </select>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Preferred Area (Optional)</label>
            <select
              disabled={isLoading}
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-gray-800"
            >
              <option value="">Where do you prefer to live?</option>
              <option value="North Gate">North Gate</option>
              <option value="South Gate">South Gate</option>
              <option value="West Gate">West Gate</option>
              <option value="Anywhere">Anywhere / Not sure</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block font-bold text-slate-800 text-xs uppercase tracking-widest">Bio (Optional)</label>
            <textarea
              disabled={isLoading}
              placeholder="Tell others a bit about your lifestyle..."
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="border border-gray-200 p-4 w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 bg-gray-50 resize-none"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );

  const footer = (
    <div className="flex flex-row items-center gap-4 w-full mt-4">
      {step > 1 && (
        <button 
          onClick={backStep}
          className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-gray-50 transition-all"
        >
          Back
        </button>
      )}
      {step < 3 ? (
        <button 
          onClick={nextStep}
          className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
            isStep1Valid ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Next Step
        </button>
      ) : (
        <button 
          onClick={saveProfile}
          disabled={!canSave || isLoading}
          className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
            canSave ? "bg-green-600 text-white shadow-lg shadow-green-100" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Saving..." : "Finish & Unlock"}
        </button>
      )}
    </div>
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className=" px-3 bg-slate-900 text-white py-3 rounded-lg font-black text-sm uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95"
      >
        Update Profile
      </button>

      <Modal
        disabled={isLoading}
        title="Complete Your Setup"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={saveProfile}
        actionLabel={isLoading ? "Saving..." : "Finish & Unlock"}
        body={body}
        footer={footer}
      />
    </>
  );
};

export default ProfileModal;