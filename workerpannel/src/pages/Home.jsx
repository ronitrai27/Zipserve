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
} from "react-icons/lu";
import { BiMessageSquareDetail } from "react-icons/bi";
import WorkerDashboard from "../components/WorkerDashboard";
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
      {/* BOXES----------- */}
      <div className="px-6 pt-2">
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
                <LuCalendarCheck2 className="text-white text-lg" /> Confirmed
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------ */}
      <div className="container px-8 py-5 flex gap-10">
        {/* accept/reject */}
        <WorkerDashboard workerId={loggedWorker?._id} />
        {/* all confirmed bookings */}
        <div className="Confirmed-booking h-[400px] overflow-y-auto bg-white p-4 rounded-lg shadow-md w-[26rem]">
          <p className="text-[22px] font-medium mb-2 flex items-center gap-2 justify-center text-primary">
            <LuCalendarCheck className="text-2xl" /> Confirmed Bookings
          </p>
          {confirmedBookings.length > 0 ? (
            confirmedBookings.map((booking) => {
              const user = users.find((u) => u._id === booking.userId);

              return (
                <div
                  key={booking._id}
                  className="bg-gray-100 px-4 py-3 mb-4 rounded-lg shadow-md flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="flex items-center gap-2 text-primary text-[15px] tracking-tight ">
                        <LuCalendarCheck className="text-lg text-primary" />{" "}
                        {booking._id}
                      </p>
                      <p className="text-[16px] font-medium tracking-tight font-inter capitalize">
                        {user ? user.name : "Unknown"}
                      </p>
                    </div>
                    {/* START BUTTON FOR IN-PROGRESS */}
                    <div className="flex items-center justify-center ">
                      <div
                        className="group relative cursor-pointer w-28 border bg-white rounded-full overflow-hidden text-gray-800 text-[15px] font-medium hover:shadow-lg transition-shadow duration-300"
                        // onClick={() => navigate("/booking/" + worker._id)}
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

                  {/* <p className="text-sm text-gray-700">
                    Total Price: <strong>${booking.totalPrice}</strong>
                  </p>
                  <p className="text-sm text-gray-700">
                    Payment Mode:{" "}
                    <strong>{booking.paymentMode || "N/A"}</strong>
                  </p>
                  <p className="text-sm text-gray-700">
                    Date:{" "}
                    <strong>
                      {booking.date ? booking.date.fullDate : "N/A"}
                    </strong>
                  </p>
                  <p className="text-sm text-gray-700">
                    Time Slot:{" "}
                    <strong>
                      {booking.date ? booking.date.timeSlot : "N/A"}
                    </strong>
                  </p> */}

                  {/* Displaying subservices */}
                  {/* <div className="mt-2">
                    <p className="text-sm font-semibold">Services:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {booking.subservices.map((service) => (
                        <li key={service._id}>{service.name}</li>
                      ))}
                    </ul>
                  </div> */}
                </div>
              );
            })
          ) : (
            <p className="text-gray-600">No confirmed bookings available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
