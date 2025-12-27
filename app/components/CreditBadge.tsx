import { FiZap } from "react-icons/fi";

export default function CreditBadge({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-3 py-1.5 rounded-lg shadow-sm">
      <div className="bg-green-500 p-1 rounded-full">
        <FiZap className="text-white text-[10px]" />
      </div>
      <span className="text-sm font-bold text-green-700">
        {count} {count === 1 ? "Connect" : "Connects"} left
      </span>
    </div>
  );
}