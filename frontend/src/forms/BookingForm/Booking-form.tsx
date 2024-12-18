import { useForm } from "react-hook-form";
import { UserType } from "../../types/type";

type Props = {
  currentUser: UserType;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const Bookingform = ({ currentUser }: Props) => {
  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        
    }
  });


  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-600 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            disabled
            readOnly
            {...register("firstName")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>

        <label className="text-gray-600 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            disabled
            readOnly
            {...register("lastName")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
        <label className="text-gray-600 text-sm font-bold flex-1">
       Email
          <input
            type="email"
            disabled
            readOnly
            {...register("email")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
      </div>
    </form>
  );
};

export default Bookingform;
