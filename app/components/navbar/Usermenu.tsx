'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth-actions"

type Session = typeof auth.$Infer.Session;

const Usermenu = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((v) => !v), []);
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/login")
  }
  return (
    <div className="relative flex border md:border-gray-400 rounded-full p-2 flex-row items-center gap-3">
      <AiOutlineMenu onClick={toggleOpen} size={24} />
      <div className="hidden md:block">
        <Avatar />
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md md:w-[200px] bg-white overflow-hidden top-12 right-0 text-sm z-50">
          <div className="flex flex-col cursor-pointer">
            {/* Show login/signup if no session */}
            {!session && (
              <>
                <MenuItem
                  onClick={() => router.push("/auth/login")}
                  label="Login"
                />
                <MenuItem
                  onClick={() => router.push("/auth/signup")}
                  label="Sign Up"
                />
              </>
            )}

            {/* Show logged-in menu if session exists */}
            {session && (
              <>
                <MenuItem
                  onClick={() => router.push("/agent")}
                  label="Become an Agent"
                />
                <MenuItem
                  onClick={() => router.push("/roomatesearch")}
                  label="Roommate Match"
                />
                <MenuItem
                  onClick={handleSignOut}
                  label="Logout"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
