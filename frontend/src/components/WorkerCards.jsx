import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import Rating from "@mui/material/Rating";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Testing2 = ({ category, sortOption }) => {
  const { workers, filteredWorkers: contextFilteredWorkers } = useAppContext();
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  const navigate = useNavigate();

  // Initialize filtered workers from context
  useEffect(() => {
    setFilteredWorkers(contextFilteredWorkers);
  }, [contextFilteredWorkers]);

  // Filtering and sorting workers
  useEffect(() => {
    let result = [...workers];

    // Apply category filter
    if (category) {
      result = result.filter(
        (worker) => worker.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply sorting
    if (sortOption) {
      result.sort((a, b) => {
        switch (sortOption) {
          case "price_asc":
            return a.price - b.price;
          case "stars_desc":
            return b.stars - a.stars;
          default:
            return 0;
        }
      });
    }

    setFilteredWorkers(result);
  }, [category, sortOption, workers]);

  return (
    <div className="worker-box flex flex-col gap-4 px-3 font-inter">
      {!filteredWorkers.length
        ? // Skeleton loading animation
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="worker-card bg-gray-50 border-[1px] border-gray-200 rounded-lg px-3 py-2 "
            >
              <div className="worker-top flex items-center gap-5 mb-1">
                <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse transition-all duration-700"></div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 bg-gray-300 rounded w-full animate-pulse transition-all duration-700"></div>
                    {/* <div className="h-4 bg-gray-300 rounded w-24"></div> */}
                  </div>
                  <hr className="w-full mt-1 border-gray-300 border-[.6px]" />
                </div>
              </div>
              <div className="worker-middle w-[80%] ml-auto flex items-center justify-between -mt-2">
                <div className="flex flex-col py-2 gap-1">
                  <div className="h-4 bg-gray-300 rounded w-28 animate-pulse transition-all duration-700"></div>
                  <div className="h-4 bg-gray-300 rounded w-24 animate-pulse transition-all duration-700"></div>
                </div>
                {/* <div className="h-6 bg-gray-300 rounded-full w-24"></div> */}
              </div>
              <hr className="w-full my-1 border-gray-300 border-[.6px]" />
              <div className="worker-bottom px-6">
                <div className="flex items-center justify-between">
                  <div className="h-8 bg-gray-300 rounded w-16 animate-pulse transition-all duration-700"></div>
                  <div className="h-8 bg-gray-300 rounded w-20 animate-pulse transition-all duration-700"></div>
                </div>
              </div>
            </div>
          ))
        : filteredWorkers
            .filter((worker) => worker.available)
            .slice(0, 15)
            .map((worker) => (
              <div
                key={worker._id}
                className="worker-card  bg-gradient-to-b
from-gray-50
via-gray-50
to-blue-50 border-[1px] border-gray-200 hover:shadow-lg  hover:border-primary/20  transition-all duration-300 rounded-lg p-2"
              >
                <div className="worker-top flex items-center justify-evenly">
                  <img
                    src={worker.profileImage}
                    alt={worker.name}
                    className="worker-image w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex flex-col gap-1 flex-1 ml-3">
                    <div className="flex items-center justify-between ">
                      <h3 className="worker-name capitalize text-[.96rem] font-medium text-gray-800 truncate max-w-[200px] mr-2">
                        {worker.name}
                      </h3>
                      <Rating
                        name="half-rating-read"
                        size="small"
                        defaultValue={worker.stars}
                        precision={0.1}
                        readOnly
                      />
                    </div>
                    <hr className="w-full mt-1 border-gray-300 border-[.6px]" />
                  </div>
                </div>
                <div className="worker-middle w-[80%] ml-auto flex items-center justify-between -mt-2">
                  <div className="flex flex-col py-2 gap-1">
                    <p className="text-[14px] font-light">
                      {" "}
                      Visiting Fee: {worker.price}
                    </p>
                    <p className=" text-sm  text-gray-800 flex items-center gap-1">
                      <assets.LuBriefcase className="font-light text-[14px]" />{" "}
                      {worker.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-100 px-2 py-1 rounded-full">
                    <p className="text-sm font-[400]">Available</p>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse transition-all"></div>
                  </div>
                </div>
                <hr className="w-full my-1 border-gray-300 border-[.6px]" />
                <div className="worker-bottom px-6 ">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1 text-[14px]">
                      {" "}
                      <assets.LuMessagesSquare className="text-[16px]" /> Chat
                    </p>
                    <p
                      onClick={() => navigate(`/booking/${worker._id}`)}
                      className="text-[14px] font-[400] cursor-pointer bg-primary hover:bg-blue-600 transition-colors px-3 py-1 rounded-md text-white"
                    >
                      Book
                    </p>
                  </div>
                </div>
              </div>
            ))}
    </div>
  );
};

export default Testing2;
