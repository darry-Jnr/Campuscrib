"use client";

import { useForm } from "react-hook-form";
import Container from "../Container";
import Input from "../inputs/Input";

interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  title: string;
}

const LoginForm = ({ title }: LoginFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

  const submitData = async (data: FormData) => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (result.success) {
        // Save JWT token
        localStorage.setItem("token", result.token);
        alert("Login successful!");
        // Redirect or update state here if needed
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
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
          <Input label="Email" type="email" {...register("email")} />
          <Input label="Password" type="password" {...register("password")} />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-md mt-4 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Sign up prompt */}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/auth/signup-client"
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
