import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import Rating from "@mui/material/Rating";

const Testing2 = ({ category, sortOption }) => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  // Fetching workers data
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/workers");
        if (!response.ok) {
          throw new Error("Failed to fetch workers");
        }
        const data = await response.json();
        setWorkers(data);
        setFilteredWorkers(data); // Initialize filtered workers with all workers
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

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
      {filteredWorkers.map((worker) => (
        <div
          key={worker._id}
          className="worker-card bg-gray-50 border-[1px] border-primaryLight hover:shadow-xl transition-all rounded-lg px-3 py-2"
        >
          <div className="worker-top flex items-center gap-5 mb-1">
            <img
              src={worker.profileImage}
              alt={worker.name}
              className="worker-image w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="worker-name text-[.96rem] font-medium text-gray-800">
                  {worker.name}
                </h3>
                {/* stars */}
                <Rating
                  name="half-rating-read"
                  size="small"
                  defaultValue={worker.stars}
                  precision={0.1}
                  readOnly
                  //   className="flex items-end"
                />
              </div>
              <hr className="w-full mt-1 border-gray-300 border-[.6px]" />
            </div>
          </div>
          <div className="worker-middle w-[80%] ml-auto flex items-center justify-between -mt-2">
            <div className="flex flex-col py-2 gap-1">
              <p className="text-sm font-light">
                {" "}
                Visiting Fee: {worker.price}
              </p>
              <p className=" text-sm  text-gray-800 flex items-center gap-1">
                <assets.LuBriefcase className="font-light text-[1rem]" />{" "}
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
              <p className="flex items-center gap-1">
                {" "}
                <assets.LuMessagesSquare /> Chat
              </p>
              <p className="text-base font-[400] cursor-pointer bg-primary hover:bg-blue-600 transition-colors px-4 py-1 rounded-md text-white">
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
