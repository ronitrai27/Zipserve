import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();
// problem is here only , page wise worker are being fetched for main , workerCard , RelatedWorker
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/workers/all");
        if (!response.ok) {
          throw new Error("Failed to fetch workers");
        }
        const data = await response.json();

        // Fix: Ensure workers is extracted from response object
        const workersArray = data.workers || [];

        setWorkers(workersArray);
        setFilteredWorkers(workersArray);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  const value = {
    theme,
    toggleTheme,
    workers, // fetched workers from backend
    filteredWorkers, // filtered workers
    setFilteredWorkers, // set filtered workers
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
