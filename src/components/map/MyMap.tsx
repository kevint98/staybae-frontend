import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { AxiosResponse } from "axios";
import { useMemo, useState, useEffect } from "react";
import { useSearchResults } from "src/hooks/useSearchResults";
import PropertyType from "src/interfaces/Property";

const MyMap = ({ data }: any) => {
  //   const { data } = useSearchResults(startDate, endDate, searchLocation, region);
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);

  //   console.log(markers);

  useEffect(() => {
    if (data?.data) {
      const newMarkers = data.data.map((property: PropertyType) => ({
        lat: property.lat,
        lng: property.lon,
      }));
      setMarkers(newMarkers);
    }
  }, [data]);

  console.log(data);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 53.4808, lng: -2.2426 }), []);

  const myComponentStyle = {
    height: "100%",
    width: "100%",
  };

  console.log(markers);

  return (
    <div className="wrapper h-96">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={myComponentStyle}
          center={center}
          zoom={8}
        >
          {markers.map((marker, idx: number) => (
            <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default MyMap;
