'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

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

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Email/password authentication
  const handleEmailAuth = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    try {
      if (isSignIn) {
        const result = await signIn(data.email.trim(), data.password);
        if (!result?.user) {
          setError("Invalid email or password");
          return;
        }
      } else {
        const result = await signUp(data.email.trim(), data.password, data.fullName);
        if (!result?.user) {
          setError("Failed to create account");
          return;
        }
      }
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Social login (Google)
  const handleSocialAuth = async (provider: "google") => {
    setIsLoading(true);
    setError("");
    try {
      await signInSocial(provider);
      // Redirect handled inside signInSocial (server-side)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Social login failed");
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

          <Input label="Password" type="password" {...register("password")} />
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
