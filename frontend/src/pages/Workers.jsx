import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MorphingTextDemo } from "../components/MorphingAnimation.jsx";
import { AuroraText } from "../components/ui/aurora-text.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets.js";
import Rating from "@mui/material/Rating";
import MinimumDistanceSlider from "../components/Slider.jsx";
import { useLocationContext } from "../context/LocationContext";
import { useAppContext } from "../context/AppContext";
import { LuZap } from "react-icons/lu";
import { FiPhoneCall } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [totalWorkersCount, setTotalWorkersCount] = useState(0);
  const [filteredWorkersCount, setFilteredWorkersCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [enlargedWorker, setEnlargedWorker] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Added search state
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useAppContext();
  // filters ----------------------------------
  const [sortVisible, setSortVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [availVisible, setAvailVisible] = useState(false);
  const [availOption, setAvailOption] = useState(null);
  const [priceVisible, setPriceVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 150]); // Initial min-max price
  const { userLocation } = useLocationContext();

  const handleCheckboxChange = (value) => {
    setAvailOption(value);
  };
  // Filter State to make it block or hidden
  const [filter, setFilter] = useState(false);
  const handleFilter = () => {
    setFilter(!filter);
  };
  const fetchWorkers = async (page = 1) => {
    try {
      if (!userLocation) {
        console.warn("User location is not available yet");
        return;
      }

      let url = `http://localhost:8080/api/workers?page=${page}&limit=7&latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`;

      if (category) {
        url += `&category=${category}`;
      }
      if (sortOption) {
        url += `&sort=${sortOption}`;
      }
      if (availOption) {
        url += `&available=${availOption}`;
      }
      if (priceRange && priceRange.length === 2) {
        const [minprice, maxprice] = priceRange;
        if (minprice !== null && maxprice !== null) {
          url += `&minPrice=${minprice}&maxPrice=${maxprice}`;
        }
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // console.log("Frontend Received Data:", data); //--------- Debugging

      setWorkers(data.workers);
      setTotalWorkersCount(data.totalWorkers);
      setFilteredWorkersCount(data.filteredWorkers);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  useEffect(() => {
    if (userLocation) {
      fetchWorkers();
    }
  }, [category, sortOption, availOption, priceRange, userLocation]);

  //---------
  const handleEnlargeClick = (workerId) => {
    setEnlargedWorker(enlargedWorker === workerId ? null : workerId);
  };
  // Filter workers based on search term
  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //---------------------------------------------------
  //------------------------CATEGORY CLICK=-------------------
  const handleCategoryClick = (selectedCategory) => {
    if (category === selectedCategory) {
      navigate("/workers");
    } else {
      navigate(`/workers/${selectedCategory}`);
    }
  };
  //---------------------------------------------------------------------
  //-----------------------INSTANT BOOKING
  //---------------------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const handleInstantBooking = () => {
    if (!category) {
      toast.warning("Please select a category first!");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLocation = [
          position.coords.longitude,
          position.coords.latitude,
        ];

        try {
          const response = await axios.post(
            "http://localhost:8080/api/bookings/instant",
            {
              userId: user._id,
              category,
              userLocation,
            }
          );

          // console.log("✅ Booking Response:", response.data);
          toast.success("Instant booking successful!");
          // Redirect after 2 seconds
          setTimeout(() => {
            navigate("/bookings");
          }, 2000);
        } catch (error) {
          console.error("❌ Booking Error:", error.response?.data || error);
          toast.error(error.response?.data?.message || "Booking failed!");
        } finally {
          setLoading(false); // Hide loading indicator
        }
      },
      (error) => {
        console.error("❌ Location Error:", error);
        toast.warning(
          "Failed to get location. Please enable location services."
        );
        setLoading(false);
      }
    );
  };
  //-------------------------------------------------------------------
  //--------------------------DEBUGGING LOGS
  //-------------------------------------------------------------------
  console.log("category--->", category);
  //-------------------
  return (
    <div className="relative flex-1 border-[1px] bg-stone-50 h-[90vh] rounded-t-xl pt-4 pb-2 overflow-hidden">
      <div className="parent-container relative flex flex-row justify-between gap-6 w-[95%] mx-auto">
        {/* LEFT SIDE -> CATEGORIES AND AD */}
        <div className="left-side max-w-[24%] min-w-[24%] font-inter flex flex-col">
          <p className="text-[20px] font-light text-gray-800 text-center mb-2 tracking-wider">
            Categories:
          </p>
          <div className="flex flex-col max-w-[90%] gap-5 py-4 px-4 bg-white rounded-xl shadow-md h-[calc(90vh-320px)] overflow-y-auto mb-4">
            <p
              onClick={() => handleCategoryClick("plumber")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "plumber" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.VscTools className="text-[18px]" /> Plumber
            </p>
            <p
              onClick={() => handleCategoryClick("carpenter")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "carpenter" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.LuDrill className="text-[18px]" /> Carpenter
            </p>
            <p
              onClick={() => handleCategoryClick("electrician")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "electrician" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.LuBriefcase className="text-[18px]" /> Electrician
            </p>
            <p
              onClick={() => handleCategoryClick("technician")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "technician" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.LuBriefcase className="text-[18px]" /> Technician
            </p>
            <p
              onClick={() => handleCategoryClick("painters")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "painters" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.PiPaintRoller className="text-[18px]" /> Painter
            </p>
            <p
              onClick={() => handleCategoryClick("cleaner")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "cleaner" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.LiaBroomSolid className="text-[18px]" /> Cleaner
            </p>
            <p
              onClick={() => handleCategoryClick("gardener")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "gardener" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.GiVacuumCleaner className="text-[18px]" /> Gardener
            </p>
          </div>
          {/* AD */}

          <div className=" bg-gradient-to-br from-primary via-primaryLight to-blue-500 px-4 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300  cursor-pointer">
            <p className="text-xl font-light text-white/90 whitespace-nowrap text-[min(5vw,1.25rem)] mb-2 ">
              Payments?
            </p>

            <p className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-[24px] font-bold whitespace-nowrap animate-[pulse_2s_ease-in-out_infinite]">
              Digital Wallet
            </p>

            <div className="flex items-center justify-center mt-1 gap-2">
              <p className="font-light whitespace-nowrap text-[min(5vw,1.25rem)] text-white/90">
                Pay with
              </p>
              <img
                src={assets.wallet}
                className="w-24 transform transition-all duration-300 hover:scale-110 hover:-rotate-6 active:scale-95"
                alt="Digital Wallet"
              />
            </div>
          </div>
        </div>
        {/* RIGHT SIDE -> WORKERS ------------------------------------*/}
        <div className="Right-Side flex-1 font-inter">
          {category ? (
            <p className="flex items-center justify-center pr-24 text-[25px] font-[400] text-gray-800 capitalize tracking-wider mb-4">
              Browse all
              <AuroraText className="ml-2 font-outfit">{category}</AuroraText>
            </p>
          ) : (
            <p className="flex items-center justify-center pr-24 text-[20px] font-[400] text-gray-800 tracking-wide mb-4 capitalize">
              Hey {user.name} ! Lets start booking , try{" "}
              <span className="ml-3 text-primary">
                <MorphingTextDemo />
              </span>
            </p>
          )}
          {/* search bae , filter and instant booking */}
          <div className="flex items-center gap-5 mb-2">
            <div className="flex items-center bg-gray-200 w-full rounded-full px-6 gap-2 hover:bg-gray-100 transition-all">
              <assets.IoIosSearch className="text-[20px] cursor-pointer hover:scale-110 transition-all" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Try Searching Worker Name..."
                className="w-full px-3 py-2 bg-inherit focus:outline-none focus:ring-0"
              />
            </div>
            {/* Filter Button */}
            <div className="relative">
              <div
                onClick={() => handleFilter()}
                className="bg-white  flex items-center gap-2 px-5 py-2 rounded-md border-[1px] border-primaryLight cursor-pointer"
              >
                <assets.LuSettings2 className="text-primary text-[20px]" />
                <button className="text-black text-[15px] font-[400]">
                  Filter
                </button>
              </div>
              <div
                className={`absolute  top-12 right-0 ${
                  filter ? "block" : "hidden"
                } bg-white px-3  py-2 rounded-lg shadow-xl w-[16rem] z-50 overflow-hidden`}
              >
                <p className="text-[16px] text-primary font-[500] tracking-tight underline underline-offset-4 decoration-primaryLight text-center mb-4">
                  Apply Filters:
                </p>
                <div className="filters flex flex-col gap-2">
                  <div
                    onClick={() => setSortVisible(!sortVisible)}
                    className="sort px-2 py-1 flex justify-between items-center hover:bg-primary transition-all hover:scale-105 hover:text-white text-gray-800 duration-200 cursor-pointer border-b-[1px] border-gray-200 "
                  >
                    <p className="mb-1 capitalize text-[15px] font-[400] ">
                      Sort By:
                    </p>
                    <assets.MdOutlineArrowDropDown className="text-[25px] text-primary" />
                  </div>
                  {/* sort by */}
                  <div
                    className={`flex flex-col gap-2 ${
                      sortVisible ? "block" : "hidden"
                    }`}
                  >
                    <p
                      onClick={() => {
                        setSortOption("price_asc");
                        setFilter(!filter);
                      }}
                      className="flex items-center gap-2 text-[14px] font-light font-inter hover:bg-gray-100 hover:text-gray-800 p-2 rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <assets.MdOutlineArrowDropDown className="text-[1.3rem]" />
                      Price: Low to High
                    </p>
                    <p
                      onClick={() => {
                        setSortOption("stars_desc");
                        setFilter(!filter);
                      }}
                      className="flex items-center gap-2 text-[14px] font-light font-inter hover:bg-gray-100 hover:text-gray-800 p-2 rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <assets.MdOutlineArrowDropUp className="text-[1.3rem]" />
                      Stars: High to Low
                    </p>
                  </div>
                  {/* Availability-------------------------- */}
                  <div
                    onClick={() => {
                      setAvailVisible(!availVisible);
                    }}
                    className="sort px-2 py-1 flex justify-between items-center hover:bg-primary transition-all hover:scale-105 hover:text-white text-gray-800 duration-200 cursor-pointer border-b-[1px] border-gray-200 "
                  >
                    <p className="mb-1 capitalize text-[15px] font-[400] ">
                      Availability
                    </p>
                    <assets.MdOutlineArrowDropDown className="text-[25px] text-primary" />
                  </div>
                  <div className={`px-8 ${availVisible ? "block" : "hidden"}`}>
                    <p className="capitalize text-[14px] font-light mb-2">
                      Show Available Workers:
                    </p>
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => {
                          setAvailOption("true");
                          // setFilter(!filter);
                        }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <input
                            type="checkbox"
                            checked={availOption === "true"}
                            onChange={() => handleCheckboxChange("true")}
                          />
                        </motion.div>
                        <p className="capitalize text-[14px] font-light">Yes</p>
                      </div>
                      <div
                        onClick={() => {
                          setAvailOption("false");
                          // setFilter(!filter);
                        }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <input
                            type="checkbox"
                            checked={availOption === "false"}
                            onChange={() => handleCheckboxChange("false")}
                          />
                        </motion.div>
                        <p className="capitalize text-[14px] font-light">No</p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setPriceVisible(!priceVisible);
                    }}
                    className="sort px-2 py-1 flex justify-between items-center hover:bg-primary transition-all hover:scale-105 hover:text-white text-gray-800 duration-200 cursor-pointer border-b-[1px] border-gray-200 "
                  >
                    <p className="mb-1 capitalize text-[15px] font-[400] ">
                      Price Range
                    </p>
                    <assets.MdOutlineArrowDropDown className="text-[25px] text-primary" />
                  </div>
                  <div className={`${priceVisible ? "block" : "hidden"} px-2`}>
                    <p className="capitalize text-[14px] font-light mb-2">
                      Select Price Range:
                    </p>

                    <MinimumDistanceSlider
                      value={priceRange}
                      setValue={setPriceRange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* INSTANT BOOKING */}
            <div className="flex items-center justify-center font-inter ">
              <div
                className="group relative cursor-pointer w-40 border bg-white rounded-full overflow-hidden text-black font-[400] hover:shadow-lg transition-shadow duration-300 capitalize text-[15px] "
                onClick={handleInstantBooking}
              >
                <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-2 py-2">
                  Instant Book
                </span>
                <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <span>{category ? category : "Lets Go"}</span>
                  <LuZap className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#3b75ef] scale-[1] dark:group-hover:bg-[#3b75ef] group-hover:bg-[#3b75ef] group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
              </div>
            </div>
          </div>
          {/* ------------------------All the filters ----------------- */}
          <div className="w-full h-[35px]  rounded-xl mt-1 mb-1">
            <div className="flex items-center justify-start gap-6">
              {category && (
                <p
                  onClick={() => navigate("/workers")}
                  className="text-[14px] font-extralight text-gray-600 italic flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full cursor-pointer"
                >
                  {category}{" "}
                  <assets.RxCross2 className="text-black text-[16px]" />
                </p>
              )}

              {sortOption && (
                <p
                  onClick={() => {
                    setSortOption(null);
                    // setFilter(!filter);
                  }}
                  className="text-[14px] font-extralight text-gray-600 italic flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full cursor-pointer"
                >
                  {sortOption}{" "}
                  <assets.RxCross2 className="text-black text-[16px]" />
                </p>
              )}
              {availOption === "true" && (
                <p
                  onClick={() => {
                    setAvailOption(null);
                    // setFilter(!filter);
                  }}
                  className="text-[14px] font-extralight text-gray-600 italic flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full cursor-pointer"
                >
                  {availOption === "true" && "Show Available "}
                  {availOption === "true" && (
                    <assets.RxCross2 className="text-black text-[16px]" />
                  )}
                </p>
              )}
              {priceRange && (priceRange[0] !== 0 || priceRange[1] !== 150) && (
                <p
                  onClick={() => {
                    setPriceRange([0, 150]);
                  }}
                  className="text-[14px] font-extralight text-gray-600 italic flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full cursor-pointer"
                >
                  Range: {priceRange[0]} - {priceRange[1]}
                  <assets.RxCross2 className="text-black text-[16px]" />
                </p>
              )}
            </div>
            {!category &&
              !sortOption &&
              availOption === null &&
              priceRange[0] === 0 &&
              priceRange[1] === 150 && (
                <div className="text-gray-500 font-light italic text-center text-[18px] opacity-50 font-outfit">
                  ! No filters are applied
                </div>
              )}
          </div>
          {/* All selected Workers--------- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{
                opacity: 0,
                x: currentPage > 1 ? 50 : -50,
                scale: 1.1,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: currentPage > 1 ? -50 : 50, scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col gap-3 font-inter  bg-white rounded-2xl px-6 ">
                {totalWorkersCount !== undefined &&
                filteredWorkersCount !== undefined ? (
                  <p className="text-gray-500 font-extralight text-sm tracking-tighter font-outfit">
                    Showing <strong>( {filteredWorkersCount} )</strong> Results
                    of <strong>( {totalWorkersCount} )</strong>
                  </p>
                ) : (
                  <p className="text-gray-600">Loading workers...</p>
                )}
                {workers.length === 0 ? (
                  <div className="flex flex-col gap-3">
                    <div className="bg-gray-100 pl-2 pr-6 py-[6px] rounded-lg hover:bg-gray-200 transition-all hover:scale-105 duration-200 flex items-center justify-between">
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse transition-all duration-700"></div>
                      <div className="w-60 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-20 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-7 h-7 rounded-full bg-gray-300  animate-pulse transition-all duration-700"></div>
                    </div>
                    <div className="bg-gray-100 pl-2 pr-6 py-[6px] rounded-lg hover:bg-gray-200 transition-all hover:scale-105 duration-200 flex items-center justify-between">
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse transition-all duration-700"></div>
                      <div className="w-60 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-20 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-7 h-7 rounded-full bg-gray-300  animate-pulse transition-all duration-700"></div>
                    </div>{" "}
                    <div className="bg-gray-100 pl-2 pr-6 py-[6px] rounded-lg hover:bg-gray-200 transition-all hover:scale-105 duration-200 flex items-center justify-between">
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse transition-all duration-700"></div>
                      <div className="w-60 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-20 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-7 h-7 rounded-full bg-gray-300  animate-pulse transition-all duration-700"></div>
                    </div>{" "}
                    <div className="bg-gray-100 pl-2 pr-6 py-[6px] rounded-lg hover:bg-gray-200 transition-all hover:scale-105 duration-200 flex items-center justify-between">
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse transition-all duration-700"></div>
                      <div className="w-60 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-20 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-7 h-7 rounded-full bg-gray-300  animate-pulse transition-all duration-700"></div>
                    </div>{" "}
                    <div className="bg-gray-100 pl-2 pr-6 py-[6px] rounded-lg hover:bg-gray-200 transition-all hover:scale-105 duration-200 flex items-center justify-between">
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse transition-all duration-700"></div>
                      <div className="w-60 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-20 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-7 h-7 rounded-full bg-gray-300  animate-pulse transition-all duration-700"></div>
                    </div>
                    <div className="bg-gray-100 pl-2 pr-6 py-[6px] rounded-lg hover:bg-gray-200 transition-all hover:scale-105 duration-200 flex items-center justify-between">
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse transition-all duration-700"></div>
                      <div className="w-60 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-20 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-7 h-7 rounded-full bg-gray-300  animate-pulse transition-all duration-700"></div>
                    </div>
                    <div className="bg-gray-100 pl-2 pr-6 py-[6px] rounded-lg hover:bg-gray-200 transition-all hover:scale-105 duration-200 flex items-center justify-between">
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse transition-all duration-700"></div>
                      <div className="w-60 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-20 h-7 rounded-xl bg-gray-300  animate-pulse transition-all duration-700"></div>
                      <div className="w-7 h-7 rounded-full bg-gray-300  animate-pulse transition-all duration-700"></div>
                    </div>
                  </div>
                ) : (
                  filteredWorkers.map((worker) => (
                    <div
                      key={worker._id}
                      className="bg-gray-100 pl-2 pr-6 py-[6px] rounded-lg
                       hover:bg-gray-200 transition-all hover:scale-105 duration-200"
                    >
                      <div className="flex flex-row gap-2 justify-between items-center">
                        <img
                          src={worker.profileImage}
                          alt={worker.name}
                          className="w-10 h-10 rounded-full bg-white border-[1px] border-primaryLight"
                        />
                        <h2 className="capitalize text-[14px] font-[400]">
                          {worker.name}
                        </h2>
                        <p className="capitalize text-[14px] font-light">
                          {worker.category}
                        </p>
                        <Rating
                          name={`rating-${worker._id}`}
                          size="small"
                          defaultValue={worker.stars}
                          precision={0.1}
                          readOnly
                        />
                        {worker.available ? (
                          <div className="flex items-center gap-1 bg-white px-4 py-[2px] rounded-full">
                            <p className="text-green-500 text-sm font-light">
                              Available
                            </p>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 bg-white px-4 py-[2px] rounded-full">
                            <p className="text-red-500 text-sm font-light">
                              Available
                            </p>
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          </div>
                        )}
                        <p className="text-sm font-medium text-gray-800">
                          ₹ {worker.price}
                        </p>
                        <div
                          onClick={() => handleEnlargeClick(worker._id)}
                          className="flex items-center bg-white p-2 rounded-full cursor-pointer"
                        >
                          <assets.ImEnlarge2 className="text-primary text-[20px]" />
                        </div>
                      </div>
                      {enlargedWorker === worker._id && (
                        <div className="bg-inherit px-20 pt-1 flex items-center justify-between border-t border-gray-200">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() =>
                                navigate(`/messages/${worker._id}`)
                              }
                              className="flex items-center gap-1 font-medium text-[15px] text-primary hover:scale-105 transition-all duration-200 px-2 py-1.5 "
                            >
                              <assets.BsChatDots className="text-lg" />
                              Chat
                            </button>

                            <p className="text-[14px] font-[400] text-gray-800 flex items-center gap-2 font-inter">
                              <FiPhoneCall className="text-primary text-lg" />{" "}
                              {worker.phone}
                            </p>
                          </div>
                          <button
                            onClick={() => navigate(`/booking/${worker._id}`)}
                            className="px-5 py-1.5 text-sm font-medium bg-gradient-to-r from-primary to-primaryLight text-white rounded-lg hover:shadow-lg transition-shadow"
                            // disabled={!worker.available}
                          >
                            Book Now
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* _________________Pagination ----------------- ABSOLUTE */}
        <div className="pagination absolute -bottom-2 right-[40%] translate-x-[40%]">
          <div className="pagination flex gap-10 justify-center items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchWorkers(currentPage - 1)}
              className={`${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <assets.LuChevronLeft className="text-primary text-[25px] cursor-pointer hover:scale-110 transition-all hover:bg-primaryLight rounded-full hover:text-white" />
            </button>

            <span className="text-[14px] font-light">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchWorkers(currentPage + 1)}
              className={`${
                currentPage === totalPages ? "opacity-50 cursor-none" : ""
              }`}
            >
              <assets.LuChevronRight className="text-primary text-[25px] cursor-pointer hover:scale-110 transition-all hover:bg-primaryLight rounded-full hover:text-white" />
            </button>
          </div>
        </div>

        {/* LOADING.... */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 ">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-2 font-inter">
              <p className="text-lg font-medium text-primary">
                Processing Booking...
              </p>
              <div className="mt-2 w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workers;
