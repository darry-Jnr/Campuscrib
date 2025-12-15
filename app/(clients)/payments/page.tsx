import ProtectedLayout from "@/app/components/ProtectedLayout";

export default function page() {
    return (
      <ProtectedLayout>
           <div className="max-w-3xl mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold mb-4">Payment</h1>
        <p className="text-gray-600">This is the payment page</p>
      </div>
      </ProtectedLayout>
   
    );
  }
  