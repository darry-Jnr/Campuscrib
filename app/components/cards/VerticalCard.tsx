'use client';
import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons";

interface VerticalCardProps {
  imageUrl: string | StaticImageData;
  imageAlt: string;
  className?: string;
  location: string;
  price: number | string;
  distance: number | string;
  icon: IconType;
  cta: string;
}

const VerticalCard = ({
  imageUrl,
  imageAlt,
  className,
  location,
  price,
  distance,
  icon: Icon,
  cta
}: VerticalCardProps) => {
  return (
    <div className={`flex flex-col gap-2 w-[180px] shrink-0 ${className}`}>
      
      {/* IMAGE */}
      <div className="w-full h-[130px] rounded-xl overflow-hidden relative">
        <Image 
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>

      {/* TEXT SECTION */}
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-sm md:text-base lg:text-lg">
          {location}
        </h1>

        <p className="flex items-center text-xs text-gray-600">
          <Icon size={14} className="mr-1" />
          {distance}
        </p>

        <p className="font-semibold text-sm">{price}</p>
        <span className="hover:underline text-sm md:text-base lg:text-lg xl:text-xl">
          {cta}
        </span>

      </div>
    </div>
  );
};

export default VerticalCard;
