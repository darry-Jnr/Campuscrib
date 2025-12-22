"use client";

import { checkExistingAgent, createAgentProfile } from "@/app/actions/agents";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default  function AgentsSignUpForm() {


  const Labelstyle = "text-sm font-medium leading-none";
  const Inputstyle =
    "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:opacity-50";

  const [step, setStep] = useState(1);

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1)
      fieldsToValidate = ["businessName", "agentType", "yearsOfExperience"];
    if (step === 2) 
      fieldsToValidate = ["whatsappNumber", "responseTime"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: any) => {
    // Artificial delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 2000));
   await createAgentProfile(data);
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <div className="space-y-1.5 mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Create Agent Account
          </h2>
          <p className="text-sm text-slate-500 font-medium">Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* STEP 1: Business Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className={Labelstyle}>Business or Display Name</label>
                <input
                  {...register("businessName", {
                    required: "Enter a name for your profile",
                    minLength: { value: 4, message: "Too short" },
                  })}
                  placeholder="e.g. Great-Man Properties"
                  className={Inputstyle}
                />
                {errors.businessName && (
                  <p className="text-red-500 text-xs">{String(errors.businessName.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className={Labelstyle}>What best describes you?</label>
                <select
                  {...register("agentType", { required: "Please select a category" })}
                  className={Inputstyle}
                >
                  <option value="">Select Category</option>
                  <option value="student">Student Agent (FUTA Student)</option>
                  <option value="professional">Professional Agent (Full-time)</option>
                  <option value="landlord">Property Owner (Direct)</option>
                </select>
                {errors.agentType && (
                  <p className="text-red-500 text-xs">{String(errors.agentType.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className={Labelstyle}>Years of Experience</label>
                <input
                  type="number"
                  placeholder="e.g. 3"
                  {...register("yearsOfExperience", {
                    required: "Please enter your experience",
                    min: { value: 0, message: "Cannot be less than 0" },
                    valueAsNumber: true,
                  })}
                  className={Inputstyle}
                />
                {errors.yearsOfExperience && (
                  <p className="text-red-500 text-xs">{String(errors.yearsOfExperience.message)}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Contact Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className={Labelstyle}>WhatsApp Number</label>
                <input
                  {...register("whatsappNumber", {
                    required: "WhatsApp number is required",
                    pattern: { value: /^[0-9]{11}$/, message: "Must be 11 digits" }
                  })}
                  placeholder="081..."
                  className={Inputstyle}
                />
                {errors.whatsappNumber && (
                  <p className="text-red-500 text-xs">{String(errors.whatsappNumber.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className={Labelstyle}>Backup Phone Number (Optional)</label>
                <input {...register("backupNumber")} className={Inputstyle} placeholder="090..." />
              </div>

              <div className="space-y-2">
                <label className={Labelstyle}>Physical Office Address</label>
                <textarea
                  {...register("officeAddress")}
                  className={`${Inputstyle} h-20 py-2`}
                  placeholder="e.g. North Gate, Akure"
                />
              </div>

              <div className="space-y-2">
                <label className={Labelstyle}>Typical Response Time</label>
                <select
                  {...register("responseTime", { required: "Select your response speed" })}
                  className={Inputstyle}
                >
                  <option value="">Select speed</option>
                  <option value="instant">⚡ Instant (Within 15 mins)</option>
                  <option value="fast">🕒 Fast (Within 1-2 hours)</option>
                  <option value="medium">🌅 Same Day</option>
                  <option value="slow">📅 Within 24 hours</option>
                </select>
                {errors.responseTime && (
                  <p className="text-red-500 text-xs">{String(errors.responseTime.message)}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Verification (Optional) */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🛡️</span>
                  <h3 className="text-sm font-semibold text-blue-900">Your Data is Secure</h3>
                </div>
                <p className="text-xs text-blue-800">We encrypt identity details. Your NIN is never shared.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className={Labelstyle}>NIN (Identity Number)</label>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Optional</span>
                </div>
                <input
                  {...register("nin", {
                    validate: (value) => {
                      if (!value) return true;
                      return /^[0-9]{11}$/.test(value) || "NIN must be exactly 11 digits";
                    }
                  })}
                  placeholder="e.g. 12345678901"
                  className={Inputstyle}
                />
                {errors.nin && <p className="text-red-500 text-xs">{String(errors.nin.message)}</p>}
              </div>

              <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                <p className="text-xs text-amber-800">
                  Skipping this means your profile remains <strong>Unverified</strong> .
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-2 pt-2">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="w-1/3 h-10 rounded-md border border-slate-200 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 h-10 rounded-md bg-slate-900 text-slate-50 text-sm font-medium hover:bg-slate-800"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-10 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:bg-green-400"
              >
                {isSubmitting ? "Creating Account..." : "Complete Registration"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

