import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { ArrowRight } from "lucide-react";
import { BorderBeam } from "../components/ui/border-beam.jsx";
import ServiceSearch from "./SearchBarNav.jsx";

const Navbar = () => {
  const [token, setToken] = useState(true);
  const navigate = useNavigate();
  const [hiddenDiv, setHiddenDiv] = useState(true);
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="relative flex items-center justify-between py-3 pr-14 font-outfit">
      {/* ---------left part--------- */}
      <motion.div
        className=""
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      >
        {theme ? (
          <img
            src={assets.zipblack}
            alt=""
            className="w-44 h-auto ml-8 mt-1 cursor-pointer"
            onClick={() => navigate("/")}
          />
        ) : (
          <img
            src={assets.zipwhite}
            alt=""
            className="w-44 h-auto ml-8 mt-1 cursor-pointer"
            onClick={() => navigate("/")}
          />
        )}
      </motion.div>

      {/* ---------right part--------- */}
      <div className="flex items-center gap-6 font-inter">
        {/* Input Field -----*/}
        {/* <div className=" relative rounded-full overflow-hidden border-[1px] border-gray-200 ">
          <input
            type="text"
            // placeholder={placeholder}
            placeholder="find services..."
            className="w-[22rem] px-5 py-3 focus:shadow-md focus:outline-none bg-stone-100 text-gray-800 text-sm font-light"
          />
          <BorderBeam size={300} duration={18} delay={12} />
        </div> */}
        <div>
          <ServiceSearch />
          {/* <BorderBeam size={300} duration={18} delay={12} /> */}
        </div>

        {/* ------------trending------------- */}

        <button
          onClick={() => setHiddenDiv(!hiddenDiv)}
          className={`cursor-pointer text-[1.5rem] ${
            theme
              ? "text-gray-600 hover:text-primary"
              : "text-primary    hover:text-white"
          } transition-all group relative`}
        >
          <assets.FaFire />
          <span className="absolute z-50 top-9 left-1/2 transform -translate-x-1/2 whitespace-nowrap mr-2 bg-primaryLight text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity ">
            Trending
          </span>
        </button>
        {/* ---hidden div--- */}
        <div
          onMouseLeave={() => setHiddenDiv(!hiddenDiv)}
          className={`absolute z-50 border-[1px] border-primaryLight shadow-xl rounded-xl bg-white flex items-center justify-between ${
            hiddenDiv ? "hidden" : "block"
          } w-[28rem] py-1 px-2 top-[5rem] right-[5rem]`}
        >
          {/* State for active image */}

          {(() => {
            const [activeImage, setActiveImage] = useState(null);

            const links = [
              {
                id: 1,
                text: "Painting",
                icon: <assets.PiPaintRoller className="text-[1.4rem]" />,
                image: assets.trend2,
                category: "painters",
              },
              {
                id: 2,
                text: "Cleaning",
                icon: <assets.GiVacuumCleaner className="text-[1.4rem]" />,
                image: assets.trend1,
                category: "cleaner",
              },
              {
                id: 3,
                text: "Moving",
                icon: <assets.LiaTruckMovingSolid className="text-[1.4rem]" />,
                image: assets.trend5,
                category: "shifting",
              },
              {
                id: 4,
                text: "Lawn Care",
                icon: <assets.LiaBroomSolid className="text-[1.4rem]" />,
                image: assets.trend4,
                category: "gardener",
              },
              {
                id: 5,
                text: "Installation",
                icon: <assets.LuDrill className="text-[1.4rem]" />,
                image: assets.trend3,
                category: "carpenter",
              },
            ];

            return (
              <>
                {/* Links Section */}
                <div className="trending-links flex flex-col gap-3 pl-6">
                  <p className="w-full text-lg font-medium text-primary font-outfit">
                    Trending Services!
                  </p>
                  {links.map((link) => (
                    <p
                      key={link.id}
                      onClick={() => navigate(`/workers/${link.category}`)}
                      onMouseEnter={() => setActiveImage(link.id)} // Set active image on hover
                      className="flex items-center gap-2 text-gray-500 font-medium text-[0.98rem] hover:text-gray-800 hover:translate-x-2 transition-all  cursor-pointer"
                    >
                      {link.icon} {link.text}
                    </p>
                  ))}
                </div>

                {/* Images Section */}
                <div className="images">
                  {links.map((link) => (
                    <img
                      key={link.id}
                      src={link.image}
                      alt={link.text}
                      className={`w-56 h-full bg-cover rounded-md border-none ${
                        activeImage === link.id ? "block" : "hidden"
                      }`}
                    />
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        <button
          className={`cursor-pointe text-[1.5rem] transition-all group relative ${
            theme
              ? "text-gray-500 hover:text-gray-900"
              : "text-gray-400 hover:text-white"
          } `}
        >
          <assets.LuMail />
          <span className="absolute hidden group-hover:block bg-primaryLight text-white text-sm rounded px-2 py-1 top-9 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            Notification
          </span>
        </button>

        {/* ------------------------------PROFILE ICON-------------------------------- */}
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <div className="w-11 h-11 bg-gray-200 flex items-center justify-center rounded-full ml-3 ">
              <img src={assets.sideUserLogo} alt="" className="w-9" />
            </div>
            <button>
              <assets.LuChevronDown
                className={`cursor-pointer ${
                  theme ? "text-gray-700" : "text-gray-200"
                } text-[1.2rem]`}
              />
            </button>
            {/* ------------------------------hidden div------------------------------ */}
            <div className="absolute  top-0 right-0 pt-14 text-base font-medium text-gray-600 z-50 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded-lg flex flex-col gap-4 p-4 pl-6 border shadow-lg ">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer flex items-center gap-2"
                >
                  <assets.CgProfile className="text-xl" />
                  My Profile
                </p>
                {/* <p
                  onClick={() => navigate("/mycoins")}
                  className="hover:text-black cursor-pointer flex items-center gap-2"
                >
                  <assets.PiCoinsLight className="text-xl" />
                  My Coins
                </p> */}

                {theme ? (
                  <p
                    className="hover:text-black cursor-pointer flex items-center gap-2"
                    onClick={toggleTheme}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    Dark Mode
                  </p>
                ) : (
                  <p
                    className="hover:text-black cursor-pointer flex items-center gap-2"
                    onClick={toggleTheme}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    Light Mode
                  </p>
                )}

                <div className="bg-primaryLight flex justify-center p-1 rounded-xl hover:bg-primary transition-all">
                  <p
                    onClick={() => setToken(false)}
                    className=" cursor-pointer text-white"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="group relative cursor-pointer w-48 border bg-white rounded-full overflow-hidden text-black font-semibold hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate("/login")}
          >
            <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block p-2">
              Create Account
            </span>
            <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
              <span>Create Account</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
            <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#3b75ef] scale-[1] dark:group-hover:bg-[#3b75ef] group-hover:bg-[#3b75ef] group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
