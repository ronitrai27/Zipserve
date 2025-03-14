import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HomeNew from "./pages/HomeNew";
import Sidebar from "./components/Sidebar";

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";

  return (
    <div className="bg-gray-200 w-full h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      {!isAuthPage && <Navbar />}

      <div className={`flex flex-1 `}>
        {!isAuthPage && <Sidebar />}

        {/* Main content area */}
        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomeNew />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

// 6798ece225a439f9ce493dfc //JATIN THAPA
// 6798e3d325a439f9ce493d9c //Ankush sharma
