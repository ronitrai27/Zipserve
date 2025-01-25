import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const [hiddenDiv, setHiddenDiv] = useState(true);
  const { theme } = useAppContext();
  const navigate = useNavigate();
  return (
    <div>
      <div className="leftBar flex flex-col items-center gap-6 hover:gap-8  transition-all duration-500 px-3 hover:px-6 h-[100%] pt-12 ">
        {/* ----------------------------------BUTTON1----------------------------- */}
        <button
          onClick={() => navigate("/")}
          className={`group relative cursor-pointer ${
            theme
              ? "text-gray-800 hover:text-primary"
              : "text-primary hover:text-white"
          }  transition-all`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="absolute z-50 top-0 right-full mr-2 bg-primaryLight text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Home
          </span>
        </button>

        {/* ----------------------------------BUTTON2----------------------------- */}
        <button
          onClick={() => setHiddenDiv(!hiddenDiv)}
          className={`cursor-pointer text-[1.5rem] ${
            theme
              ? "text-gray-800 hover:text-primary"
              : "text-primary    hover:text-white"
          } transition-all group relative`}
        >
          <assets.FaFire />
          <span className="absolute z-50 top-0 right-full mr-2 bg-primaryLight text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Trending
          </span>
        </button>
        {/* ---hidden div--- */}
        <div
          onMouseLeave={() => setHiddenDiv(!hiddenDiv)}
          className={`absolute z-50 border-[1px] border-primaryLight shadow-xl rounded-xl bg-white flex items-center justify-between ${
            hiddenDiv ? "hidden" : "block"
          } w-[28rem] py-1 px-2 top-[7rem] right-[5rem]`}
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

        {/* ------------------------------button3--------------------------- */}
        <button
          onClick={() => navigate("/about")}
          className={`cursor-pointer text-[1.5rem] transition-all group relative ${
            theme
              ? "text-gray-800 hover:text-primary"
              : "text-primary hover:text-white"
          } `}
        >
          <assets.GoInfo />
          <span className="absolute z-50 top-0 right-full mr-2 bg-primaryLight text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            About us
          </span>
        </button>

        {/* ------------------------------------button4-------------------------------- */}
        <button
          className={`cursor-pointe text-[1.5rem] transition-all group relative ${
            theme
              ? "text-gray-800 hover:text-primary"
              : "text-primary hover:text-white"
          } `}
        >
          <assets.BsWallet2 />
          <span className="absolute z-50 top-0 right-full mr-2 bg-primaryLight text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Wallet
          </span>
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
