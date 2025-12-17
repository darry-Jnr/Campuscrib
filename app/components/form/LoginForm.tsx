'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

import Container from "../Container";
import Input from "../inputs/Input";
import { signIn, signInSocial } from "@/lib/actions/auth-actions";

// ---------------- Schema
const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters"),
});

type FormData = z.infer<typeof schema>;

interface LoginFormProps {
  title: string;
}

const LoginForm = ({ title }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Email/password login
  const handleEmailLogin = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn(data.email.trim(), data.password);
      if (!result?.user) {
        setError("Invalid email or password");
        return;
      }
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInSocial("google"); // redirect handled server-side
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
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
        <form onSubmit={handleSubmit(handleEmailLogin)}>
          <Input label="Email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

          <Input label="Password" type="password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold p-3 rounded-md mt-4 transition"
          >
            {isLoading ? "Please wait..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center justify-center gap-2">
          <span className="text-gray-500">or</span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded-md transition"
        >
          <FaGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        <hr className="my-6 border-gray-300" />

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-green-500 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </Container>
  );
};

export default LoginForm;
