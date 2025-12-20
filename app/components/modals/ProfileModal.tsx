'use client';

import { useState } from "react";
import Modal from "./Modal";
import Button from "../Button";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

// 1️⃣ Zod schema for validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  gender: z.enum(["Male", "Female"], "Gender is required"),
  dept: z.string().min(1, "Department is required"),
  school: z.string().min(1, "School is required"),
  level: z.string().min(1, "Level is required"),
  status: z.string().min(1, "Status is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(1, "Bio is required"),
});

// 2️⃣ Type inferred from Zod schema
type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileModal() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },

  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange", // tracks validity in real time
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const backStep = () => setStep((prev) => prev - 1);

  const saveProfile: SubmitHandler<ProfileFormValues> = async (data) => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      toast.success("Profile updated successfully!");
      setIsOpen(false);
      router.refresh()
    } catch (err) {
      toast.error("Error updating profile");
      console.error(err);
    }
  };

  const body = (
    <>
      {step === 1 && (
        <div className="space-y-4">
          <Input label="Full Name" {...register("name")} error={errors.name?.message} />
          <Input label="Phone" {...register("phone")} error={errors.phone?.message} />

          <label className="mb-2 block font-semibold text-gray-700">Gender</label>
          <select
            {...register("gender")}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Input label="Department" {...register("dept")} error={errors.dept?.message} />

          <label className="mb-2 block font-semibold text-gray-700">School</label>
          <select
            {...register("school")}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select School</option>
            <option value="FEDERAL UNIVERSITY OF TECHNOLOGY AKURE">FEDERAL UNIVERSITY OF TECHNOLOGY AKURE</option>
          </select>
          {errors.school && <p className="text-red-500 text-sm">{errors.school.message}</p>}

          <label className="mb-2 block font-semibold text-gray-700">Level</label>
          <select
            {...register("level")}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Level</option>
            <option>100 Level</option>
            <option>200 Level</option>
            <option>300 Level</option>
            <option>400 Level</option>
            <option>500 Level</option>
            <option>Else</option>
          </select>
          {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}

          <label className="mb-2 block font-semibold text-gray-700">Status</label>
          <select
            {...register("status")}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Set Status</option>
            <option>Looking for Apartment & Roomate</option>
            <option>In an Apartment Needs a Roomate</option>
            <option>Seen an Apartment but Needs a Roomate</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Input label="Location" {...register("location")} error={errors.location?.message} />
          <label className="mb-2 block font-semibold text-gray-700">Bio</label>
          <textarea
            {...register("bio")}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
        </div>
      )}
    </>
  );

  const footer = (
    <div className="flex justify-between w-full mt-4">
      {step > 1 && <Button label="Back" onClick={backStep} outline />}
      {step < 3 && <Button label="Next" onClick={nextStep} outline />}
      {step === 3 && (
        <Button label="Save Profile" onClick={handleSubmit(saveProfile)} disabled={!isValid} />
      )}
    </div>
  );

  return (
    <>
      <Button label="Edit" outline onClick={() => setIsOpen(true)} />
      <Modal title="Profile" body={body} footer={footer} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
