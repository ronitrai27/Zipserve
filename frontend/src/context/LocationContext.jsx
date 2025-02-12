import React, { createContext, useContext, useEffect, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [workersLocations, setWorkersLocations] = useState([]);
  const [userAddress, setUserAddress] = useState("Fetching Address...");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);
  console.log("User Location in frontend--->", userLocation);
  // Reverse Geocoding to get address
  useEffect(() => {
    if (!userLocation) return;

    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.latitude}&lon=${userLocation.longitude}`
        );
        const data = await response.json();

        if (data.display_name) {
          const addressParts = data.display_name.split(", ");
          const shortAddress = addressParts.slice(0, 3).join(", "); // Example: "Street, City, State"
          setUserAddress(shortAddress);
        } else {
          setUserAddress("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setUserAddress("Unable to fetch address");
      }
    };

    fetchAddress();
  }, [userLocation]); // Fetch address whenever userLocation updates
  return (
    <LocationContext.Provider
      value={{
        userLocation,
        workersLocations,
        setWorkersLocations,
        userAddress,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
export const useLocationContext = () => useContext(LocationContext);
