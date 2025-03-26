import { createContext, useState, useContext, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { user, setUser } = useAppContext();
  // Days of the week array
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthsOfYear = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  // Function to get current day & date
  const getCurrentDayDate = () => {
    const today = new Date();
    return {
      day: daysOfWeek[today.getDay()], // e.g., "SUN"
      date: today.getDate().toString(), // e.g., "23"
      month: monthsOfYear[today.getMonth()], // e.g., "FEB"
      year: today.getFullYear().toString(), // e.g., "2025"
    };
  };

  // States for booking
  const [selectedServices, setSelectedServices] = useState([]); // Stores selected service IDs
  const [slotTime, setSlotTime] = useState(""); // Tracks selected time slot
  const [selectedDayDate, setSelectedDayDate] = useState(getCurrentDayDate()); // Stores selected day & date
  const [servicePrice, setServicePrice] = useState(0); // stores total service price
  const [commission, setCommission] = useState(0); // 15% commisiion of total price
  const [totalPrice, setTotalPrice] = useState(0); // totalPrice
  const [paymentMethod, setPaymentMethod] = useState(""); // payment method eg - cash
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // drawer
  const [subservices, setSubservices] = useState([]); //SHOW ALL SERVICES from Backend FOR CATEGORY

  const [earnedCoins, setEarnedCoins] = useState(0);
  const [storedCoins, setStoredCoins] = useState(0); // to store the coins
  const [tempCoins, setTempCoins] = useState(0); //to store stored coins temp for updating DB

  useEffect(() => {
    if (storedCoins > 0) {
      setTempCoins(storedCoins);
    }
  }, [storedCoins]);
  //-------------------------------------------------
  //-----------CALCULATE COINS
  //-------------------------------------------------
  const calculateCoins = (price) => {
    let coins = price / 100;
    return Number(coins.toFixed(1));
  };

  useEffect(() => {
    if (totalPrice > 0) {
      setEarnedCoins(calculateCoins(totalPrice));
    } else {
      setEarnedCoins(0);
    }
  }, [totalPrice]);

  //-------------------------------------------
  //-----------------------UPDATING COINS
  //-------------------------------------------

  const updateUserCoins = async () => {
    if (tempCoins > 0 && user) {
      try {
        const newCoinTotal = Number((user.coins + tempCoins).toFixed(1));

        const response = await axios.put(
          `http://localhost:8080/api/users/coins/${user._id}`,
          {
            coins: newCoinTotal,
          }
        );

        // Update user state in the frontend after successful update in DB
        setUser({ ...user, coins: newCoinTotal });
        setTempCoins(0);
        // toast.success(response.data.message);
        setTimeout(() => {
          toast.success("Successfully you received Coins !!");
        }, 3000);
        console.log(response.data.message); // Logging success message: You received __ coins!
      } catch (error) {
        console.error("Error updating coins:", error);
      }
    }
  };

  useEffect(() => {
    updateUserCoins(); // Call the function inside useEffect when storedCoins changes
  }, [tempCoins]);

  return (
    <BookingContext.Provider
      value={{
        selectedServices,
        setSelectedServices,
        slotTime,
        setSlotTime,
        selectedDayDate,
        setSelectedDayDate,
        getCurrentDayDate,
        servicePrice,
        setServicePrice,
        commission,
        setCommission,
        totalPrice,
        setTotalPrice,
        paymentMethod,
        setPaymentMethod,
        isDrawerOpen,
        setIsDrawerOpen,
        subservices,
        setSubservices,
        earnedCoins,
        storedCoins,
        setStoredCoins,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the BookingContext
export const useBooking = () => useContext(BookingContext);
