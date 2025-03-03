import { createContext, useState, useContext, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const BookedContext = createContext();

// Provider Component
export const BookedProvider = ({ children }) => {
  const { user } = useAppContext();
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [userBookDetails, setUserBookDetails] = useState(null);

  const fetchUserBookings = async () => {
    try {
      if (!user?._id) return;
      const response = await axios.get(
        `http://localhost:8080/api/bookings/${user._id}`
      );
      setUserBookDetails(response.data);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, [user]);

  //   useEffect(() => {
  //     if (userBookDetails) {
  //       console.log("All bookings for the user:", userBookDetails);
  //     }
  //   }, [userBookDetails]);

  return (
    <BookedContext.Provider
      value={{
        currentBookingId,
        setCurrentBookingId,
        userBookDetails,
        fetchUserBookings,
      }}
    >
      {children}
    </BookedContext.Provider>
  );
};

// Custom Hook for easy access
export const useBooked = () => useContext(BookedContext);
