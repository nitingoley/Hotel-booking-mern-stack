import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Headers = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Holidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to={"/"}
                className="flex items-center  text-white px-3 font-bold hover:bg-blue-600"
              >
                My-Hotels
              </Link>{" "}
              <Link
                to={"/my-booking"}
                className="flex items-center  text-white px-3 font-bold hover:bg-blue-600"
              >
                My-booking
              </Link>{" "}
              <SignOutButton />
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center text-blue-600 bg-gray-200 px-3 font-bold hover:bg-gray-100"
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
