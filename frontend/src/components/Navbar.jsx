import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Navbar = () => {
  const [token, setToken] = useState(true);
  const navigate = useNavigate();
  const [hiddenDiv, setHiddenDiv] = useState(true);

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-between py-3 pr-14 font-outfit ">
      {/* ---------left part--------- */}
      <motion.div
        className=""
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src={assets.zipSvg}
          alt=""
          className="w-60 h-auto -mt-9 -ml-3 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </motion.div>
      {/* ------------MIDDLE------------ */}
      <div className="w-1/2 h-[90%] flex flex-col  ">
        <div
          className={`border-none rounded-tl-full rounded-br-full overflow-hidden bg-gradient-to-r
from-white/0
via-primary/20
to-indigo-50/0 h-full text-center flex items-center justify-center font-outfit ${
            currentText === 0 ? "block" : "hidden"
          }`}
        >
          <h1 className="text-xl font-medium text-gray-600 tracking-wider">
            Still confused, what to Book? try{" "}
            <span className=" text-blue-400 font-medium ml-2">trending!</span>
          </h1>
        </div>

        <div
          className={`border-none rounded-3xl overflow-hidden bg-gradient-to-r
from-yellow-200/0
via-yellow-300
to-yellow-50/0  h-full text-center flex items-center justify-center font-inter ${
            currentText === 1 ? "block" : "hidden"
          }`}
        >
          <h1 className="text-xl font-medium text-gray-600 tracking-wider">
            Collect Coins and Avail huge Discounts!!{" "}
            <span className="animate-pulse transition-all duration-700 text-gray-800">
              Book Now
            </span>
          </h1>
        </div>

        <div
          className={` text-center h-full font-inter ${
            currentText === 2 ? "block" : "hidden"
          }`}
        >
          <h1 className="text-2xl font-extralight">
            Ready, Set, Zip and{" "}
            <span className="ml-3 bg-primary/25 p-2 font-medium rounded-tl-full rounded-br-full">
              Zipserve!
            </span>
          </h1>
        </div>
      </div>
      {/* ---------right part--------- */}
      <div className="flex items-center gap-5 font-inter">
        {/* -------------------button1--------------- */}

        <button
          onClick={() => setHiddenDiv(!hiddenDiv)}
          className="cursor-pointer mr-4 text-gray-600 text-[1.6rem] hover:text-gray-900 transition-all hover:animate-pulse duration-500 relative"
        >
          <assets.FaFire />
        </button>
        {/* ---hidden div--- */}
        <div
          onMouseLeave={() => setHiddenDiv(!hiddenDiv)}
          className={`absolute z-50 border-[1.8px] border-gray-200 shadow-lg rounded-lg bg-white flex items-center justify-between ${
            hiddenDiv ? "hidden" : "block"
          } w-[28rem] py-1 px-2 top-[4.4rem] right-40`}
        >
          {/* State for active image */}

          {(() => {
            const [activeImage, setActiveImage] = React.useState(null);

            const links = [
              {
                id: 1,
                text: "Painting",
                icon: <assets.PiPaintRoller className="text-[1.4rem]" />,
                image: assets.trend2,
              },
              {
                id: 2,
                text: "Cleaning",
                icon: <assets.GiVacuumCleaner className="text-[1.4rem]" />,
                image: assets.trend1,
              },
              {
                id: 3,
                text: "Moving",
                icon: <assets.LiaTruckMovingSolid className="text-[1.4rem]" />,
                image: assets.trend5,
              },
              {
                id: 4,
                text: "Lawn Care",
                icon: <assets.LiaBroomSolid className="text-[1.4rem]" />,
                image: assets.trend4,
              },
              {
                id: 5,
                text: "Installation",
                icon: <assets.LuDrill className="text-[1.4rem]" />,
                image: assets.trend3,
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

        {/* ----------------button2-------------- */}
        <button className="cursor-pointer text-gray-600 text-[1.4rem]  hover:text-gray-900 transition-all">
          <assets.GoInfo />
        </button>
        {/* ----------------button3---------- */}
        <button className="cursor-pointer text-gray-700 text-[1.4rem]  hover:text-gray-900 transition-all">
          <assets.LuMail />
        </button>
        {token ? (
          <div className="flex items-center gap-2 group relative cursor-pointer">
            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full ml-3">
              <img src={assets.sideUserLogo} alt="" className="w-9" />
            </div>
            <button>
              <assets.LuChevronDown className="cursor-pointer text-gray-700 text-[1.2rem]" />
            </button>
            <div className="absolute  top-0 right-0 pt-14 text-base font-medium text-gray-600 z-50 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded-lg flex flex-col gap-4 p-4 pl-6 border shadow-lg ">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer flex items-center gap-2"
                >
                  <assets.CgProfile className="text-xl" />
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/mycoins")}
                  className="hover:text-black cursor-pointer flex items-center gap-2"
                >
                  <assets.PiCoinsLight className="text-xl" />
                  My Coins
                </p>
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
          <button
            onClick={() => navigate("/login")}
            type="submit"
            className="flex justify-center gap-2 items-center mx-auto  text-md bg-stone-100 backdrop-blur-md lg:font-light isolation-auto border-gray-200 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-primary hover:text-white
           before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-2 overflow-hidden border-2   rounded-full group "
          >
            Create Account
            <svg
              className="w-7 h-7 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-white ease-linear duration-300 rounded-full border border-gray-800 group-hover:border-none p-2 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-800 group-hover:fill-gray-800"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
