
'use client';

import HorizontalCard from "./HorizontalCard";
import image from '@/public/images/test.webp'
import { FiMapPin } from 'react-icons/fi';
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const cardData = [
  { id: 1, mainLocation: "South Gate", location: "Ibikunle Street", price: "₦120,000", distance: "5 mins" },
  { id: 2, mainLocation: "South Gate", location: "Aule Road", price: "₦150,000", distance: "7 mins" },
  { id: 3, mainLocation: "South Gate", location: "Orita Area", price: "₦100,000", distance: "4 mins" },
  { id: 4, mainLocation: "North Gate", location: "Road Block", price: "₦140,000", distance: "8 mins" },
  { id: 5, mainLocation: "North Gate", location: "FUTA North Road", price: "₦110,000", distance: "6 mins" },
  { id: 6, mainLocation: "North Gate", location: "Obanla Extension", price: "₦125,000", distance: "7 mins" },
  { id: 7, mainLocation: "West Gate", location: "Poly Road", price: "₦155,000", distance: "9 mins" },
  { id: 8, mainLocation: "West Gate", location: "Ondo Road", price: "₦105,000", distance: "6 mins" },
  { id: 9, mainLocation: "West Gate", location: "Oke-Ijebu Layout", price: "₦135,000", distance: "7 mins" },
];



const Card = () => {

  // Get all unique main locations
const locations = Array.from(new Set(cardData.map(h => h.mainLocation)));

  return (
    <>
    {locations.map((mainLocation) => {
      // Filter cards for this location
      const houses = cardData.filter(h => h.mainLocation === mainLocation);
  
      return (
        <section key={mainLocation} className="mb-8">
          <Link href={`/locations/${mainLocation.toLowerCase().replace(" ", "-")}`} className="font-bold flex items-center text-lg md:text-xl lg:text-2xl mb-4">
            Available Houses at {mainLocation}
            <FiArrowRight className="ml-1" size={16} />
          </Link>
  
          <div className="flex gap-4 overflow-x-auto lg:overflow-x-visible w-full pb-2 snap-x snap-mandatory scrollbar-hide">
            {houses.map((house) => (
              <HorizontalCard
                key={house.id}
                id={house.id}
                className="snap-start"
                imageUrl={image}
                imageAlt={`Photo of ${house.location}`}
                location={house.location}
                price={house.price}
                distance={house.distance}
                icon={FiMapPin}
                cta="View Details"
              />
            ))}
          </div>
        </section>
      );
    })}
  </>
  
  );
};

export default Card;
