import Link from "next/link";
import { FiArrowLeft, FiEye, FiLock, FiDatabase, FiUserCheck, FiShield, FiGlobe } from "react-icons/fi";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 mb-4">
            How we collect, use, and protect your personal information at CampusCrib.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <span className="font-medium">Last updated:</span>
            <span>{lastUpdated}</span>
          </div>
        </div>

        <div className="space-y-12">
          
          {/* Introduction */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
                <FiEye size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Introduction
                </h2>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed ml-14">
              CampusCrib ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our student accommodation platform. Please read this policy carefully to understand our practices regarding your personal data.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
                <FiDatabase size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  1. Information We Collect
                </h2>
              </div>
            </div>
            
            <div className="ml-14 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  1.1 Personal Information
                </h3>
                <p className="text-slate-600 mb-4">
                  We collect information that you provide directly to us when you:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border border-slate-200 p-5">
                    <h4 className="font-semibold text-slate-900 mb-2">Account Data</h4>
                    <p className="text-sm text-slate-600">
                      Name, email address, password, and profile picture when you create an account via email or Google authentication.
                    </p>
                  </div>
                  <div className="border border-slate-200 p-5">
                    <h4 className="font-semibold text-slate-900 mb-2">Profile Information</h4>
                    <p className="text-sm text-slate-600">
                      Phone number, student ID, university affiliation, and preferences you provide to complete your profile.
                    </p>
                  </div>
                  <div className="border border-slate-200 p-5">
                    <h4 className="font-semibold text-slate-900 mb-2">Listing Information</h4>
                    <p className="text-sm text-slate-600">
                      For agents: property details, photos, videos, location, pricing, and contact information for listings.
                    </p>
                  </div>
                  <div className="border border-slate-200 p-5">
                    <h4 className="font-semibold text-slate-900 mb-2">Communication Data</h4>
                    <p className="text-sm text-slate-600">
                      Messages, inquiries, and feedback you send through our platform or customer support channels.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  1.2 Automatically Collected Information
                </h3>
                <p className="text-slate-600 mb-3">
                  When you access our Service, we automatically collect:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    Device information (IP address, browser type, operating system)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    Usage data (pages visited, search queries, time spent on platform)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    Location data (with your permission, to show nearby properties)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    Cookies and similar tracking technologies
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
                <FiUserCheck size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  2. How We Use Your Information
                </h2>
              </div>
            </div>
            
            <div className="ml-14">
              <p className="text-slate-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="h-6 w-6 bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 font-semibold">1</span>
                  <span>Provide, maintain, and improve our accommodation listing and search services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-6 w-6 bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 font-semibold">2</span>
                  <span>Create and manage your account, verify identity, and prevent fraudulent activity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-6 w-6 bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 font-semibold">3</span>
                  <span>Facilitate communication between students and property agents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-6 w-6 bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 font-semibold">4</span>
                  <span>Process and display property listings with accurate information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-6 w-6 bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 font-semibold">5</span>
                  <span>Provide personalized recommendations based on your search preferences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-6 w-6 bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 font-semibold">6</span>
                  <span>Send important updates, notifications, and administrative messages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-6 w-6 bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 font-semibold">7</span>
                  <span>Analyze usage patterns to improve user experience and platform functionality</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Data Security */}
          <section>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-100 text-blue-700">
                  <FiLock size={20} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-900 mb-3">
                    3. Data Security
                  </h2>
                  <p className="text-blue-800 leading-relaxed mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                  </p>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      Industry-standard encryption for data transmission and storage
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      Secure authentication protocols and password protection
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      Regular security audits and vulnerability assessments
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      Limited access to personal data by authorized personnel only
                    </li>
                  </ul>
                  <p className="text-blue-800 leading-relaxed mt-4">
                    <strong>We will never sell your personal data to third-party advertisers.</strong> Your information is used solely to provide and improve our service.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Information Sharing */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
                <FiShield size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  4. Information Sharing and Disclosure
                </h2>
              </div>
            </div>
            
            <div className="ml-14 space-y-4">
              <p className="text-slate-600">
                We may share your information in the following circumstances:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 bg-green-600 mt-2 shrink-0"></span>
                  <div>
                    <p className="font-semibold text-slate-900">With Other Users</p>
                    <p className="text-slate-600 text-sm">When you express interest in a property or post a listing, certain information (name, contact details) will be visible to facilitate communication.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 bg-green-600 mt-2 shrink-0"></span>
                  <div>
                    <p className="font-semibold text-slate-900">Service Providers</p>
                    <p className="text-slate-600 text-sm">With third-party service providers who perform services on our behalf (hosting, analytics, customer support).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 bg-green-600 mt-2 shrink-0"></span>
                  <div>
                    <p className="font-semibold text-slate-900">Legal Requirements</p>
                    <p className="text-slate-600 text-sm">When required by law or in response to valid requests by public authorities.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Your Rights and Choices
            </h2>
            <p className="text-slate-600 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <strong className="text-slate-900">Access:</strong> Request a copy of the personal information we hold about you
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <strong className="text-slate-900">Correction:</strong> Update or correct inaccurate information in your profile
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <strong className="text-slate-900">Deletion:</strong> Request deletion of your personal information and account
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <strong className="text-slate-900">Opt-out:</strong> Unsubscribe from marketing communications at any time
                </div>
              </li>
            </ul>
          </section>

          {/* 6. Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Data Retention
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it. Inactive accounts may be deleted after a period of inactivity.
            </p>
          </section>

          {/* 7. Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Cookies and Tracking Technologies
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and remember your preferences. You can control cookies through your browser settings, though disabling cookies may limit some features of our Service.
            </p>
          </section>

          {/* 8. Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="pt-12 border-t border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
                <FiGlobe size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Contact Us
                </h2>
              </div>
            </div>
            <p className="text-slate-600 mb-6">
              If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="border border-slate-200 p-6">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                  General Inquiries
                </p>
                <p className="text-slate-900 font-semibold">
                  support@campuscrib.com
                </p>
              </div>
              <div className="border border-slate-200 p-6">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                  Data Protection Officer
                </p>
                <p className="text-slate-900 font-semibold">
                  privacy@campuscrib.com
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
          &copy; {new Date().getFullYear()} CampusCrib. Your privacy and data security are our priority.
        </p>
      </div>
    </div>
  );
}