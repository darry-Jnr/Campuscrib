'use client';

import ApartmentDetail from "@/app/components/details/ApartmentDetails";
import image from "@/public/images/test.webp";
import { useParams } from "next/navigation";

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


const ApartmentPage = () => {
  const { id } = useParams();  
  const house = cardData.find(h => h.id === Number(id));

  if (!house) return <p>House not found.</p>;

  return (
    <div className="max-w-3xl mx-auto pt-28">
      <ApartmentDetail
        id={house.id}
        imageUrl={image}
        imageWidth={500}
        mainLocation={house.mainLocation}
        location={house.location}
        price={house.price}
        distance={house.distance}
        agentName="Darry"
        description="igiorgorgore"
      />
    </div>
  );
};

export default ApartmentPage;
