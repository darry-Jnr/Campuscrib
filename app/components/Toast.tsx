"use client";
import toast from "react-hot-toast";

const Toast = () => {
  return (
    <div>
      <button
        onClick={() => toast.error("Please sign in to create a profile")}
        className="border border-white text-white px-4 py-2 rounded-lg"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Toast;
