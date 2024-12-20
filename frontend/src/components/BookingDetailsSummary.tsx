import { HotelType } from "../types/type";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNight: number;
  hotel: HotelType[];
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNight,
  hotel,
}: Props) => {
  const hotelData = hotel[0];
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      
      {/* Location */}
      <div className="border-b pb-4">
        <span className="font-semibold">Location: </span>
        <span>{`${hotelData?.name}, ${hotelData?.city}, ${hotelData?.country}`}</span>
      </div>

      {/* Dates and Stay Info */}
      <div className="grid gap-4">
        <div className="flex justify-between">
          <div>
            <span className="block font-semibold">Check-In</span>
            <div className="font-bold">{checkIn.toDateString()}</div>
          </div>
          <div>
            <span className="block font-semibold">Check-Out</span>
            <div className="font-bold">{checkOut.toDateString()}</div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <span className="font-semibold">Total Length of Stay:</span>
          <div className="font-bold">{numberOfNight} nights</div>
        </div>

        <div className="border-t pt-4">
          <span className="font-semibold">Guests:</span>
          <div className="font-bold">
            {adultCount} {adultCount === 1 ? "adult" : "adults"} & {childCount}{" "}
            {childCount === 1 ? "child" : "children"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
