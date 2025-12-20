"use client";
import { useState } from "react";

export default function ProfileClient({ profile: initialProfile, email }: any) {
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (res.ok) {
      alert("Profile updated!");
    } else {
      alert("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Name</label>
          <input name="name" value={profile.name} onChange={handleChange} className="font-medium focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Phone</label>
          <input name="phone" value={profile.phone || ""} onChange={handleChange} className="font-medium focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Gender</label>
          <input name="gender" value={profile.gender || ""} onChange={handleChange} className="font-medium focus:outline-none" />
        </div>
      </div>

      {/* Academic Information */}
      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Department</label>
          <input name="dept" value={profile.dept} onChange={handleChange} className="font-medium focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">School</label>
          <input name="school" value={profile.school || ""} onChange={handleChange} className="font-medium focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Level</label>
          <input name="level" value={profile.level || ""} onChange={handleChange} className="font-medium focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Status</label>
          <input name="status" value={profile.status || ""} onChange={handleChange} className="font-medium focus:outline-none" />
        </div>
      </div>

      {/* Location & Bio */}
      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 gap-4 text-gray-700">
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Location</label>
          <input name="location" value={profile.location || ""} onChange={handleChange} className="font-medium focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Bio</label>
          <textarea name="bio" value={profile.bio || ""} onChange={handleChange} className="font-medium focus:outline-none resize-none" />
        </div>
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
        Save Profile
      </button>
    </form>
  );
}
