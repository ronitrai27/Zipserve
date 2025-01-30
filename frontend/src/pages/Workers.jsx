import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MorphingTextDemo } from "../components/MorphingAnimation.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets";
const Workers = () => {
  const { category } = useParams(); // selected category will be stored
  // console.log(category);
  const { workers, filteredWorkers, setFilteredWorkers } = useAppContext(); // fetched workers from context
  console.log(workers);

  const navigate = useNavigate();

  return (
    <div className="flex-1 border-[1px] bg-stone-50 h-[90vh] rounded-t-3xl py-5 ">
      <div className="parent-container flex flex-row justify-between items-center gap-6 w-[95%] mx-auto">
        {/* LEFT SIDE -> CATEGORIES AND AD */}
        <div className="left-side max-w-[24%] min-w-[24%] font-inter flex flex-col">
          <p className="text-[20px] font-light text-gray-800 text-center mb-2 tracking-wider">
            Categories:
          </p>
          <div className="flex flex-col gap-5 py-5 px-4 bg-white rounded-xl shadow-md  h-[calc(90vh-320px)] overflow-y-auto mb-4">
            <p className="flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105">
              <assets.VscTools className="text-[20px]" /> Plumber
            </p>
            <p className="flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105">
              <assets.LuDrill className="text-[20px]" /> Carpenter
            </p>
            <p className="flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105">
              <assets.LuBriefcase className="text-[20px] " /> Electrician
            </p>
            <p className="flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105">
              <assets.LuBriefcase className="text-[20px] " /> Technician
            </p>
            <p className="flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105">
              <assets.PiPaintRoller className="text-[20px] " /> Painter
            </p>
            <p className="flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105">
              <assets.LiaBroomSolid className="text-[20px]" /> Cleaner
            </p>
            <p className="flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105">
              <assets.GiVacuumCleaner className="text-[20px]" /> Gardener
            </p>
          </div>
          {/* AD */}
          <div className="relative bg-gradient-to-br from-primary via-primaryLight to-blue-500 px-4 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

            <p className="text-xl font-light text-white/90 whitespace-nowrap text-[min(5vw,1.25rem)] mb-2">
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

            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-300"></div>
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all duration-300"></div>
          </div>
        </div>
        {/* RIGHT SIDE -> WORKERS */}
        <div className="Right-Side flex-1 bg-primary"></div>
      </div>
    </div>
  );
};
export default Workers;
