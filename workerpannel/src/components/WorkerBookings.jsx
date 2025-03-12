import { useEffect, useState } from "react";
import axios from "axios";
import { LuCalendarPlus } from "react-icons/lu";
import { useAppContext } from "../context/AppContext";
import boy from "../assets/boy.png";
import {
  LuCheck,
  LuCalendarSearch,
  LuCalendarClock,
  LuCalendarCheck,
  LuCalendarCheck2,
} from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
function WorkerBookings({ workerId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    users,
    loggedWorker,
    setLoggedWorker,
    inProgressBookings,
    confirmedBookings,
  } = useAppContext();

  const [typeOfBooking, setTypeOfBooking] = useState("pending");
  //----------------------------------------------------------
  //  ----------------------- Displays pending bookings.
  //----------------------------------------------------------
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/workers/pending/${workerId}`
        );
        setBookings(response.data);
        setLoading(false);
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
  }, [workerId]);
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
  //-----------------------------------------------------
  //   console.log("in-progresss------>", inProgressBookings);
  return (
    <div className="flex flex-col items-center w-full">
      {/* Buttons */}
      <div className="Buttons flex items-center gap-4 font-inter mt-6 justify-center w-full">
        <p
          onClick={() => setTypeOfBooking("pending")}
          className={`flex items-center gap-2 px-3 py-2 text-[16px] tracking-tight font-medium capitalize rounded-full cursor-pointer hover:scale-105 transition-all duration-300 ${
            typeOfBooking === "pending"
              ? "text-primary bg-white "
              : "text-gray-600 bg-gray-100"
          }`}
        >
          <LuCalendarSearch /> pending
        </p>
        <p
          onClick={() => setTypeOfBooking("confirmed")}
          className={`flex items-center gap-2 px-3 py-2 text-[16px] tracking-tight font-medium capitalize rounded-full cursor-pointer hover:scale-105 transition-all duration-300 ${
            typeOfBooking === "confirmed"
              ? "text-primary bg-white "
              : "text-gray-600 bg-gray-100"
          }`}
        >
          <LuCalendarCheck /> confirmed
        </p>
      </div>

      {/* All Bookings - Centered Below */}
      <div className="All-bookings max-w-[70%] min-w-[50%]  pt-4 pb-2 bg-white font-inter rounded-xl min-h-[25rem] overflow-y-auto w-full  mt-2">
        {typeOfBooking === "pending" ? (
          <div className="">
            <div className="flex items-center gap-3 mb-5 justify-center">
              <p className="text-[18px] font-[400] font-inter tracking-tight capitalize text-gray-600">
                pending bookings
              </p>
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce transition-all duration-1000"></div>
            </div>
            {bookings.length === 0 ? (
              <div className="">
                <p className="text-gray-500 font-medium font-inter tracking-tight text-[18px] flex items-center gap-2 justify-center capitalize h-full mt-6">
                  <LuCalendarSearch className="text-2xl" /> No pending bookings.
                </p>
              </div>
            ) : (
              bookings.map((booking) => {
                const user = users.find((user) => user._id === booking.userId);

                return (
                  <div
                    key={booking._id}
                    className="bg-gray-50 shadow-sm border-b-[.8px] border-primary/20  py-2 px-6 mx-5 rounded-md"
                  >
                    {/* User Details */}

                    <div className="flex items-center justify-between  font-inter ">
                      <div className="flex items-center gap-4 ">
                        <img
                          src={boy}
                          alt="User"
                          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                        />

                        <p className="font-medium text-gray-800 text-[16px] tracking-tight capitalize">
                          {user ? user.name : "Unknown User"}
                        </p>
                        <p className="text-gray-800 tracking-tight text-[16px] font-medium">
                          <span className="">Price: </span>
                          {booking.totalPrice}
                        </p>
                        <p className="text-[16px] font-medium text-primary tracking-tight uppercase">
                          {booking.paymentMethod}
                        </p>
                      </div>

                      {/* Accept/Reject Buttons */}
                      <div className="ml-6 flex gap-4">
                        <button
                          onClick={() => handleAction(booking._id, "confirmed")}
                          className="bg-primary text-white p-2 rounded-full hover:bg-blue-700 transition"
                        >
                          <LuCheck />
                        </button>
                        <button
                          onClick={() => handleAction(booking._id, "cancelled")}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                        >
                          <MdClose />
                        </button>
                      </div>
                    </div>

                    {/* Booking Details */}
                    {/* <p className="text-gray-700">
                            <span className="font-semibold">Service:</span>{" "}
                            {booking.subservices.map((s) => s.name).join(", ")}
                          </p> */}
                    {/* <p className="text-gray-700">
                            <span className="font-semibold">Total Price:</span> $
                            {booking.totalPrice}
                          </p> */}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="Confirmed-booking overflow-y-auto h-[23rem] px-6">
            <div className="flex items-center gap-3 mb-5 justify-center">
              <p className="text-[18px] font-[400] font-inter tracking-tight capitalize text-gray-600">
                confirmed bookings
              </p>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce transition-all duration-1000"></div>
            </div>
            {confirmedBookings.length > 0 ? (
              confirmedBookings.map((booking) => {
                const user = users.find((u) => u._id === booking.userId);

                return (
                  <div
                    key={booking._id}
                    className="bg-gray-50 px-4 py-3 mb-2 rounded-md shadow-sm flex flex-col border-b-[.8px] border-primary/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="flex items-center gap-2 text-primary text-[14px] tracking-tight ">
                          <LuCalendarCheck className="text-md text-primary" />{" "}
                          {booking._id}
                        </p>
                        <p className="text-[16px] font-medium tracking-tight font-inter capitalize">
                          {user ? user.name : "Unknown"}
                        </p>
                      </div>

                      <div className="flex items-center justify-center ">
                        <div
                          className="group relative cursor-pointer w-28 border bg-white rounded-full overflow-hidden text-gray-800 text-[15px] font-medium hover:shadow-lg transition-shadow duration-300"
                          onClick={() =>
                            handleSetInProgress(booking?._id, loggedWorker?._id)
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
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600">No confirmed bookings available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkerBookings;
