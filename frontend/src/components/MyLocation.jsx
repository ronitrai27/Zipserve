import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { assets } from "../assets/assets";

const MyLocationMap = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  // Custom animated marker using divIcon
  const customIcon = new L.divIcon({
    className: "custom-marker", // Use a custom class for styling
    html: `
      <div class="relative animate-pulse transition-all duration-1000">
        <img src="${assets.sideUserLogo}" alt="Location" class="w-10 h-10 bg-blue-400 rounded-full border-2 border-blue-500 shadow-md" />
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert(
            "Unable to fetch your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {currentPosition ? (
        <MapContainer
          center={currentPosition}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={currentPosition} icon={customIcon}>
            <Popup>You are here!</Popup>
          </Marker>
          <RecenterMap currentPosition={currentPosition} />
        </MapContainer>
      ) : (
        <p className="text-center text-neutral-600 animate-pulse transition-all duration-300">
          Loading...
        </p>
      )}
    </div>
  );
};

// Custom hook to recenter the map when the location changes
const RecenterMap = ({ currentPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (currentPosition) {
      map.setView(currentPosition, 15); // Recenter to the current position with a zoom level of 16
    }
  }, [currentPosition, map]);

  return null;
};

export default MyLocationMap;
