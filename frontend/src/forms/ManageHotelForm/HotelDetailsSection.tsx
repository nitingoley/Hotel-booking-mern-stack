import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotel";

const HotelDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold mb-3">Add Hotels</h1>
      <label className="text-gray-700 text-sm font-bold ">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          placeholder="Write your name ...."
          {...register("name", { required: "This field is required" })}
          type="text"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Write your city ...."
            {...register("city", { required: "This field is required" })}
            type="text"
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Write your  country ...."
            {...register("country", { required: "This field is required" })}
            type="text"
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold ">
        Description
        <textarea
          className="border rounded w-full py-1 px-2 font-normal"
          placeholder="Write something here ...."
          {...register("description", { required: "This field is required" })}
          rows={10}
        >
          {" "}
        </textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold  max-w-[50%]">
          Price per night
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Write your  country ...."
            {...register("pricePerNight", { required: "This field is required" })}
            type="number"
          />
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold  max-w-[50%]">
          star rating
           <select {...register("starRating", {
            required: "This field is required"
           })}  className="rounded w-full border text-gray-700">
            <option value="" className="text-sm font-bold">
                Select as rating
            </option>
            {[1,2,3,4,5].map((num)=>(
                <option value={num}>{num}</option>
            ))}
           </select>
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </label>
    </div>
  );
};

export default HotelDetailsSection;
