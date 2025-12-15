"use client";
import {useRouter }from "next/navigation"

const BecomeAgent = () => {
const router = useRouter();

const handleClick = () => {
    router.push("/agents")
}
  return (
    <div>
      <button
      onClick={handleClick}
        className="
          p-2 
          rounded-full 
          border border-gray-400 
          hover:bg-neutral-400
        "
      >
        Become an Agent
      </button>
    </div>
  );
};

export default BecomeAgent;
