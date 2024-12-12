import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient()
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async() => {
      showToast({ message: "Logout successfull!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken")

    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handlClick =()=>{
    mutation.mutate();
  }
  return (
    <button onClick={handlClick} className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white">
      Sign Out
    </button>
  );
};

export default SignOutButton;
