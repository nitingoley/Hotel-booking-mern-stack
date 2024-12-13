import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotel";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Guset</h1>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-500">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Adults
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Write your  country ...."
            {...register("adultCount", { required: "This field is required" })}
            type="number"
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Children
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Write your  country ...."
            min={0}
            {...register("childCount", { required: "This field is required" })}
            type="number"
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};
export default GuestSection;
