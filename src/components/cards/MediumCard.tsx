import PropertyType from "src/interfaces/Property";
import { HeartIcon as Favourited } from "@heroicons/react/24/solid";
import { HeartIcon as NotFavourited } from "@heroicons/react/24/outline";
import Rating from "../rating/Rating";
import { format } from "date-fns";
import useFavourite from "src/hooks/useFavourite";
import { ReactEventHandler, ReactSVGElement } from "react";

type MediumProperty = {
  property: PropertyType;
};

const MediumCard = ({ property }: MediumProperty) => {
  const formattedStartDate = format(new Date(property.dateFrom), "d");
  const formattedEndDate = format(new Date(property.dateTo), "d MMM");

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const { isFavourite, addFavourite, removeFavourite } = useFavourite();

  const propertyIsSaved = isFavourite(property._id!);

  const toggleSave = (e: React.MouseEvent) => {
    if (propertyIsSaved) {
      removeFavourite(property._id!);
    } else {
      addFavourite(property);
    }

    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-[450px] items-center m-2 mt-5 cursor-pointer bg-gray-100 hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out rounded-b-lg">
      <div className="overflow-hidden rounded-t-lg w-full">
        <img
          src={property.heroImg}
          alt={`${property.city} - ${property.country}`}
          className="relative h-60 w-full object-cover"
        />

        {propertyIsSaved ? (
          <Favourited
            className="text-red-600 h-8 absolute top-4 right-6 cursor-pointer hover:scale-110"
            title="Saved as favourite"
            onClick={toggleSave}
          />
        ) : (
          <NotFavourited
            className="text-red-600 h-8 absolute top-4 right-6 cursor-pointer hover:scale-110"
            title="Not in your favourite list"
            onClick={toggleSave}
          />
        )}
      </div>

      {/* Property Details */}
      <div className="flex flex-col p-6 w-full space-y-2">
        <div className="flex flex-row space-x-3 items-center">
          <span className="text-sm">{property.numBeds} BEDS</span>
          <span>&bull; </span>
          <span className="text-sm">{property.numRooms} ROOMS</span>
          <span>&bull; </span>
          <span className="text-sm">{property.numToilets} TOILETS</span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="font-bold text-md">
            {property.city}, {property.country}
          </span>

          <Rating
            doSingle={true}
            propertyRating={property.rating}
            id={property._id!}
            ratingScore={property.rating}
          />
        </div>
        <span className="text-sm text-gray-500">{property.caption}</span>
        <span className="text-sm">{range}</span>
        <div className="flex flex-row">
          <span className="font-semibold">&pound;{property.totalPrice}</span>
          <span>&nbsp;total</span>
        </div>
      </div>
    </div>
  );
};

export default MediumCard;
