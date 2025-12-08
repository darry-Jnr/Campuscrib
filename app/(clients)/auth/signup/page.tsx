// app/auth/login/page.tsx
import React from "react";
import SignupForm from "@/app/components/form/SignupForm";

const page = () => {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 flex items-center justify-center">
      <SignupForm title="Create an Account" />
    </div>
  );
};

export default page;
