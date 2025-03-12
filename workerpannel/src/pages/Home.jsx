import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  LuLogOut,
  LuUserRoundCheck,
  LuUserRoundX,
  LuAward,
  LuArrowUpRight,
  LuCalendarClock,
  LuCalendarCheck2,
  LuCalendarCheck,
  LuCalendarRange,
  LuCircleFadingPlus,
} from "react-icons/lu";
import { BiMessageSquareDetail } from "react-icons/bi";
import WorkerDashboard from "../components/WorkerDashboard";
import WorkerBookings from "../components/WorkerBookings";
import GoogleMapComponent from "../components/GoogleRouting";
function Home() {
  const {
    loggedWorker,
    setLoggedWorker,
    inProgressBookings,
    confirmedBookings,
    users,
  } = useAppContext();
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalPendingBookings: 0,
    totalConfirmedBookings: 0,
  });
  const navigate = useNavigate();
  //--------------------------------------
  //----------------LOGOUT
  //-------------------------------------
  const logoutWorker = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
      setLoggedWorker(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  //---------------------------------------
  //--------------EARNING , BOOKINGS
  //----------------------------------------
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

    // Fetch stats initially
    fetchWorkerStats();

    // Fetch stats every 9 seconds
    const intervalId = setInterval(fetchWorkerStats, 9000);

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, [loggedWorker]);
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
  //----------------------------------------
  //-----------DEBUGGING LOGS
  //-------------------------------------------
  // console.log("logged in worker detail:", loggedWorker);
  // console.log("workerid from HOME------->", workerId);
  // console.log("total earnings:", stats.totalEarnings);
  // console.log("total pending:", stats.totalPendingBookings);
  // console.log("total CONFIRMED:", stats.totalConfirmedBookings);
  // console.log("CONFIRMED BOOKING:-------->", confirmedBookings);
  // console.log("IN-PROGRESS BOOKING:-------->", inProgressBookings);
  //--------------------------------------------------------------------------------------
  return (
    <div className="font-outfit  ">
      {/* men-bar */}
      <div className="menu bg-gradient-to-r from-blue-50 to-primary/10 backdrop-blur-sm shadow-sm flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <img
                src={
                  loggedWorker?.profileImage ||
                  "https://ui-avatars.com/api/?name=Worker&background=0D8ABC&color=fff"
                }
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white shadow-md"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {loggedWorker?.name || "Worker"}
              </p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p className="text-xs text-green-600 font-medium">Available</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/messages")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/80 transition-all duration-300 text-gray-700 hover:text-primary"
          >
            <BiMessageSquareDetail className="text-xl text-primary" />
            <span className="text-sm font-medium">Messages</span>
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/80 transition-all duration-300 text-gray-700 hover:text-primary">
            <LuUserRoundCheck className="text-xl text-primary" />
            <span className="text-sm font-medium">Status</span>
          </button>

          <button
            onClick={logoutWorker}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 hover:text-red-500 border border-gray-100"
          >
            <LuLogOut className="text-lg" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
      {/* MAIN-------------> */}
      <div className="flex justify-between gap-20 mx-10 ">
        {/* LEFT SIDE --------------> */}
        <div className="flex flex-col ">
          {/* BOXES----------- */}
          <div className=" pt-2">
            <div className="flex items-center gap-10 mt-4">
              <div className="relative px-5 py-2 w-[14rem] bg-gradient-to-tl from-purple-400 via-primary/70 to-blue-300 rounded-md">
                <LuAward className="text-3xl text-white -ml-3 mb-5" />
                <h3 className="text-[18px] font-medium font-inter tracking-tight text-white">
                  Total Earnings :
                </h3>
                <p className="text-[24px] font-[600] text-white tracking-wide">
                  ₹{stats.totalEarnings}
                </p>
                <div className="absolute -top-2 -right-3  bg-primary px-3 py-1 rounded-full">
                  <p className="flex items-center gap-2 text-white ">
                    <LuArrowUpRight className="text-white text-lg" /> +13.5%
                  </p>
                </div>
              </div>
              {/* -- */}
              <div className="relative px-5 py-2 w-[14rem] bg-gradient-to-tl from-yellow-300 via-orange-400/80 to-orange-300 rounded-md">
                <LuCalendarClock className="text-3xl text-white -ml-2 mb-5" />
                <h3 className="text-[18px] font-medium font-inter tracking-tight text-white">
                  Pending Bookings :
                </h3>
                <p className="text-[24px] font-[600] text-white tracking-wide">
                  {stats.totalPendingBookings}
                </p>
                <div className="absolute -top-2 -right-3  bg-yellow-500 px-3 py-1 rounded-full shadow-lg">
                  <p className="flex items-center gap-2 text-white ">
                    <LuCalendarClock className="text-white text-lg" /> Pending
                  </p>
                </div>
              </div>
              {/* -- */}
              <div className="relative px-5 py-2 w-[14rem] bg-gradient-to-tl from-blue-400 via-green-500 to-green-300 rounded-md">
                <LuCalendarClock className="text-3xl text-white -ml-2 mb-5" />
                <h3 className="text-[18px] font-medium font-inter tracking-tight text-white">
                  Confirmed Bookings :
                </h3>
                <p className="text-[24px] font-[600] text-white tracking-wide">
                  {stats.totalConfirmedBookings}
                </p>
                <div className="absolute -top-2 -right-3  bg-green-500 px-3 py-1 rounded-full shadow-lg">
                  <p className="flex items-center gap-2 text-white ">
                    <LuCalendarCheck2 className="text-white text-lg" />{" "}
                    Confirmed
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------ */}
          <div className="container">
            <WorkerBookings workerId={loggedWorker?._id} />
          </div>
        </div>
        {/* RIGHT SIDE-------------> */}
        <div className="w-full min-h-[15rem] bg-white mt-6 rounded-lg shadow-md">
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
                <div className="flex items-center justify-between mt-5 px-10">
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
                    <div className="group relative cursor-pointer w-36 border bg-white rounded-full overflow-hidden text-gray-800 text-[15px] font-[500] hover:shadow-lg transition-shadow duration-300">
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
    </div>
  );
}

export default Home;
