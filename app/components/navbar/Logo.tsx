'use client';
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
  return (
    <>
    <div className="hidden md:block font-semibold text-2xl cursor-pointer">
        CampusCrib
        </div>
        <div className="md:hidden font-semibold text-2xl cursor-pointer">
        CC
        </div>
        </>
  )
}

export default Logo