import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useBooked } from "../context/BookedContext";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import {
  LuCalendarCheck2,
  LuCalendarCheck,
  LuUserRound,
  LuCalendarX2,
} from "react-icons/lu";
import { BiGhost } from "react-icons/bi";
const UserBookings = () => {
  const navigate = useNavigate();
  const {
    userBookDetails,
    fetchUserBookings,
    handleFilters,
    selectedStatus,
    fetchBookingById,
    // clickedBookDetails,
    // setClickedBookDetails,
    clickedBookingId,
    setClickedBookingId,
  } = useBooked(); //contains all bookings of user
  const [bookWorkers, setBookWorkers] = useState([]); //details of workers who are selected(name , id , profileImage ...)
  const { user, workers: contextWorkers } = useAppContext(); // all workers from context
  //-------------------------------------------------------------
  //----------------------FILTERING WORKERS ID FROM CONTEXT
  //-------------------------------------------------------------
  useEffect(() => {
    if (userBookDetails) {
      const bookedWorkers = contextWorkers.filter((worker) =>
        userBookDetails.some((booking) => booking.workerId === worker._id)
      );
      setBookWorkers(bookedWorkers);
    }
  }, [userBookDetails, contextWorkers]);

  //-----
  if (!userBookDetails) return <p>Fetching Your Bookings...</p>;
  //-----------------------------------------------------------------
  //-------------------------CANCEL BOOKING
  //-----------------------------------------------------------------
  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/cancel/${bookingId}`);
      toast.success("Booking cancelled successfully!");

      // Refetch bookings after canceling
      fetchUserBookings();
      if (selectedStatus) {
        handleFilters(selectedStatus);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };
  //----------------------------------------------------------------
  //-------------------------DEBUGGING LOGS-
  //----------------------------------------------------------------
  // console.log("bookWorkers from BookingCards.jsx", bookWorkers); // all workers details filtered with id
  // console.log("userBookDetails from BookingCards.jsx", userBookDetails); // all bookings of user
  // console.log("clickedBookDetails from BookingCards.jsx", clickedBookDetails); // clicked booking details
  return (
    <div className="min-w-[22rem] max-w-[26rem] flex flex-col  justify-center px-1 gap-3 mx-auto">
      {userBookDetails.length === 0 ? (
        <div className="text-center flex flex-col items-center gap-2 font-inter mt-5">
          <BiGhost className="text-6xl text-gray-300" />
          <p className=" capitalize tracking-wide text-[18px] font-medium">
            No Active Booking found
          </p>
        </div>
      ) : (
        userBookDetails.map((booking) => {
          const worker = bookWorkers.find((w) => w._id === booking.workerId);

          return (
            <div
              key={booking._id}
              onClick={() => setClickedBookingId(booking._id)}
              className="bg-white border-[.5px] border-primary/50 px-2 py-2 rounded-md hover:shadow-md cursor-pointer scale-95 hover:scale-100 transition-all duration-300 font-inter"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="flex items-center gap-2 text-sm font-light tracking-tight select-text text-gray-600">
                  <LuCalendarCheck2 /> ID: {booking._id}{" "}
                </p>
                <p
                  className={`px-2 py-1 rounded-full text-white text-[14px] font-medium capitalize tracking-tight 
                  ${
                    booking.status === "pending"
                      ? "bg-yellow-500"
                      : booking.status === "confirmed"
                      ? "bg-green-500"
                      : booking.status === "in-progress"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              {/* Worker Details */}
              {worker && (
                <div className="flex items-center gap-4 mb-2 pr-5">
                  <img
                    src={worker.profileImage}
                    alt={worker.name}
                    className="w-14 h-14 rounded-full border-[1px] border-primary object-cover shrink-0"
                  />
                  <div className="flex  justify-between w-full">
                    <div className="flex flex-col ">
                      <p className="text-[16px] font-medium tracking-tight ">
                        {worker.name}
                      </p>
                      <p className="text-sm text-gray-600 tracking-tight font-light">
                        {worker.category}
                      </p>
                    </div>

                    <Rating
                      name="half-rating-read"
                      size="small"
                      defaultValue={worker.stars}
                      precision={0.1}
                      readOnly
                    />
                  </div>
                </div>
              )}

              {/* Booking Details */}
              <div className="px-2">
                <p className="text-[15px] font-light text-primary flex items-center gap-2 justify-center mb-1">
                  <LuCalendarCheck className="text-xl" />
                  <strong className="text-gray-800 font-medium">
                    Booking :
                  </strong>{" "}
                  {booking.date.date}, {booking.date.month} {booking.date.year}
                  {/* <span className="font-light tracking-tighter text-[14px]">
                    {booking.time}
                  </span> */}
                </p>

                <div className="flex items-center justify-between px-2 mt-3">
                  <p className="text-[15px] font-light">
                    Total Price: ₹{booking.totalPrice}
                  </p>
                  <p className=" text-[15px] font-light">
                    Surge Charges: ₹{booking.surgeCharge}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-light tracking-tight">
                  Pay-Mode:{" "}
                  <span className=" uppercase">{booking.paymentMethod}</span>
                </p>
                {/* user profile */}
                <div className="flex items-center justify-center ">
                  <div
                    className="group relative cursor-pointer w-28 border bg-white rounded-full overflow-hidden text-gray-800 text-[15px] font-medium hover:shadow-lg transition-shadow duration-300"
                    onClick={() => navigate("/booking/" + worker._id)}
                  >
                    <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-2 py-1">
                      profile
                    </span>
                    <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                      <span>profile</span>
                      <LuUserRound className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#3b75ef] scale-[1] dark:group-hover:bg-[#3b75ef] group-hover:bg-[#3b75ef] group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
                  </div>
                </div>
                {/* cancel */}
                <div className="flex items-center justify-center ">
                  <div
                    className={`group relative  w-28 border  rounded-full overflow-hidden text-gray-800 text-[15px] font-medium hover:shadow-lg transition-shadow duration-300 ${
                      booking.status === "confirmed" ||
                      booking.status === "in-progress"
                        ? "cursor-not-allowed pointer-events-none bg-gray-300"
                        : "cursor-pointer bg-white"
                    }`}
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-2 py-1">
                      cancel
                    </span>
                    <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                      <span>sure?</span>
                      <LuCalendarX2 className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    <div
                      className={`absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg  scale-[1] dark:group-hover:bg-red-500 group-hover:bg-red-500 group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0 ${
                        booking.status === "confirmed" ||
                        booking.status === "in-progress"
                          ? "bg-gray-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserBookings;
