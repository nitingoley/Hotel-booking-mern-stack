import React from "react";
import { hotelTypes } from "../config/hotel-option-type";
 



 

type Props = {
  selectedHotelsTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelsTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((hotel) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hotel}
            checked={selectedHotelsTypes.includes(hotel)}
            onChange={onChange}
          />
        <span>{hotel}</span>
        </label>
      ))}
    </div>
  );
};


export default HotelTypesFilter;
