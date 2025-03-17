import { createContext, useState, useContext, useEffect } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
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
  const [storedCoins, setStoredCoins] = useState(0);
  // const calculateCoins = (price) => {
  //   let wholePart = Math.floor(price); // Remove decimals
  //   let coins = Math.floor(wholePart / 100) + (wholePart % 100 >= 50 ? 0.5 : 0);
  //   return Number(coins.toFixed(1)); // Ensures 1 decimal place
  // };
  const calculateCoins = (price) => {
    let coins = price / 100;

    // coins = Math.round(coins * 2) / 2;

    return Number(coins.toFixed(1));
  };

  useEffect(() => {
    if (totalPrice > 0) {
      setEarnedCoins(calculateCoins(totalPrice));
    } else {
      setEarnedCoins(0);
    }
  }, [totalPrice]);

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
