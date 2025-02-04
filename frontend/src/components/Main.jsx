import React, { useState } from "react";
import MyLocationMap from "./MyLocation";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import WorkerCards from "./WorkerCards.jsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const navigate = useNavigate();
  const { theme } = useAppContext();
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [visible, setVisible] = useState(false);
  // const [categoryVisible, setCategoryVisible] = useState(false);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  return (
    <div
      className={`flex-1 w-full border-[1.6px]  ${
        theme ? "border-gray-200 bg-gray-50" : "border-gray-900 bg-gray-100"
      } rounded-t-lg rounded-b-md px-8 py-[1.1rem]`}
    >
      <div className="flex justify-between ">
        <div className="flex flex-col border border-gray-200 h-[calc(100vh-7rem)] max-w-[34%]  w-[32%]  bg-white rounded-lg shadow-md">
          <div className="flex flex-col ">
            <h1 className="text-gray-800 text-[18px] font-medium font-inter text-center  mt-2">
              Browse Workers
            </h1>
            {/* Category Filter */}
            <div className="flex justify-between items-center pr-16 ">
              {/* <FormControl fullWidth>
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
              </FormControl> */}
              <StyledWrapper>
                <div className="menu">
                  <div className="item">
                    <a href="#" className="link">
                      <span className="capitalize font-[400] text-[17px]">
                        {category ? category : "Our Services"}
                      </span>
                      <svg viewBox="0 0 360 360" xmlSpace="preserve">
                        <g id="SVGRepo_iconCarrier">
                          <path
                            id="XMLID_225_"
                            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                          />
                        </g>
                      </svg>
                    </a>
                    <div className="submenu">
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("")}
                        >
                          All Categories
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("electrician")}
                        >
                          Electrician
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("plumber")}
                        >
                          Plumber
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("carpenter")}
                        >
                          Carpenter
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("technician")}
                        >
                          Technician
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("painters")}
                        >
                          Painters
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("cleaner")}
                        >
                          Cleaner
                        </a>
                      </div>
                      <div className="submenu-item">
                        <a
                          href="#"
                          className="submenu-link"
                          onClick={() => handleCategoryChange("gardener")}
                        >
                          Gardener
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </StyledWrapper>
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
                      className="flex items-center gap-2 text-[.95rem] font-light font-inter hover:bg-primary hover:text-white p-2 rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <assets.MdOutlineArrowDropDown className="text-[1.3rem]" />
                      Price: Low to High
                    </p>
                    <p
                      onClick={() => {
                        setSortOption("stars_desc");
                        setVisible(!visible);
                      }}
                      className="flex items-center gap-2 text-[.95rem] font-light font-inter hover:bg-primary hover:text-white p-2 rounded-lg cursor-pointer transition-colors duration-200"
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
const StyledWrapper = styled.div`
  .menu {
    font-size: 16px;
    line-height: 1.6;
    color: #000000;
    width: fit-content;
    display: flex;
    list-style: none;
  }

  .menu a {
    text-decoration: none;
    color: black;
    font-family: inter;
    font-size: inherit;
    line-height: inherit;
  }

  .menu .link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 36px;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .menu .link::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #3b75ef;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .link svg {
    width: 14px;
    height: 14px;
    fill: #000000;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .item {
    position: relative;
  }

  .menu .item .submenu {
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 100%;
    border-radius: 0 0 16px 16px;
    left: 0;
    width: 100%;
    overflow: hidden;
    border: 1px solid #cccccc;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-12px);
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
    pointer-events: none;
    list-style: none;
    background-color: white;
  }

  .menu .item:hover .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
    border-top: transparent;
    border-color: #7ba6f8;
  }

  .menu .item:hover .link {
    color: black;
    border-radius: 16px 16px 0 0;
  }

  .menu .item:hover .link::after {
    transform: scaleX(1);
    transform-origin: right;
  }
  .menu .item:hover .link svg {
    fill: #ffffff;
    transform: rotate(-180deg);
  }

  .submenu .submenu-item {
    width: 100%;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link {
    display: block;
    padding: 8px;
    width: 100%;
    position: relative;
    text-align: center;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-item:last-child .submenu-link {
    border-bottom: none;
  }
  .submenu .submenu-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    width: 100%;
    height: 100%;
    background-color: #3b75ef;
    z-index: -1;
    transform-origin: left;
    transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link:hover:before {
    transform: scaleX(1);
    transform-origin: right;
  }

  .submenu .submenu-link:hover {
    color: #ffffff;
  }
`;

export default Main;
