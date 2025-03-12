import { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const lightStyle = [
  {
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.highway",
    stylers: [{ color: "#6e97d8" }],
  },
];

const GoogleMapComponent = ({ userLocation, workerLocation }) => {
  // Load Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    // AIzaSyAKUcB9_htfm4sbJbuHcObjSOKXwhdEwfQ,
  });

  // Memoize locations to prevent unnecessary re-renders
  const memoizedUserLocation = useMemo(
    () => ({ lat: userLocation.lat, lng: userLocation.lng }),
    [userLocation]
  );

  const memoizedWorkerLocation = useMemo(
    () => ({ lat: workerLocation.lat, lng: workerLocation.lng }),
    [workerLocation]
  );

  // Use useState for the map center so users can move the map
  const [mapCenter, setMapCenter] = useState(memoizedWorkerLocation);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      center={mapCenter} // This allows users to move the map without resetting
      zoom={14}
      mapContainerStyle={{ width: "100%", height: "280px" }}
      options={{
        disableDefaultUI: true,
        styles: lightStyle,
      }}
    >
      <DirectionsComponent
        userLocation={memoizedUserLocation}
        workerLocation={memoizedWorkerLocation}
        setMapCenter={setMapCenter} // Pass center setter to adjust map view dynamically
      />
    </GoogleMap>
  );
};

const DirectionsComponent = ({
  userLocation,
  workerLocation,
  setMapCenter,
}) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    if (!userLocation || !workerLocation) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: workerLocation,
        destination: userLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);

          // Adjust center to show the full route
          const newCenter = {
            lat: (workerLocation.lat + userLocation.lat) / 2,
            lng: (workerLocation.lng + userLocation.lng) / 2,
          };
          setMapCenter(newCenter); // Adjust map to center route
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }, [userLocation, workerLocation, setMapCenter]); // Only run when locations change

  return directionsResponse ? (
    <DirectionsRenderer directions={directionsResponse} />
  ) : null;
};

export default GoogleMapComponent;
