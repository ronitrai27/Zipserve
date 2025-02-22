import { createContext, useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationContext";
import axios from "axios";
import { toast } from "react-toastify";
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(true); // themes
  const [workers, setWorkers] = useState([]); // workers fetch from backend 5km--
  const { userLocation } = useContext(LocationContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // login user details---
  const [favoriteWorkers, setFavoriteWorkers] = useState([]); // bookmark workers--
  const toggleTheme = () => {
    setTheme(!theme);
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/me", {
          withCredentials: true,
        });

        // console.log("User Details Fetched:", response.data);// debugging logs---
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUser(null); // Reset user state if not authenticated
      }
    };

    fetchUserDetails();
  }, []);
  //------------------------------------
  // Fetch favorite workers on mount (if user is logged in)-----GET
  useEffect(() => {
    if (user?._id) {
      axios
        .get(`/api/users/${user._id}/favorites`)
        .then((res) => {
          setFavoriteWorkers(res.data.favouriteWorkers || []);
        })
        .catch((err) => console.error("Error fetching favorites:", err));
    } else {
      // setFavoriteWorkers([]); // Reset favorites when user logs out
    }
  }, [user]); // 🔹 Re-fetch favorites when the user logs in or logs out

  // Toggle favorite worker (Add/Remove)-----------------POST
  const toggleFavoriteWorker = async (worker) => {
    if (!user?._id) {
      toast.warn("You need to log in first!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/toggle-favorite",
        {
          userId: user._id,
          worker,
        }
      );

      const updatedFavorites = res.data.favouriteWorkers || [];
      setFavoriteWorkers(updatedFavorites); // ✅ Update favorite workers globally

      // Show toast based on action
      const isFavorited = updatedFavorites.some((w) => w._id === worker._id);

      if (isFavorited) {
        toast.success(`${worker.name} added to favourites!`);
      } else {
        toast.info(`${worker.name} removed from favourites.`);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  //--------------------------------------
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

  // -----------------------------

  const value = {
    theme,
    toggleTheme,
    workers, // fetched workers from backend-----
    loading,
    user,
    setUser,
    favoriteWorkers,
    toggleFavoriteWorker,
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
