"use client";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import Link from "next/link";

interface wrapperProps {
  id: string;
  name: string;
  level?: string;
  status: string;
  gender: string;
}

const Wrapper = ({ id, name, level, status, gender }: wrapperProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm mb-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar />
          <div className="flex flex-col gap-0.5">
            <h1 className="text-base font-bold text-gray-900 leading-tight">{name}</h1>
            <p className="text-[12px] font-bold text-green-600 uppercase">{status}</p>
            <div className="text-xs text-gray-500 font-medium">{gender} • {level} Level</div>
          </div>
        </div>
        <Link href={`/roomatesearch/${id}`} className="shrink-0">
          <Button label="Details" outline={false} />
        </Link>
      </div>
    </div>
  );
};
export default Wrapper;