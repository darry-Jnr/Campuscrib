"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

type FormValues = {
  mainLocation: string;
  streetName: string;
  price: number | "";
  distance: string;
  description: string;
  videoUrl: File | null;
  hasFence: boolean;
  electricity: boolean;
  water: boolean;
  security: boolean;
  solar: boolean;
};

export default function ListingUploadForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      videoUrl: null,
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.videoUrl) {
      alert("Please upload a video to proceed!");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    alert("Listing uploaded successfully!");
    setIsSubmitting(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const urls = files.map((file) => URL.createObjectURL(file));
    setImagePreview(urls);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
      setValue("videoUrl", file); // update react-hook-form
    }
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-6 px-4 sm:py-12 overflow-x-hidden">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Upload New Listing
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Step {currentStep} of {steps.length}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all ${
                      currentStep >= step.number
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`mt-2 text-xs sm:text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-green-600"
                        : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-all ${
                      currentStep > step.number
                        ? "bg-green-500"
                        : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-8 space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Main Location */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Main Location <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("mainLocation", { required: "Please select a location" })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                >
                  <option value="">Select a location</option>
                  <option value="South Gate">South Gate</option>
                  <option value="North Gate">North Gate</option>
                  <option value="West Gate">West Gate</option>
                </select>
                {errors.mainLocation && (
                  <p className="mt-1 text-sm text-red-500">{errors.mainLocation.message}</p>
                )}
              </div>

              {/* Street Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Street Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("streetName", { required: "Street name is required" })}
                  placeholder="e.g., Ibikunle Street"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                />
                {errors.streetName && (
                  <p className="mt-1 text-sm text-red-500">{errors.streetName.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price (₦) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required", min: { value: 1, message: "Price must be greater than 0" } })}
                  placeholder="e.g., 120000"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Distance from Campus <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("distance", { required: "Distance is required" })}
                  placeholder="e.g., 5 mins"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                />
                {errors.distance && (
                  <p className="mt-1 text-sm text-red-500">{errors.distance.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  placeholder="Describe the apartment, nearby amenities, room features, etc."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Amenities */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800 pb-2 border-b border-slate-200">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "hasFence", label: "Fenced Compound", icon: "🏘️" },
                  { name: "electricity", label: "Electricity", icon: "⚡" },
                  { name: "water", label: "Water Supply", icon: "💧" },
                  { name: "security", label: "Security", icon: "🔒" },
                  { name: "solar", label: "Solar Power", icon: "☀️" },
                ].map((amenity) => (
                  <label key={amenity.name} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      {...register(amenity.name as keyof FormValues)}
                      className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-xl">{amenity.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Media */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800 pb-2 border-b border-slate-200">
                Upload Video & Photos
              </h2>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Upload Video <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 sm:p-8 text-center hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
                      />
                    </svg>
                    <span className="text-sm text-slate-600 font-medium">
                      Tap to upload a video or drag & drop
                    </span>
                    <span className="text-xs text-slate-500 mt-1">MP4, MOV up to 100MB</span>
                  </label>
                </div>
                {videoPreview && (
                  <video
                    src={videoPreview}
                    controls
                    className="w-full mt-4 rounded-lg border border-slate-200"
                  />
                )}
              </div>

              {/* Images Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Upload Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 sm:p-8 text-center hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-slate-600 font-medium">
                      Click to upload or drag & drop
                    </span>
                    <span className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</span>
                  </label>
                </div>
                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {imagePreview.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 sm:h-28 object-cover rounded-lg border border-slate-200"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 border-t border-slate-200 flex gap-3">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 sm:py-4 rounded-lg transition-colors">
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors shadow-lg shadow-green-500/30">
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed shadow-lg shadow-green-500/30"
              >
                {isSubmitting ? "Uploading..." : "Upload Listing"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
