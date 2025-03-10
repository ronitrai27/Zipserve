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
  const { loggedWorker, setLoggedWorker } = useAppContext();
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
  console.log("total earnings:", stats.totalEarnings);
  console.log("total pending:", stats.totalPendingBookings);
  console.log("total CONFIRMED:", stats.totalConfirmedBookings);

  return (
    <div className="font-outfit ">
      {/* navbar */}
      <Navbar />
      {/* men-bar */}
      <div className="menu bg-primary/30 flex items-center justify-end px-5 py-2 gap-6">
        <div className="text-white bg-green-500 px-2 py-1 rounded-full shrink-0 flex items-center gap-2">
          <LuUserRoundCheck className="text-lg" />
          <p className=" ">Available</p>
        </div>
        <p className="capitalize text-[16px] tracking-tight text-gray-600 flex items-center gap-2">
          <BiMessageSquareDetail className="text-xl text-primary" /> Messages
        </p>

        <p
          onClick={logoutWorker}
          className=" capitalize text-[16px] tracking-tight text-gray-600 flex items-center gap-2 hover:scale-105 transition-all duration-300 hover:text-black cursor-pointer"
        >
          <LuLogOut className="text-primary text-xl" /> Logout
        </p>
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
