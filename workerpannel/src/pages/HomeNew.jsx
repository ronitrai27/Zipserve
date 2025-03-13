import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
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
} from "react-icons/lu";
import PieActiveArc from "../components/PieChart";
const HomeNew = () => {
  const { loggedWorker, users } = useAppContext();
  const [currentDate, setCurrentDate] = useState("");
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalPendingBookings: 0,
    totalConfirmedBookings: 0,
  });
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
  //------------------------------------------------------
  return (
    <div className=" w-full h-full">
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
              ₹{stats.totalEarnings}
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
          <div className=" flex items-center gap-2 mb-2">
            <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <LuCalendarClock className="text-primary text-2xl" />
            </div>
            <p className="text-[16px] font-medium text-gray-800 tracking-tight capitalize">
              Pending tasks :
            </p>
          </div>
          <p className="text-[26px] text-gray-500 font-medium self-end mr-20">
            {stats.totalPendingBookings}
          </p>
          <div className="bg-primary text-white flex items-center gap-2 px-2 py-1 rounded-lg w-fit justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-50 animate-pulse transition-all duration-1000"></div>
            <p className="text-[12px] tracking-tight">Pending</p>
          </div>
        </div>
        <div className="box-3 relative flex flex-col bg-white border-l-4 border-primary rounded-md shadow-md min-w-[220px] pl-4 py-3 hover:shadow-lg hover:border-[1px] hover:scale-105 transition-all duration-500">
          <div className=" flex items-center gap-2 mb-2">
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
          <div className=" flex items-center gap-2 mb-2">
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
      <div className="PARENT px-6 mt-5 text-gray-800">
        {/* LEFT SIDE */}
        <div className="left-side font-inter w-1/2 bg-white rounded-md min-h-[28rem]">
          <div className="flex items-center gap-2 ml-10 pt-3">
            <p className=" capitalize text-[16px] font-medium tracking-tight">
              my tasks
            </p>
            <div className="bg-gray-100 w-9 h-9 rounded-lg flex items-center justify-center">
              <LuChevronDown className="text-2xl text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse transition-all duration-700"></div>
              <p className=" capitalize text-[14px] font-medium">reviews</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse transition-all duration-700"></div>
              <p className=" capitalize text-[14px] font-medium">pending</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse transition-all duration-700"></div>
              <p className=" capitalize text-[14px] font-medium">confirmed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNew;
