import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const BookedContext = createContext();

// Provider Component
export const BookedProvider = ({ children }) => {
  const { user } = useAppContext();
  const [clickedBookingId, setClickedBookingId] = useState(null);
  const [currentBookingId, setCurrentBookingId] = useState(null); // Booking ID of current booking
  const [userBookDetails, setUserBookDetails] = useState(null); // all bookings of current user
  const [bookingCongrats, setBookingCongrats] = useState(false); //For showing booking confirmation and coins
  const [bookingCounts, setBookingCounts] = useState({
    pending: 0,
    confirmed: 0,
    inProgress: 0,
  }); // Store counts
  const [isSearching, setIsSearching] = useState(false); // Track if user is searching, stop fetching
  const lastStatuses = useRef({}); // for fetchUserBookings function
  const pollingRef = useRef(null); // for fetchBookingById , filters function
  const [selectedStatus, setSelectedStatus] = useState(null); //store selected status
  const [isFilters, setIsFilters] = useState(false); // Track if user is filtering, stop fetching
  //BOOKING HISTORY STATES-----------------------
  const [bookingHist, setBookingHist] = useState([]);
  const [loading, setLoading] = useState(true);
  //------------------------------------------------------
  //---------------FETCH BOOINGS BY USER ID
  //------------------------------------------------------
  const fetchUserBookings = async () => {
    try {
      if (!user?._id || isSearching || isFilters) return;

      const response = await axios.get(
        `http://localhost:8080/api/bookings/${user._id}`
      );
      const newBookings = response.data.bookings || [];
      const newCounts = response.data.counts || {
        pending: 0,
        confirmed: 0,
        inProgress: 0,
      };

      // Show toast notifications for status changes
      newBookings.forEach((booking) => {
        const prevStatus = lastStatuses.current[booking._id];

        if (prevStatus && prevStatus !== booking.status) {
          toast.info(`Your booking is now ${booking.status}`);
        }
      });

      // Store latest statuses for tracking
      lastStatuses.current = newBookings.reduce((acc, booking) => {
        acc[booking._id] = booking.status;
        return acc;
      }, {});

      // Update state
      setUserBookDetails(newBookings);
      setBookingCounts(newCounts);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  //---------------------------------------------------------------------------
  //-----------------------------------FETCH BOOKING BY ID
  //---------------------------------------------------------------------------
  const fetchBookingById = async (bookingId) => {
    if (!bookingId) return;
    try {
      setIsSearching(true);
      clearInterval(pollingRef.current); // Stop any ongoing polling

      const fetchBooking = async () => {
        const response = await axios.get(
          `http://localhost:8080/api/bookings/book/${bookingId}`
        );
        setUserBookDetails([response.data]);
      };

      await fetchBooking(); // Initial fetch

      pollingRef.current = setInterval(fetchBooking, 3000); // Poll every 3s
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking not found.");
    }
  };

  //--------------------------------------------------
  useEffect(() => {
    if (!isSearching || !isFilters) {
      fetchUserBookings(); // Initial fetch
      const intervalId = setInterval(fetchUserBookings, 3000);

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [user, isSearching, isFilters]);
  //----------------------------------------------------------------------
  //--------------------------FETCH BOOKINGS BY FILTERS
  //----------------------------------------------------------------------
  const handleFilters = async (status) => {
    setSelectedStatus(status);
    setIsFilters(true);
    clearInterval(pollingRef.current); // Stop previous polling

    const fetchFiltered = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/bookings/filter/${user._id}?status=${status}`
        );
        setUserBookDetails(response.data);
      } catch (error) {
        toast.error("Error fetching filtered bookings.");
      }
    };

    await fetchFiltered(); // Initial fetch
    pollingRef.current = setInterval(fetchFiltered, 3000); // Poll every 3s
  };
  //---------------------------------------------------
  //-------------------RESET SEARCH
  //---------------------------------------------------

  const resetSearch = () => {
    setIsSearching(false);
    clearInterval(pollingRef.current);
    fetchUserBookings(); // Resume default polling
  };
  const resetFilter = () => {
    setSelectedStatus(null);
    setIsFilters(false);
    clearInterval(pollingRef.current);
    fetchUserBookings();
  };
  //------------------------------------------------------------------
  //--------------------BOOKING HISTORY
  //------------------------------------------------------------------
  useEffect(() => {
    if (!user?._id) return; // Ensure user is available

    const fetchBookingHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/bookings/history/${user._id}`
        );
        const data = await response.json();

        if (response.ok) {
          setBookingHist(data.bookingHistory);
        }
      } catch (err) {
        console.error("Error fetching booking history:", err);
        toast.error("Error fetching booking history.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch initially
    fetchBookingHistory();

    // Set interval to fetch every 3 seconds
    const intervalId = setInterval(fetchBookingHistory, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [user?._id]);
  //------------------------------------------------------------------

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
        fetchBookingById,
        resetSearch,
        handleFilters,
        selectedStatus,
        resetFilter,
        bookingHist,
        loading,
        clickedBookingId,
        setClickedBookingId,
      }}
    >
      {children}
    </BookedContext.Provider>
  );
};

// Custom Hook for easy access
export const useBooked = () => useContext(BookedContext);
