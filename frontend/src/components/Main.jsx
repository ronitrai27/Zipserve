import React, { useState } from "react";
import MyLocationMap from "./MyLocation";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import WorkerCards from "./WorkerCards.jsx";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const { theme } = useAppContext();
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={`flex-1 w-full border-[1.6px]  ${
        theme ? "border-gray-200 bg-gray-50" : "border-gray-900 bg-gray-100"
      } rounded-t-lg rounded-b-md px-8 py-[1.1rem]`}
    >
      <div className="flex justify-between ">
        <div className="flex flex-col border border-gray-200 h-[calc(100vh-7rem)] max-w-[34%]  w-[32%]  bg-white rounded-lg shadow-md">
          <div className="flex flex-col ">
            <h1 className="text-gray-800 text-[18px] font-medium font-inter text-center mb-2 mt-1">
              Browse Workers
            </h1>
            {/* Category Filter */}
            <div className="flex justify-between items-center gap-6 px-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Browse</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Browse"
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    borderRadius: "30px",
                  }}
                >
                  <MenuItem value={""}>All Categories</MenuItem>
                  <MenuItem value={"electrician"}>Electrician</MenuItem>
                  <MenuItem value={"plumber"}>Plumber</MenuItem>
                  <MenuItem value={"carpenter"}>Carpenter</MenuItem>
                  <MenuItem value={"technician"}>Technician</MenuItem>
                  <MenuItem value={"painters"}>Painters</MenuItem>
                  <MenuItem value={"cleaner"}>Cleaner</MenuItem>
                  <MenuItem value={"gardener"}>Gardener</MenuItem>
                </Select>
              </FormControl>
              {/* Sorting Filter */}
              <div className="relative">
                <assets.LuFilter
                  className="text-[1.45rem] cursor-pointer  text-primary hover:scale-110 transition-all"
                  onClick={() => setVisible(!visible)}
                />
                <div
                  className={`${
                    visible ? "block" : "hidden"
                  } absolute z-50 top-7 -right-4 bg-white border text-gray-800 border-gray-200 rounded-lg shadow-lg w-52 px-3 py-2 transition-all duration-200 ease-in-out`}
                >
                  <p className="text-[1.1rem] font-medium font-inter mb-3 text-gray-700">
                    Sort By:
                  </p>
                  <div className="flex flex-col gap-1">
                    <p
                      onClick={() => {
                        setSortOption("price_asc");
                        setVisible(!visible);
                      }}
                      className="flex items-center gap-2 text-[.95rem] font-light font-inter hover:bg-gray-50 hover:text-primary p-2 rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <assets.MdOutlineArrowDropDown className="text-[1.3rem]" />
                      Price: Low to High
                    </p>
                    <p
                      onClick={() => {
                        setSortOption("stars_desc");
                        setVisible(!visible);
                      }}
                      className="flex items-center gap-2 text-[.95rem] font-light font-inter hover:bg-gray-50 hover:text-primary p-2 rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <assets.MdOutlineArrowDropUp className="text-[1.3rem]" />
                      Stars: High to Low
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-[90%] mx-auto mt-3 mb-2 border-gray-300 border-[.7px]" />
          </div>
          <div className="overflow-y-auto h-[calc(100vh-15rem)] scroll-smooth">
            {/* <WorkerList category={category} sortOption={sortOption} /> */}
            <WorkerCards category={category} sortOption={sortOption} />
          </div>
          <div className="w-full py-2 text-center">
            <button
              onClick={() => navigate("/workers")}
              className="px-6 py-1 text-[16px] border-[1px] border-gray-200 rounded-lg font-medium hover:scale-110  text-primary hover:bg-primaryLight hover:text-white transition-all duration-700"
            >
              More...
            </button>
          </div>
        </div>
        {/* --------------------------MAP area -------------------------- */}
        <div className="map-div w-[65%] h-[calc(100vh-7rem)] z-10 bg-white p-2 rounded-lg relative">
          <div className="w-full h-full rounded-xl overflow-hidden ">
            <MyLocationMap />
          </div>
          {/* <div className="absolute bottom-10 left-0 w-20 h-16 bg-white rounded-lg shadow-lg z-50"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
