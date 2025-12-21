"use client";

import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";

interface wrapperProps {
  name: string;
  level?: string;
  status: string;
  gender: string;
  price?: string;
}

const Wrapper = ({ name, level, status, price, gender }: wrapperProps) => {
  return (
    <div className="rounded-xl border  border-gray-100 bg-white p-5 shadow-sm mb-2">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Avatar & Info */}
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <Avatar />
          </div>
          
          <div className="flex flex-col gap-0.5">
            <h1 className="text-lg font-bold text-gray-800 leading-tight">
              {name}
            </h1>
            <p className="text-sm font-medium text-green-600">
              {status}
            </p>
            <p className="text-sm font-medium text-green-600">
              {gender}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{level} Level</span>
              {price && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="font-semibold text-gray-700">₦{price}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div className="w-24">
          <Button 
            label="Connect" 
            onClick={() => {}} 
            outline={false}
             // Assumes your Button component takes a 'small' prop
          />
        </div>
      </div>
    </div>
  );
};

export default Wrapper;