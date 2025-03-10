import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedWorker, setLoggedWorker] = useState(null);
  const [workerId, setWorkerId] = useState("");
  const [users, setUsers] = useState([]);
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
  return (
    <AppContext.Provider
      value={{ loggedWorker, setLoggedWorker, workerId, setWorkerId, users }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
