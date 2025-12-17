// app/auth/login/page.tsx
import SignupForm from "@/app/components/form/SignupForm";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/")
  }

  return (
    <div className="pt-28 min-h-screen bg-gray-50 flex items-center justify-center">
      <SignupForm title="Create an Account" />
    </div>
  );
};

export default page;
