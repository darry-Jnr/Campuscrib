'use client';
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

interface BackButtonProps {
  label?: string; // optional text
  className?: string; 
}

const BackButton = ({ label = "Back", className = "" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // <-- goes to previous page
      className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition ${className}`}
    >
      <FiArrowLeft size={20} />
      <span className="text-sm md:text-base font-medium">{label}</span>
    </button>
  );
};

export default BackButton;
