import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();

  // Show Navbar only on /home and /messages
  const showNavbar = location.pathname !== "/login";

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
      {showNavbar && <Navbar />} {/* Conditionally render Navbar */}
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

// 6798ece225a439f9ce493dfc //JATIN THAPA\
// 6798e3d325a439f9ce493d9c //Ankush sharma
