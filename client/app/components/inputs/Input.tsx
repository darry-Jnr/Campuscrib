// app/components/inputs/Input.tsx
"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 mb-4">
        <label className="font-semibold text-gray-700">{label}</label>
        <input
          {...props}
          ref={ref}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
