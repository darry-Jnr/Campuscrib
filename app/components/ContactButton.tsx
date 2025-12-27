"use client";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useRouter } from "next/navigation";
import { FiMessageCircle, FiLock, FiZap } from "react-icons/fi";

interface ContactButtonProps {
  targetId: string;
  phone: string | null;
  hasUnlocked: boolean;
  credits: number;
  userEmail: string;
}

export default function ContactButton({
  targetId,
  phone,
  hasUnlocked,
  credits,
  userEmail,
}: ContactButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Paystack Config
  const config = {
    reference: new Date().getTime().toString(),
    email: userEmail,
    amount: 50000, // ₦500
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePayment = usePaystackPayment(config);

  const handleUnlock = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to unlock. Check your connection.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 1. If already unlocked, go straight to WhatsApp
  if (hasUnlocked) {
    return (
      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all"
      >
        <FiMessageCircle size={20} /> Chat on WhatsApp
      </a>
    );
  }

  // 2. If has credits, show Unlock Button
  if (credits > 0) {
    return (
      <button
        onClick={handleUnlock}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all"
      >
        <FiLock size={20} />
        {loading ? "Unlocking..." : `Unlock Contact (1 Credit)`}
      </button>
    );
  }

  // 3. If no credits, show Paystack Button
  return (
    <button
      onClick={() => {
        initializePayment({
          onSuccess: () => router.refresh(),
          onClose: () => {},
        });
      }}
      className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-green-600 to-green-500 text-white py-4 rounded-2xl font-bold shadow-lg"
    >
      <FiZap size={20} /> Get 5 Connects (₦500)
    </button>
  );
}