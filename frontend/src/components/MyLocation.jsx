import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
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
    featureType: "administrative",
    elementType: "geometry",
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
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
//------------------
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e",
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
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70",
      },
    ],
  },
];
const greyStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
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
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
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
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        weight: 2,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#d6d6d6",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#567ac2",
      },
      {
        weight: 1.5,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];
function Maps() {
  const { theme } = useAppContext();
  const { workersLocations } = useContext(LocationContext);
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
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
    // console.log("my position:", currentPosition); holding my current position.
  }, []);

  if (loadError) return <div>Error loading maps</div>;
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
          styles: theme ? lightStyle : mapStyle,
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
                  <p className="text-[15px] font-[400] mb-1 animate-pulse transition-all duration-700">
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
            onClick={() => setSelectedWorker(worker)}
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
                <button className="bg-primary text-white font-medium text-[16px] animate-pulse transition-all duration-1000 px-3 py-2 rounded-full hover:bg-blue-700 hover:animate-none">
                  Book
                </button>
              </div>

              {/* <div className="flex items-center justify-between  ">
                <img
                  src={selectedWorker.image}
                  alt=""
                  className="w-12 h-12 rounded-full border-[1px] border-primary self-start object-cover"
                />
                <div className="flex flex-col items-center justify-between mb-2">
                  <p className="text-[16px] font-medium mb-1 tracking-tight capitalize">
                    {selectedWorker.name}
                  </p>
                  <p className="text-[14px] font-[400] text-primaryLight italic">
                    Category: {selectedWorker.category}
                  </p>
                </div>
              </div>
              <motion.p
                onClick={() => navigate(`/booking/${selectedWorker.id}`)}
                className="capitalize flex justify-end text-[16px]  bg-primary px-3 py-1 text-white w-fit ml-auto rounded-full hover:bg-blue-900 cursor-pointer"
              >
                Book
              </motion.p> */}
            </motion.div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Maps;
