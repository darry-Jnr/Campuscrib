'use client';

import { useState } from "react";
import Modal from "./Modal";
import Button from "../Button";
import Input from "../inputs/Input";
import toast from "react-hot-toast";


const ProfileModal = () => {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const nextStep =() => {
    setStep(prev => prev + 1)
  }

  const backStep =() => {
    setStep(prev => prev - 1)
  }

  const saveProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) throw new Error("Failed to save profile");
  
      toast.success("Profile updated successfully!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Error updating profile");
      console.error(err);
    }
  };
  

  const  [formData, setFormData] = useState(
    {   name: "",
   
       phone: "",
       gender: "",
       department: "",
       school: "",
       level: "",
       status: "",
       location: "",
       bio: "",
   }
     )
  const body = (
   
    <>
  

      { step === 1 && (
             <div>
             <Input label="Full Name" value={formData.name}   onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>

             <Input label="Phone" value={formData.phone}   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}/>
             <label className="mb-2 block font-semibold text-gray-700">Gender</label>
             <select value={formData.gender}   onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
               <option  >Select Gender</option>
               <option>Male</option>
               <option>Female</option>
             </select>
            
         </div>
      )}

      { step === 2 && (
        <div>
           <Input label="Department"   onChange={(e) => setFormData({ ...formData, department: e.target.value })} value={formData.department}  />

           <label className="mb-2 block font-semibold text-gray-700">Select School</label>
             <select value={formData.school}   onChange={(e) => setFormData({ ...formData, school: e.target.value })} className="border border-gray-300 mb-4 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
               <option  >Select chool</option>
               <option>FEDERAL UNIVERSITY OF TECHNOLOGY AKURE</option>
               </select>

               <label className="mb-2 block font-semibold text-gray-700">Level</label>
               <select value={formData.level}   onChange={(e) => setFormData({ ...formData, level: e.target.value })}  className="border border-gray-300 mb-4 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
               <option  >Select Level</option>
               <option>100 Level</option>
               <option>200 Level</option>
               <option>300 Level</option>
               <option>400 Level</option>
               <option>500 Level</option>
               <option>Else</option>
               </select>

               <label className="mb-2 block font-semibold text-gray-700">Status</label>
               <select value={formData.status}   onChange={(e) => setFormData({ ...formData, status: e.target.value })}  className="border border-gray-300  p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
               <option  >Set Status</option>
               <option>Looking for Apartment & Roomate</option>
               <option>In an Apartment Needs a Roomate</option>
               <option>Seen an Apartment but Needs a Roomate</option>
               </select>

        </div>
      )}

      { step === 3 && (
        <div>
           <Input label="Location" value={formData.location}   onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
           <label className="mb-2 block font-semibold text-gray-700">Bio</label>
           <textarea value={formData.bio}  className="border border-gray-300  p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
        </div>
      )}
 
      </>
  )
    
  

  const footer = (
    <div className="flex justify-between w-full">
           <div>   <Button  label="Back " onClick={backStep} outline={true} /></div>
      <div><Button  label="Next " onClick={nextStep} outline={true} /></div>
 
    </div>
     
  )


  return (
    <>

    <Button 
   
    label="Edit"
    outline={true}
    onClick={() => {
      setIsOpen(true)
    }}
    />
   <Modal 
   title="Profile"
   body={body}
   footer={footer}
   actionLabel="save Profile"
   isOpen={isOpen}
   onClose={()=> {setIsOpen(false)}}
   onSubmit={saveProfile}
   />
   </>
  )
}

export default ProfileModal
