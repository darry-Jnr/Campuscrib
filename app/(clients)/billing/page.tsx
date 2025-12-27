import Container from "@/app/components/Container";
import { FiZap, FiCheckCircle, FiShield } from "react-icons/fi";
import Link from "next/link";

export default function BillingPage() {
  return (
    <Container>
      <div className="pt-24 pb-20 max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            <FiZap />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Get More Connects</h1>
          <p className="text-gray-500 mt-2">Find your perfect roommate without limits.</p>
        </div>

        {/* PRICING CARD */}
        <div className="bg-white border-2 border-green-600 rounded-4xl p-8 shadow-xl shadow-green-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase">
            Most Popular
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800">Standard Pack</h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-black text-gray-900">₦500</span>
              <span className="text-gray-400 font-medium">/ 5 Connects</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-gray-600">
              <FiCheckCircle className="text-green-500 shrink-0" />
              <span>Unlock 5 student phone numbers</span>
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <FiCheckCircle className="text-green-500 shrink-0" />
              <span>Direct WhatsApp access</span>
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <FiCheckCircle className="text-green-500 shrink-0" />
              <span>Verified student profiles</span>
            </li>
          </ul>

          {/* This button will later trigger Paystack */}
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all">
            Pay ₦500 Now
          </button>

          <p className="text-center text-[10px] text-gray-400 mt-4 flex items-center justify-center gap-1">
            <FiShield /> Secure payment powered by Paystack
          </p>
        </div>

        {/* FAQ/TRUST SECTION */}
        <div className="mt-12 space-y-6">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-sm text-gray-800">How does it work?</h4>
            <p className="text-xs text-gray-500 mt-1">Once payment is confirmed, 5 credits are added to your account instantly. One credit allows you to connect with one student.</p>
          </div>
        </div>
      </div>
    </Container>
  );
}