import { ChangeEvent } from "react";
import { hotelFacilities } from "../config/hotel-option-type";

type Props = {
  selectedFacilites: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FaciltiesFilter = ({ selectedFacilites, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h3 className="font-semibold text-md mb-2">Facilities :</h3>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedFacilites.includes(facility)}
            onChange={onChange}
            value={facility}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FaciltiesFilter;
