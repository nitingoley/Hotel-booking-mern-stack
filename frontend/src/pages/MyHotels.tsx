import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h2 className="text-3xl font-bold mb-3">My Hotels</h2>
        <Link
          to={"/add-hotel"}
          className="flex bg-blue-500 text-white text-xl font-bold p-2 hover:bg-blue-600"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid gird-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <div className="flex flex-col justify-between border border-gray-300 rounded-lg p-8 ">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-gray-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city} , {hotel.country}
              </div>

              <div className="border border-gray-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>

              <div className="border border-gray-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />
                {hotel.pricePerNight} per night
              </div>
              <div className="border border-gray-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.pricePerNight} per night
              </div>
              <div className="border border-gray-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />
                {hotel.adultCount} adults , {hotel.childCount} children
              </div>
              <div className="border border-gray-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                className="flex bg-blue-500 text-white text-xl font-bold p-2 hover:bg-blue-600"
                to={`/edit-hotels/${hotel._id}`}
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
