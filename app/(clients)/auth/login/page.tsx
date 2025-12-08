// app/auth/login/page.tsx
import React from "react";
import LoginForm from "@/app/components/form/LoginForm";

const page = () => {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 flex items-center justify-center">
      <LoginForm title="Login to your Account" />
    </div>
  );
};

export default page;
