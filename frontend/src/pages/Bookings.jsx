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
import { RxCross2 } from "react-icons/rx";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserBookings from "../components/BookingsCards";
import { BiGhost } from "react-icons/bi";
import { CheckCircle2 } from "lucide-react";
const Bookings = () => {
  const navigate = useNavigate();
  const { user, workers: contextWorkers } = useAppContext();
  const {
    userBookDetails,
    bookingCounts,
    fetchBookingById,
    resetSearch,
    selectedStatus,
    handleFilters,
    resetFilter,
    // clickedBookDetails,
    clickedBookingId,
  } = useBooked(); //contains all bookings of user
  const [bookWorkers, setBookWorkers] = useState([]); //details of workers who are selected
  const { userLocation, userAddress } = useContext(LocationContext);
  const [currentTime, setCurrentTime] = useState(""); // to show current time
  const [showDiv, setShowDiv] = useState(false);
  const [searchId, setSearchId] = useState(""); //search by booking id
  const [showStatus, setShowStatus] = useState(false);

  //----------------------------------------------------------------------
  const clickedBookDetails = userBookDetails.find(
    (booking) => booking._id === clickedBookingId
  );

  const statuses = [
    {
      name: "pending",
      icon: LuCalendarClock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-500",
    },
    {
      name: "confirmed",
      icon: LuCalendarCheck,
      color: "text-green-500",
      bgColor: "bg-green-100",
      borderColor: "border-green-500",
    },
    {
      name: "in-progress",
      icon: CheckCircle2,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-500",
    },
  ];

  const currentIndex = clickedBookDetails
    ? statuses.findIndex(
        (s) => s.name.toLowerCase() === clickedBookDetails.status.toLowerCase()
      )
    : 0;

  //----------------------------------------------------------------------
  //----------------------------------------------------Current Time
  //----------------------------------------------------------------------
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
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
  //-------------------------HANDLE CROSS
  //--------------------------------------------------------------
  const handleCross = () => {
    setSearchId("");
    resetSearch();
  };

  //--------------------------------------------------------------
  //------------------------DEBUGGING LOGS
  //--------------------------------------------------------------

  // console.log("userBookDetails from Bookings.jsx", userBookDetails); // all user bookings
  // console.log("contextWorkers from Bookings.jsx", contextWorkers); // all workers from backend
  // console.log("booking counts->", bookingCounts);
  // console.log("selected status->", selectedStatus);
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
        {/* --------------ALL BOOKINGS CONTAINER ---------------------- */}
        <div className="absolute pointer-events-none inset-0 right-4 flex justify-end items-center">
          <div className=" h-[calc(100vh-8rem)] max-w-[40%] w-[37%] bg-gray-50  rounded-xl  shadow-lg hover:shadow-xl transition-all duration-300 px-1 py-2 pointer-events-auto">
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
            {/* -------search  by id--------- */}
            <div className="px-3  mx-auto mt-4 mb-3">
              <div className="w-full flex items-center justify-between gap-3 bg-white px-2 py-2 rounded-full overflow-hidden">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Booking ID..."
                  className="w-full bg-inherit focus:outline-none font-inter text-[14px]"
                />
                <div
                  onClick={() => fetchBookingById(searchId)}
                  className="w-6 h-6 bg-primary rounded-full flex items-center justify-center scale-125 cursor-pointer hover:shadow-xl transition-all duration-200 shrink-0"
                >
                  <IoSearchOutline className="text-white text-lg" />
                </div>
                {/* cross */}
                {searchId.length > 10 && (
                  <div
                    onClick={handleCross}
                    className=" cursor-pointer hover:scale-110 transition-all duration-200"
                  >
                    <RxCross2 className="text-black text-lg" />
                  </div>
                )}
              </div>
            </div>
            {/* -----------filters------------- */}
            <div className="filters  mt-3 flex items-center justify-between px-8 text-gray-600 text-[14px] tracking-tight font-inter">
              <div className="date">
                <p className="bg-white p-[6px] border-[1px] border-primary rounded-lg flex items-center gap-1">
                  Date-Range <VscSettings className="text-[18px]" />
                </p>
              </div>
              <div className="payment cursor-pointer ">
                <p className="bg-white p-[6px] border-[1px] border-primary rounded-lg flex items-center gap-1">
                  Payment <VscSettings className="text-[18px]" />
                </p>
              </div>
              <div
                onClick={() => setShowStatus(!showStatus)}
                className="status cursor-pointer"
              >
                <p
                  className={` p-[6px] border-[1px] border-primary rounded-lg flex items-center gap-1 transition-all duration-200 ${
                    selectedStatus
                      ? "bg-primary text-white"
                      : "text-gray-800 bg-white "
                  }`}
                >
                  Status <VscSettings className="text-[18px]" />
                </p>
              </div>
              {selectedStatus && (
                <div onClick={resetFilter} className="reset-filters">
                  <RxCross2 className="text-[17px] cursor-pointer hover:scale-110 transition-all duration-200" />
                </div>
              )}
            </div>

            <hr className="w-full border-b-[.6px] border-primary/30 mt-4 mb-2" />

            {/* bookings */}
            <div className="bookings overflow-y-auto h-[calc(100vh-22rem)] scroll-smooth ">
              <UserBookings />
            </div>
            <hr className="w-full border-b-[.6px] border-primary/30 mt-2" />
          </div>
          {/* SHOW BY STATUS----------------------- */}
          {showStatus && (
            <div className="absolute top-[11rem] right-12 bg-white shadow-2xl rounded-lg px-3 py-2 pointer-events-auto">
              <p className="capitalize text-primary tracking-tight font-inter flex items-center gap-2 text-[14px] mb-2">
                Select by status{" "}
                <GoTriangleDown className="text-primary text-lg" />
              </p>

              <div className="flex flex-col gap-1">
                {["pending", "confirmed", "in-progress"].map((status) => (
                  <p
                    key={status}
                    className={`capitalize text-[15px] font-[400] px-2 py-1 rounded-md cursor-pointer transition-all ${
                      selectedStatus === status
                        ? "bg-primary text-white"
                        : "text-gray-800 hover:bg-primary hover:text-white"
                    }`}
                    onClick={() => {
                      setShowStatus(false);
                      handleFilters(status);
                    }}
                  >
                    {status}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* ------------- */}
        </div>
        {/*-----------------SELECTED-BOOKING-INFO----------------------- */}
        <div className=" absolute pointer-events-none inset-0 left-5 bottom-2 flex justify-start items-end">
          <div className="h-[17rem] max-w-[46%] w-[35%] bg-gray-50  rounded-xl  shadow-lg hover:shadow-xl opacity-80 hover:opacity-100 transition-all duration-300 px-1 py-2 pointer-events-auto">
            {clickedBookDetails && userBookDetails.length > 0 ? (
              <div className="px-3 py-2 h-full">
                <p className="flex items-center gap-2 text-[15px] font-[400] tracking-tight select-text text-gray-600 mb-5">
                  <LuCalendarCheck className="text-primary text-xl" /> ID:{" "}
                  {clickedBookDetails._id}{" "}
                </p>
                {/* ----------timeline-- */}
                <div className="relative ">
                  <div className="flex items-center justify-between">
                    {statuses.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = index <= currentIndex;
                      const isCurrentStep = index === currentIndex;

                      return (
                        <div
                          key={step.name}
                          className="flex flex-col items-center relative z-10 font-inter capitalize"
                        >
                          <div
                            className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  border-2 transition-all duration-300
                  ${isActive ? step.borderColor : "border-gray-400"}
                  ${isActive ? step.bgColor : "bg-gray-100"}
                  ${isCurrentStep ? "scale-125" : ""}
                `}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                isActive ? step.color : "text-gray-400"
                              }`}
                            />
                          </div>
                          <p
                            className={`text-xs mt-2 font-medium ${
                              isActive ? "text-gray-900" : "text-gray-400"
                            }`}
                          >
                            {step.name}
                          </p>
                        </div>
                      );
                    })}

                    <div className="absolute top-5 left-0 right-0 h-0.5 z-0">
                      <div className="absolute w-full h-full bg-gray-200"></div>
                      <div
                        className="absolute h-full transition-all duration-300 bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500"
                        style={{
                          width:
                            currentIndex === 0
                              ? "0%"
                              : currentIndex === 1
                              ? "50%"
                              : "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* ----------------------- */}
                <div className="flex items-center gap-5 mt-3 font-inter">
                  <p className="text-[16px] font-[400] shrink-0 capitalize">
                    Selected services:
                  </p>
                  <div className="overflow-x-auto whitespace-nowrap">
                    <p className="text-primary text-[14px] font-light">
                      {" "}
                      {clickedBookDetails.subservices
                        .map((s) => s.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
                {/* ------------------------- */}
                <div className="">
                  <p className="flex items-center gap-2 text-[16px] font-[400] text-gray-800 mt-2">
                    <LuCalendarClock className="text-primary text-xl" /> Time
                    Slot:{" "}
                    <span className=" uppercase font-medium text-gray-600">
                      {clickedBookDetails.time}
                    </span>
                  </p>
                </div>
                {/* -------------------------- */}
                <div className="flex items-center justify-between px-2 mt-5">
                  <p className="text-[16px] font-[400] text-gray-800">
                    Total Price:{" "}
                    <span className="text-gray-600 font-medium">
                      ₹{clickedBookDetails.totalPrice}
                    </span>
                  </p>
                  <p className="text-[16px] font-[400] text-gray-800">
                    Surge Charges:{" "}
                    <span className="text-gray-600 font-medium">
                      ₹{clickedBookDetails.surgeCharge}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <BiGhost className="text-[6rem] text-primary opacity-50" />
                <p className="flex items-center gap-2 text-[22px] tracking-tight font-medium text-gray-600">
                  <LuCalendarCheck className="text-2xl text-primary" /> Booking
                  Details
                </p>
                <p className="text-[18px] text-gray-600 font-light">
                  Select a booking to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
