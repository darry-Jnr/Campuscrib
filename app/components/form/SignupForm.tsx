"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "../Container";
import Input from "../inputs/Input";

// ---------------- Schema
const schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(30, "Full name must be at most 30 characters"),
  email: z.string().email("Invalid email format"),
  number: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(11, "Phone number must be at least 11 digits")
    .max(14, "Phone number must be at most 14 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

type FormData = z.infer<typeof schema>;

interface LoginFormProps {
  title: string;
}

const SignupForm = ({ title }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <Container>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {title}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(submitData)}>
          <Input label="Full Name" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-red-500 text-sm mb-2">{errors.fullName.message}</p>
          )}

          <Input label="Email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          <Input label="Phone Number" {...register("number")} />
          {errors.number && (
            <p className="text-red-500 text-sm mb-2">{errors.number.message}</p>
          )}

          <Input label="Password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-md mt-4 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Sign up prompt */}
        <p className="text-center text-gray-600">
          Have an account?{" "}
          <a
            href="/auth/login"
            className="text-green-500 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </Container>
  );
};

export default SignupForm;
