"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Button from "../Button";
import Input from "../inputs/Input";
import toast from "react-hot-toast";

interface ProfileModalProps {
  initialData: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    name: string;
    dept: string;
    level: string;
    gender: string | null;
    location: string | null;
    bio: string | null;
    school: string | null;
    status: string | null;
    phone: number | null;
  } | null;
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
    school: "",
    level: "",
    status: "",
    location: "",
    bio: "",
  });

  // Sync state when initialData changes or modal opens
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone?.toString() || "",
        gender: initialData.gender || "",
        dept: initialData.dept || "",
        school: initialData.school || "",
        level: initialData.level || "",
        status: initialData.status || "",
        location: initialData.location || "",
        bio: initialData.bio || "",
      });
    }
  }, [initialData, isOpen]);

  const nextStep = () => setStep((prev) => prev + 1);
  const backStep = () => setStep((prev) => prev - 1);

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      toast.success("Profile updated successfully!");
    
      router.refresh(); // Updates the background page data
      setIsOpen(false);
      window.location.reload()
      setStep(1); // Reset steps for next time
    } catch (err) {
      toast.error("Error updating profile");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const body = (
    <div className="flex flex-col gap-4">
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <Input
            label="Full Name"
            disabled={isLoading}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Phone"
            disabled={isLoading}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <div>
            <label className="mb-2 block font-semibold text-gray-700 text-sm">Gender</label>
            <select
              disabled={isLoading}
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
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
          <Input
            label="Department"
            disabled={isLoading}
            onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
            value={formData.dept}
          />
          <div>
            <label className="mb-2 block font-semibold text-gray-700 text-sm">Select School</label>
            <select
              disabled={isLoading}
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select School</option>
              <option value="FUTA">FEDERAL UNIVERSITY OF TECHNOLOGY AKURE</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block font-semibold text-gray-700 text-sm">Level</label>
            <select
              disabled={isLoading}
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Level</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block font-semibold text-gray-700 text-sm">Status</label>
            <select
              disabled={isLoading}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
      <label className="text-sm font-medium text-gray-700">Preferred Location</label>
      <select
        disabled={isLoading}
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-800"
      >
        <option value="" disabled>Where do you prefer to live?</option>
        <option value="North Gate">North Gate</option>
        <option value="South Gate">South Gate</option>
        <option value="West Gate">West Gate</option>
        <option value="Anywhere">Anywhere / Not sure</option>
      </select>
    </div>
          <div>
            <label className="mb-2 block font-semibold text-gray-700 text-sm">Bio</label>
            <textarea
              disabled={isLoading}
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none disabled:opacity-70"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );

  const footer = (
    <div className="flex flex-row items-center gap-4 w-full">
      {step > 1 && (
        <Button 
          disabled={isLoading}
          label="Back" 
          onClick={backStep} 
          outline 
        />
      )}
      {step < 3 && (
        <Button 
          disabled={isLoading}
          label="Next" 
          onClick={nextStep} 
          outline
        />
      )}
    </div>
  );

  return (
    <>
      <Button
        label="Edit Profile"
        outline
        onClick={() => setIsOpen(true)}
      />
      <Modal
        disabled={isLoading}
        title="Student Profile"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={saveProfile}
        actionLabel={isLoading ? "Saving..." : "Save Profile"}
        body={body}
        footer={footer}
      />
    </>
  );
};

export default ProfileModal;