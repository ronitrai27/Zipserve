import React from "react";
import MyLocationMap from "./MyLocation";
import { assets } from "../assets/assets";
const Main = () => {
  return (
    <div className="flex-1 w-[98%] border-[1.6px] border-gray-200 bg-stone-50 h-full rounded-t-3xl pl-5 pr-10 py-[1.1rem]">
      <div className="flex justify-between ">
        <div className="workers-div bg-white border-[1px] w-[28%] flex flex-col  justify-center gap-2  rounded-xl font-inter">
          <h1 className="text-lg font-medium text-gray-800 mt-2 mb-1 text-center">
            Browse Services
          </h1>
          <div className="flex items-center justify-between px-4">
            <input
              type="text"
              placeholder="AC service..."
              className="w-[90%] bg-gray-50 border-[1px] outline-none p-2 rounded-full"
            />
            <assets.LuFilter className="text-xl text-primary" />
          </div>
          <hr className="w-[90%] my-2 mx-auto border-primaryLight border-[.5px]" />
          <div className="flex flex-col gap-3 px-6">
            <div className="bg-gray-100 w-full h-[7.2rem] border rounded-md"></div>
            <div className="bg-gray-100 w-full h-[7.2rem] border rounded-md"></div>
            <div className="bg-gray-100 w-full h-[7.2rem] border rounded-md"></div>
            <div className="bg-gray-100 w-full h-[7.2rem] border rounded-md"></div>
          </div>

          <div className="text-center">
            <p className="">More...</p>
          </div>
        </div>
        <div className="map-div w-[62%] h-[25rem] z-10 bg-white p-2 rounded-3xl shadow-lg ">
          <div className="w-full h-full  rounded-3xl overflow-hidden z-10">
            <MyLocationMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
