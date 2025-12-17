import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {

   const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) {
      redirect("/auth/signup")
    }
  
    return (
   
         <div className="max-w-3xl mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
        <p className="text-gray-600">This is the Chat page.</p>
      </div>

     
    );
  }
  