import { FiBell, FiInfo, FiCheckCircle } from "react-icons/fi";

const newsItems = [
  {
    id: 1,
    title: "Welcome to CampusCrib",
    content: "We are officially live at FUTA! Find verified hostels at South Gate and North Gate easily.",
    date: "Dec 26, 2025",
    type: "announcement"
  },
  {
    id: 2,
    title: "Safety Tip: Physical Inspection",
    content: "Always ensure you visit the apartment physically with the agent before making any payments.",
    date: "Dec 25, 2025",
    type: "tip"
  },
];

export default async function NewsPage() {

  return (
    <div className="max-w-3xl mx-auto p-4 pt-24 min-h-screen bg-gray-50">
      <div className="flex items-center gap-2 mb-6">
        <FiBell className="text-blue-600 text-xl" />
        <h1 className="text-2xl font-bold text-gray-800">Campus News</h1>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                item.type === 'tip' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {item.type.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State if no news */}
      {newsItems.length === 0 && (
        <div className="text-center py-20">
          <FiInfo className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500">No news updates yet. Check back later!</p>
        </div>
      )}
    </div>
  );
}