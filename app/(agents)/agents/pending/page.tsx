import Container from "@/app/components/Container";
import { FiClock, FiCheckCircle, FiShield } from "react-icons/fi";
import Link from "next/link";

export default function PendingPage() {
  return (
    <Container>
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center">
              <FiClock size={40} />
            </div>
          </div>

          <h1 className="text-2xl font-black text-gray-900 mb-3">Verification Pending</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Your application to become a verified Agent on <strong>CampusCrib</strong> is currently being reviewed. This usually takes between 1 to 3 hours.
          </p>

          <div className="space-y-4 text-left mb-8">
            <div className="flex gap-3 items-start">
              <div className="mt-1 text-green-500"><FiCheckCircle size={16} /></div>
              <div>
                <p className="text-xs font-bold text-gray-800">Registration Received</p>
                <p className="text-[11px] text-gray-400">Your details are safely in our database.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-1 text-blue-500"><FiShield size={16} /></div>
              <div>
                <p className="text-xs font-bold text-gray-800">Admin Review</p>
                <p className="text-[11px] text-gray-400">We are checking your business profile for authenticity.</p>
              </div>
            </div>
          </div>

          <Link 
            href="/"
            className="block w-full py-4 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all"
          >
            Back to Homepage
          </Link>
          
          <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            FUTA Campus Housing Project
          </p>
        </div>
      </div>
    </Container>
  );
}