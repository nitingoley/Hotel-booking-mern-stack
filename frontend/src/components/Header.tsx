import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Headers = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-4">
      {/* The container automatically applies the padding defined in the Tailwind config */}
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <span className="text-xl md:text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Holidays.com</Link>
        </span>

        {/* Navigation Links */}
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to={"/my-hotels"}
                className="flex items-center text-white px-3 py-2 font-bold hover:bg-blue-600 rounded"
              >
                My-Hotels
              </Link>
              <Link
                to={"/my-booking"}
                className="flex items-center text-white px-3 py-2 font-bold hover:bg-blue-600 rounded"
              >
                My-booking
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center text-blue-600 bg-gray-200 px-3 py-2 font-bold hover:bg-gray-100 rounded"
            >
              Signup
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Headers;
