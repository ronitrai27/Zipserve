import React, { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [workersLocations, setWorkersLocations] = useState([]);

  return (
    <LocationContext.Provider value={{ workersLocations, setWorkersLocations }}>
      {children}
    </LocationContext.Provider>
  );
};
