"use client";

import { createListing } from "@/app/actions/createListing";
import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdVideoLibrary, MdCheckCircle, MdClose } from "react-icons/md";
import { useRouter } from "next/navigation"; 

type FormValues = {
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

export default function ListingUploadForm() {
  const router = useRouter(); 
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  
  const videoInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      mainLocation: "",
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

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Amenities" },
    { number: 3, title: "Media" },
  ];

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "campuscrib");
    formData.append("resource_type", "video");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload video to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!videoFile) {
      setUploadError("Please upload a video to proceed");
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadError("");

      // 1. Upload video to Cloudinary (This happens on client-side)
      const videoUrl = await uploadToCloudinary(videoFile);

      // 2. STRIP RAW FILES BEFORE SENDING TO SERVER ACTION
      // This prevents the "Body exceeded 1 MB limit" error
      const { videoFile: _, imageFiles: __, ...restOfData } = data;

      // 3. Prepare final form data (Sending only strings/booleans to server)
      const finalFormData = {
        ...restOfData,
        videoUrl: videoUrl, 
      };

      // 4. Call Server Action
      const result = await createListing(finalFormData);

      if (result.success) {
        console.log("Listing uploaded successfully!");
        alert("Listing uploaded successfully!");
        router.push("/agents"); 
      } else {
        setUploadError(result.error || "Failed to save listing");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload listing. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ["mainLocation", "streetName", "price", "distance"];
    }
    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"];
      if (!validTypes.includes(file.type)) {
        setUploadError("Please upload only MP4, MOV, or AVI video files");
        return;
      }
      const maxSize = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSize) {
        setUploadError("Video file is too large. Maximum size is 100MB");
        return;
      }

      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setVideoFile(file);
      setValue("videoFile", file);
      setUploadError("");
    }
  };

  const handleRemoveVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview("");
    setVideoFile(null);
    setValue("videoFile", null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const urls = files.map((file) => URL.createObjectURL(file));
    setImagePreview(urls);
    setValue("imageFiles", files);
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-6  sm:py-12 overflow-x-hidden">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Upload New Listing</h1>
          <p className="text-sm sm:text-base text-slate-600">Step {currentStep} of {steps.length}</p>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all ${currentStep >= step.number ? "bg-green-500 text-white" : "bg-slate-200 text-slate-600"}`}>
                    {step.number}
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm font-medium ${currentStep >= step.number ? "text-green-600" : "text-slate-500"}`}>{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded transition-all ${currentStep > step.number ? "bg-green-500" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-8">
          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800 pb-2 border-b border-slate-200">Basic Information</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Main Location <span className="text-red-500">*</span></label>
                  <select {...register("mainLocation", { required: "Please select a location" })} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none">
                    <option value="">Select a location</option>
                    <option value="South Gate">South Gate</option>
                    <option value="North Gate">North Gate</option>
                    <option value="West Gate">West Gate</option>
                  </select>
                  {errors.mainLocation && <p className="mt-1 text-sm text-red-500">{errors.mainLocation.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Street Name <span className="text-red-500">*</span></label>
                  <input type="text" {...register("streetName", { required: "Street name is required" })} placeholder="e.g., Ibikunle Street" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none" />
                  {errors.streetName && <p className="mt-1 text-sm text-red-500">{errors.streetName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price (₦) <span className="text-red-500">*</span></label>
                  <input type="number" {...register("price", { required: "Price is required", min: { value: 1, message: "Price must be greater than 0" } })} placeholder="e.g., 120000" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none" />
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Distance from Campus <span className="text-red-500">*</span></label>
                  <input type="text" {...register("distance", { required: "Distance is required" })} placeholder="e.g., 5 mins" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none" />
                  {errors.distance && <p className="mt-1 text-sm text-red-500">{errors.distance.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea {...register("description")} rows={4} placeholder="Describe the apartment..." className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800 pb-2 border-b border-slate-200">Amenities & Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "hasFence", label: "Fenced Compound", icon: "🏘️" },
                    { name: "electricity", label: "Electricity", icon: "⚡" },
                    { name: "water", label: "Water Supply", icon: "💧" },
                    { name: "security", label: "Security", icon: "🔒" },
                    { name: "solar", label: "Solar Power", icon: "☀️" },
                  ].map((amenity) => (
                    <label key={amenity.name} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                      <input type="checkbox" {...register(amenity.name as keyof FormValues)} className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-2 focus:ring-green-500" />
                      <span className="text-xl">{amenity.icon}</span>
                      <span className="text-sm font-medium text-slate-700">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800 pb-2 border-b border-slate-200">Upload Video & Photos</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Upload Video <span className="text-red-500">*</span></label>
                  <input ref={videoInputRef} type="file" accept="video/mp4,video/quicktime,video/x-msvideo" onChange={handleVideoSelect} className="hidden" />
                  {videoPreview ? (
                    <div className="space-y-3">
                      <div className="relative border-2 border-green-500 rounded-lg overflow-hidden bg-black">
                        <video src={videoPreview} controls className="w-full max-h-96 object-contain" />
                        <button type="button" onClick={handleRemoveVideo} className="absolute top-2 right-2 bg-green-400 hover:bg-green-500 text-white rounded-full p-2 transition-colors shadow-lg"><MdClose size={20} /></button>
                      </div>
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <MdCheckCircle size={24} className="text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-green-700">Video ready to upload</p>
                            <p className="text-xs text-green-600">{videoFile?.name} ({((videoFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB)</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => videoInputRef.current?.click()} className="text-xs text-green-600 hover:text-green-700 font-medium underline">Change Video</button>
                      </div>
                    </div>
                  ) : (
                    <div onClick={() => videoInputRef.current?.click()} className="border-2 border-dashed border-slate-200 rounded-lg p-8 sm:p-10 text-center hover:border-green-400 transition-all cursor-pointer bg-slate-50 hover:bg-green-50">
                      <MdVideoLibrary size={48} className="text-slate-400 mx-auto mb-3" />
                      <div className="text-slate-600 font-medium text-lg mb-1">Click to upload apartment video</div>
                      <p className="text-sm text-slate-500">MP4, MOV or AVI • Max 100MB</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Upload Photos (Optional)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 sm:p-8 text-center hover:border-green-400 transition-colors">
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-sm text-slate-600 font-medium">Click to upload or drag & drop</span>
                    </label>
                  </div>
                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                      {imagePreview.map((url, index) => (
                        <div key={index} className="relative">
                          <img src={url} alt={`Preview ${index + 1}`} className="w-full h-24 sm:h-28 object-cover rounded-lg border border-slate-200" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {uploadError && currentStep === 3 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{uploadError}</p>
              </div>
            )}

            <div className="pt-6 border-t border-slate-200 flex gap-3">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 sm:py-4 rounded-lg transition-colors">Previous</button>
              )}
              {currentStep < 3 ? (
                <button type="button" onClick={nextStep} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors shadow-lg shadow-green-500/30">Next Step</button>
              ) : (
                <button type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed shadow-lg shadow-green-500/30">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Uploading...
                    </span>
                  ) : "Upload Listing"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}