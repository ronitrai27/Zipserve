import React from "react";
import WorkerDashboard from "./components/WorkerDashboard";

const App = () => {
  const workerId = "679d90cda5051a36a986a02c"; // Hardcoded worker ID for now

  return <WorkerDashboard workerId={workerId} />;
};

export default App;
