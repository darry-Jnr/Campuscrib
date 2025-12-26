

import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import Link from "next/link";

interface VerticalCardProps {
  id: number | string;
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
  id,
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
      
      {/* IMAGE / THUMBNAIL */}
      <div className="w-full h-[130px] rounded-xl overflow-hidden relative bg-slate-100">
        <Link href={`/apartment/${id}`}>
          <Image 
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="180px"
            className="object-cover hover:scale-105 transition-transform duration-300"
            // Adding unoptimized={false} ensures Next.js tries to optimize it
            priority={false}
          />
        </Link>
      </div>

      {/* TEXT SECTION */}
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-sm md:text-base truncate">
          {location}
        </h1>

        <p className="flex items-center text-xs text-gray-600">
          <Icon size={14} className="mr-1" />
          {distance}
        </p>

        <p className="font-bold text-sm text-green-700">{price}</p>
        <Link href={`/apartment/${id}`} className="text-xs font-medium text-blue-600 hover:underline">
          {cta}
        </Link>
      </div>
    </div>
  );
};

export default VerticalCard;