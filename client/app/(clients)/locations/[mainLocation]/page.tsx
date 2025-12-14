'use client';

import VerticalCard from "@/app/components/cards/VerticalCard";
import Container from "@/app/components/Container";
import image from "@/public/images/test.webp";
import { useParams } from "next/navigation";
import { FiMapPin } from "react-icons/fi";

// Same data (could come from DB in real app)
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

const LocationPage = () => {
  const params = useParams();

  // Ensure the param is always a string
  const rawParam = params?.mainLocation;
  const mainLocationParam = Array.isArray(rawParam) ? rawParam[0] : rawParam ?? "";

  // Format from "south-gate" → "South Gate"
  const mainLocation = mainLocationParam
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  // Filter houses by location
  const houses = cardData.filter(h => h.mainLocation === mainLocation);

  return (
    <Container>
      <div className="pt-28">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-6">
          Available at {mainLocation}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {houses.map(house => (
            <VerticalCard
              key={house.id}
              imageUrl={image}
              imageAlt={house.location}
              location={house.location}
              price={house.price}
              distance={house.distance}
              icon={FiMapPin}
              cta="View Details"
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LocationPage;
