"use client";

import { createAgentProfile } from "@/app/actions/agents";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AgentsSignUpForm() {
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
    const isStepValid = await trigger(["businessName", "agentType", "yearsOfExperience"]);
    if (isStepValid) setStep(2);
  };

  const handleBack = () => setStep(1);

  const onSubmit = async (data: any) => {
    if (step !== 2) return;
    try {
      await createAgentProfile(data);
      // The redirect is handled inside the 'use server' action
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  // Prevents the "Enter" key from submitting early
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <div className="space-y-1.5 mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Create Agent Account
          </h2>
          <p className="text-sm text-slate-500 font-medium">Step {step} of 2</p>
        </div>

        <form 
          onSubmit={handleSubmit(onSubmit)} 
          onKeyDown={handleKeyDown}
          className="space-y-6"
        >
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
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

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
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
                <label className={Labelstyle}>Typical Response Time</label>
                <select
                  {...register("responseTime", { required: "Select your response speed" })}
                  className={Inputstyle}
                >
                  <option value="">Select speed</option>
                  <option value="instant">⚡ Instant (Within 15 mins)</option>
                  <option value="fast">🕒 Fast (Within 1-2 hours)</option>
                  <option value="medium">🌅 Same Day</option>
                </select>
                {errors.responseTime && (
                  <p className="text-red-500 text-xs">{String(errors.responseTime.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className={Labelstyle}>Physical Office Address (Optional)</label>
                <textarea
                  {...register("officeAddress")}
                  className={`${Inputstyle} h-20 py-2`}
                  placeholder="e.g. North Gate, Akure"
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="w-1/3 h-10 rounded-md border border-slate-200 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
              >
                Back
              </button>
            )}

            {step === 1 ? (
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
                {isSubmitting ? "Processing..." : "Complete Registration"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}