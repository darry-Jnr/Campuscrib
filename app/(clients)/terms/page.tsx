import Link from "next/link";
import { FiArrowLeft, FiShield, FiAlertTriangle, FiInfo } from "react-icons/fi";

export default function TermsOfService() {
  const lastUpdated = "December 27, 2025";

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 pt-24">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link 
          href="/auth/signup" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-green-600 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 mb-4">
            Please read these terms carefully before using CampusCrib.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <span className="font-medium">Last updated:</span>
            <span>{lastUpdated}</span>
          </div>
        </div>

        <div className="space-y-12">
          
          {/* 1. Agreement */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
                <FiInfo size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  1. Agreement to Terms
                </h2>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed ml-14">
              By accessing and using CampusCrib ("Service"), you accept and agree to be bound by the terms and provisions of this agreement. We built this platform to make finding student accommodation in Akure easier and more transparent. If you do not agree to these Terms of Service, please do not use our Service.
            </p>
          </section>

          {/* 2. Safety Warning */}
          <section>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-amber-100 text-amber-700">
                  <FiAlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-amber-900 mb-3">
                    2. Safety & Payment Warning
                  </h2>
                  <p className="text-amber-800 leading-relaxed mb-3">
                    <strong>IMPORTANT:</strong> CampusCrib is a listing platform only, not a property manager or landlord. We connect students with agents but are not involved in rental transactions.
                  </p>
                  <ul className="space-y-2 text-amber-800">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      Never pay "inspection fees" or deposits without physically viewing the property
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      Always meet agents in person and verify their identity
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      All financial transactions are strictly between you and the agent
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Use of Service */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-green-50 text-green-600">
                <FiShield size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  3. Use of Service
                </h2>
              </div>
            </div>
            <div className="ml-14 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Users of CampusCrib agree to the following conditions:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 bg-green-600 mt-2 shrink-0"></span>
                  <p className="text-slate-600">
                    <strong className="text-slate-900">Agents</strong> must upload only authentic photos and videos of properties located in Akure and provide accurate information about listings.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 bg-green-600 mt-2 shrink-0"></span>
                  <p className="text-slate-600">
                    <strong className="text-slate-900">Students</strong> must provide truthful information when creating profiles and searching for accommodation or roommates.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 bg-green-600 mt-2 shrink-0"></span>
                  <p className="text-slate-600">
                    <strong className="text-slate-900">Prohibited activities</strong> include harassment, spam, posting false listings, or any form of fraudulent behavior.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. User Accounts
            </h2>
            <p className="text-slate-600 leading-relaxed">
              When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and for any activities or actions under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </section>

          {/* 5. Property Listings */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Property Listings
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Agents who post property listings agree to:
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                Provide accurate and truthful information about all properties
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                Upload only authentic photos and videos of the listed properties
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                Have proper authorization to list the properties on the platform
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                Update or remove listings promptly when properties are no longer available
              </li>
            </ul>
          </section>

          {/* 6. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed">
              CampusCrib shall not be liable for any losses, disputes, scams, or disagreements occurring between users. We provide a platform for connecting students and agents, but the final decision to rent a property and all related transactions are the sole responsibility of the parties involved. CampusCrib makes no warranties or guarantees regarding the accuracy of listings or the conduct of users.
            </p>
          </section>

          {/* 7. Termination */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Termination
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          {/* 8. Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any significant changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact */}
          <section className="pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Contact Us
            </h2>
            <p className="text-slate-600 mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-slate-200 p-6">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                  Email Address
                </p>
                <p className="text-slate-900 font-semibold">
                  support@campuscrib.com
                </p>
              </div>
              <div className="border border-slate-200 p-6">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                  Location
                </p>
                <p className="text-slate-900 font-semibold">
                  Akure, Ondo State, Nigeria
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 pt-8 border-t border-slate-200">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} CampusCrib. Built for FUTA Students.
        </p>
      </div>
    </div>
  );
}