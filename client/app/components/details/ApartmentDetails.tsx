'use client';
import { StaticImageData } from "next/image";
import { FiMapPin, FiUser } from "react-icons/fi";
import Image from "next/image";
import Avatar from "../Avatar";
import BackButton from "../BackButton";

interface ApartmentDetailProps {
  id: number;
  imageUrl: string | StaticImageData;
  imageWidth: number;
  mainLocation: string;
  location: string;
  price: string;
  distance: string;
  agentName: string;
  description: string;
}

const ApartmentDetail = ({
  id,
  imageUrl,
  mainLocation,
  imageWidth,
  location,
  price,
  distance,
  agentName,
  description,
}: ApartmentDetailProps) => {
  return (
    <>  
    <BackButton />
      <div className="max-w-4xl mx-auto p-4 md:p-8 pb-28">
      {/* IMAGE */}
      
      <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-6 relative">
        <Image
          src={imageUrl}
          alt={location}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover w-full h-full"
        />
      </div>

      {/* LOCATION */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{location}</h1>
      <p className="text-gray-600 text-sm md:text-base mb-4 flex items-center gap-2">
        <FiMapPin /> {mainLocation} • {distance} from gate
      </p>

      <hr className="border-gray-200 my-4" />

      {/* AGENT INFO */}
      <div className="flex items-center gap-3 mb-6">
        <Avatar />
        <p className="text-sm md:text-base font-medium flex items-center gap-1">
          <FiUser /> {agentName}
        </p>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* DESCRIPTION */}
      <div className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
        {description}
      </div>

      {/* STICKY PRICE FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between items-center p-4 md:p-6 shadow-md">
        <span className="text-lg md:text-xl font-bold">{price}</span>
        <button className="bg-green-500 text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base font-medium hover:opacity-50 transition">
          Contact Agent
        </button>
      </div>
    </div>
    </>

  );
};

export default ApartmentDetail;
