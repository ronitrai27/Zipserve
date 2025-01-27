import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const MyBooking = () => {
  const { id } = useParams();
  console.log(id);
  const [workerInfo, setWorkerInfo] = useState(null);
  const [workers, setWorkers] = useState([]);
  // Fetching worker info
  useEffect(() => {
    const fetchWorkersAndFindWorker = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/workers");
        if (!response.ok) {
          throw new Error("Failed to fetch workers");
        }
        const data = await response.json();
        setWorkers(data); // setting data of all workers to this state array.

        const workerInfo = data.find((wor) => wor._id === id);
        setWorkerInfo(workerInfo); // storing all detail of worker
        console.log(workerInfo);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchWorkersAndFindWorker();
  }, [id]);

  return <div></div>;
};

export default MyBooking;
