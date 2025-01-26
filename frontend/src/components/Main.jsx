import React, { useState } from "react";
import MyLocationMap from "./MyLocation";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Testing2 from "./Testing2";
const Main = () => {
  const { theme } = useAppContext();
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={`flex-1 w-full border-[1.6px]  ${
        theme ? "border-gray-200 bg-stone-50" : "border-gray-900 bg-gray-50"
      } rounded-t-3xl rounded-b-md pl-5 pr-10 py-[1.1rem]`}
    >
      <div className="flex justify-between ">
        <div className="flex flex-col border border-gray-200 h-[calc(100vh-7rem)] min-w-[24%] w-[30%] py-2 bg-white rounded-lg">
          <div className="flex flex-col ">
            <h1 className="text-gray-800 text-[19px] font-medium font-inter text-center mb-3">
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
                  } absolute z-50 top-7 -right-4 bg-white border text-gray-800 border-gray-200 rounded-lg shadow-xl w-52 px-2 py-1 `}
                >
                  <p className="text-[1rem] font-medium font-inter mb-2">
                    Sort By:
                  </p>
                  <div className="flex flex-col gap-3">
                    <p
                      onClick={() => {
                        setSortOption("price_asc");
                        setVisible(!visible);
                      }}
                      className="flex items-center gap-2 text-[.9rem] font-light font-inter hover:bg-gray-100 p-1 rounded-xl cursor-pointer"
                    >
                      <assets.MdOutlineArrowDropDown className="text-[1.2rem]" />{" "}
                      Price: Low to High
                    </p>
                    <p
                      onClick={() => {
                        setSortOption("stars_desc");
                        setVisible(!visible);
                      }}
                      className="flex items-center gap-2 text-[.9rem] font-light font-inter hover:bg-gray-100 p-1 rounded-xl cursor-pointer"
                    >
                      <assets.MdOutlineArrowDropUp className="text-[1.2rem]" />{" "}
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
            <Testing2 category={category} sortOption={sortOption} />
          </div>
          <div className="w-full py-2 text-center">
            <button className="text-primary font-[400] px-3 border border-gray-300 cursor-pointer">
              More...
            </button>
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
