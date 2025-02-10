import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const { theme } = useAppContext();
  const navigate = useNavigate();
  return (
    <div className="px-2 mt-16">
      <div className="leftBar flex flex-col items-center gap-6 hover:gap-7  transition-all duration-500 px-3 hover:px-6 ">
        {/* ----------------------------------BUTTON1----------------------------- */}
        <button
          onClick={() => navigate("/")}
          className={`group relative cursor-pointer ${
            theme
              ? "text-gray-800 hover:text-primary"
              : "text-white hover:text-primary"
          }  transition-all hover:-translate-x-2 hover:scale-125 ease-linear duration-300 z-50`}
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
          {/* <span className="absolute z-50 top-0 right-full mr-2 bg-primaryLight text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Home
          </span> */}
        </button>

        {/* ------------------------------button2--------------------------- */}
        <button
          onClick={() => navigate("/about")}
          className={`cursor-pointer text-[1.5rem] transition-all group relative ${
            theme
              ? "text-gray-800 hover:text-primary"
              : "text-white hover:text-primary"
          }transition-all hover:-translate-x-2 hover:scale-110 ease-linear duration-300 z-50 `}
        >
          <assets.GoInfo />
          {/* <span className="absolute z-50 top-0 right-full mr-2 bg-primaryLight text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            About us
          </span> */}
        </button>

        {/* ------------------------------------button4-------------------------------- */}
        <button
          className={`cursor-pointe text-[1.5rem] transition-all group relative ${
            theme
              ? "text-gray-800 hover:text-primary"
              : "text-white hover:text-primary"
          }transition-all hover:-translate-x-2 hover:scale-110 ease-linear duration-300 z-50 `}
        >
          <assets.BsWallet2 />
          {/* <span className="absolute z-50 top-0 right-full mr-2 bg-primaryLight text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Wallet
          </span> */}
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
