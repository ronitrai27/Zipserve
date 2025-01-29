import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { assets } from "../assets/assets";
import RelatedWorkers from "../components/RelatedWorkers";

const MyBooking = () => {
  const { id } = useParams();
  const [workerInfo, setWorkerInfo] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [about, setAbout] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest"); // Added missing state
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  // Fetching worker info
  useEffect(() => {
    const fetchWorkersAndFindWorker = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/api/workers");
        if (!response.ok) {
          throw new Error("Failed to fetch workers");
        }
        const data = await response.json();
        setWorkers(data);

        const workerInfo = data.find((wor) => wor._id === id); // finding the worker info by id params
        if (!workerInfo) {
          throw new Error("Worker not found");
        }
        setWorkerInfo(workerInfo);
        console.log(workerInfo);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkersAndFindWorker();
  }, [id]);

  const handleAbout = () => {
    setAbout(!about);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-red-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      {workerInfo && (
        <div className="booking-page w-full min-h-screen bg-gray-100 py-5 font-inter">
          <div className="max-w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-5 md:gap-10">
            {/* worker Details and time slots and Reviews... */}
            <div className="flex flex-col bg-white pl-3 pr-6 py-5 rounded-md w-full md:w-[65%]">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10">
                <img
                  className="bg-primary w-full max-w-[200px] md:max-w-52 rounded-lg self-center md:self-start"
                  src={workerInfo.profileImage}
                  alt={`${workerInfo.name}'s profile`}
                />
                <div className="worker-detail-area font-inter text-gray-800 flex flex-col w-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-12">
                    <p className="text-[18px] font-bold">{workerInfo.name}</p>
                    <Rating
                      name="half-rating-read"
                      size="small"
                      defaultValue={workerInfo.stars}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <hr className="w-full mt-3 mb-2 border-gray-600 border-[.9px]" />
                  <div className="flex justify-end w-full">
                    <p className="text-[14px] font-light bg-gray-200 px-2 py-1 rounded-full">
                      experience: {workerInfo.experience} yr
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row py-5 gap-5 md:gap-20">
                    <div className="flex flex-col gap-2 font-light">
                      <p className="text-[16px] font-light underline-offset-2 underline text-gray-800">
                        Worker Details
                      </p>
                      <p className="flex items-center gap-2">
                        <assets.LuBriefcase /> {workerInfo.category}
                      </p>
                      <p>Visiting Fees: ₹{workerInfo.price}</p>
                      <p>Age: {workerInfo.age}</p>
                    </div>
                    <div className="flex flex-col gap-2 font-light">
                      <p className="text-[16px] font-light underline-offset-2 underline text-gray-800">
                        Contact Information
                      </p>
                      <p className="flex items-center gap-2">
                        <assets.MdOutlineCall /> {workerInfo.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <assets.LuMail /> {workerInfo.email}
                      </p>
                      <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <assets.BsChatDots /> Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleAbout}
                  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-full text-gray-700 font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                >
                  <assets.IoInformationSharp className="text-gray-600" /> About
                </button>
                {about && (
                  <p className="mt-2 text-black px-4 md:px-8 break-words text-[14px] font-light">
                    {workerInfo.about || "No description available"}
                  </p>
                )}

                {/* --------reviews------- */}
                <div className="mt-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                    <p className="text-[16px] font-light underline-offset-2 underline text-gray-800">
                      Reviews
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSortOrder("newest")}
                        className={`flex items-center gap-1 text-sm ${
                          sortOrder === "newest"
                            ? "text-gray-800"
                            : "text-gray-600"
                        } hover:text-gray-800`}
                      >
                        <assets.MdOutlineArrowDropUp />
                        Newest
                      </button>
                      <button
                        onClick={() => setSortOrder("oldest")}
                        className={`flex items-center gap-1 text-sm ${
                          sortOrder === "oldest"
                            ? "text-gray-800"
                            : "text-gray-600"
                        } hover:text-gray-800`}
                      >
                        <assets.MdOutlineArrowDropDown />
                        Oldest
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {workerInfo.reviews && workerInfo.reviews.length > 0 ? (
                      workerInfo.reviews
                        .sort((a, b) => {
                          if (sortOrder === "newest") {
                            return (
                              new Date(b.createdAt) - new Date(a.createdAt)
                            );
                          }
                          return new Date(a.createdAt) - new Date(b.createdAt);
                        })
                        .slice(0, 3)
                        .map((review, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg"
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-[14px] font-medium text-gray-700">
                                {review.customerName}
                              </p>
                              <p className="text-[12px] text-gray-500">
                                {new Date(review.createdAt)
                                  .toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                  .replace(",", "/")}
                              </p>
                            </div>
                            <p className="text-[13px] font-light text-gray-600 mt-1">
                              {review.comment}
                            </p>
                          </div>
                        ))
                    ) : (
                      <p className="text-center text-gray-500">
                        No reviews yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/*------------ Related workers... ------------*/}
            <div className="bg-white h-full w-full md:w-1/3 text-center py-3 rounded-md">
              <p className="text-[16px] font-medium text-primary mb-3 tracking-tight">
                More {workerInfo.category}
              </p>
              <hr className="w-[80%] mx-auto my-3 border-gray-300 border-[.9px]" />
              {/* Add related workers content here */}
              <RelatedWorkers id={id} category={workerInfo.category} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBooking;
