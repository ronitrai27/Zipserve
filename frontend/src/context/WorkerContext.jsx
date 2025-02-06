import React, { createContext, useState } from "react";

export const WorkersContext = createContext();

export const WorkersProvider = ({ children }) => {
  const [workersLocations, setWorkersLocations] = useState([]);

  return (
    <WorkersContext.Provider value={{ workersLocations, setWorkersLocations }}>
      {children}
    </WorkersContext.Provider>
  );
};
