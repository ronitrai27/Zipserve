import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedWorkers from "../components/RelatedWorkers";
import { useAppContext } from "../context/AppContext";
import Rating from "@mui/material/Rating";
import { LuPenLine } from "react-icons/lu";
const NewMyBooking = () => {
  const { id } = useParams(); // storing _id of selected worker
  const [workerInfo, setWorkerInfo] = useState(null); // Stores information about the currently selected worker
  const [workers, setWorkers] = useState([]); // Stores the full list of all workers
  const [about, setAbout] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [toggleDetail, setToggleDetail] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState(4); // Added missing state for pagination
  // Fetching worker info from context
  const { workers: contextWorkers } = useAppContext();

  useEffect(() => {
    // Only run if we have workers data from context
    if (contextWorkers.length > 0) {
      setIsLoading(true);
      try {
        const workerInfo = contextWorkers.find((worker) => worker._id === id);
        if (!workerInfo) {
          throw new Error("Worker not found");
        }
        setWorkerInfo(workerInfo);
        setWorkers(contextWorkers);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [contextWorkers, id]);

  // Fetching review for selected worker
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `http://localhost:8080/api/workers/${id}/reviews`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format - expected array");
        }
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        setReviews([]); // Set empty array on error
      }
    };

    fetchReviews();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>; // Added loading state handling
  }

  return (
    <>
      {workerInfo ? (
        <div className="booking-page w-full min-h-screen bg-gray-100 py-5  rounded-tr-3xl">
          <div className="max-w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-5 md:gap-10">
            {/* ------------ Worker Details ------------ */}
            <div className="px-8 py-4 flex flex-col gap-5  h-[90vh] overflow-y-scroll scroll-smooth w-[55rem]">
              <div className="worker-top flex flex-row gap-8">
                <img
                  src={workerInfo.profileImage}
                  alt={`${workerInfo.name}'s profile`}
                  className="w-60 bg-gray-200 border-[1px] border-primary rounded-xl object-cover"
                />
                <div
                  className="worker-basic-details font-inter text-gray-800  flex-1 flex-col rounded-xl px-3 py-1 bg-gradient-to-br
                 from-primaryLight/20 via-primaryLight/70 to-primary w-[30rem]"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-[18px] pl-6 font-medium capitalize tracking-wide ">
                      {workerInfo.name}
                    </p>
                    <Rating
                      name="half-rating-read"
                      size="small"
                      defaultValue={workerInfo.stars || 0}
                      precision={0.5}
                      readOnly
                    />
                  </div>

                  <div className="w-full flex items-center mt-3">
                    <hr className="border-white flex-1 border-[.95px]" />
                    <p className="text-[14px] font-light p-1 bg-white rounded-full ml-4">
                      Experience: {workerInfo.experience} years
                    </p>
                  </div>
                  {/* ------------ Details ------------ */}
                  <div className="flex flex-col">
                    <div className="flex gap-8 mb-4">
                      <h1
                        onClick={() => setToggleDetail(true)}
                        className={`font-medium text-[16px] cursor-pointer font-outfit ${
                          toggleDetail
                            ? "underline underline-offset-4 decoration-white"
                            : ""
                        }`}
                      >
                        Basic details
                      </h1>
                      <h1
                        onClick={() => setToggleDetail(false)}
                        className={`font-medium text-[16px] cursor-pointer font-outfit ${
                          !toggleDetail
                            ? "underline underline-offset-4 decoration-white"
                            : ""
                        }`}
                      >
                        Contact info
                      </h1>
                    </div>

                    {toggleDetail ? (
                      // Basic Details
                      <div className="flex flex-col gap-2">
                        <p className="text-[15px] font-[400] flex items-center gap-2">
                          <span className="font-medium">Category:</span>
                          <assets.VscTools /> {workerInfo.category}
                        </p>
                        <p className="text-[15px] font-[400]">
                          <span className="font-medium">Visiting Fee:</span>{" "}
                          {workerInfo.price}
                        </p>
                        <p className="text-[15px] font-[400]">
                          <span className="font-medium">Age:</span>{" "}
                          {workerInfo.age}
                        </p>
                        <p className="text-[15px] font-[400]">
                          <span className="font-medium">Address:</span>{" "}
                          {workerInfo.address}
                        </p>
                      </div>
                    ) : (
                      // Contact Info
                      <div className="flex flex-col gap-2">
                        <p className="text-[15px] font-[400] flex items-center gap-2">
                          <span className="font-medium">Phone:</span>
                          <assets.MdOutlineCall /> {workerInfo.phone}
                        </p>
                        <p className="text-[15px] font-[400]">
                          <span className="font-medium">Email:</span>{" "}
                          {workerInfo.email}
                        </p>
                        <p className="text-[18px] font-medium bg-white text-primary px-2 py-1 rounded-full w-fit flex items-center gap-2 cursor-pointer">
                          <assets.BsChatDots className="text-[20px]" /> chat
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* ------------ About ------------ */}
              <div className="flex flex-col gap-2 pl-4">
                <div
                  onClick={() => setAbout(!about)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <h1 className="text-[18px] font-medium">About</h1>
                  {about ? (
                    <assets.MdOutlineArrowDropUp className="text-[24px]" />
                  ) : (
                    <assets.MdOutlineArrowDropDown className="text-[24px]" />
                  )}
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    about ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <p className="text-[15px] font-[400]">{workerInfo.about}</p>
                </div>
              </div>
              {/* ------------ Reviews ------------ */}
              <div className="flex flex-col gap-4 pl-4 ">
                <div className="flex items-center justify-between">
                  <h1 className="text-[18px] font-medium">Reviews</h1>
                  <select
                    className="px-2 py-1 rounded-md border border-gray-300 outline-none"
                    onChange={(e) => setSortOrder(e.target.value)}
                    value={sortOrder}
                  >
                    <option value="newest">Latest</option>
                    <option value="oldest">Earliest</option>
                  </select>
                </div>

                <div className="flex flex-col gap-4 w-full h-[300px] overflow-y-auto font-outfit">
                  {reviews && reviews.length > 0 ? (
                    reviews
                      ?.sort((a, b) => {
                        if (sortOrder === "newest") {
                          return new Date(b.createdAt) - new Date(a.createdAt);
                        } else {
                          return new Date(a.createdAt) - new Date(b.createdAt);
                        }
                      })
                      .slice(0, visibleReviews)
                      .map((review, index) => (
                        <div
                          key={review._id || index}
                          className="border-b-[1px] rounded-md px-4 py-2 w-[90%] mx-auto bg-gray-50/40"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium text-[14px] text-gray-800 font-inter capitalize">
                              {review.customerName}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[14px] text-gray-600 font-light break-words max-w-full overflow-hidden">
                            {review.comment}
                          </p>
                        </div>
                      ))
                  ) : (
                    // Show message when there are no reviews
                    <div className="">
                      <p className=" text-gray-500 text-lg italic flex items-center gap-2 justify-center mt-6 capitalize font-outfit">
                        <LuPenLine className="text-2xl" /> Be the first to book
                        and provide a review!
                      </p>
                    </div>
                  )}

                  {reviews &&
                    reviews.length > 0 &&
                    visibleReviews < reviews.length && (
                      <button
                        onClick={() => setVisibleReviews((prev) => prev + 4)}
                        className="bg-primary text-white px-2 py-1 hover:bg-blue-700 rounded-lg shadow-lg transition-all w-fit mx-auto hover:scale-105 duration-200"
                      >
                        Load More
                      </button>
                    )}
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
      ) : (
        <div>Worker not found</div> // Added meaningful message
      )}
    </>
  );
};

export default NewMyBooking;
