'use client';

const Page = () => {
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
    
<form className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-sm border">
  <h2 className="text-2xl font-bold">List a New Apartment</h2>
  
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <label className="text-sm font-medium">Main Location</label>
      <select className="w-full p-3 rounded-xl border bg-gray-50">
        <option>South Gate</option>
        <option>North Gate</option>
        <option>West Gate</option>
      </select>
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium">Street Name</label>
      <input type="text" placeholder="e.g. Ibikunle St" className="w-full p-3 rounded-xl border bg-gray-50" />
    </div>
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium">Price (₦ per year)</label>
    <input type="number" placeholder="120000" className="w-full p-3 rounded-xl border bg-gray-50" />
  </div>

  <div className="p-8 border-2 border-dashed border-green-200 rounded-3xl text-center hover:bg-green-50 transition cursor-pointer">
     <p className="text-green-600 font-medium">Click to upload house photos & video</p>
     <p className="text-xs text-gray-400">Up to 5 photos and 1 short video clip</p>
  </div>

  <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-100">
    Post Apartment
  </button>
</form>
     
    </div>
  );
};

export default Page;
