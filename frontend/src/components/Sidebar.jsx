import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [expended, setExpended] = useState(true);
  const handleSidebar = () => {
    setExpended(!expended);
  };
  return (
    <div>
      <div
        className={` pt-3 transition-all ease-linear duration-300 pl-2 pr-3 flex flex-col  ${
          expended ? "md:w-56 sm:w-48 " : "w-28 "
        }`}
      >
        {/* ------------------Top-------------------- */}
        <div className="flex items-center justify-between text-gray-900 mt-2 font-outfit">
          <div className="w-11 h-11 bg-gray-200 border  flex items-center justify-center rounded-full">
            <img src={assets.sideUserLogo} alt="" className="w-8" />
          </div>
          <div className={`flex flex-col items-center`}>
            <p
              className={`font-semibold text-lg w-auto transition-all duration-300  ${
                expended
                  ? "opacity-100 max-w-full"
                  : "opacity-0 max-w-0 overflow-hidden"
              }`}
            >
              John Parker
            </p>
            <p
              className={`font-light text-sm italic transition-all duration-300  ${
                expended
                  ? "opacity-100 max-w-full"
                  : "opacity-0 max-w-0 overflow-hidden"
              }`}
            >
              John12@gmail.com
            </p>
          </div>
          {expended ? (
            <assets.GoSidebarExpand
              className="cursor-pointer text-[1.5rem]"
              onClick={handleSidebar}
            />
          ) : (
            <assets.GoSidebarCollapse
              className="cursor-pointer text-[1.5rem]"
              onClick={handleSidebar}
            />
          )}
        </div>
        {expended && (
          <hr className="w-[78%] mx-auto my-5 border-[1px] border-primaryLight" />
        )}

        {/* --------------------Middle----------------- */}
        <div
          className={`text-gray-500  ml-2 flex flex-col font-inter   ${
            expended ? "md:gap-2 sm:gap-1 " : "gap-3"
          }`}
        >
          {/* 1 */}
          <div className="cursor-pointer pl-4 relative group">
            <NavLink
              onClick={() => setExpended(true)}
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full px-1 py-2 rounded-xl transition-all ${
                  isActive
                    ? "text-gray-900 bg-stone-100"
                    : "hover:text-gray-900 hover:bg-stone-100"
                }`
              }
            >
              <div className="">
                <assets.LuPanelsTopLeft
                  className={`${expended ? "text-[1.45rem]" : "text-[1.7rem]"}`}
                />
                {/* Tooltip */}
                {!expended && (
                  <p className="absolute z-50 left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-3 py-2 rounded-md text-sm whitespace-nowrap">
                    Dashboard
                  </p>
                )}
              </div>
              <p
                className={`text-[0.95rem] transition-all duration-300 ${
                  expended
                    ? "max-w-full opacity-100"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Dashboard
              </p>
            </NavLink>
          </div>

          {/* 2 */}
          <div className={` cursor-pointer pl-4 relative group `}>
            <NavLink
              onClick={() => setExpended(false)}
              to="/workers"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full ${
                  isActive
                    ? "text-gray-900 bg-stone-100 px-1 py-2 rounded-xl"
                    : "hover:text-gray-900 hover:bg-stone-100 transition-all  px-1 py-2 rounded-xl"
                }`
              }
            >
              <assets.LuBriefcase
                className={`${expended ? "text-[1.45rem]" : "text-[1.7rem]"}`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-3 py-2 rounded-md text-sm whitespace-nowrap">
                  Workers
                </p>
              )}
              <p
                className={`text-[0.95rem] transition-all duration-300 ${
                  expended
                    ? "max-w-full opacity-100"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Workers
              </p>
            </NavLink>
          </div>
          {/* 3 */}

          <div className={` cursor-pointer pl-4 relative group`}>
            <NavLink
              onClick={() => setExpended(false)}
              to="/messages"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full ${
                  isActive
                    ? "text-gray-900 bg-stone-100 px-1 py-2 rounded-xl"
                    : "hover:text-gray-900 hover:bg-stone-100 transition-all  px-1 py-2 rounded-xl"
                }`
              }
            >
              <assets.BsChatDots
                className={`${expended ? "text-[1.45rem]" : "text-[1.7rem]"}`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-3 py-2 rounded-md text-sm whitespace-nowrap">
                  Messages
                </p>
              )}
              <p
                className={`text-[0.95rem] transition-all duration-300 ${
                  expended
                    ? "max-w-full opacity-100"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Messages
              </p>
            </NavLink>
          </div>

          {/* 4 */}
          <div className={` cursor-pointer pl-4  relative group `}>
            <NavLink
              onClick={() => setExpended(false)}
              to="/bookings"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full ${
                  isActive
                    ? "text-gray-900 bg-stone-100 px-1 py-2 rounded-xl "
                    : "hover:text-gray-900 hover:bg-stone-100 transition-all px-1 py-2 rounded-xl"
                }`
              }
            >
              <assets.LuPackageCheck
                className={`${expended ? "text-[1.45rem]" : "text-[1.7rem]"}`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-3 py-2 rounded-md text-sm whitespace-nowrap">
                  Bookings
                </p>
              )}
              <p
                className={`text-[0.95rem] transition-all duration-300 ${
                  expended
                    ? "max-w-full opacity-100"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Bookings
              </p>
            </NavLink>
          </div>
          {/* 4 */}
          <div className={` cursor-pointer pl-4 relative group  `}>
            <NavLink
              onClick={() => setExpended(false)}
              to="/bookinghistory"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full ${
                  isActive
                    ? "text-gray-900 bg-stone-100 px-1 py-2 rounded-xl"
                    : "hover:text-gray-900 hover:bg-stone-100 px-1 py-2 rounded-xl"
                }`
              }
            >
              <assets.LuPackageSearch
                className={`${expended ? "text-[1.45rem]" : "text-[1.7rem]"}`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-3 py-2 rounded-md text-sm whitespace-nowrap">
                  BookingHistory
                </p>
              )}
              {expended ? (
                <p
                  className={`text-[0.95rem] transition-all duration-300 max-w-full opacity-100 `}
                >
                  Booking History
                </p>
              ) : (
                <p className=""></p>
              )}
            </NavLink>
          </div>
          {/* 5 AD --------border-[#5f6fff66] */}
          {expended ? (
            <div
              className="coins-add w-[190px] h-28 bg-gradient-to-br
from-primaryLight/60
via-primaryLight
to-primary border-none rounded-md mt-6 mb-4 px-1 py-2  "
            >
              <div className="text-md font-medium  text-white flex flex-col items-center justify-center h-full gap-4">
                <p className="flex  items-center justify-center gap-2">
                  <img
                    src={assets.gameCoins}
                    alt=""
                    className="w-8 animate-bounce transition-all duration-1000"
                  />
                  10 More Coins !!
                </p>
                <p className="text-center text-sm">
                  & Get{" "}
                  <span className="text-xl bg-white px-2 py-1 text-gray-900 rounded-full font-medium">
                    Discounts%
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-28  "></div>
          )}
          {/* 6 */}
          <div className={` cursor-pointer pl-3 relative group`}>
            <NavLink
              to="/my-profile"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full ${
                  isActive
                    ? "text-gray-900 bg-stone-100 px-1 py-2 rounded-xl"
                    : "hover:text-gray-900 hover:bg-stone-100 transition-all  px-1 py-2 rounded-xl"
                }`
              }
            >
              <assets.CgProfile
                className={`${expended ? "text-[1.45rem]" : "text-[1.7rem]"}`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-3 py-2 rounded-md text-sm whitespace-nowrap">
                  Profile
                </p>
              )}
              <p
                className={`text-[0.95rem] transition-all duration-300 ${
                  expended
                    ? "max-w-full opacity-100"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Profile
              </p>
            </NavLink>
          </div>
          {/* 7 */}
          <div
            className={` cursor-pointer pl-4 relative group flex items-center gap-2 w-full py-2 hover:scale-110 transition-all hover:text-gray-700`}
          >
            <assets.RiChatAiLine
              className={`${expended ? "text-[1.45rem]" : "text-[1.7rem]"}`}
            />
            {/* Tooltip */}
            {!expended && (
              <p className="absolute z-50 left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-3 py-2 rounded-md text-sm whitespace-nowrap">
                Help
              </p>
            )}
            <p
              className={`text-[0.95rem] transition-all duration-300 ${
                expended
                  ? "max-w-full opacity-100"
                  : "opacity-0 max-w-0 overflow-hidden"
              }`}
            >
              Help
            </p>
          </div>
        </div>
        {/* ---------------------Bottom---------------------- */}
        <hr className="w-[78%] mx-auto mt-5   border-[1px] border-primaryLight " />
        <div className="flex items-center justify-center">
          {expended ? (
            <img src={assets.zipPng} className="sm:w-36 -mt-2 md:w-40" />
          ) : (
            <img src={assets.z} className="w-8 mt-3" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
