import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooked } from "../context/BookedContext";
import { useAppContext } from "../context/AppContext";
import { BiGhost } from "react-icons/bi";
import {
  LuCalendarMinus,
  LuCalendarClock,
  LuUserRound,
  LuCalendarX2,
} from "react-icons/lu";
import Rating from "@mui/material/Rating";
import { IoInformation } from "react-icons/io5";
const BookingHistory = () => {
  const navigate = useNavigate();
  const { bookingHist, loading } = useBooked();
  const { user, workers: contextWorkers } = useAppContext();
  const [bookedWorkers, setBookedWorkers] = useState([]); // store booked workers details (id , name , image...)
  //-------------------------------------------------------------
  //----------------------FILTERING WORKERS ID FROM CONTEXT
  //-------------------------------------------------------------
  useEffect(() => {
    if (bookingHist) {
      const booked = contextWorkers.filter((worker) =>
        bookingHist.some((booking) => booking.workerId === worker._id)
      );
      setBookedWorkers(booked);
    }
  }, [bookingHist, contextWorkers]);
  //-------------------------------------------------------------
  if (loading)
    return (
      <div className="flex items-center w-full h-full justify-center gap-2">
        <p className="text-[26px] tracking-tight font-inter text-gray-600 font-medium capitalize">
          Loading your Bookings
        </p>
        <p className="w-5 h-5 bg-primary rounded-full animate-bounce transition-all duration-1000"></p>
      </div>
    );
  //-------------------------------------------------------
  //----------------------DEBUGGING LOGS
  //-------------------------------------------------------
  // console.log("Booking History: ", bookingHist);
  return (
    <div className="flex-1 border-[1px] bg-stone-100 h-[90vh] rounded-t-xl py-4 px-2">
      <div className="container px-8 flex justify-between h-full">
        {/* booking  */}
        {bookingHist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full w-full font-inter">
            <BiGhost className="text-9xl text-gray-400" />
            <p className="text-3xl text-gray-600 tracking-tight font-medium capitalize">
              No past bookings found
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 font-inter overflow-y-auto h-full scroll-smooth">
            <p className="flex items-center gap-3 mt-3 mb-3 text-[26px] font-medium tracking-tight text-gray-700 capitalize">
              <LuCalendarClock className="text-primary text-3xl" /> booking
              history{" "}
            </p>
            {bookingHist.map((booking) => {
              const worker = bookedWorkers?.find(
                (w) => w._id === booking.workerId
              );

              return (
                <div
                  key={booking._id}
                  className=" w-[32rem]  bg-white px-5 py-2 rounded-md"
                >
                  {/* top part */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[15px] font-light text-primary flex items-center gap-2 justify-center mb-1">
                      <LuCalendarMinus className="text-xl" />
                      <strong className="text-gray-800 font-medium">
                        Booking :
                      </strong>{" "}
                      {booking.date.date}, {booking.date.month}{" "}
                      {booking.date.year}
                      <span className="font-light tracking-tighter text-[14px]">
                        {booking.time}
                      </span>
                    </p>
                    <p
                      className={`px-2 py-1 rounded-full text-white text-[14px] font-medium capitalize tracking-tight 
                                    ${
                                      booking.status === "cancelled"
                                        ? "bg-red-500"
                                        : booking.status === "completed"
                                        ? "bg-green-600"
                                        : "bg-gray-400"
                                    }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                  {worker && (
                    <div className="flex items-center gap-4 mt-4 pr-5">
                      <img
                        src={worker.profileImage}
                        alt={worker.name}
                        className="w-14 h-14 rounded-full object-cover border-[1px] border-primary"
                      />
                      <div className="flex justify-between w-full">
                        <div className="flex flex-col">
                          <p className="text-[16px] font-medium tracking-tight">
                            {worker.name}
                          </p>
                          <p className="text-sm text-gray-600 tracking-tight font-light">
                            {worker.category}
                          </p>
                        </div>
                        {/* stars */}
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
                  <div className="mt-3">
                    <div className="flex items-center gap-5 px-2">
                      <p className="text-[15px] font-light shrink-0">
                        Selected services:
                      </p>
                      <div className="overflow-x-auto whitespace-nowrap">
                        <p className="text-primary text-[14px] font-light">
                          {" "}
                          {booking.subservices.map((s) => s.name).join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-2 mt-1">
                      <p className="text-[15px] font-light">
                        Total Price: ₹{booking.totalPrice}
                      </p>
                      <p className=" text-[15px] font-light">
                        Surge Charges: ₹{booking.surgeCharge}
                      </p>
                    </div>
                  </div>
                  {/* providing review------------------ */}
                  <div className="mt-3 flex items-center gap-2 px-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-primary">
                      <IoInformation className="text-white text-xl" />
                    </div>
                    <p className="text-[15px] font-medium tracking-tight text-gray-700">
                      Provide your Reviews
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* AD and Rate our APP */}
        {/* <div className="w-1/4  bg-primary">
          <h1>RATE US</h1>
        </div> */}
      </div>
    </div>
  );
};

export default BookingHistory;
