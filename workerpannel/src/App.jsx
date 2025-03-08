import React from "react";
import WorkerDashboard from "./components/WorkerDashboard";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
const App = () => {
  const workerId = "6798ece225a439f9ce493dfc"; //JATIN THAPA
  // 6798ece225a439f9ce493dfc //JATIN THAPA
  // 6798e3d325a439f9ce493d9c //Ankush sharma
  return <WorkerDashboard workerId={workerId} />;
};

export default App;
