import { createContext, useState, useContext, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const BookedContext = createContext();

// Provider Component
export const BookedProvider = ({ children }) => {
  const { user } = useAppContext();
  const [currentBookingId, setCurrentBookingId] = useState(null); // Booking ID of current booking
  const [userBookDetails, setUserBookDetails] = useState(null); // all bookings of current user
  const [currentBookingDetails, setCurrentBookingDetails] = useState(null); // booking details of current booking
  const [bookingCongrats, setBookingCongrats] = useState(false); //For showing booking confirmation and coins
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

  useEffect(() => {
    if (userBookDetails && userBookDetails.length > 0) {
      // Filter the booking that matches `currentBookingId`
      const filteredBooking = userBookDetails.filter(
        (booking) => booking._id === currentBookingId
      );

      // If found, set the booking details
      if (filteredBooking.length > 0) {
        setCurrentBookingDetails(filteredBooking[0]);
      }
    }
  }, [userBookDetails, currentBookingId]); // Runs when bookings or ID updates

  return (
    <BookedContext.Provider
      value={{
        currentBookingId,
        setCurrentBookingId,
        userBookDetails,
        fetchUserBookings,
        bookingCongrats,
        setBookingCongrats,
        currentBookingDetails,
        setCurrentBookingDetails,
      }}
    >
      {children}
    </BookedContext.Provider>
  );
};

// Custom Hook for easy access
export const useBooked = () => useContext(BookedContext);
