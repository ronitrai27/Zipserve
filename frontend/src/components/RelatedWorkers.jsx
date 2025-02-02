import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
const RelatedWorkers = ({ id, category }) => {
  const [workers, setWorkers] = useState([]);
  const [relWorkers, setRelWorkers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // fetching workers from database----------------
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/workers/all");
        if (!response.ok) {
          throw new Error("Failed to fetch workers");
        }
        const data = await response.json();

        // Fix: Extract workers from API response
        const workersArray = data.workers || [];
        setWorkers(workersArray);
        setError(null);
      } catch (error) {
        console.error("Error fetching workers:", error);
        setError("Failed to load workers. Please try again later.");
      }
    };

    fetchWorkers();
  }, []);

  // Setting related workers by category and id
  useEffect(() => {
    if (workers.length > 0 && category) {
      try {
        const workersData = workers.filter(
          (wor) => wor.category === category && wor._id !== id // id is from params
        );
        setRelWorkers(workersData);
        setError(null);
      } catch (error) {
        console.error("Error filtering workers:", error);
        setError("Failed to filter related workers.");
      }
    }
  }, [workers, category, id]);

  return (
    <div className="flex flex-col gap-4 px-2">
      {relWorkers
        .filter((worker) => worker.available === true)
        .slice(0, 4)
        .map((worker, index) => (
          <div
            key={index}
            n
            onClick={() => {
              navigate(`/booking/${worker._id}`);
              scrollTo(0, 0);
            }}
            className="flex  gap-6 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-all font-inter bg-gray-50"
          >
            <img
              src={worker.profileImage}
              alt={worker.name}
              className="w-16 h-16 rounded-full object-cover bg-white border border-gray-200 "
            />
            <div>
              <h3 className="font-medium text-gray-800 capitalize ">
                {worker.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{worker.experience} years exp.</span>
                <div className="ml-auto">
                  <Rating
                    name="half-rating-read"
                    size="small"
                    defaultValue={worker.stars || 0}
                    precision={0.5}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Available</span>
              </div>
            </div>
          </div>
        ))}
      <button
        onClick={() => {
          navigate(`/workers/${category}`);
          // scrollTo(0, 0);
        }}
        className="w-full py-2 text-primary border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
      >
        View More
      </button>
    </div>
  );
};

export default RelatedWorkers;
