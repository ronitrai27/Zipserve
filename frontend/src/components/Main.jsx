import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import WorkerCards from "./WorkerCards.jsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Maps from "./MyLocation";
import Chatbot from "../chatbot/chatbot.jsx";
import { LocationContext } from "../context/LocationContext";
import { useBooked } from "../context/BookedContext";
import {
  LuCalendarSearch,
  LuCalendar,
  LuCircleFadingPlus,
  LuMapPin,
  LuMapPinOff,
  LuMapPinCheckInside,
  LuArrowUpRight,
  LuCalendarClock,
  LuCalendarCheck,
} from "react-icons/lu";
import { CheckCircle2 } from "lucide-react";
const Main = () => {
  const navigate = useNavigate();
  const { theme, user } = useAppContext();
  const { userAddress } = useContext(LocationContext);
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [visible, setVisible] = useState(false);
  const { userBookDetails } = useBooked();

  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  //----------------------------------------------------
  // const clickedBookDetails = userBookDetails.find(
  //   (booking) => booking._id === clickedBookingId
  // );

  const statuses = [
    {
      name: "pending",
      icon: LuCalendarClock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-500",
    },
    {
      name: "confirmed",
      icon: LuCalendarCheck,
      color: "text-green-500",
      bgColor: "bg-green-100",
      borderColor: "border-green-500",
    },
    {
      name: "in-progress",
      icon: CheckCircle2,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-500",
    },
  ];

  const firstBooking = userBookDetails[0];
  const currentIndex = firstBooking
    ? statuses.findIndex(
        (s) => s.name.toLowerCase() === firstBooking.status.toLowerCase()
      )
    : 0;

  //----------------------------------------------------
  // console.log("main.jsx -------->", userBookDetails[0]);
  //----------------------------------------------------
  return (
    <div
      className={`flex-1 w-full border-[1.6px]  ${
        theme ? "border-gray-200 bg-gray-50" : "border-gray-900 bg-gray-100"
      } rounded-t-lg rounded-b-md px-8 py-[1.1rem]`}
    >
      <div className="flex justify-between ">
        <div className="flex flex-col border border-gray-200 h-[calc(100vh-7rem)] max-w-[34%]  w-[32%]  bg-white rounded-lg shadow-md">
          <div className="flex flex-col ">
            <h1 className="text-gray-800 text-[18px] font-medium font-inter text-center  mt-2">
              Browse Workers
            </h1>
            {/* Category Filter */}
            <div className="flex justify-between items-center pr-16 ">
              <StyledWrapper>
                <div className="menu">
                  <div className="item">
                    <a href="#" className="link">
                      <span className="capitalize font-[400] text-[17px]">
                        {category ? category : "Our Services"}
                      </span>
                      <svg viewBox="0 0 360 360" xmlSpace="preserve">
                        <g id="SVGRepo_iconCarrier">
                          <path
                            id="XMLID_225_"
                            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                          />
                        </g>
                      </svg>
                    </a>
                    <div className="submenu">
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("")}
                        >
                          All Categories
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("electrician")}
                        >
                          Electrician
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("plumber")}
                        >
                          Plumber
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("carpenter")}
                        >
                          Carpenter
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("technician")}
                        >
                          Technician
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("painters")}
                        >
                          Painters
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("cleaner")}
                        >
                          Cleaner
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("gardener")}
                        >
                          Gardener
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </StyledWrapper>
              {/* Sorting Filter */}
              <div className="relative">
                <assets.LuFilter
                  className="text-[1.45rem] cursor-pointer  text-primary hover:scale-110 transition-all"
                  onClick={() => setVisible(!visible)}
                />
                <div
                  className={`${
                    visible ? "block" : "hidden"
                  } absolute z-50 top-7 -right-4 bg-white border text-gray-800 border-gray-200 rounded-lg shadow-lg w-52 px-3 py-2 transition-all duration-200 ease-in-out`}
                >
                  <p className="text-[1.1rem] font-medium font-inter mb-3 text-gray-700">
                    Sort By:
                  </p>
                  <div className="flex flex-col gap-1">
                    <p
                      onClick={() => {
                        setSortOption("price_asc");
                        setVisible(!visible);
                      }}
                      className="flex items-center gap-2 text-[.95rem] font-light font-inter hover:bg-primary hover:text-white p-2 rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <assets.MdOutlineArrowDropDown className="text-[1.3rem]" />
                      Price: Low to High
                    </p>
                    <p
                      onClick={() => {
                        setSortOption("stars_desc");
                        setVisible(!visible);
                      }}
                      className="flex items-center gap-2 text-[.95rem] font-light font-inter hover:bg-primary hover:text-white p-2 rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <assets.MdOutlineArrowDropUp className="text-[1.3rem]" />
                      Stars: High to Low
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-[90%] mx-auto mt-3 mb-2 border-gray-300 border-[.7px]" />
          </div>
          <div className="overflow-y-auto h-[calc(100vh-15rem)] scroll-smooth">
            <WorkerCards category={category} sortOption={sortOption} />
          </div>

          <div className="flex items-center justify-center my-2">
            <div
              className="group relative cursor-pointer w-32 border bg-white rounded-full overflow-hidden text-black font-semibold hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate("/workers")}
            >
              <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-2 py-1">
                More
              </span>
              <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <span>More</span>
                <LuArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#3b75ef] scale-[1] dark:group-hover:bg-[#3b75ef] group-hover:bg-[#3b75ef] group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
            </div>
          </div>
        </div>
        {/* --------------------------MAP area -------------------------- */}
        <div className="map-div w-[65%] h-[calc(100vh-7rem)] z-10 bg-white p-2 rounded-lg relative">
          <div className="w-full rounded-xl overflow-hidden relative ">
            <Maps />

            {/* user address--------- */}
            <div className="absolute top-1 left-2">
              <div className="group relative flex items-center overflow-hidden rounded-lg transition-all duration-300  hover:bg-primary text-white hover:shadow-md opacity-80 hover:opacity-90 p-1">
                {/* Icon with scaling effect */}
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center ">
                  <LuMapPinCheckInside className="text-primary text-[28px]  hover:cursor-pointer transition-transform duration-300 hover:scale-110 " />
                </div>

                {/* Address appearing on hover */}
                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pr-2 pl-3 text-[15px] font-[400] tracking-tight">
                  {userAddress}
                </p>
              </div>
            </div>
            {/* --------------------------------bookings------------------ */}
            <div className="absolute bottom-3 left-3 bg-white text-gray-800 font-inter  opacity-80 hover:opacity-100 shadow-xl rounded-lg px-4 w-auto py-2">
              {userBookDetails.length > 0 ? (
                <div className="">
                  <p className="flex items-center gap-2 text-[15px] font-[400] tracking-tight select-text text-gray-600">
                    <LuCalendarCheck className="text-xl text-primary" /> ID:{" "}
                    {userBookDetails[0]._id}{" "}
                  </p>
                  {/* TIMELINE */}
                  <div className="relative mt-5">
                    <div className="flex items-center justify-between">
                      {statuses.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index <= currentIndex;
                        const isCurrentStep = index === currentIndex;

                        return (
                          <div
                            key={step.name}
                            className="flex flex-col items-center relative z-10 font-inter capitalize"
                          >
                            <div
                              className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  border-2 transition-all duration-300
                  ${isActive ? step.borderColor : "border-gray-400"}
                  ${isActive ? step.bgColor : "bg-gray-100"}
                  ${isCurrentStep ? "scale-110" : ""}
                `}
                            >
                              <Icon
                                className={`w-5 h-5 ${
                                  isActive ? step.color : "text-gray-400"
                                }`}
                              />
                            </div>
                            <p
                              className={`text-xs mt-2 font-medium ${
                                isActive ? "text-gray-900" : "text-gray-400"
                              }`}
                            >
                              {step.name}
                            </p>
                          </div>
                        );
                      })}

                      <div className="absolute top-5 left-0 right-0 h-0.5 z-0">
                        <div className="absolute w-full h-full bg-gray-200"></div>
                        <div
                          className="absolute h-full transition-all duration-300 bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500"
                          style={{
                            width:
                              currentIndex === 0
                                ? "0%"
                                : currentIndex === 1
                                ? "50%"
                                : "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  {/* ----------------- */}
                  <div className="my-2 font-inter px-2">
                    <p className="text-[15px] font-[400] tracking-tight capitalize">
                      hey {user?.name}, your current booking is{" "}
                      <span className="font-medium text-primary uppercase">
                        {userBookDetails[0].status}
                      </span>
                    </p>
                  </div>
                  <p className=" capitalize text-center text-[14px] font-light font-inter">
                    manage all your bookings
                  </p>

                  {/* --------------- */}
                  <div className="flex items-center justify-center mt-2">
                    <div
                      className={`group relative cursor-pointer w-32 border bg-white rounded-full overflow-hidden text-black font-semibold hover:shadow-lg transition-shadow duration-300`}
                      onClick={() => navigate("/bookings")}
                    >
                      <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-2 py-1">
                        Bookings
                      </span>
                      <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                        <span>Lets Go!</span>
                        <LuCalendar className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                      <div
                        className={`absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg  scale-[1] dark:group-hover:bg-primary group-hover:bg-primary group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0 bg-primary`}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="container">
                  <div className=" flex items-center justify-between px-3">
                    <p className="text-[18px] font-[400] tracking-tight ">
                      Current Bookings
                    </p>
                    <LuCalendar className="text-3xl text-primary " />
                  </div>
                  <hr className="text-gray-300 border-b-[.8px] my-3" />
                  <div className="flex flex-col px-6 items-center gap-2">
                    <LuCalendarSearch className="text-2xl text-primary " />
                    <p className="text-[16px] font-[400] tracking-wide">
                      No Bookings Found
                    </p>
                    <p className=" capitalize text-[14px] font-light text-gray-600 text-center leading-5 tracking-tight">
                      Your calender is lookig empty. <br /> ready to fill it
                      with amazing experiences.
                    </p>
                    <div className="w-fit bg-primary px-2 py-2 rounded-full shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-200 hover:bg-blue-700 mt-2">
                      <LuCircleFadingPlus className="text-[18px] text-white" />
                      <button
                        onClick={() => navigate("/bookings")}
                        className="tracking-tight text-[15px] text-white font-medium"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* chatbot------------ */}
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
};
const StyledWrapper = styled.div`
  .menu {
    font-size: 16px;
    line-height: 1.6;
    color: #000000;
    width: fit-content;
    display: flex;
    list-style: none;
  }

  .menu a {
    text-decoration: none;
    color: black;
    font-family: inter;
    font-size: inherit;
    line-height: inherit;
  }

  .menu .link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 36px;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .menu .link::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #3b75ef;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .link svg {
    width: 14px;
    height: 14px;
    fill: #000000;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .item {
    position: relative;
  }

  .menu .item .submenu {
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 100%;
    border-radius: 0 0 16px 16px;
    left: 0;
    width: 100%;
    overflow: hidden;
    border: 1px solid #cccccc;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-12px);
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
    pointer-events: none;
    list-style: none;
    background-color: white;
  }

  .menu .item:hover .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
    border-top: transparent;
    border-color: #7ba6f8;
  }

  .menu .item:hover .link {
    color: black;
    border-radius: 16px 16px 0 0;
  }

  .menu .item:hover .link::after {
    transform: scaleX(1);
    transform-origin: right;
  }
  .menu .item:hover .link svg {
    fill: #ffffff;
    transform: rotate(-180deg);
  }

  .submenu .submenu-item {
    width: 100%;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link {
    display: block;
    padding: 8px;
    width: 100%;
    position: relative;
    text-align: center;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-item:last-child .submenu-link {
    border-bottom: none;
  }
  .submenu .submenu-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    width: 100%;
    height: 100%;
    background-color: #3b75ef;
    z-index: -1;
    transform-origin: left;
    transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link:hover:before {
    transform: scaleX(1);
    transform-origin: right;
  }

  .submenu .submenu-link:hover {
    color: #ffffff;
  }
`;

export default Main;
