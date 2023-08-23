import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import PropertyType from "src/interfaces/Property";

const MyMap = ({ data }: any) => {
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);

  useEffect(() => {
    if (data?.data) {
      const newMarkers = data.data.map((property: PropertyType) => ({
        lat: property.lat,
        lng: property.lon,
      }));
      setMarkers(newMarkers);
    }
  }, [data]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 53.4808, lng: -2.2426 }), []);

  const myComponentStyle = {
    height: "100%",
    width: "100%",
  };

  return (
    <div className="wrapper h-96">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={myComponentStyle}
          center={markers[0]}
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
