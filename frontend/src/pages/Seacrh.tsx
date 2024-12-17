import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import React, { useState } from "react";
import SearchResult from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FaciltiesFilter from "../components/FaciltiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelsTypes, setSelectedHotelsTypes] = useState<string[]>([]);
  const [selectedFacilitiesType, setSelectedFacilitiesType] = useState<
    string[]
  >([]);

  const [selectedMaxPrice, setSelectedMaxPrice] = useState<
    number | undefined
  >();

  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelsTypes,
    facilities: selectedFacilitiesType,
    maxPrice: selectedMaxPrice?.toString(),
    sortOption,
  };

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHOtelTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelTypes = event.target.value;

    setSelectedHotelsTypes((prevHotelType) =>
      event.target.checked
        ? [...prevHotelType, hotelTypes]
        : prevHotelType.filter((hotels) => hotels !== hotelTypes)
    );
  };

  const handleFacilitiesType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facilitiesType = event.target.value;

    setSelectedFacilitiesType((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facilitiesType]
        : prevFacilities.filter((facility) => facility !== facilitiesType)
    );
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font=semibold border-b border-slate-300 pb-5">
            Filter By:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />

          <HotelTypesFilter
            selectedHotelsTypes={selectedHotelsTypes}
            onChange={handleHOtelTypes}
          />

          <FaciltiesFilter
            selectedFacilites={selectedFacilitiesType}
            onChange={handleFacilitiesType}
          />
          <PriceFilter
            selectedPrice={selectedMaxPrice}
            onChange={(value?: number) => setSelectedMaxPrice(value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* todo sort option
           */}

          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price per night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price per night (high to low)
            </option>
          </select>
        </div>

        {hotelData?.data.map((hotel: any) => (
          <SearchResult hotel={hotel} />
        ))}

        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
