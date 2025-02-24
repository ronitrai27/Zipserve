import { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const lightStyle = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    stylers: [
      {
        color: "#6e97d8",
      },
    ],
  },
];

const GoogleMapComponent = ({ userLocation, workerLocation }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);

  // Use the useLoadScript hook to load the Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAKUcB9_htfm4sbJbuHcObjSOKXwhdEwfQ",
    // AIzaSyAKUcB9_htfm4sbJbuHcObjSOKXwhdEwfQ
  });

  useEffect(() => {
    if (!isLoaded || !workerLocation || !userLocation) return;

    const getDirections = () => {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: workerLocation.lat, lng: workerLocation.lng },
          destination: { lat: userLocation.lat, lng: userLocation.lng },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    };

    getDirections();
  }, [isLoaded, userLocation, workerLocation]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      center={workerLocation}
      zoom={14}
      mapContainerStyle={{ width: "100%", height: "260px" }}
      options={{
        disableDefaultUI: true,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: lightStyle,
      }}
    >
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
