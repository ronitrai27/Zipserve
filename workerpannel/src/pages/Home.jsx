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
} from "react-icons/lu";
import { BiMessageSquareDetail } from "react-icons/bi";
import WorkerDashboard from "../components/WorkerDashboard";
function Home() {
  const {
    loggedWorker,
    setLoggedWorker,
    inProgressBookings,
    confirmedBookings,
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

  return (
    <div className="font-outfit ">
      {/* navbar */}
      <Navbar />
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
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/80 transition-all duration-300 text-gray-700 hover:text-primary">
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
      {/* BOXES----------- */}
      <div className="px-6 py-2">
        <div className="flex items-center gap-10 mt-4">
          <div className="relative px-5 py-3 w-[16rem] bg-gradient-to-tl from-purple-400 via-primary/70 to-blue-300 rounded-md">
            <LuAward className="text-3xl text-white -ml-3 mb-5" />
            <h3 className="text-[20px] font-medium font-inter tracking-tight text-white">
              Total Earnings :
            </h3>
            <p className="text-[28px] font-[600] text-white tracking-wide">
              ₹{stats.totalEarnings}
            </p>
            <div className="absolute -top-2 -right-3  bg-primary px-3 py-1 rounded-full">
              <p className="flex items-center gap-2 text-white ">
                <LuArrowUpRight className="text-white text-lg" /> +13.5%
              </p>
            </div>
          </div>
          {/* -- */}
          <div className="relative px-5 py-3 w-[15rem] bg-gradient-to-tl from-yellow-300 via-orange-400/80 to-orange-300 rounded-md">
            <LuCalendarClock className="text-3xl text-white -ml-2 mb-5" />
            <h3 className="text-[20px] font-medium font-inter tracking-tight text-white">
              Pending Bookings :
            </h3>
            <p className="text-[28px] font-[600] text-white tracking-wide">
              {stats.totalPendingBookings}
            </p>
            <div className="absolute -top-2 -right-3  bg-yellow-500 px-3 py-1 rounded-full shadow-lg">
              <p className="flex items-center gap-2 text-white ">
                <LuCalendarClock className="text-white text-lg" /> Pending
              </p>
            </div>
          </div>
          {/* -- */}
          <div className="relative px-5 py-3 w-[15rem] bg-gradient-to-tl from-blue-400 via-green-500 to-green-300 rounded-md">
            <LuCalendarClock className="text-3xl text-white -ml-2 mb-5" />
            <h3 className="text-[20px] font-medium font-inter tracking-tight text-white">
              Confirmed Bookings :
            </h3>
            <p className="text-[28px] font-[600] text-white tracking-wide">
              {stats.totalConfirmedBookings}
            </p>
            <div className="absolute -top-2 -right-3  bg-green-500 px-3 py-1 rounded-full shadow-lg">
              <p className="flex items-center gap-2 text-white ">
                <LuCalendarCheck2 className="text-white text-lg" /> Confirmed
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------ */}
      <div className="container px-8 py-5">
        {/* accept/reject */}

        <WorkerDashboard workerId={loggedWorker?._id} />
        {/* all confirmed bookings */}
      </div>
    </div>
  );
}

export default Home;
