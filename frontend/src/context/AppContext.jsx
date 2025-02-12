import { createContext, useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationContext";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const [workers, setWorkers] = useState([]);
  const { userLocation } = useContext(LocationContext);
  const [loading, setLoading] = useState(true);
  const toggleTheme = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    if (!userLocation || !userLocation.latitude || !userLocation.longitude)
      return;
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        console.log("Fetching workers with location:", userLocation);

        const response = await fetch(
          `http://localhost:8080/api/workers/all?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
        );
        if (!response.ok) throw new Error("Failed to fetch workers");

        const data = await response.json();
        setWorkers(data.workers || []);
      } catch (error) {
        console.error("Error fetching workers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [userLocation]); // Only run when userLocation is set-----

  const value = {
    theme,
    toggleTheme,
    workers, // fetched workers from backend-----
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
