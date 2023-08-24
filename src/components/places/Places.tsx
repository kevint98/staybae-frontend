import { Libraries, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const libs: Libraries = ["places"];

const Places = ({ data }: any) => {
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libs,
  });

  useEffect(() => {
    const value = window.localStorage.getItem("pointsOfInterest");
    setPointsOfInterest(JSON.parse(value ? value : "[]"));
  }, []);

  useEffect(() => {
    if (data?.data) {
      if (isLoaded) {
        const location = new google.maps.LatLng(data.data.lat, data.data.lon);
        const request = {
          keyword: "Point of interest",
          location: location,
          radius: 50,
        };

        const div = document.createElement("div");

        const service = new google.maps.places.PlacesService(div);

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            const places: any = results
              ? results.map(
                  (result: google.maps.places.PlaceResult) => result.name
                )
              : [];

            console.log(places);

            setPointsOfInterest(places);
            window.localStorage.setItem(
              "pointsOfInterest",
              JSON.stringify(pointsOfInterest)
            );
          } else {
            console.log(results);
          }
        });
      }
    }
  }, [data]);

  return (
    <div>
      <p className="text-md mb-5 ">Places of Interest:</p>
      {isLoaded && pointsOfInterest.length > 0 ? (
        pointsOfInterest.map((point) => (
          <p key={point} className="text-gray-400">
            {point}
          </p>
        ))
      ) : (
        <p className="text-gray-400">No nearby points of interest</p>
      )}
      {}
    </div>
  );
};

export default Places;
