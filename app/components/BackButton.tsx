'use client';
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi"; // Chevron looks more modern than an arrow

interface BackButtonProps {
  variant?: 'floating' | 'ghost' | 'outline';
}

const BackButton = ({ variant = 'ghost' }: BackButtonProps) => {
  const router = useRouter();

  // Define styles based on where the button is used
  const styles = {
    floating: "bg-white/90 backdrop-blur-md shadow-lg border border-gray-100 p-3 rounded-full hover:bg-white",
    ghost: "hover:bg-gray-100 p-2 rounded-full",
    outline: "border border-gray-200 px-4 py-2 rounded-2xl hover:bg-gray-50 font-medium text-sm"
  };

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center justify-center transition-all active:scale-90 ${styles[variant]}`}
      aria-label="Go back"
    >
      <FiChevronLeft size={24} className="text-gray-800" />
      {variant === 'outline' && <span className="ml-1">Back</span>}
    </button>
  );
};

export default BackButton;