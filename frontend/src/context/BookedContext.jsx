import { createContext, useState, useContext, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const BookedContext = createContext();

// Provider Component
export const BookedProvider = ({ children }) => {
  const { user } = useAppContext();
  const [currentBookingId, setCurrentBookingId] = useState(null); // Booking ID of current booking
  const [userBookDetails, setUserBookDetails] = useState(null); // all bookings of current user
  const [bookingCongrats, setBookingCongrats] = useState(false); //For showing booking confirmation and coins
  const [bookingCounts, setBookingCounts] = useState({
    pending: 0,
    confirmed: 0,
    inProgress: 0,
  }); // Store counts
  //-----------------------------------------
  const fetchUserBookings = async () => {
    try {
      if (!user?._id) return;
      const response = await axios.get(
        `http://localhost:8080/api/bookings/${user._id}`
      );

      // Extracting bookings and counts separately
      setUserBookDetails(response.data.bookings || []); // Store only bookings
      setBookingCounts(
        response.data.counts || { pending: 0, confirmed: 0, inProgress: 0 }
      ); // Store counts
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, [user]);

  return (
    <BookedContext.Provider
      value={{
        currentBookingId,
        setCurrentBookingId,
        userBookDetails,
        fetchUserBookings,
        bookingCongrats,
        setBookingCongrats,
        bookingCounts,
      }}
    >
      {children}
    </BookedContext.Provider>
  );
};

// Custom Hook for easy access
export const useBooked = () => useContext(BookedContext);
