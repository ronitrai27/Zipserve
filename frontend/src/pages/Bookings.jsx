import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useBooked } from "../context/BookedContext";
import { LocationContext } from "../context/LocationContext";
import BookedDirection from "../components/BookedDirection";
import {
  LuChevronDown,
  LuClock3,
  LuCalendarClock,
  LuCalendarCheck,
  LuCalendarDays,
  LuChevronUp,
} from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import UserBookings from "../components/BookingsCards";
const Bookings = () => {
  const navigate = useNavigate();
  const { user, workers: contextWorkers } = useAppContext();
  const { userBookDetails, bookingCounts } = useBooked(); //contains all bookings of user
  const [bookWorkers, setBookWorkers] = useState([]); //details of workers who are selected
  const { userLocation, userAddress } = useContext(LocationContext);
  const [currentTime, setCurrentTime] = useState(""); // to show current time
  const [showDiv, setShowDiv] = useState(false);
  //----------------------------------------------------------------------
  //----------------------------------------------------Current Time
  //----------------------------------------------------------------------
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        // weekday: "long",
        // year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setCurrentTime(now.toLocaleString("en-US", options));
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  //---------------------------------------------------------------------
  //----------------------FILTERING WORKERS ID FROM CONTEXT
  //---------------------------------------------------------------------
  useEffect(() => {
    if (userBookDetails) {
      const bookedWorkers = contextWorkers.filter((worker) =>
        userBookDetails.some((booking) => booking.workerId === worker._id)
      );
      setBookWorkers(bookedWorkers);
    }
  }, [userBookDetails, contextWorkers]);

  //--------------------------------------------------------------
  //------------------------DEBUGGING LOGS
  //--------------------------------------------------------------

  // console.log("userBookDetails from Bookings.jsx", userBookDetails); // all user bookings
  // console.log("contextWorkers from Bookings.jsx", contextWorkers); // all workers from backend
  // console.log("booking counts->", bookingCounts);
  return (
    <div className=" flex-1 border-[1px] bg-stone-50 h-[90vh] rounded-t-xl overflow-hidden ">
      {/* WHOLE MAP AREA */}
      <div className="w-full h-full relative">
        {bookWorkers.length > 0 && (
          <BookedDirection
            userLocation={{
              lat: Number(userLocation.latitude),
              lng: Number(userLocation.longitude),
            }}
            workerLocation={{
              lat: Number(bookWorkers[0].location.coordinates[1]), // Latitude
              lng: Number(bookWorkers[0].location.coordinates[0]), // Longitude
            }}
          />
        )}
        {/* div-container */}
        <div className="absolute pointer-events-none inset-0 right-4 flex justify-end items-center">
          <div className="h-[calc(100vh-8rem)] max-w-[40%] w-[37%] bg-gray-50 z-[999] rounded-xl  shadow-lg hover:shadow-xl transition-all duration-300 px-1 py-2 pointer-events-auto">
            {/* top texts */}
            <div className="font-inter flex items-center justify-between px-2 pt-2 mb-2">
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-3 text-black text-[18px] font-medium">
                  Active Bookings{" "}
                </p>
                <div
                  onClick={() => setShowDiv(!showDiv)}
                  className="bg-primary w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  {showDiv ? (
                    <LuChevronDown className="text-white text-xl" />
                  ) : (
                    <LuChevronUp className="text-white text-xl" />
                  )}
                </div>
              </div>
              <p className="current-time text-[15px] font-light flex items-center gap-2">
                {" "}
                <LuClock3 className="text-primary text-lg" />
                {currentTime}
              </p>
            </div>
            {/* booking counts */}
            {showDiv && (
              <div className="">
                {bookingCounts && (
                  <div className="flex items-center justify-between px-2 mt-4 mb-3">
                    <div className="pending flex items-center gap-2">
                      <LuCalendarClock className="text-black/80 text-xl" />
                      <p className="text-white text-[14px] font-[400] bg-yellow-500 px-2 py-1 rounded-full tracking-tight">
                        Pending:{" "}
                        <span className="text-white font-medium">
                          {bookingCounts.pending}
                        </span>
                      </p>
                    </div>
                    <div className="confirmed flex items-center gap-2">
                      <LuCalendarCheck className="text-black/80 text-xl" />
                      <p className="text-white text-[14px] font-[400] bg-green-500 px-2 py-1 rounded-full tracking-tight">
                        Confirmed:{" "}
                        <span className="text-white font-medium">
                          {bookingCounts.confirmed}
                        </span>
                      </p>
                    </div>
                    <div className="in-progress flex items-center gap-2">
                      <LuCalendarDays className="text-black/80 text-xl" />
                      <p className="text-white text-[14px] font-[400] bg-blue-500 px-2 py-1 rounded-full tracking-tight">
                        In-Progress:{" "}
                        <span className="text-white font-medium">
                          {bookingCounts.inProgress}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* search  by id */}
            <div className="px-3  mx-auto mt-4 mb-3">
              <div className="w-full flex items-center justify-between bg-white px-2 py-2 rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Enter Booking ID..."
                  className="w-full bg-inherit"
                />
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center scale-125">
                  <IoSearchOutline className="text-white text-lg" />
                </div>
              </div>
            </div>
            {/* filters */}
            <div className="filters mt-3 flex items-center justify-between px-10 text-gray-600 text-[14px] tracking-tight font-inter">
              <div className="date">
                <p className="bg-white p-[6px] border-[1px] border-primary rounded-lg flex items-center gap-1">
                  Date-Range <VscSettings className="text-[18px]" />
                </p>
              </div>
              <div className="payment">
                <p className="bg-white p-[6px] border-[1px] border-primary rounded-lg flex items-center gap-1">
                  Payment <VscSettings className="text-[18px]" />
                </p>
              </div>
              <div className="status">
                <p className="bg-white p-[6px] border-[1px] border-primary rounded-lg flex items-center gap-1">
                  Status <VscSettings className="text-[18px]" />
                </p>
              </div>
            </div>
            <hr className="w-full border-b-[.6px] border-primary/30 mt-4 mb-2" />

            {/* bookings */}
            <div className="bookings overflow-y-auto h-[calc(100vh-22rem)] scroll-smooth ">
              <UserBookings />
            </div>
            <hr className="w-full border-b-[.6px] border-primary/30 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
