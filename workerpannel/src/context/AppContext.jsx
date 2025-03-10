import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedWorker, setLoggedWorker] = useState(null);
  const [workerId, setWorkerId] = useState("");
  const [users, setUsers] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [inProgressBookings, setInProgressBookings] = useState([]);

  //----------------------------------------
  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/worker/me",
          { withCredentials: true }
        );
        setLoggedWorker(data.worker);
      } catch (error) {
        console.error("Failed to fetch worker data");
      }
    };

    fetchWorker();
  }, []);
  //------------------------------------------

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/workers/all/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Runs only once when the component mounts
  //--------------------------------------------------
  // const fetchBookings = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/workers/worker-confirm-progress/${loggedWorker?._id}`
  //     );
  //     const { confirmed, inProgress } = response.data;

  //     setConfirmedBookings(confirmed);
  //     setInProgressBookings(inProgress);
  //   } catch (error) {
  //     console.error("Error fetching worker bookings:", error);
  //   }
  // };
  const fetchBookings = async () => {
    if (!loggedWorker?._id) {
      console.warn("Worker ID is missing, skipping fetch");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/workers/worker-confirm-progress/${loggedWorker._id}`
      );

      console.log("API RESPONSE:", response.data); // Debugging

      // Ensure the response contains the expected keys
      if (
        !response.data.confirmedBookings ||
        !response.data.inProgressBookings
      ) {
        console.warn("Unexpected API response format:", response.data);
        return;
      }

      // Set state properly
      setConfirmedBookings([...response.data.confirmedBookings]);
      setInProgressBookings([...response.data.inProgressBookings]);

      // console.log(
      //   "CONFIRMED BOOKINGS (SET IN STATE):",
      //   response.data.confirmedBookings
      // );
      // console.log(
      //   "IN-PROGRESS BOOKINGS (SET IN STATE):",
      //   response.data.inProgressBookings
      // );
    } catch (error) {
      console.error("Error fetching worker bookings:", error);
    }
  };

  useEffect(() => {
    if (loggedWorker?._id) {
      fetchBookings();
      const interval = setInterval(fetchBookings, 3000);
      return () => clearInterval(interval);
    }
  }, [loggedWorker]); // Runs when `loggedWorker` is updated

  return (
    <AppContext.Provider
      value={{
        loggedWorker,
        setLoggedWorker,
        workerId,
        setWorkerId,
        users,
        confirmedBookings,
        inProgressBookings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
