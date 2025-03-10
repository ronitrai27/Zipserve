import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="bg-gray-200 w-full h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
};

export default App;

// import WorkerDashboard from "./components/WorkerDashboard";
// const workerId = "6798e3d325a439f9ce493d9c"; //a
// 6798ece225a439f9ce493dfc //JATIN THAPA
// 6798e3d325a439f9ce493d9c //Ankush sharma
// return <WorkerDashboard workerId={workerId} />;
