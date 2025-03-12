import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Context } from "../context/Context";
const Sidebar = () => {
  const { setOpened } = useContext(Context); // for AI
  const [expended, setExpended] = useState(true);
  const handleSidebar = () => {
    setExpended(!expended);
  };
  const navigate = useNavigate();
  const { theme } = useAppContext();
  const { user } = useAppContext();
  // console.log("user details ->", user); debugging log---

  const shortenEmail = (email, maxLength = 10) => {
    if (!email) return "Guest";

    const [name, domain] = email.split("@");

    if (name.length > maxLength) {
      return `${name.slice(0, 6)}...@${domain}`;
    }

    return email;
  };
  return (
    <div className="h-full ">
      <div
        className={`h-full pt-3 transition-all ease-in-out duration-200 pl-2 pr-3 flex flex-col ${
          expended ? "w-[220px] lg:w-[240px]" : "w-[80px] lg:w-[100px]"
        }`}
      >
        {/* ------------------Top-------------------- */}
        <div className="flex items-center justify-between  mt-2 font-outfit">
          <div
          // className={`w-9 h-9 lg:w-11 lg:h-11  border flex items-center justify-center rounded-full ${
          //   theme ? "bg-gray-200" : "bg-gray-200"
          // }`}
          >
            <img
              src={user?.userImage}
              alt=""
              className="w-8 lg:w-11 h-8 lg:h-11 object-cover rounded-full"
            />
          </div>
          <div className={`flex flex-col items-center`}>
            <p
              className={`font-semibold text-base lg:text-lg w-auto transition-all ease-in-out duration-200 capitalize ${
                expended
                  ? "opacity-100 max-w-full"
                  : "opacity-0 max-w-0 overflow-hidden"
              } ${theme ? "text-gray-900" : "text-white"}`}
            >
              {user ? user.name : "Guest"}
            </p>
            <p
              className={`font-light text-xs lg:text-sm italic transition-all ease-in-out duration-200 ${
                expended
                  ? "opacity-100 max-w-full"
                  : "opacity-0 max-w-0 overflow-hidden"
              } ${theme ? "text-gray-900" : "text-gray-300"}`}
            >
              {user ? shortenEmail(user.email) : "Guest"}
            </p>
          </div>
          {expended ? (
            <assets.GoSidebarExpand
              className={`cursor-pointer text-[1.2rem] lg:text-[1.5rem] ${
                theme ? "text-gray-900" : "text-white"
              }`}
              onClick={handleSidebar}
            />
          ) : (
            <assets.GoSidebarCollapse
              className={`cursor-pointer text-[1.2rem] lg:text-[1.5rem] ${
                theme ? "text-gray-900" : "text-white"
              }`}
              onClick={handleSidebar}
            />
          )}
        </div>
        {expended && (
          <hr className="w-[78%] mx-auto my-3 lg:my-5 border-[1px] border-primaryLight" />
        )}

        {/* --------------------Middle----------------- */}
        <div
          className={` ${
            theme ? "text-gray-500" : "text-gray-300"
          } ml-2 flex flex-col font-inter ${
            expended ? "gap-1 lg:gap-2" : "gap-2 lg:gap-3"
          }`}
        >
          {/* 1 */}
          <div className="cursor-pointer pl-2 lg:pl-4 relative group">
            <NavLink
              // onClick={() => setExpended(true)}
              to="/home"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full px-1 py-1.5 lg:py-2 rounded-xl transition-all ease-in-out duration-200 ${
                  isActive
                    ? "text-gray-900 bg-stone-100"
                    : "hover:text-gray-900 hover:bg-stone-100"
                }`
              }
            >
              <div className="">
                <assets.LuPanelsTopLeft
                  className={`${
                    expended
                      ? "text-[1.2rem] lg:text-[1.45rem]"
                      : "text-[1.4rem] lg:text-[1.7rem]"
                  }`}
                />
                {/* Tooltip */}
                {!expended && (
                  <p className="absolute z-50 left-[calc(100%+18px)] lg:left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-2 lg:px-3 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm whitespace-nowrap">
                    Dashboard
                  </p>
                )}
              </div>
              <p
                className={`text-sm lg:text-[0.95rem] transition-all ease-in-out duration-200 ${
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
          <div className={`cursor-pointer pl-2 lg:pl-4 relative group`}>
            <NavLink
              // onClick={() => setExpended(false)}
              to="/workers"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full ${
                  isActive
                    ? "text-gray-900 bg-stone-100 px-1 py-1.5 lg:py-2 rounded-xl"
                    : "hover:text-gray-900 hover:bg-stone-100 transition-all ease-in-out duration-200 px-1 py-1.5 lg:py-2 rounded-xl"
                }`
              }
            >
              <assets.LuBriefcase
                className={`${
                  expended
                    ? "text-[1.2rem] lg:text-[1.45rem]"
                    : "text-[1.4rem] lg:text-[1.7rem]"
                }`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+18px)] lg:left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-2 lg:px-3 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm whitespace-nowrap">
                  Workers
                </p>
              )}
              <p
                className={`text-sm lg:text-[0.95rem] transition-all ease-in-out duration-200 ${
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

          <div className={`cursor-pointer pl-2 lg:pl-4 relative group`}>
            <NavLink
              // onClick={() => setExpended(false)}
              to="/messages"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full ${
                  isActive
                    ? "text-gray-900 bg-stone-100 px-1 py-1.5 lg:py-2 rounded-xl"
                    : "hover:text-gray-900 hover:bg-stone-100 transition-all ease-in-out duration-200 px-1 py-1.5 lg:py-2 rounded-xl"
                }`
              }
            >
              <assets.BsChatDots
                className={`${
                  expended
                    ? "text-[1.2rem] lg:text-[1.45rem]"
                    : "text-[1.4rem] lg:text-[1.7rem]"
                }`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+18px)] lg:left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-2 lg:px-3 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm whitespace-nowrap">
                  Messages
                </p>
              )}
              <p
                className={`text-sm lg:text-[0.95rem] transition-all ease-in-out duration-200 ${
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
          <div className={`cursor-pointer pl-2 lg:pl-4 relative group`}>
            <NavLink
              // onClick={() => setExpended(false)}
              to="/bookings"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full ${
                  isActive
                    ? "text-gray-900 bg-stone-100 px-1 py-1.5 lg:py-2 rounded-xl"
                    : "hover:text-gray-900 hover:bg-stone-100 transition-all ease-in-out duration-200 px-1 py-1.5 lg:py-2 rounded-xl"
                }`
              }
            >
              <assets.LuPackageCheck
                className={`${
                  expended
                    ? "text-[1.2rem] lg:text-[1.45rem]"
                    : "text-[1.4rem] lg:text-[1.7rem]"
                }`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+18px)] lg:left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-2 lg:px-3 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm whitespace-nowrap">
                  Bookings
                </p>
              )}
              <p
                className={`text-sm lg:text-[0.95rem] transition-all ease-in-out duration-200 ${
                  expended
                    ? "max-w-full opacity-100"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Bookings
              </p>
            </NavLink>
          </div>
          {/* 5 */}
          <div className={`cursor-pointer pl-2 lg:pl-4 relative group`}>
            <NavLink
              // onClick={() => setExpended(false)}
              to="/bookinghistory"
              className={({ isActive }) =>
                `flex items-center gap-2 w-full ${
                  isActive
                    ? "text-gray-900 bg-stone-100 px-1 py-1.5 lg:py-2 rounded-xl"
                    : "hover:text-gray-900 hover:bg-stone-100 px-1 py-1.5 lg:py-2 rounded-xl"
                }`
              }
            >
              <assets.LuPackageSearch
                className={`${
                  expended
                    ? "text-[1.2rem] lg:text-[1.45rem]"
                    : "text-[1.4rem] lg:text-[1.7rem]"
                }`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+18px)] lg:left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-2 lg:px-3 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm whitespace-nowrap">
                  BookingHistory
                </p>
              )}
              {expended ? (
                <p
                  className={`text-sm lg:text-[0.95rem] transition-all ease-in-out duration-200 max-w-full opacity-100`}
                >
                  Booking History
                </p>
              ) : (
                <p className=""></p>
              )}
            </NavLink>
          </div>
          {/* 6 AD */}
          {expended ? (
            <div className="coins-add w-full max-w-[210px] mx-auto h-24 lg:h-28 bg-gradient-to-br from-primaryLight/60 via-primaryLight to-primary border-none rounded-md my-2 px-2 py-2">
              <div className="text-sm lg:text-lg font-medium text-white flex flex-col items-center justify-center h-full gap-3 lg:gap-4">
                <p className="flex items-center justify-center gap-2">
                  <img
                    src={assets.gameCoins}
                    alt=""
                    className="w-6 lg:w-9 animate-bounce transition-all duration-1000"
                  />
                  10 More Coins !!
                </p>
                <p className="text-center text-sm lg:text-lg">
                  & Get{" "}
                  <span className="text-lg lg:text-xl bg-white px-2 py-1 text-gray-900 rounded-full font-medium">
                    Discounts%
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-20 lg:h-24"></div>
          )}
          {/* ---------others Links ------------ */}
          <div className="flex flex-col gap-1 ">
            {/* 8 ---------------Settings----------------- */}
            <div
              className={`cursor-pointer relative pl-4 group flex items-center  gap-2 w-full py-1.5 lg:py-2 hover:translate-x-2 transition-all ease-in-out duration-200 hover:text-gray-700`}
            >
              <assets.IoSettingsOutline
                className={`${
                  expended
                    ? "text-[1.2rem] lg:text-[1.45rem]"
                    : "text-[1.4rem] lg:text-[1.7rem]"
                }`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-[9999] left-[calc(100%+18px)] lg:left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-2 lg:px-3 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm whitespace-nowrap">
                  Settings
                </p>
              )}
              <p
                className={`text-sm lg:text-[0.95rem] transition-all ease-in-out duration-200 ${
                  expended
                    ? "max-w-full opacity-100"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Settings
              </p>
            </div>
            {/* 7 ---------------PROFILE----------------- */}
            <div
              className={`cursor-pointer relative pl-4 group flex items-center  gap-2 w-full py-1.5 lg:py-2 hover:translate-x-2 transition-all ease-in-out duration-200 hover:text-gray-700`}
              onClick={() => navigate("/my-profile")}
            >
              <assets.CgProfile
                className={`${
                  expended
                    ? "text-[1.2rem] lg:text-[1.45rem]"
                    : "text-[1.4rem] lg:text-[1.7rem]"
                }`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-[60] left-[calc(100%+18px)] lg:left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-2 lg:px-3 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm whitespace-nowrap">
                  Profile
                </p>
              )}
              <p
                className={`text-sm lg:text-[0.95rem] transition-all ease-in-out duration-200 ${
                  expended
                    ? "max-w-full opacity-100"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Profile
              </p>
            </div>
            {/* 8 ---------------HELP----------------- */}
            <div
              onClick={() => {
                setOpened(true);
                navigate("/home");
              }}
              className={`cursor-pointer relative pl-4 group flex items-center  gap-2 w-full py-1.5 lg:py-2 hover:translate-x-2 transition-all ease-in-out duration-200 hover:text-gray-700`}
            >
              <assets.RiChatAiLine
                className={`${
                  expended
                    ? "text-[1.2rem] lg:text-[1.45rem]"
                    : "text-[1.4rem] lg:text-[1.7rem]"
                }`}
              />
              {/* Tooltip */}
              {!expended && (
                <p className="absolute z-50 left-[calc(100%+18px)] lg:left-[calc(100%+22px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-80 transition-opacity duration-200 bg-primary text-white px-2 lg:px-3 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm whitespace-nowrap">
                  Help
                </p>
              )}
              <p
                className={`text-sm lg:text-[0.95rem] transition-all ease-in-out duration-200 ${
                  expended
                    ? "max-w-full opacity-100"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Help
              </p>
            </div>
          </div>
        </div>
        {/* ---------------------Bottom---------------------- */}

        <hr className="w-[78%] mx-auto mt-3 lg:mt-5 border-[1px] border-primaryLight" />
        <div className="flex items-center justify-center">
          {expended ? (
            <>
              {theme ? (
                <img src={assets.zipblack} className={`w-28 lg:w-32 mt-3`} />
              ) : (
                <img src={assets.zipwhite} className={`w-28 lg:w-32 mt-3`} />
              )}
            </>
          ) : (
            <img src={assets.z} className="w-6 lg:w-6 mt-3" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
