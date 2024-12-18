import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Bookingform from "../forms/BookingForm/Booking-form";

const Booking = () => {
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <div className="">Booking Details Summary</div>
      {currentUser && <Bookingform currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
