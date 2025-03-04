import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedWorkers from "../components/RelatedWorkers";
import { useAppContext } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import { LocationContext } from "../context/LocationContext";
import { useBooked } from "../context/BookedContext";
import Rating from "@mui/material/Rating";
import { IoClose } from "react-icons/io5";
import { PiCoinsLight } from "react-icons/pi";
import PaymentButton from "../components/paymentButton";
import coins from "../assets/many-coins.png";
import atm from "../assets/atm-card.png";
import {
  LuPenLine,
  LuBookmarkPlus,
  LuBookmarkCheck,
  LuCircleCheckBig,
  LuCircleFadingPlus,
  LuCalendarClock,
  LuBriefcase,
  LuCalendarPlus,
  LuClock10,
  LuMapPinCheck,
  LuCalendarCheck,
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleMapComponent from "../components/GoogleDirection";

const NewMyBooking = () => {
  const { id } = useParams();
  // storing _id of selected worker
  const [workerInfo, setWorkerInfo] = useState(null); // Stores information about the currently selected worker
  const [about, setAbout] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [toggleDetail, setToggleDetail] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const {
    user,
    toggleFavoriteWorker,
    workers: contextWorkers,
  } = useAppContext();

  const {
    currentBookingId,
    bookingCongrats,
    setBookingCongrats,
    currentBookingDetails,
  } = useBooked();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const parentContainerRef = useRef(null);

  const {
    selectedServices,
    setSelectedServices,
    slotTime,
    setSlotTime,
    selectedDayDate,
    setSelectedDayDate,
    getCurrentDayDate,
    servicePrice,
    setServicePrice,
    commission,
    setCommission,
    totalPrice,
    setTotalPrice,
    isDrawerOpen,
    setIsDrawerOpen,
    subservices,
    setSubservices,
  } = useBooking();

  const { workersLocations, userLocation, userAddress } =
    useContext(LocationContext);
  //----------------------------------------------------------
  // ------------------DEFAULT EVERYTHING ON PAGE LOAD
  //----------------------------------------------------------
  useEffect(() => {
    if (parentContainerRef.current) {
      parentContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      setSelectedServices([]);
      setSlotTime("");
      setSelectedDayDate(getCurrentDayDate());
    }
  }, [location.pathname]);
  //------------------------------------------------------------
  //-----------------SHOWING BOOKING CONGRATS
  //------------------------------------------------------------
  const [showDiv, setShowDiv] = useState(false);
  const [countdown, setCountdown] = useState(6);
  useEffect(() => {
    if (bookingCongrats) {
      // Wait 2 seconds before showing the div
      const delayTimer = setTimeout(() => {
        setShowDiv(true);

        const countdownTimer = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(countdownTimer);
              setShowDiv(false);
              setBookingCongrats(false);
              navigate("/bookings"); // Redirect after countdown ends
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(countdownTimer); // Cleanup timer
      }, 2000); // 2-second delay

      return () => clearTimeout(delayTimer); // Cleanup delay timer
    }
  }, [bookingCongrats, navigate, setBookingCongrats]);
  //-------------------------------------------------
  //-------------FIND THE WORKER DETAILS FROM BACKEND
  //--------------------------------------------------
  useEffect(() => {
    if (contextWorkers.length > 0) {
      setIsLoading(true);
      try {
        const workerInfo = contextWorkers.find((worker) => worker._id === id);
        if (!workerInfo) {
          throw new Error("Worker not found");
        }
        setWorkerInfo(workerInfo);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [contextWorkers, id]);
  //--------------------------------------------------------------------
  // ------------------------------Fetching review for selected worker
  //--------------------------------------------------------------------
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `http://localhost:8080/api/workers/${id}/reviews`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format - expected array");
        }
        setReviews(data);
        // console.log(data); reviews debugging log
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [id]);
  //-----------------------------------------------------
  //-----------------------------BOOKMARKING FAVOURITE WORKERS
  //------------------------------------------------------
  const checkIfFavorite = async () => {
    if (!user?._id || !workerInfo?._id) return;

    try {
      const res = await axios.get(
        `http://localhost:8080/api/users/is-favorite/${user._id}/${workerInfo._id}`
      );
      setIsFavorite(res.data.isFavorited);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  useEffect(() => {
    checkIfFavorite();
  }, [workerInfo]);
  //------------------------------------------------------
  // ----------------------------Fetching SUB SERVICES
  //------------------------------------------------------

  useEffect(() => {
    if (workerInfo?.category) {
      fetchSubservices(workerInfo.category);
    }
  }, [workerInfo]);

  const fetchSubservices = async (category) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/${category}`);
      setSubservices(response.data);
    } catch (error) {
      console.error("Error fetching subservices:", error);
    }
  };

  //selecting services from subService
  const handleClick = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  //------------------------------------------------------------
  //---------------------------TIME SLOTS
  //------------------------------------------------------------

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthsOfYear = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const [workerSlot, setWorkerSlot] = useState([]); // Stores all available slots
  const [slotIndex, setSlotIndex] = useState(0); // Tracks selected day index
  const toggleDrawer = () => {
    if (!selectedDayDate.day || !selectedDayDate.date) {
      toast.info("Please select a valid day and date");
      return;
    }

    if (!selectedServices || selectedServices.length === 0) {
      toast.info("Please select at least one service");
      return;
    }

    if (!slotTime) {
      toast.info("Please select a time slot");
      return;
    }

    // If all checks pass, open the drawer
    setIsDrawerOpen(true);
  };
  //-----
  const getAvailableSlots = async () => {
    setWorkerSlot([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set start time to 10:00 AM for all days
      currentDate.setHours(10, 0, 0, 0);

      // Set end time to 8:00 PM for all days
      let endtime = new Date(currentDate);
      endtime.setHours(20, 0, 0, 0);

      // If it's today, adjust the start time based on the current time
      if (i === 0) {
        let currentTime = new Date();

        // If the current time is before 10:00 AM, ensure the first slot is at least 30 minutes ahead
        if (currentTime < currentDate) {
          let timeDifference = currentDate - currentTime;
          if (timeDifference < 30 * 60 * 1000) {
            // If less than 30 minutes to 10:00 AM, start from 10:30 AM
            currentDate.setMinutes(currentDate.getMinutes() + 30);
          }
        } else {
          // If the current time is after 10:00 AM, start from the next 30-minute slot
          let minutes = currentTime.getMinutes();
          let nextSlotMinutes = minutes < 30 ? 30 : 0;
          let nextSlotHour =
            minutes < 30 ? currentTime.getHours() : currentTime.getHours() + 1;

          // Set the next slot time
          let nextSlotTime = new Date(currentTime);
          nextSlotTime.setHours(nextSlotHour, nextSlotMinutes, 0, 0);

          // Ensure the next slot is at least 30 minutes ahead
          if (nextSlotTime - currentTime < 30 * 60 * 1000) {
            nextSlotTime.setMinutes(nextSlotTime.getMinutes() + 30);
          }

          // If the next slot is before 10:00 AM, default to 10:00 AM
          if (nextSlotTime < currentDate) {
            nextSlotTime = currentDate;
          }

          currentDate = nextSlotTime;
        }
      }

      let timeslots = [];

      while (currentDate < endtime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeslots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setWorkerSlot((prev) => [...prev, timeslots]);
    }
  };

  // Automatically update slots every minute
  useEffect(() => {
    getAvailableSlots(); // Initial call

    const interval = setInterval(() => {
      getAvailableSlots();
    }, 60 * 1000); // Update every minute

    return () => clearInterval(interval);
  }, []);
  //--------------------------------------------------------
  //------------------------Filtering all data from service id
  //--------------------------------------------------------

  const selectedServiceDetails = subservices.filter((service) =>
    selectedServices.includes(service._id)
  );
  // total price
  useEffect(() => {
    const total = selectedServiceDetails.reduce(
      (sum, service) => sum + service.price,
      0
    );
    setServicePrice(total);
  }, [selectedServiceDetails]);
  //-----------------------------------------------------------
  //-----------------------------COMMISIION AND TOTAL
  //-----------------------------------------------------------
  useEffect(() => {
    const baseTotal = workerInfo?.price + servicePrice + 10;
    const calculatedCommission = baseTotal * 0.15;

    setCommission(calculatedCommission);
  }, [workerInfo, servicePrice]);

  useEffect(() => {
    setTotalPrice(workerInfo?.price + servicePrice + 10 + commission);
  }, [workerInfo, servicePrice, commission]);
  // DEBUGGING LOGS ------------------------------->

  // console.log("details of services from Bookings ->", selectedServiceDetails);
  // console.log("logged in , user id-----", user._id);
  // console.log("WorkerInfo ----------->", workerInfo?._id);
  // console.log("comissions---->", commission);
  // console.log("TOTALPRICE---->", totalPrice);
  // console.log(selectedDayDate);
  // console.log("selected services---->", selectedServices);
  // console.log("check-->", slotIndex);
  // console.log("check-->", slotTime);
  // console.log("worker-------->", workerSlot);
  // console.log("USER Locations->", userLocation);
  // console.log("Locations->", userAddress);
  // console.log("WORKERS Locations->", workersLocations);
  // console.log(
  //   "User Location----------->",
  //   userLocation?.latitude,
  //   userLocation?.longitude
  // );
  // console.log("Worker Location---------->", workerInfo?.location?.coordinates);
  // console.log("WORKER LAT-------->", workerInfo?.location?.coordinates[1]);
  // console.log("WORKER LON-------->", workerInfo?.location?.coordinates[0]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {workerInfo ? (
        <div className="booking-page w-full min-h-screen bg-gray-100 py-5  rounded-tr-3xl">
          <div className="max-w-[90%] mx-auto flex flex-col sm:flex-row justify-between gap-5 md:gap-10">
            {/* ------------ Worker Details ------------ */}
            <div
              ref={parentContainerRef}
              className="px-8 py-4 flex flex-col gap-5 h-[90vh] overflow-y-auto scroll-smooth w-[55rem] overflow-x-hidden  min-h-0"
            >
              <div className="worker-top flex flex-row gap-8">
                <img
                  src={workerInfo.profileImage}
                  alt={`${workerInfo.name}'s profile`}
                  className="w-60 bg-gray-200 border-[1px] border-primary rounded-xl object-cover"
                />
                <div
                  className="worker-basic-details font-inter text-gray-800  flex-1 flex-col rounded-xl px-3 py-1 bg-gradient-to-br
                 from-blue-200 via-primary/60 to-primary w-[30rem]"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 bg-gray-50/50 backdrop-blur-lg rounded-lg px-2 py-[2px] mt-1">
                      <p className="text-[18px] pl-6 font-medium capitalize tracking-wide ">
                        {workerInfo.name}
                      </p>
                      <motion.button
                        onClick={async () => {
                          await toggleFavoriteWorker(workerInfo);
                          checkIfFavorite(); // Re-fetch updated favorite status
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.7 }}
                        animate={isFavorite ? { scale: [1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                        className="favorite-button"
                      >
                        {isFavorite ? (
                          <LuBookmarkCheck className="text-3xl text-gray-100 fill-yellow-400" />
                        ) : (
                          <LuBookmarkPlus className="text-3xl text-gray-100 fill-yellow-400" />
                        )}
                      </motion.button>
                    </div>

                    <Rating
                      name="half-rating-read"
                      size="small"
                      defaultValue={workerInfo.stars || 0}
                      precision={0.5}
                      readOnly
                    />
                  </div>

                  <div className="w-full flex items-center mt-3">
                    <hr className="border-white flex-1 border-[.95px]" />
                    <p className="text-[14px] font-light p-1 bg-white rounded-full ml-4">
                      Experience: {workerInfo.experience} years
                    </p>
                  </div>
                  {/* ------------ Details ------------ */}
                  <div className="flex flex-col">
                    <div className="flex gap-8 mb-4">
                      <h1
                        onClick={() => setToggleDetail(true)}
                        className={`font-medium text-[16px] cursor-pointer font-outfit ${
                          toggleDetail
                            ? "underline underline-offset-4 decoration-white"
                            : ""
                        }`}
                      >
                        Basic details
                      </h1>
                      <h1
                        onClick={() => setToggleDetail(false)}
                        className={`font-medium text-[16px] cursor-pointer font-outfit ${
                          !toggleDetail
                            ? "underline underline-offset-4 decoration-white"
                            : ""
                        }`}
                      >
                        Contact info
                      </h1>
                    </div>

                    {toggleDetail ? (
                      // Basic Details
                      <div className="flex flex-col gap-2">
                        <p className="text-[15px] font-[400] flex items-center gap-2">
                          <span className="font-medium">Category:</span>
                          <assets.VscTools /> {workerInfo.category}
                        </p>
                        <p className="text-[15px] font-[400]">
                          <span className="font-medium">Visiting Fee:</span>{" "}
                          {workerInfo.price}
                        </p>
                        <p className="text-[15px] font-[400]">
                          <span className="font-medium">Age:</span>{" "}
                          {workerInfo.age}
                        </p>
                        <p className="text-[15px] font-[400]">
                          <span className="font-medium">Address:</span>{" "}
                          {workerInfo.address}
                        </p>
                      </div>
                    ) : (
                      // Contact Info
                      <div className="flex flex-col gap-2">
                        <p className="text-[15px] font-[400] flex items-center gap-2">
                          <span className="font-medium">Phone:</span>
                          <assets.MdOutlineCall /> {workerInfo.phone}
                        </p>
                        <p className="text-[15px] font-[400]">
                          <span className="font-medium">Email:</span>{" "}
                          {workerInfo.email}
                        </p>
                        <p className="text-[18px] font-medium bg-white text-primary px-2 py-1 rounded-full w-fit flex items-center gap-2 cursor-pointer">
                          <assets.BsChatDots className="text-[20px]" /> chat
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* ------------ About ------------ */}
              <div className="flex flex-col gap-2 pl-4">
                <div
                  onClick={() => setAbout(!about)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <h1 className="text-[18px] font-medium">About</h1>
                  {about ? (
                    <assets.MdOutlineArrowDropUp className="text-[24px]" />
                  ) : (
                    <assets.MdOutlineArrowDropDown className="text-[24px]" />
                  )}
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    about ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <p className="text-[15px] font-[400]">{workerInfo.about}</p>
                </div>
              </div>
              {/* ------------ Reviews ------------ */}
              <div className="flex flex-col gap-4 pl-4  mb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-[18px] font-medium">Reviews</h1>
                  <select
                    className="px-2 py-1 rounded-md border border-gray-300 outline-none"
                    onChange={(e) => setSortOrder(e.target.value)}
                    value={sortOrder}
                  >
                    <option value="newest">Latest</option>
                    <option value="oldest">Earliest</option>
                  </select>
                </div>

                <div
                  className={`flex flex-col gap-4 w-full mt-3 ${
                    reviews && reviews.length > 0 ? "h-[300px]" : "h-[250px]"
                  }  overflow-y-auto font-outfit`}
                >
                  {reviews && reviews.length > 0 ? (
                    reviews
                      ?.sort((a, b) => {
                        if (sortOrder === "newest") {
                          return new Date(b.createdAt) - new Date(a.createdAt);
                        } else {
                          return new Date(a.createdAt) - new Date(b.createdAt);
                        }
                      })
                      .slice(0, visibleReviews)
                      .map((review, index) => (
                        <div
                          key={review._id || index}
                          className="border-b-[1px] rounded-md px-4 py-2 w-[90%] mx-auto bg-gray-50/40"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium text-[16px] text-gray-800 font-inter capitalize">
                              {review.customerName}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[15px] text-gray-600 font-light break-words max-w-full overflow-hidden">
                            {review.comment}
                          </p>
                        </div>
                      ))
                  ) : (
                    // Show message when there are no reviews
                    <div className="flex justify-center items-center h-full">
                      <p className=" text-gray-500 text-lg italic flex items-center gap-2 justify-center capitalize font-outfit">
                        <LuPenLine className="text-2xl" /> Be the first to book
                        and provide a review!
                      </p>
                    </div>
                  )}

                  {reviews &&
                    reviews.length > 0 &&
                    visibleReviews < reviews.length && (
                      <button
                        onClick={() => setVisibleReviews((prev) => prev + 4)}
                        className="bg-primary text-white px-2 py-1 hover:bg-blue-700 rounded-lg shadow-lg transition-all w-fit mx-auto hover:scale-105 duration-200"
                      >
                        Load More
                      </button>
                    )}
                </div>
              </div>
              {/*-------------------- SUB-SERVICES--------------- */}

              <p className=" flex items-center gap-2 justify-center text-[20px] font-medium text-primary mb-3 font-inter">
                <LuBriefcase className="text-2xl text-primary" />
                Select <span className=" capitalize">
                  services to book
                </span>{" "}
              </p>

              <div className="w-full overflow-x-auto flex-shrink-0 mb-10 px-6">
                <div className="subcategories flex items-center gap-4 flex-nowrap w-max flex-shrink-0 h-[12.5rem]">
                  {subservices.length > 0 ? (
                    subservices.map((service) => (
                      <div
                        key={service._id}
                        className="border-[1px] border-primary rounded-lg min-w-[180px] bg-primary/40 cursor-pointer text-center font-inter overflow-hidden relative group transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      >
                        <div className="bg-gray-50 p-3 mb-3">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-20 object-cover mx-auto"
                          />
                        </div>

                        <div className="px-1 mb-3 flex flex-col justify-between">
                          <h4 className="text-[16px] text-black font-[400] tracking-tight capitalize">
                            {service.name}
                          </h4>
                          <p className="text-white font-medium text-[15px] uppercase">
                            Price: ₹{service.price}
                          </p>
                        </div>

                        <div
                          className={`absolute inset-0 bg-primary/35 flex items-center justify-center transition-opacity duration-300 ${
                            selectedServices.includes(service._id)
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <button
                            onClick={() => handleClick(service._id)}
                            className="bg-primary/85 text-white font-semibold px-3 py-1 rounded-md shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
                          >
                            {selectedServices.includes(service._id) ? (
                              <>
                                <LuCircleCheckBig className="text-[15px]" />{" "}
                                Remove
                              </>
                            ) : (
                              <>
                                <LuCircleFadingPlus className="text-[15px]" />{" "}
                                Add
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No services available for this category.</p>
                  )}
                </div>
              </div>

              {/* -------------BOOKINGS SLOT -------------------------- */}
              <div className="flex items-center gap-2 justify-center mb-4">
                <LuCalendarClock className="text-2xl text-primary" />
                <p className=" capitalize text-primary font-medium font-inter tracking-tight text-[20px]">
                  Schedule Your Booking
                </p>
              </div>

              <div className="w-full mb-5 flex justify-center">
                <div className="flex items-center gap-4 flex-nowrap  ">
                  {workerSlot.length &&
                    workerSlot.map((item, index) => (
                      <div
                        onClick={() => {
                          setSlotIndex(index);
                          setSlotTime("");

                          if (item[0]?.datetime) {
                            const selectedDate = item[0].datetime;
                            setSelectedDayDate({
                              day: daysOfWeek[selectedDate.getDay()], // Store only the day (e.g., "SUN")
                              date: selectedDate.getDate().toString(), // Store only the date (e.g., "23")
                              month: monthsOfYear[selectedDate.getMonth()], // Store only the month (e.g., "FEB")
                              year: selectedDate.getFullYear().toString(), // Store only the year (e.g., "2025")
                            });
                          }
                        }}
                        className={`text-center p-3 min-w-16 rounded-full cursor-pointer hover:-translate-y-2 transition-all duration-300 ${
                          slotIndex === index
                            ? "bg-primary text-white"
                            : "border-[1px] border-primary bg-white text-gray-800"
                        }`}
                        key={index}
                      >
                        <p>
                          {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                        </p>
                        <p>{item[0] && item[0].datetime.getDate()}</p>
                      </div>
                    ))}
                </div>
              </div>
              {/* time */}
              <div className="flex items-center gap-3 w-full overflow-x-scroll flex-shrink-0 mb-6 h-16 px-2">
                {workerSlot.length &&
                  workerSlot[slotIndex].map((item, index) => (
                    <p
                      onClick={() => setSlotTime(item.time)}
                      className={`text-sm font-medium flex-shrink-0 px-5 py-2 rounded-full cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center gap-1 ${
                        item.time === slotTime
                          ? "bg-primary text-white"
                          : "text-gray-800 border-[1px] border-primary bg-white"
                      }`}
                      key={index}
                    >
                      <LuClock10 className="text-xl" />{" "}
                      {item.time.toLowerCase()}
                    </p>
                  ))}
              </div>

              {/* ---------continue button-------------- */}
              <div className="flex items-center justify-center my-2 mb-10">
                <div
                  className="group relative cursor-pointer w-40 border bg-white rounded-full overflow-hidden text-primary font-semibold hover:shadow-lg transition-shadow duration-300"
                  onClick={toggleDrawer}
                >
                  <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-3 py-2">
                    Continue
                  </span>
                  <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <span>Continue</span>
                    <LuCalendarPlus className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#3b75ef] scale-[1] dark:group-hover:bg-[#3b75ef] group-hover:bg-[#3b75ef] group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
                </div>
              </div>
            </div>
            {/*------------ Related workers... ------------*/}
            <div className="bg-white h-full w-full md:w-1/3 text-center py-3 rounded-md">
              <p className="text-[16px] font-medium text-primary mb-3 tracking-tight">
                More {workerInfo.category}
              </p>
              <hr className="w-[80%] mx-auto my-3 border-gray-300 border-[.9px]" />
              {/* Add related workers content here */}
              <RelatedWorkers id={id} category={workerInfo.category} />
            </div>
          </div>
          {/* Sliding Drawer */}
          {/* {selectedDayDate.day} */}
          <AnimatePresence>
            {isDrawerOpen && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-full w-[520px] overflow-x-auto scroll-smooth bg-white shadow-2xl px-4 py-5 z-[999] border-l-[2px] border-gray-200"
              >
                <img src={assets.z} alt="" className="w-8" />
                <div className="mt-3 bg-gray-200 p-2 rounded-xl">
                  {userLocation?.latitude &&
                  userLocation?.longitude &&
                  workerInfo?.location?.coordinates?.[0] !== undefined &&
                  workerInfo?.location?.coordinates?.[1] !== undefined ? (
                    <GoogleMapComponent
                      userLocation={{
                        lat: Number(userLocation.latitude),
                        lng: Number(userLocation.longitude),
                      }}
                      workerLocation={{
                        lat: Number(workerInfo.location.coordinates[1]),
                        lng: Number(workerInfo.location.coordinates[0]),
                      }}
                    />
                  ) : (
                    <p>Loading map...</p>
                  )}
                </div>
                <div className="coupons-details font-inter">
                  <p className="flex items-center gap-2 font-extralight text-sm text-gray-600 tracking-tighter mt-2 mb-3 font-inter ">
                    <LuMapPinCheck className="text-2xl text-primary" />
                    {userAddress}{" "}
                  </p>
                  <div className="coupons flex items-center gap-3 py-2 justify-center mx-auto  w-[300px] rounded-full bg-gradient-to-r from-blue-300 via-primary/90 to-blue-700 mt-4 mb-8 shadow-lg">
                    <img src={assets.gameCoins} alt="" className="w-10" />
                    <p className=" capitalize text-[17px] text-white tracking-tighter font-[500]">
                      use coins to avail discounts!
                    </p>
                  </div>
                </div>
                {/* bookings details */}
                <div className="px-6 font-inter pt-4">
                  <motion.table
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Table Header */}
                    <thead>
                      <tr className=" border-b border-gray-300">
                        <th className="text-[16px] text-gray-600 font-medium py-1 px-4 text-left">
                          Service
                        </th>
                        <th className="text-[16px] text-gray-600 font-medium py-1 px-4 text-left">
                          Price
                        </th>
                      </tr>
                    </thead>

                    {/* ----------Table Body----------- */}
                    <tbody>
                      {selectedServiceDetails.map((service, index) => (
                        <motion.tr
                          key={service._id}
                          className="border-b border-gray-100 last:border-none mt-3 bg-gray-50 rounded-xl"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <td className="text-[15px] text-gray-800 font-light tracking-tight py-2 px-4">
                            {service.name}
                          </td>
                          <td className="text-[16px] text-gray-800 font-medium tracking-tight py-2 px-4">
                            ₹{service.price}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </motion.table>

                  <motion.div
                    className="mt-5 flex justify-between items-center bg-gray-200/50 px-6 py-2  rounded-full max-w-56 mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-[14px]">Services Price:</span>
                    <span>₹{servicePrice}</span>
                  </motion.div>
                </div>
                <p className="worker-id text-gray-600 font-light tracking-tighter font-inter text-[14px] mt-8 mb-4">
                  Worker ID: {workerInfo?._id}
                </p>
                <div className="worker-Details mx-auto  flex  gap-6  font-inter font-medium text-[15px] bg-primary/90 text-white px-2 py-2   max-w-[22rem] rounded-lg mb-12">
                  <img
                    src={workerInfo?.profileImage}
                    alt=""
                    className="object-cover w-12 rounded-full border-[1px] border-gray-200 bg-white"
                  />
                  <div className="flex flex-col">
                    <p className=" capitalize">{workerInfo?.name}</p>
                    <p className="">{workerInfo?.phone}</p>
                  </div>

                  <p className=" capitalize">{workerInfo?.category}</p>
                  <p className="text-[16px] text-white">₹{workerInfo?.price}</p>
                </div>

                {/* --------PRICING AND BOOKING DETAILS-------------- */}
                <div className="px-10 mx-auto">
                  <div className="flex items-center gap-5">
                    <p className="text-[15px] font-inter flex items-center gap-3">
                      <LuCalendarClock className="text-xl text-primary" />
                      {selectedDayDate.date} {selectedDayDate.month}{" "}
                      {selectedDayDate.year}
                    </p>

                    <p className="border-[1px] bg-gray-100 text-gray-600 font-inter font-medium rounded-full w-fit px-2 py-1 text-[14px]">
                      {slotTime ? slotTime : "Select time"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2  border-[1px] rounded-full border-gray-200 w-fit px-3 py-1 mt-2 mb-3">
                    <PiCoinsLight className="text-xl text-yellow-500" />
                    <p className="text-gray-600 font-medium">
                      {user?.coins ?? 0.0}
                    </p>
                    {user?.coins >= 10 ? (
                      <p className="">use coins</p>
                    ) : (
                      <p className="text-200 font-extralight text-sm">
                        use coins
                      </p>
                    )}
                  </div>
                  {/*-------------- Pricing--- */}
                  <div className="flex items-center justify-between border-b-[1px] border-gray-100 text-gray-800 mb-2 font-inter">
                    <p className="text-[15px] tracking-tight">Service Price:</p>
                    <p className="">₹{servicePrice}</p>
                  </div>
                  <div className="flex items-center justify-between border-b-[1px] border-gray-100 text-gray-800 mb-2 font-inter">
                    <p className="text-[15px] tracking-tight">Visiting Fee:</p>
                    <p className="">₹{workerInfo?.price}</p>
                  </div>
                  <div className="flex items-center justify-between border-b-[1px] border-gray-100 text-gray-800 mb-2 font-inter">
                    <p className="text-[15px] tracking-tight">
                      Comission & Tax:
                    </p>
                    <p className="">₹{commission}</p>
                  </div>
                  <div className="flex items-center justify-between border-b-[1px] border-gray-100 text-gray-800 mb-2 font-inter">
                    <p className="text-[15px] tracking-tight">Platform Fee:</p>
                    <p className="">₹10</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 bg-gray-100 px-6 py-2 w-44 mx-auto rounded-full font-inter">
                    <p className="text-[14px] tracking-tight ">TOTAL:</p>
                    <p className="">₹{totalPrice}</p>
                  </div>
                </div>
                {/* payment -------------- */}
                <PaymentButton
                  // totalPrice={totalPrice}
                  userId={user._id}
                  workerId={workerInfo._id}
                />
                {/* Close Button */}
                <motion.button
                  onClick={() => setIsDrawerOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <IoClose className="text-3xl text-primary" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CONGRATS DIV */}
          <div
            className={` fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ${
              showDiv ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="body bg-white rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 scale-100 font-inter w-[35rem]">
              <div className="top py-3 bg-gradient-to-r from-blue-500 from-20% via-blue-700 via-70% to-blue-500 to-100% flex flex-col gap-2 items-center justify-center">
                <div className="bg-gray-200/30 p-2 rounded-full">
                  <LuCalendarCheck className="text-3xl text-white  " />
                </div>

                <p className="text-white tracking-tight text-[24px]">
                  Request Sent
                </p>
                <div className="flex items-center gap-3">
                  <p className=" capitalize text-[18px] text-gray-300 tracking-tight">
                    Your booking request is being processed
                  </p>
                  <p className="w-3 h-3  rounded-full bg-yellow-500 animate-pulse transition-all duration-1000"></p>
                </div>
              </div>
              <div className="middle bg-white px-4">
                <p className="text-gray-500 text-sm my-3 text-center">
                  Redirecting in <span className="font-bold">{countdown}</span>{" "}
                  seconds...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LuCalendarCheck className="text-3xl text-primary" />
                    <div className="flex flex-col ">
                      <p className="text-primary tracking-tighter font-medium">
                        Booking ID
                      </p>
                      <p className="text-[15px] tracking-tighter text-gray-500">
                        {currentBookingId}
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-500 rounded-full px-4 w-fit py-1">
                    <p className="text-white text-[15px] font-[400] flex items-center gap-2">
                      <LuClock10 className="text-xl" /> Pending
                    </p>
                  </div>
                </div>
                <hr className="w-[90%] mx-auto border-b-[.8px] border-primary/20 my-5" />
                <div className="bottom flex items-center justify-between mb-5">
                  <img src={atm} alt="" className="w-28" />
                  <div className="flex flex-col items-center">
                    <p className=" capitalize text-[22px] tracking-tighter text-gray-800 font-medium mb-3">
                      Congratulations ! {user?.name}
                    </p>
                    <div className="flex items-center w-fit bg-yellow-300 px-4 rounded-full py-2 ">
                      <div className="flex flex-col items-center gap-1 ">
                        <p className="text-black ">Rewards</p>
                        <p className="text-gray-800 tracking-tighter text-sm">
                          Will be credited after confirmation
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <img src={coins} alt="" className="w-10" />
                        <p className="text-4xl font-medium text-white">
                          3.5 <span className="text-lg text-black">coins</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------------ */}
        </div>
      ) : (
        <div>Worker not found</div>
      )}
    </>
  );
};

export default NewMyBooking;
