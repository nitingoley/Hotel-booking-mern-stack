import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LastestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const {data:hotels} = useQuery("fetchQuery", apiClient.fetchMyHotels);

  const topRowHotels = hotels?.slice(0,2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Lastest Destinations</h2>
      <p>Most recent destination added by our hotels</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel)=>(
            <LastestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3   gap-4">
          {bottomRowHotels.map((hotel)=>(
            <LastestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Home;