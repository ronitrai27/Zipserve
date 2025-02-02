import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MorphingTextDemo } from "../components/MorphingAnimation.jsx";
import { AuroraText } from "../components/ui/aurora-text.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets.js";
import Rating from "@mui/material/Rating";

const Test2 = () => {
  const [workers, setWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [enlargedWorker, setEnlargedWorker] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Added search state
  const { category } = useParams();
  const navigate = useNavigate();

  const fetchWorkers = async (page = 1) => {
    try {
      let url = `http://localhost:8080/api/workers?page=${page}&limit=7`;

      if (category) {
        url += `&category=${category}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWorkers(data.workers);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [category]); // Added category to dependency array

  const handleEnlargeClick = (workerId) => {
    setEnlargedWorker(enlargedWorker === workerId ? null : workerId);
  };

  // Filter workers based on search term
  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (selectedCategory) => {
    if (category === selectedCategory) {
      navigate("/workers");
    } else {
      navigate(`/workers/${selectedCategory}`);
    }
  };

  return (
    <div className="flex-1 border-[1px] bg-stone-50 h-[90vh] rounded-t-xl py-4 overflow-hidden">
      <div className="parent-container relative flex flex-row justify-between gap-6 w-[95%] mx-auto">
        {/* LEFT SIDE -> CATEGORIES AND AD */}
        <div className="left-side max-w-[24%] min-w-[24%] font-inter flex flex-col">
          <p className="text-[20px] font-light text-gray-800 text-center mb-2 tracking-wider">
            Categories:
          </p>
          <div className="flex flex-col max-w-[90%] gap-5 py-4 px-4 bg-white rounded-xl shadow-md h-[calc(90vh-320px)] overflow-y-auto mb-4">
            <p
              onClick={() => handleCategoryClick("plumber")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "plumber" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.VscTools className="text-[18px]" /> Plumber
            </p>
            <p
              onClick={() => handleCategoryClick("carpenter")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "carpenter" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.LuDrill className="text-[18px]" /> Carpenter
            </p>
            <p
              onClick={() => handleCategoryClick("electrician")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "electrician" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.LuBriefcase className="text-[18px]" /> Electrician
            </p>
            <p
              onClick={() => handleCategoryClick("technician")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "technician" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.LuBriefcase className="text-[18px]" /> Technician
            </p>
            <p
              onClick={() => handleCategoryClick("painters")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "painters" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.PiPaintRoller className="text-[18px]" /> Painter
            </p>
            <p
              onClick={() => handleCategoryClick("cleaner")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "cleaner" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.LiaBroomSolid className="text-[18px]" /> Cleaner
            </p>
            <p
              onClick={() => handleCategoryClick("gardener")}
              className={`flex items-center gap-2 text-[16px] font-[400] bg-gray-100 px-5 py-3 rounded-xl cursor-pointer text-gray-800 hover:text-white hover:bg-primaryLight transition-colors hover:scale-105 ${
                category === "gardener" ? "bg-primaryLight text-white" : ""
              }`}
            >
              <assets.GiVacuumCleaner className="text-[18px]" /> Gardener
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
        {/* RIGHT SIDE -> WORKERS ------------------------------------*/}
        <div className="Right-Side flex-1 font-inter">
          {category ? (
            <p className="flex items-center justify-center pr-24 text-[25px] font-[400] text-gray-800 capitalize tracking-wider mb-4">
              Browse all
              <AuroraText className="ml-2 font-outfit">{category}</AuroraText>
            </p>
          ) : (
            <p className="flex items-center justify-center pr-24 text-[20px] font-[400] text-gray-800 tracking-wider mb-3">
              Hey John ! Lets start booking , try{" "}
              <span className="ml-3 text-primary">
                <MorphingTextDemo />
              </span>
            </p>
          )}

          <div className="flex items-center gap-5 mb-1">
            <div className="flex items-center bg-gray-200 w-full rounded-full px-6 gap-2 hover:bg-gray-100 transition-all">
              <assets.IoIosSearch className="text-[20px] cursor-pointer hover:scale-110 transition-all" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Try Searching Worker Name..."
                className="w-full p-3 bg-inherit focus:outline-none focus:ring-0"
              />
            </div>
            <div className="bg-white flex items-center gap-2 px-5 py-2 rounded-md border-[1px] border-primaryLight cursor-pointer">
              <assets.LuSettings2 className="text-primary text-[20px]" />
              <button className="text-black text-[15px] font-[400]">
                Filter
              </button>
            </div>
          </div>
          {/* All the filters ----------------- */}
          <div className="w-full h-[35px] rounded-xl mb-1"></div>
          {/* All selected Workers--------- */}
          <div className="flex flex-col gap-3 font-inter bg-white py-5 px-4 rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage} // Use currentPage as the key to trigger animations
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {filteredWorkers.map((worker) => (
                  <div
                    key={worker._id} // Changed from worker.id to worker._id
                    className="flex flex-col bg-gray-100 pl-2 pr-6 py-[6px] rounded-lg hover:bg-gray-200 transition-all hover:scale-105 duration-200"
                  >
                    <div className="flex flex-row gap-2 justify-between items-center">
                      <img
                        src={worker.profileImage}
                        alt={worker.name}
                        className="w-10 h-10 rounded-full bg-white border-[1px] border-primaryLight"
                      />
                      <h2 className="capitalize text-[14px] font-[400]">
                        {worker.name}
                      </h2>
                      <p className="capitalize text-[14px] font-light">
                        {worker.category}
                      </p>
                      <Rating
                        name={`rating-${worker._id}`} // Added unique name
                        size="small"
                        defaultValue={worker.stars}
                        precision={0.1}
                        readOnly
                      />
                      {worker.available ? (
                        <div className="flex items-center gap-1 bg-white px-4 py-[2px] rounded-full">
                          <p className="text-green-500 text-sm font-light">
                            Available
                          </p>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 bg-white px-4 py-[2px] rounded-full">
                          <p className="text-red-500 text-sm font-light">
                            Available
                          </p>
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>
                      )}
                      <p className="text-sm font-medium text-gray-800">
                        ₹ {worker.price}
                      </p>
                      <div
                        onClick={() => handleEnlargeClick(worker._id)}
                        className="flex items-center bg-white p-2 rounded-full cursor-pointer"
                      >
                        <assets.ImEnlarge2 className="text-primary text-[20px]" />
                      </div>
                    </div>
                    {enlargedWorker === worker._id && (
                      <div className="bg-inherit px-20 pt-2 flex items-center justify-between border-t border-gray-200">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 font-medium text-[14px] text-primary hover:bg-primary hover:text-white px-2 py-1.5 rounded-full border-[1px] border-primary transition-colors">
                            <assets.BsChatDots className="text-lg" />
                            Chat Now
                          </button>

                          <p className="text-sm font-medium text-gray-700">
                            {worker.phone}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/booking/${worker._id}`)}
                          className="px-5 py-1.5 text-sm font-medium bg-gradient-to-r from-primary to-primaryLight text-white rounded-lg hover:shadow-lg transition-shadow"
                        >
                          Book Now
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Pagination ----------------- ABSOLUT */}
          <div className="pagination absolute -bottom-2 right-[40%] translate-x-[40%]">
            <div className="pagination flex gap-10 justify-center items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => fetchWorkers(currentPage - 1)}
                className={`${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <assets.LuChevronLeft className="text-primary text-[25px] cursor-pointer hover:scale-110 transition-all hover:bg-primaryLight rounded-full hover:text-white" />
              </button>

              <span className="text-[14px] font-light">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => fetchWorkers(currentPage + 1)}
                className={`${
                  currentPage === totalPages ? "opacity-50 cursor-none" : ""
                }`}
              >
                <assets.LuChevronRight className="text-primary text-[25px] cursor-pointer hover:scale-110 transition-all hover:bg-primaryLight rounded-full hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test2;
