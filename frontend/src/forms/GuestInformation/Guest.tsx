import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoData = {
  checkOut: Date;
  checkIn: Date;
  childCount: number;
  adultCount: number;
};

const Guest = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GuestInfoData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();

  const onSignInClick = (data: GuestInfoData)=>{
    search.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount,
    );
    navigate("/sign-in" , {state: {from : location}})
  }



  const onSubmit = (data: GuestInfoData)=>{
    search.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount,
    );
    navigate(`/hotel/${hotelId}/booking`)
  }
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form 
       onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}
      className="rounded-sm">
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
              placeholderText="Check in date"
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              minDate={minDate}
              maxDate={maxDate}
              startDate={checkIn}
              endDate={checkOut}
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
              placeholderText="Check out date"
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              minDate={minDate}
              maxDate={maxDate}
              startDate={checkIn}
              endDate={checkOut}
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-600 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}

            <label className="items-center flex">
              Children:
              <input
                type="number"
                className="w-full focus:outline-none font-bold"
                min={0}
                max={20}
                {...register("childCount", {
                  required: "This field is required",

                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.childCount && (
              <span className="text-red-600 font-semibold text-sm">
                {errors.childCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Guest;
