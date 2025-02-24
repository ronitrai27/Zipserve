import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LocationIcon from "../assets/worker-location.png";
import styled from "styled-components";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";

import sideUserLogo from "../assets/boy.png";
import { LocationContext } from "../context/LocationContext";
import { useAppContext } from "../context/AppContext";

const mapContainerStyle = {
  width: "100%",
  height: "645px",
};

const center = {
  lat: 0,
  lng: 0,
};

//Json style
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

function Maps() {
  const { theme } = useAppContext();
  const { workersLocations } = useContext(LocationContext); // all those workers shown on map
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState(null); // user position
  const [selectedWorker, setSelectedWorker] = useState(null); // for info window
  const [showInfo, setShowInfo] = useState(false);

  console.log("worker location from mylocation->", workersLocations); // debugging log ----
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
    // console.log("my position:", currentPosition); holding my current position.
  }, []);

  if (loadError)
    return (
      <div className="w-full h-full bg-red-500 text-white">
        Error loading maps
      </div>
    );
  if (!isLoaded)
    return (
      <div className="bg-primaryLight w-full h-full animate-pulse transition-all duration-300"></div>
    );

  return (
    <div className="flex justify-center items-center">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={currentPosition || center}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: lightStyle,
          // styles: theme ? lightStyle : mapStyle,
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
                  : undefined,
              }}
              onClick={() => setShowInfo(true)}
            />
            {/* {currentPosition && (
              <Circle
                center={currentPosition}
                radius={2500} // 5 km
                options={{
                  strokeColor: "#3b82f6", // Outer border color (Blue)
                  strokeOpacity: 0.5, // Border visibility
                  strokeWeight: 2, // Border thickness
                  fillColor: "#3b82f6", // Fill color
                  fillOpacity: 0.2, // Make it slightly transparent for a gradient effect
                }}
              />
            )} */}
            {showInfo && (
              <InfoWindow
                position={{
                  lat: currentPosition.lat + 0.0002,
                  lng: currentPosition.lng,
                }}
                onCloseClick={() => setShowInfo(false)}
              >
                <motion.div
                  className="font-outfit  overflow-hidden px-2"
                  style={{
                    width: "90px",
                    height: "48px",
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="text-[14px] font-[400] animate-pulse transition-all duration-700 underline-offset-4 underline decoration-primary text-primary font-inter uppercase tracking-tight"
                  >
                    I am here
                  </p>
                </motion.div>
              </InfoWindow>
            )}
          </>
        )}
        {/* ----------WORKER LOCATIONS ------------- */}
        {workersLocations.map((worker) => (
          <Marker
            key={worker.id}
            position={{ lat: worker.lat, lng: worker.lng }}
            title={worker.name}
            onClick={() => setSelectedWorker(worker)}
            icon={{
              url: LocationIcon, // Use imported image
              scaledSize: new window.google.maps.Size(45, 45), // Adjust size if needed
            }}
          />
        ))}

        {selectedWorker && (
          <InfoWindow
            position={{
              lat: selectedWorker.lat + 0.0002,
              lng: selectedWorker.lng,
            }}
            onCloseClick={() => setSelectedWorker(null)}
          >
            <motion.div
              className="font-inter  overflow-hidden px-1 bg-gray-50 rounded-lg"
              style={{
                width: "240px",
                height: "130px",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-6 ">
                <img
                  src={selectedWorker.image}
                  alt=""
                  className="w-12 h-12 rounded-full border-[1px] border-primary self-start object-cover"
                />{" "}
                <p className="text-[16px] font-medium mb-1 tracking-tight capitalize">
                  {selectedWorker.name}
                </p>
              </div>
              <hr className="border-b-[.3px] border-gray-300 w-[70%] mx-auto my-2" />
              <p className="text-[14px] font-[400] text-gray-800 text-center">
                Category: {selectedWorker.category}
              </p>
              <div className="flex items-center justify-evenly mt-2">
                <p className="text-[14px] font-[400] text-gray-800 ">
                  Price: {selectedWorker.price}
                </p>
                <button
                  onClick={() => navigate(`/booking/${selectedWorker.id}`)}
                  className="bg-primary text-white font-medium text-[16px]  px-3 py-2 rounded-full hover:bg-blue-700 hover:animate-none"
                >
                  Book
                </button>
              </div>
            </motion.div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Maps;
