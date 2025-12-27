import { FiMessageCircle, FiShield, FiCheck } from "react-icons/fi";

export default function ChatPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 pt-24 pb-16 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiMessageCircle className="text-blue-600 text-3xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Direct Messaging</h1>
        <p className="text-gray-500 mt-2">Connect directly with verified agents</p>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4">
        <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="bg-green-100 p-2 rounded-lg">
            <FiShield className="text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Secure Communication</h3>
            <p className="text-sm text-gray-500">For your safety, we currently connect you directly to agents via WhatsApp. This ensures all chats are encrypted and tied to a real phone number.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FiCheck className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900">How to Chat</h3>
            <p className="text-sm text-blue-800">Go to any apartment listing and click the <strong>"Contact Agent"</strong> button. This will open a pre-filled chat with the agent's WhatsApp.</p>
          </div>
        </div>
      </div>

      {/* Feature Preview for V2 */}
      <div className="mt-12 p-6 border-2 border-dashed border-gray-200 rounded-3xl text-center">
        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Coming in V2</span>
        <h2 className="text-lg font-bold text-gray-400 mt-4">In-App Secure Messaging</h2>
        <p className="text-sm text-gray-400 max-w-xs mx-auto mt-2">
          We are building a custom chat system to keep your negotiations private and safe within CampusCrib.
        </p>
      </div>
    </div>
  );
}