import React from "react";
import WorkerDashboard from "./components/WorkerDashboard";

const App = () => {
  const workerId = "6798ece225a439f9ce493dfc"; // Hardcoded worker ID for now

  return <WorkerDashboard workerId={workerId} />;
};

export default App;
