import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Bookingform from "../forms/BookingForm/Booking-form";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelsById",
    () => apiClient.fetchHotelsById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const [numberOfNight, setNumberOfNight] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNight(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  // Debugging logs
  useEffect(() => {
    console.log("Hotel data:", hotel);
    console.log("Current user:", currentUser);
    console.log("Search context:", search);
  }, [hotel, currentUser, search]);

  if (!hotel) {
    return <></>
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNight={numberOfNight}
        hotel={hotel}
      />
      {currentUser && <Bookingform currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
