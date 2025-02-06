// AIzaSyAKUcB9_htfm4sbJbuHcObjSOKXwhdEwfQ

//-------------------------------------------------------------------

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import sideUserLogo from "../assets/boy.png";
import { WorkersContext } from "../context/WorkerContext";

const mapContainerStyle = {
  width: "100%",
  height: "645px",
};

const center = {
  lat: 0, // Default center
  lng: 0,
};

function Maps() {
  const { workersLocations } = useContext(WorkersContext);
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAKUcB9_htfm4sbJbuHcObjSOKXwhdEwfQ",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
        },
        () => {
          console.error("Error fetching geolocation");
        }
      );
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return null;

  return (
    <div className="flex justify-center items-center">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={currentPosition || center}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: false,
        }}
      >
        {currentPosition && (
          <>
            <Marker
              position={currentPosition}
              icon={{
                url: sideUserLogo,
                scaledSize: window.google
                  ? new window.google.maps.Size(35, 35)
                  : undefined, // Prevents crash
              }}
              onClick={() => setShowInfo(true)}
            />
            {showInfo && (
              <InfoWindow
                position={{
                  lat: currentPosition.lat + 0.0002, // Adjust this value to move the InfoWindow higher
                  lng: currentPosition.lng,
                }}
                onCloseClick={() => setShowInfo(false)}
              >
                <motion.div
                  className="font-outfit  overflow-hidden px-2"
                  style={{
                    width: "90px",
                    height: "50px",
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <p className="text-[15px] font-[400] mb-2 animate-pulse transition-all duration-700">
                    I am here
                  </p>
                  <motion.p
                    onClick={() => navigate("/my-profile")}
                    className="capitalize text-[14px] font-light text-blue-500 cursor-pointer hover:text-gray-800 hover:scale-105 transition-all"
                  >
                    Profile
                  </motion.p>
                </motion.div>
              </InfoWindow>
            )}
          </>
        )}

        {workersLocations.map((worker) => (
          <Marker
            key={worker.id}
            position={{ lat: worker.lat, lng: worker.lng }}
            title={worker.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default Maps;
