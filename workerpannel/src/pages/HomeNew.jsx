import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  LuCalendarFold,
  LuClock,
  LuAxis3D,
  LuChartColumnBig,
  LuCircleFadingPlus,
  LuSwatchBook,
  LuTrendingUp,
  LuCalendarClock,
  LuCalendarCheck,
  LuChevronDown,
  LuCheck,
  LuCalendarCheck2,
  LuCalendarRange,
  LuBadgeAlert,
  LuCalendarMinus2,
  LuCalendarSearch,
} from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { SlGhost } from "react-icons/sl";
import PieActiveArc from "../components/PieChart";
import GoogleMapComponent from "../components/GoogleRouting";
const HomeNew = () => {
  const { loggedWorker, users, confirmedBookings, inProgressBookings } =
    useAppContext();
  const [currentDate, setCurrentDate] = useState("");
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalPendingBookings: 0,
    totalConfirmedBookings: 0,
  });
  const [typeOfTask, setTypeOfTask] = useState("reviews");
  const [reviews, setReviews] = useState([]);
  const [bookings, setBookings] = useState([]);
  //---------------------------------------------------------
  //--------------EARNING , BOOKINGS
  //---------------------------------------------------------
  useEffect(() => {
    if (!loggedWorker?._id) return;

    const fetchWorkerStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/workers/stats/${loggedWorker._id}`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching worker stats:", error);
      }
    };

    fetchWorkerStats();

    const intervalId = setInterval(fetchWorkerStats, 6000);

    return () => clearInterval(intervalId);
  }, [loggedWorker]);
  //------------------------------------------------------
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = now
        .toLocaleDateString("en-GB") // "DD/MM/YYYY" format
        .replace(/\//g, " / "); // Add spaces around "/"
      setCurrentDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);
  //----------------------------------------------------
  //------------------REVIEWS
  //------------------------------------------------------
  useEffect(() => {
    if (!loggedWorker?._id) return;

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/workers/worker-reviews/${loggedWorker._id}`
        );
        setReviews(res.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [loggedWorker]);
  //----------------------------------------------------------
  //  ----------------------- Displays pending bookings.
  //----------------------------------------------------------
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // if (!loggedWorker._id) return;
        const response = await axios.get(
          `http://localhost:8080/api/workers/pending/${loggedWorker?._id}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    // Fetch bookings initially
    fetchBookings();

    // Set an interval to fetch bookings every 3 seconds
    const intervalId = setInterval(fetchBookings, 3000);

    // Cleanup interval when the component is unmounted or workerId changes
    return () => clearInterval(intervalId);
  }, [loggedWorker?._id]);
  //---------------------------------------------------------------
  //---------------HANDLE ACTION
  //--------------------------------------------------------------
  const handleAction = async (bookingId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/workers/update-status/${bookingId}`,
        { status }
      );
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };
  //--------------------------------------------------------------
  //  ----------------------- Updates booking status in the database.
  //--------------------------------------------------------------
  const handleSetInProgress = async (bookingId, workerId) => {
    try {
      if (!bookingId || !workerId) {
        toast.error("Invalid request. Please try again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/workers/set-in-progress",
        {
          bookingId,
          workerId,
        }
      );

      if (response.data.success) {
        toast.success("Booking is now In-Progress!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error updating booking:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  //--------------------------------------------------------------
  //----------------------------------GEO-LOCATION
  //--------------------------------------------------------------
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);
  //------------------------------------------------------
  //-------------------OTP SENT
  //------------------------------------------------------
  const [otp, setOtp] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null); // Store bookingId
  const handleCompleteBooking = async (bookingId, workerId) => {
    setIsLoading(true);
    setSelectedBookingId(bookingId);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/complete/send-otp",
        {
          bookingId,
          workerId,
        }
      );

      if (response.data.success) {
        toast.success("OTP sent to the user's email");
        setShowPopup(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //---------------------------------------------------------------
  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.warn("Please enter the OTP! ⚠️");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/complete/verify-otp",
        {
          bookingId: selectedBookingId,
          workerId: loggedWorker?._id,
          enteredOtp: otp,
        }
      );

      if (response.data.success) {
        toast.success("Booking marked as completed! ✅");
        setShowPopup(false);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error verifying OTP");
    }
  };

  //---------------------------------------
  //---------------DEBUGGING LOGS
  //----------------------------------------
  // console.log("REVIEWS ----->", reviews);
  //------------------------------------------
  return (
    <div className=" w-full h-full relative">
      {/* top text */}
      <div className="flex items-center justify-between font-inter px-12 pt-3">
        <div className="flex flex-col gap-1">
          <p className="text-black text-[22px] font-medium tracking-tight capitalize">
            welcome back,{" "}
            <span className="text-primary">{loggedWorker?.name}</span>
          </p>
          <p className=" capitalize text-gray-500 font-light italic flex items-center gap-2 ml-5">
            <LuCalendarFold className="text-xl" /> manage all your tasks at
            single place
          </p>
        </div>
        <div className="bg-white/60 backdrop-blur-md shadow-md border border-gray-200 px-4 py-2 rounded-lg text-gray-700 text-sm font-medium">
          <p className=" capitalize text-gray-500 text-[14px] mb-1">
            current time:
          </p>
          <p className="flex items-center gap-2">
            {" "}
            <LuClock className="text-xl text-primary" />
            {currentDate}
          </p>
        </div>
      </div>
      {/* top boxes------------> */}
      <div className="boxes font-inter flex items-center mt-5 justify-center gap-5 mr-10">
        <div className="box-1 relative flex bg-white border-[.8px] border-primary rounded-md shadow-md min-w-[270px] pl-4 py-3 hover:shadow-lg hover:border-[1px] hover:scale-105 transition-all duration-500">
          <div className="flex flex-col shrink-0">
            <p className="text-[16px] font-medium text-gray-800 tracking-tight flex items-center gap-2 capitalize mb-2">
              <LuChartColumnBig className="text-2xl text-primary" /> my revenue
              :
            </p>
            <p className="text-[26px] font-medium text-gray-500 mb-2">
              ₹{stats.totalEarnings.toFixed(2)}
            </p>
            <div className="bg-primary text-white flex items-center gap-2 px-1 py-1 rounded-full w-fit ml-auto">
              <LuCircleFadingPlus className="text-lg" />
              <p className="text-[12px]">13.5%</p>
              <LuTrendingUp className="text-lg" />
            </div>
          </div>
          <div className=" absolute -right-14 -top-7">
            <PieActiveArc totalEarnings={stats.totalEarnings} />
          </div>
          <LuAxis3D className="absolute top-0 right-0 text-2xl text-primary" />
        </div>
        <div className="box-2 relative flex flex-col bg-white border-l-4 border-primary rounded-md shadow-md min-w-[220px] pl-4 py-3 hover:shadow-lg hover:border-[1px] hover:scale-105 transition-all duration-500">
          <div className=" flex items-center gap-2 ">
            <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <LuCalendarClock className="text-primary text-2xl" />
            </div>
            <p className="text-[16px] font-medium text-gray-800 tracking-tight capitalize">
              Pending tasks :
            </p>
          </div>
          <p className="text-[26px] text-gray-500 font-extrabold self-end mr-20">
            {stats.totalPendingBookings}
          </p>
          <div className="bg-primary text-white flex items-center gap-2 px-2 py-1 rounded-lg w-fit justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-50 animate-pulse transition-all duration-1000"></div>
            <p className="text-[12px] tracking-tight">Pending</p>
          </div>
        </div>
        <div className="box-3 relative flex flex-col bg-white border-l-4 border-primary rounded-md shadow-md min-w-[220px] pl-4 py-3 hover:shadow-lg hover:border-[1px] hover:scale-105 transition-all duration-500">
          <div className=" flex items-center gap-2 ">
            <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <LuCalendarCheck className="text-primary text-2xl" />
            </div>
            <p className="text-[16px] font-medium text-gray-800 tracking-tight capitalize">
              confirmed tasks :
            </p>
          </div>
          <p className="text-[26px] text-gray-500 font-extrabold self-end mr-20">
            {stats.totalConfirmedBookings}
          </p>
          <div className="bg-primary text-white flex items-center gap-2 px-2 py-1 rounded-lg w-fit justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-50 animate-pulse transition-all duration-1000"></div>
            <p className="text-[12px] tracking-tight">confirmed</p>
          </div>
        </div>
        <div className="box-4 relative flex flex-col bg-white border-l-4 border-primary rounded-md shadow-md min-w-[220px] pl-4 py-3 hover:shadow-lg hover:border-[1px] hover:scale-105 transition-all duration-500">
          <div className=" flex items-center gap-2 ">
            <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <LuSwatchBook className="text-primary text-2xl" />
            </div>
            <p className="text-[16px] font-medium text-gray-800 tracking-tight capitalize">
              available leaves
            </p>
          </div>
          <p className="text-[26px] text-gray-500 font-extrabold self-end mr-20">
            2
          </p>
          <div className="bg-primary text-white flex items-center gap-2 px-2 py-1 rounded-lg w-fit justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-50 animate-pulse transition-all duration-1000"></div>
            <p className="text-[12px] tracking-tight">available</p>
          </div>
        </div>
      </div>
      {/* AREA TO SHOW MAP+IN-PROGRESS ,  REVIEWS,PENDING,CONFIRMED*/}
      <div className="PARENT px-8 mt-6 text-gray-800 flex justify-between gap-10">
        {/* LEFT SIDE */}
        <div className="left-side font-inter w-1/2 bg-white rounded-md h-[28rem] overflow-y-auto scroll-smooth">
          <div className="flex items-center gap-2 ml-10 pt-3">
            <p className=" capitalize text-[16px] font-medium tracking-tight">
              my tasks
            </p>
            <div className="bg-gray-100 w-6 h-6 rounded-lg flex items-center justify-center">
              <LuChevronDown className="text-xl text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-5 justify-center">
            <div
              onClick={() => setTypeOfTask("reviews")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`w-3 h-3 rounded-full animate-pulse transition-all duration-700 ${
                  typeOfTask === "reviews" ? "bg-primary" : "bg-gray-200"
                } `}
              ></div>
              <p
                className={`capitalize text-[14px] font-medium ${
                  typeOfTask === "reviews"
                    ? " text-primary/80"
                    : "text-gray-500"
                }`}
              >
                reviews
              </p>
            </div>
            <div
              onClick={() => setTypeOfTask("pending")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`w-3 h-3 rounded-full animate-pulse transition-all duration-700 ${
                  typeOfTask === "pending" ? "bg-yellow-500" : "bg-gray-200"
                }`}
              ></div>
              <p
                className={`capitalize text-[14px] font-medium ${
                  typeOfTask === "pending"
                    ? " text-primary/80"
                    : "text-gray-500"
                }`}
              >
                pending
              </p>
            </div>
            <div
              onClick={() => setTypeOfTask("confirmed")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`w-3 h-3 rounded-full animate-pulse transition-all duration-700 ${
                  typeOfTask === "confirmed" ? "bg-green-500" : "bg-gray-200"
                } `}
              ></div>
              <p
                className={`capitalize text-[14px] font-medium ${
                  typeOfTask === "confirmed"
                    ? " text-primary/80"
                    : "text-gray-500"
                }`}
              >
                confirmed
              </p>
            </div>
          </div>
          <hr className="mt-2 mb-4 " />
          {/* REVIEWS,PENDING,CONFIRMED */}
          <div className="">
            {typeOfTask === "reviews" ? (
              <div className="REVIEWS">
                {reviews.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 text-[18px] text-gray-400 justify-center mt-5">
                    <SlGhost className="text-[3rem]" />
                    <p>No reviews available</p>
                  </div>
                ) : (
                  reviews.map((review) => {
                    const userDetails =
                      users.find((u) => u._id === review.userId) || {};

                    return (
                      <div
                        key={review._id}
                        className="bg-gray-50 mb-4 border-l-4 border-primary"
                      >
                        <div className="flex items-center justify-between px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={userDetails.userImage}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex flex-col ">
                              <p className="font-medium text-[14px] capitalize">
                                {userDetails.name || "Unknown User"}
                              </p>
                              <p className="text-gray-500 italic text-[12px]">
                                {userDetails.email || "No email available"}
                              </p>
                            </div>
                          </div>
                          <Rating
                            name="half-rating-read"
                            size="small"
                            defaultValue={review.stars}
                            precision={0.1}
                            readOnly
                          />
                        </div>

                        <p className="tracking-tighter font-light  text-center px-8">
                          {review.comment}
                        </p>
                        <p className="text-sm text-gray-400 pl-2">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            ) : typeOfTask === "pending" ? (
              <div className="PENDING">
                <div className="flex items-center gap-3 mb-5 justify-center">
                  <p className="text-[16px] font-[400] font-inter tracking-tight capitalize text-gray-600">
                    pending bookings
                  </p>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce transition-all duration-1000"></div>
                </div>
                {bookings.length === 0 ? (
                  <div className="">
                    <p className="text-gray-500 font-medium font-inter tracking-tight text-[18px] flex items-center gap-2 justify-center capitalize h-full mt-6">
                      <LuCalendarSearch className="text-2xl" /> No pending
                      bookings.
                    </p>
                  </div>
                ) : (
                  bookings.map((booking) => {
                    const user = users.find(
                      (user) => user._id === booking.userId
                    );

                    return (
                      <div
                        key={booking._id}
                        className="bg-gray-50 shadow-sm border-b-[.8px] border-primary/20  py-2 px-6 mx-5 rounded-md mb-3"
                      >
                        {/* User Details */}

                        <div className="flex items-center justify-between  font-inter ">
                          <div className="flex items-center gap-4 ">
                            <img
                              src={user?.userImage}
                              alt="User"
                              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                            />

                            <p className="font-medium text-gray-800 text-[15px] tracking-tight capitalize">
                              {user ? user.name : "Unknown User"}
                            </p>

                            <p className="text-gray-800 tracking-tight text-[15px] font-medium">
                              <span className="">Price: </span>
                              {booking.totalPrice}
                            </p>
                            <p className="text-[15px] font-medium text-primary tracking-tight uppercase">
                              {booking.paymentMethod}
                            </p>
                          </div>

                          {/* Accept/Reject Buttons */}
                          <div className="ml-6 flex gap-4">
                            <button
                              onClick={() =>
                                handleAction(booking._id, "confirmed")
                              }
                              className="bg-primary text-white p-2 rounded-full hover:bg-blue-700 transition"
                            >
                              <LuCheck />
                            </button>
                            <button
                              onClick={() =>
                                handleAction(booking._id, "cancelled")
                              }
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                            >
                              <MdClose />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="CONFIRMED">
                <div className="flex items-center gap-3 mb-5 justify-center">
                  <p className="text-[16px] font-[400] font-inter tracking-tight capitalize text-gray-600">
                    confirmed bookings
                  </p>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce transition-all duration-1000"></div>
                </div>
                {confirmedBookings.length > 0 ? (
                  confirmedBookings.map((booking) => {
                    const user = users.find((u) => u._id === booking.userId);

                    return (
                      <div
                        key={booking._id}
                        className="bg-gray-50 px-4 py-3 mb-3 rounded-md shadow-sm flex flex-col border-b-[.8px] border-primary/40"
                      >
                        <div className="flex justify-between px-2 items-center">
                          <div className="flex items-center gap-3">
                            <img
                              src={user?.userImage}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex flex-col ">
                              <p className="font-medium text-[14px] capitalize">
                                {user.name || "Unknown User"}
                              </p>
                              <p className="text-gray-500 italic text-[12px]">
                                {user.email || "No email available"}
                              </p>
                            </div>
                          </div>
                          <p className="flex items-center gap-2 text-primary text-[14px] tracking-tight ">
                            <LuCalendarCheck className="text-md text-primary" />{" "}
                            {booking._id}
                          </p>
                        </div>
                        <div className="flex items-center justify-center ">
                          <div
                            className="group relative cursor-pointer w-24 border bg-white rounded-full overflow-hidden text-gray-800 text-[14px] font-medium hover:shadow-lg transition-shadow duration-300"
                            onClick={() =>
                              handleSetInProgress(
                                booking?._id,
                                loggedWorker?._id
                              )
                            }
                          >
                            <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-2 py-1">
                              Start
                            </span>
                            <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                              <span>Ready ?</span>
                              <LuCalendarCheck2 className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                            <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#3b75ef] scale-[1] dark:group-hover:bg-[#3b75ef] group-hover:bg-[#3b75ef] group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-gray-600 flex items-center gap-2">
                      <LuCalendarMinus2 /> No confirmed bookings available.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/*  MAP+IN-PROGRESS*/}
        <div className="max-w-[40%] min-w-[40%] bg-white font-inter rounded-md h-[28rem] overflow-y-auto scroll-smooth">
          <p className="flex items-center justify-center gap-2 text-[18px] font-inter font-medium text-gray-800 py-3">
            <LuCalendarRange className="text-xl text-primary" /> Active Booking
          </p>
          {inProgressBookings.length > 0 ? (
            inProgressBookings.map((booking) => (
              <div key={booking._id} className="font-inter text-gray-800 px-4">
                <h2 className="text-[14px] text-gray-500 font-[400] flex items-center gap-2 mb-2">
                  <LuCalendarCheck className="text-lg" /> ID: {booking._id}
                </h2>
                {/* Google Map Component */}
                {userLocation?.latitude &&
                userLocation?.longitude &&
                loggedWorker?.location?.coordinates?.[0] !== undefined &&
                loggedWorker?.location?.coordinates?.[1] !== undefined ? (
                  <GoogleMapComponent
                    userLocation={{
                      lat: Number(userLocation.latitude),
                      lng: Number(userLocation.longitude),
                    }}
                    workerLocation={{
                      lat: Number(loggedWorker.location.coordinates[1]),
                      lng: Number(loggedWorker.location.coordinates[0]),
                    }}
                  />
                ) : (
                  <div className="bg-gray-100 py-6 px-3 rounded-md ">
                    <p className="text-black text-[18px] font-outfit font-medium tracking-tighter">
                      Loading map...
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between px-5 mt-5">
                  <div className="flex items-center gap-2">
                    <LuCalendarClock className="text-primary text-lg" />
                    <p className="text-[16px] tracking-tight ">
                      {booking.date.date}, {booking.date.month},
                      {booking.date.year}
                    </p>
                  </div>
                  <p className="bg-primary/80 rounded-full text-white text-[14px] px-3 py-1">
                    {booking.time}
                  </p>
                </div>

                <div className="flex items-center justify-between px-5 mt-2">
                  <p className="tracking-tight text-[16px] text-gray-800 font-[400] capitalize">
                    Pay mode:{" "}
                    <span className=" uppercase">{booking.paymentMethod}</span>
                  </p>
                  <p
                    className={`capitalize text-[14px] rounded-full px-2 py-1 ${
                      booking.paymentMethod === "cash"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-green-500 text-white"
                    } `}
                  >
                    {booking.paymentMethod === "cash" ? "Pending" : "Paid"}
                  </p>
                </div>
                <div className="flex items-center gap-5 mt-1 font-inter px-5">
                  <p className="text-[16px] font-[400] shrink-0 capitalize">
                    Selected services:
                  </p>
                  <div className="overflow-x-auto whitespace-nowrap">
                    <p className="text-primary text-[14px] font-light">
                      {" "}
                      {booking.subservices.map((s) => s.name).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 mt-2">
                  <p className="text-primary tracking-tight">
                    Price : <span>₹{booking.totalPrice}</span>
                  </p>
                  <p className="tracking-tight text-gray-500">
                    Surge Charge : <span>₹{booking.surgeCharge}</span>
                  </p>
                </div>
                {/* BUTTONS--------------> */}
                <div className="flex items-center justify-between mt-5 px-10 mb-5">
                  <div className="flex items-center justify-center ">
                    <div className="group relative cursor-pointer w-36 border bg-white rounded-full overflow-hidden text-gray-800 text-[14px] font-[300] hover:shadow-lg transition-shadow duration-300">
                      <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-2 py-2">
                        Surge charge
                      </span>
                      <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                        <span>Surge charge</span>
                        <LuCircleFadingPlus className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                      <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#3b75ef] scale-[1] dark:group-hover:bg-[#3b75ef] group-hover:bg-[#3b75ef] group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
                    </div>
                  </div>
                  {/* Completed */}
                  <div className="flex items-center justify-center ">
                    <div
                      onClick={() =>
                        handleCompleteBooking(booking._id, loggedWorker?._id)
                      }
                      className="group relative cursor-pointer w-36 border bg-white rounded-full overflow-hidden text-gray-800 text-[15px] font-[500] hover:shadow-lg transition-shadow duration-300"
                    >
                      <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-2 py-2">
                        Complete
                      </span>
                      <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                        <span>Completed ?</span>
                        <LuCalendarCheck2 className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                      <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-green-500 scale-[1] dark:group-hover:bg-green-500 group-hover:bg-green-500 group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No in-progress bookings available.</p>
          )}
        </div>
      </div>
      {/*----------------------------- OTP Popup------------------------ */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65 font-inter">
          <div className="bg-white px-4 py-3 rounded-lg shadow-lg">
            <h2 className="text-[16px] font-medium mb-3 tracking-tight capitalize flex items-center gap-2">
              <LuBadgeAlert className="text-primary text-lg" />
              Enter OTP
            </h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded-md w-full mb-3"
              placeholder="Enter 4-digit OTP"
            />
            <button
              onClick={handleVerifyOTP}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 text-[14px]"
            >
              Verify OTP
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="ml-3 text-red-500 text-[14px]"
            >
              Cancel
            </button>
            {/* {message && <p className="mt-2 text-sm text-gray-700">{message}</p>} */}
          </div>
        </div>
      )}

      {/* Full-screen Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 mx-auto animate-spin"></div>
            <p className="mt-2 text-gray-700">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeNew;
