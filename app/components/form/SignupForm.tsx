'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"; // Added icons
import toast from "react-hot-toast";
import Container from "../Container";
import Input from "../inputs/Input";
import { signIn, signUp, signInSocial } from "@/lib/actions/auth-actions";

// ---------------- Schema
const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(30, "Full name must be at most 30 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters"),
});

type FormData = z.infer<typeof schema>;

interface SignupFormProps {
  title: string;
}

const SignupForm = ({ title }: SignupFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added state

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Email/password authentication
  // const handleEmailAuth = async (data: FormData) => {
  //   setIsLoading(true);
  //   setError("");
  //   try {
  //     if (isSignIn) {
  //       const result = await signIn(data.email.trim(), data.password);
  //       if (!result?.user) {
  //         setError("Invalid email or password");
  //         return;
  //       }
  //     } else {
  //       const result = await signUp(data.email.trim(), data.password, data.fullName);
  //       if (!result?.user) {
  //         setError("Failed to create account");
  //         return;
  //       }
  //     }
  //     router.push(redirect);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Authentication failed");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

// Email/password authentication
const handleEmailAuth = async (data: FormData) => {
  setIsLoading(true);
  
  try {
    let result;

    if (isSignIn) {
      result = await signIn(data.email.trim(), data.password);
    } else {
      result = await signUp(data.email.trim(), data.password, data.fullName);
    }

    // 1. Check if the server returned an error message (like "password too short")
    if (result?.error) {
      toast.error(result.error);
      return; // Stop execution here
    }

    // 2. Check if the user object is missing for any other reason
    if (!result?.user) {
      toast.error(isSignIn ? "Invalid email or password" : "Failed to create account");
      return;
    }

    // 3. Success!
    toast.success(isSignIn ? "Welcome back!" : "Account created successfully!");
    router.push(redirect);
    router.refresh(); 
    
  } catch (err) {
    // This catches actual network crashes or unexpected server explosions
    toast.error("A connection error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  // Social login (Google)
  // const handleSocialAuth = async (provider: "google") => {
  //   setIsLoading(true);
  //   setError("");
  //   try {
  //     await signInSocial(provider);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Social login failed");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSocialAuth = async (provider: "google") => {
    setIsLoading(true);
    // No need for setError("") if you are using toasts now
    try {
      // This usually triggers a redirect to Google
      await signInSocial(provider);
    } catch (err) {
      // If Google fails to load or the server blocks the request
      const message = err instanceof Error ? err.message : "Social login failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h2>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(handleEmailAuth)}>
          {!isSignIn && (
            <>
              <Input label="Full Name" {...register("fullName")} />
              {errors.fullName && <p className="text-red-500 text-sm mb-2">{errors.fullName.message}</p>}
            </>
          )}

          <Input label="Email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

          <div className="relative">
            <Input 
              label="Password" 
              type={showPassword ? "text" : "password"} 
              {...register("password")} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold p-3 rounded-md mt-4 transition"
          >
            {isLoading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center justify-center gap-2">
          <span className="text-gray-500">or</span>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={() => handleSocialAuth("google")}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 p-3 rounded-md transition"
        >
          <FaGoogle size={20} className="text-red-500" />
          <span className="text-gray-700 font-semibold">Continue with Google</span>
        </button>

        <hr className="my-6 border-gray-300" />

        {/* Toggle Sign Up / Sign In */}
        <p className="text-center text-gray-600">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-green-500 font-semibold hover:underline"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </Container>
  );
};

export default SignupForm;