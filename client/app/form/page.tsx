'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 1️⃣ Schema
const schema = z.object({
    firstName: z.string().min(2, "First Name must be at least 2 characters").max(30),
    lastName:  z.string().min(2, "Last Name must be at least 2 characters").max(30),
    email: z.string().email("Invalid email format"),
    password: z.string().min(5, "Password must be at least 5 characters").max(20),
    confirmPassword: z.string().min(5, "Confirm Password must be at least 5 characters").max(20)
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

// 2️⃣ Infer the TS type
type FormData = z.infer<typeof schema>;

const Page = () => {

    const { register, handleSubmit, formState: { errors } } =
        useForm<FormData>({ resolver: zodResolver(schema) });

    const submitData = (data: FormData) => {
        console.log("Form submitted:", data);
    };

    return (
        <div>
            <form className="pt-28" onSubmit={handleSubmit(submitData)}>
                <div className="flex flex-col gap-2 mb-4">
                    <label>First Name:</label>
                    <input 
                        type="text"
                        {...register("firstName")}
                        className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label>Last Name:</label>
                    <input 
                        type="text"
                        {...register("lastName")}
                        className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label>Email:</label>
                    <input 
                        type="email"
                        {...register("email")}
                        className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label>Password:</label>
                    <input 
                        type="password"
                        {...register("password")}
                        className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label>Confirm Password:</label>
                    <input 
                        type="password"
                        {...register("confirmPassword")}
                        className="border border-gray-300 p-2 rounded-md w-full"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit" className="mt-4 p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Page;
