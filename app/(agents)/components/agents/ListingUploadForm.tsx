"use client";

import { createListing } from "@/app/actions/createListing";
import { updateListing } from "@/app/actions/updateListing";
import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdVideoLibrary, MdClose } from "react-icons/md";
import { toast } from "react-hot-toast"; 

type FormValues = {
  id?: string;
  mainLocation: string;
  streetName: string;
  price: number | "";
  distance: string;
  description: string;
  videoFile: File | null;
  videoUrl?: string; 
  imageFiles: File[];
  hasFence: boolean;
  electricity: boolean;
  water: boolean;
  security: boolean;
  solar: boolean;
};

export default function ListingUploadForm({ initialData, onSuccess }: { initialData?: any, onSuccess?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [videoPreview, setVideoPreview] = useState<string>(initialData?.videoUrl || "");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");

  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Amenities" },
    { number: 3, label: "Media" },
  ];
  
  const videoInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, trigger, setValue } = useForm<FormValues>({
    defaultValues: initialData ? {
      ...initialData,
      videoFile: null,
      imageFiles: [],
    } : {
      mainLocation: "South Gate",
      streetName: "",
      price: "",
      distance: "",
      description: "",
      videoFile: null,
      imageFiles: [],
      hasFence: false,
      electricity: false,
      water: false,
      security: false,
      solar: false,
    },
  });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "campuscrib");
    formData.append("resource_type", "video");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) throw new Error("Failed to upload video");
    const data = await response.json();
    return data.secure_url;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!videoFile && !videoPreview) {
      setUploadError("Please upload a video to proceed");
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadError("");

      let finalVideoUrl = videoPreview;
      if (videoFile) {
        finalVideoUrl = await uploadToCloudinary(videoFile);
      }

      const { videoFile: _, imageFiles: __, ...restOfData } = data;
      const finalFormData = { ...restOfData, videoUrl: finalVideoUrl };

      let result;
      if (initialData?.id) {
        result = await updateListing(initialData.id, finalFormData);
      } else {
        result = await createListing(finalFormData);
      }

      if (result.success) {
        // 1. Show Success Message
        toast.success(initialData ? "Changes saved!" : "Listing created!");
        
        // 2. Perform Full Refresh
        // We wait 800ms so the user can actually see the success toast before the screen reloads
        setTimeout(() => {
          window.location.reload();
        }, 800);

      } else {
        toast.error(result.error || "Failed to save");
        setUploadError(result.error || "Failed to save listing");
      }
    } catch (error) {
      toast.error("An error occurred");
      setUploadError("Failed to save changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Helpers ---
  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (currentStep === 1) fieldsToValidate = ["mainLocation", "streetName", "price", "distance"];
    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => { if (currentStep > 1) setCurrentStep((prev) => prev - 1); };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
      setVideoFile(file);
      setValue("videoFile", file);
    }
  };

  const handleRemoveVideo = () => {
    setVideoPreview("");
    setVideoFile(null);
    setValue("videoFile", null);
  };

  return (
    <div className={`w-full ${!initialData && 'min-h-screen'} bg-slate-50 py-6`}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-between px-2">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= step.number ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                            {step.number}
                        </div>
                    </div>
                    {index < steps.length - 1 && <div className={`h-1 flex-1 rounded ${currentStep > step.number ? "bg-green-500" : "bg-slate-200"}`} />}
                </div>
            ))}
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 sm:p-10 shadow-sm relative">
          
          {/* LOADING OVERLAY */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-10 flex flex-col items-center justify-center rounded-[2.5rem]">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-black text-xs uppercase tracking-widest text-slate-900 animate-pulse">Syncing with Server...</p>
            </div>
          )}

          {/* STEP 1: BASIC INFO */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-black tracking-tight italic">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">Location</label>
                  <select {...register("mainLocation", { required: true })} className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold">
                    <option value="South Gate">South Gate</option>
                    <option value="North Gate">North Gate</option>
                    <option value="West Gate">West Gate</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">Apartment type</label>
                  <input {...register("streetName", { required: true })} className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-black uppercase text-slate-400 ml-1">Price (₦)</label>
                        <input type="number" {...register("price", { required: true })} className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold" />
                    </div>
                    <div>
                        <label className="text-xs font-black uppercase text-slate-400 ml-1">Distance</label>
                        <input {...register("distance", { required: true })} className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold" />
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AMENITIES */}
          {currentStep === 2 && (
             <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-black tracking-tight italic">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["hasFence", "electricity", "water", "security", "solar"].map((item) => (
                        <label key={item} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                            <span className="text-sm font-bold capitalize">{item.replace('has', '')}</span>
                            <input type="checkbox" {...register(item as any)} className="w-5 h-5 accent-green-500 rounded-lg" />
                        </label>
                    ))}
                </div>
             </div>
          )}

          {/* STEP 3: MEDIA */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
               <h2 className="text-xl font-black tracking-tight italic">Apartment Video</h2>
               {videoPreview ? (
                   <div className="relative rounded-3xl overflow-hidden aspect-video bg-black shadow-2xl">
                       <video src={videoPreview} controls className="w-full h-full object-contain" />
                       <button type="button" onClick={handleRemoveVideo} className="absolute top-4 right-4 bg-red-500 p-2 rounded-full text-white shadow-lg">
                           <MdClose size={20} />
                       </button>
                   </div>
               ) : (
                   <div onClick={() => videoInputRef.current?.click()} className="border-4 border-dashed border-slate-100 rounded-[2.5rem] p-12 text-center cursor-pointer hover:bg-slate-50 transition-all group">
                       <MdVideoLibrary size={40} className="mx-auto text-slate-300 mb-2 group-hover:text-green-500 transition-colors" />
                       <p className="font-black text-slate-400 text-xs uppercase tracking-widest group-hover:text-slate-600">Tap to upload video</p>
                   </div>
               )}
               <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoSelect} />
               {uploadError && <p className="text-red-500 text-[10px] font-black uppercase text-center bg-red-50 py-2 rounded-xl border border-red-100">{uploadError}</p>}
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex gap-3 mt-10">
            {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="flex-1 py-4 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Back</button>
            )}
            <button 
                type="button"
                onClick={currentStep === 3 ? handleSubmit(onSubmit) : nextStep} 
                disabled={isSubmitting}
                className="flex-[2] bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Finalizing..." : currentStep === 3 ? (initialData ? "Apply Changes" : "Post Listing") : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
